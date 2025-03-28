
import React, { useRef, useEffect, useState } from "react";

interface GameState {
  player: {
    x: number;
    y: number;
    size: number;
    speed: number;
    color: string;
  };
  obstacles: {
    x: number;
    y: number;
    width: number;
    height: number;
    speed: number;
    color: string;
  }[];
  score: number;
  gameOver: boolean;
  gameActive: boolean;
}

const CanvasGame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState<GameState>({
    player: {
      x: 50,
      y: 175,
      size: 20,
      speed: 5,
      color: "#4AF626"
    },
    obstacles: [],
    score: 0,
    gameOver: false,
    gameActive: false
  });
  const [keys, setKeys] = useState<{ [key: string]: boolean }>({});
  const animationFrameRef = useRef<number>(0);
  const lastObstacleTimeRef = useRef<number>(0);

  const startGame = () => {
    setGameState(prev => ({
      ...prev,
      player: { ...prev.player, x: 50, y: 175 },
      obstacles: [],
      score: 0,
      gameOver: false,
      gameActive: true
    }));
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    setKeys(prev => ({ ...prev, [e.key]: true }));
  };

  const handleKeyUp = (e: KeyboardEvent) => {
    setKeys(prev => ({ ...prev, [e.key]: false }));
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  useEffect(() => {
    if (!gameState.gameActive) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const createObstacle = (timestamp: number) => {
      if (timestamp - lastObstacleTimeRef.current > 1500) {
        lastObstacleTimeRef.current = timestamp;
        const height = 20 + Math.random() * 60;
        const obstacle = {
          x: canvas.width,
          y: canvas.height - height,
          width: 20,
          height,
          speed: 3 + Math.random() * 2,
          color: "#61DAFB"
        };
        setGameState(prev => ({
          ...prev,
          obstacles: [...prev.obstacles, obstacle]
        }));
      }
    };

    const update = (timestamp: number) => {
      if (gameState.gameOver) return;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update player position
      const player = { ...gameState.player };
      if (keys["ArrowUp"] || keys["w"]) {
        player.y = Math.max(0, player.y - player.speed);
      }
      if (keys["ArrowDown"] || keys["s"]) {
        player.y = Math.min(canvas.height - player.size, player.y + player.speed);
      }
      if (keys["ArrowLeft"] || keys["a"]) {
        player.x = Math.max(0, player.x - player.speed);
      }
      if (keys["ArrowRight"] || keys["d"]) {
        player.x = Math.min(canvas.width - player.size, player.x + player.speed);
      }

      // Create obstacles periodically
      createObstacle(timestamp);

      // Update obstacles
      const updatedObstacles = gameState.obstacles
        .map(obs => ({ ...obs, x: obs.x - obs.speed }))
        .filter(obs => obs.x + obs.width > 0);
      
      // Check for collisions
      let collision = false;
      updatedObstacles.forEach(obs => {
        if (
          player.x < obs.x + obs.width &&
          player.x + player.size > obs.x &&
          player.y < obs.y + obs.height &&
          player.y + player.size > obs.y
        ) {
          collision = true;
        }
      });

      if (collision) {
        setGameState(prev => ({ ...prev, gameOver: true, gameActive: false }));
        return;
      }

      // Update score
      const newScore = gameState.score + 0.1;

      // Draw player
      ctx.fillStyle = player.color;
      ctx.fillRect(player.x, player.y, player.size, player.size);

      // Draw obstacles
      updatedObstacles.forEach(obs => {
        ctx.fillStyle = obs.color;
        ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
      });

      // Draw score
      ctx.fillStyle = "#FFFFFF";
      ctx.font = "16px monospace";
      ctx.fillText(`Score: ${Math.floor(newScore)}`, 10, 20);

      // Update game state
      setGameState(prev => ({
        ...prev,
        player,
        obstacles: updatedObstacles,
        score: newScore
      }));

      // Continue animation
      animationFrameRef.current = requestAnimationFrame(update);
    };

    animationFrameRef.current = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, [gameState.gameActive, gameState.gameOver, gameState.obstacles, gameState.player, gameState.score, keys]);

  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    if (gameState.gameOver || !gameState.gameActive) {
      startGame();
    }
  };

  const handleMouseClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (gameState.gameOver || !gameState.gameActive) {
      startGame();
    }
  };

  return (
    <div className="glass-card p-4 rounded-lg">
      <div className="mb-4 text-center">
        <h3 className="text-lg font-semibold mb-2">Terminal Escape</h3>
        <p className="text-sm text-muted-foreground mb-2">
          Use arrow keys or WASD to move. Avoid the blue obstacles.
        </p>
        {(!gameState.gameActive || gameState.gameOver) && (
          <button
            onClick={startGame}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors font-mono"
          >
            {gameState.gameOver ? "Play Again" : "Start Game"}
          </button>
        )}
        {gameState.gameOver && (
          <p className="mt-2 text-destructive font-semibold">
            Game Over! Score: {Math.floor(gameState.score)}
          </p>
        )}
      </div>
      <div className="canvas-container w-full border border-border rounded-md overflow-hidden">
        <canvas
          ref={canvasRef}
          width={400}
          height={300}
          className="bg-terminal-dark w-full"
          onTouchStart={handleTouchStart}
          onClick={handleMouseClick}
        />
      </div>
    </div>
  );
};

export default CanvasGame;
