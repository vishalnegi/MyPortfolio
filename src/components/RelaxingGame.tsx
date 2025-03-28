
import React, { useState, useEffect, useRef } from "react";
import { Circle, Square, ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

type Position = {
  x: number;
  y: number;
};

type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";

const GRID_SIZE = 20;
const GAME_SPEED = 150; // milliseconds between moves

const RelaxingGame: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [score, setScore] = useState(0);
  const [snake, setSnake] = useState<Position[]>([{ x: 10, y: 10 }]);
  const [food, setFood] = useState<Position>({ x: 15, y: 10 });
  const [direction, setDirection] = useState<Direction>("RIGHT");
  const [gameOver, setGameOver] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const gameLoopRef = useRef<NodeJS.Timeout | null>(null);
  const { toast } = useToast();

  // Place food in a random position
  const placeFood = () => {
    const newFood = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };
    
    // Make sure food doesn't spawn on snake
    const isOnSnake = snake.some(segment => segment.x === newFood.x && segment.y === newFood.y);
    
    if (isOnSnake) {
      placeFood(); // Try again
    } else {
      setFood(newFood);
    }
  };

  // Initialize game
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isPlaying || isPaused) return;

      // Prevent moving directly opposite of current direction
      switch (e.key) {
        case "ArrowUp":
          if (direction !== "DOWN") setDirection("UP");
          break;
        case "ArrowDown":
          if (direction !== "UP") setDirection("DOWN");
          break;
        case "ArrowLeft":
          if (direction !== "RIGHT") setDirection("LEFT");
          break;
        case "ArrowRight":
          if (direction !== "LEFT") setDirection("RIGHT");
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    };
  }, [isPlaying, isPaused, direction]);

  // Game loop
  useEffect(() => {
    if (!isPlaying || isPaused || gameOver) return;

    const gameLoop = () => {
      setSnake(prevSnake => {
        // Calculate new head position
        const head = { ...prevSnake[0] };
        
        switch (direction) {
          case "UP":
            head.y = (head.y - 1 + GRID_SIZE) % GRID_SIZE;
            break;
          case "DOWN":
            head.y = (head.y + 1) % GRID_SIZE;
            break;
          case "LEFT":
            head.x = (head.x - 1 + GRID_SIZE) % GRID_SIZE;
            break;
          case "RIGHT":
            head.x = (head.x + 1) % GRID_SIZE;
            break;
        }

        // Check for collisions with self
        const selfCollision = prevSnake.some(
          (segment, index) => index > 0 && segment.x === head.x && segment.y === head.y
        );

        if (selfCollision) {
          setGameOver(true);
          if (gameLoopRef.current) clearInterval(gameLoopRef.current);
          toast({
            title: "Game Over!",
            description: `Your score: ${score}. You collided with yourself!`
          });
          return prevSnake;
        }
        
        // Check if food eaten
        let newSnake;
        if (head.x === food.x && head.y === food.y) {
          // Add head to snake but don't remove tail (grow by 1)
          newSnake = [head, ...prevSnake];
          setScore(prev => prev + 10);
          placeFood();
          
          if (score > 0 && score % 50 === 0) {
            toast({
              title: "Level Up!",
              description: `Score: ${score + 10}`
            });
          }
        } else {
          // Add head and remove tail
          newSnake = [head, ...prevSnake.slice(0, -1)];
        }
        
        return newSnake;
      });
    };

    gameLoopRef.current = setInterval(gameLoop, GAME_SPEED);

    return () => {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    };
  }, [isPlaying, isPaused, gameOver, direction, food, score]);

  const startGame = () => {
    setIsPlaying(true);
    setIsPaused(false);
    setGameOver(false);
    setScore(0);
    setSnake([{ x: 10, y: 10 }]);
    setDirection("RIGHT");
    placeFood();
    toast({
      title: "Game Started!",
      description: "Use arrow keys to control the snake."
    });
  };

  const togglePause = () => {
    setIsPaused(prev => !prev);
    if (isPaused) {
      toast({
        title: "Game Resumed",
        description: "Keep going!"
      });
    } else {
      toast({
        title: "Game Paused",
        description: "Take a break"
      });
    }
  };

  const handleDirectionClick = (newDirection: Direction) => {
    if (!isPlaying || isPaused || gameOver) return;

    // Prevent moving directly opposite of current direction
    if (
      (newDirection === "UP" && direction !== "DOWN") ||
      (newDirection === "DOWN" && direction !== "UP") ||
      (newDirection === "LEFT" && direction !== "RIGHT") ||
      (newDirection === "RIGHT" && direction !== "LEFT")
    ) {
      setDirection(newDirection);
    }
  };

  // Calculate cell size based on container width
  const getCellSize = () => {
    if (!containerRef.current) return 0;
    return containerRef.current.clientWidth / GRID_SIZE;
  };

  return (
    <div className="glass-card p-4 rounded-lg">
      <div className="mb-4 text-center">
        <h3 className="text-lg font-semibold mb-2">Snake Game</h3>
        <p className="text-sm text-muted-foreground mb-2">
          Tired of scrolling? Enjoy a classic Snake game! Use arrow keys to control the snake.
        </p>
      </div>

      <div className="flex justify-between mb-4">
        <div className="flex items-center gap-2">
          <Circle className="w-4 h-4 text-primary" />
          <span>Score: {score}</span>
        </div>
        
        <div className="flex justify-between mb-4">
          {!isPlaying || gameOver ? (
            <Button 
              variant="default" 
              size="sm" 
              onClick={startGame}
              className="flex items-center gap-1"
            >
              {gameOver ? "Play Again" : "Start Game"}
            </Button>
          ) : (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={togglePause}
              className="flex items-center gap-1"
            >
              {isPaused ? "Resume" : "Pause"}
            </Button>
          )}
        </div>
      </div>

      {/* Game board */}
      <div 
        ref={containerRef}
        className="w-full aspect-square bg-black/70 backdrop-blur-md rounded-md overflow-hidden relative"
      >
        {/* Render food */}
        <div 
          className="absolute bg-red-500 rounded-full"
          style={{ 
            left: `${(food.x / GRID_SIZE) * 100}%`, 
            top: `${(food.y / GRID_SIZE) * 100}%`,
            width: `${100 / GRID_SIZE}%`,
            height: `${100 / GRID_SIZE}%`,
          }}
        />

        {/* Render snake */}
        {snake.map((segment, index) => (
          <div 
            key={index} 
            className={`absolute ${index === 0 ? 'bg-primary' : 'bg-primary/80'} rounded-sm`}
            style={{ 
              left: `${(segment.x / GRID_SIZE) * 100}%`, 
              top: `${(segment.y / GRID_SIZE) * 100}%`,
              width: `${100 / GRID_SIZE}%`,
              height: `${100 / GRID_SIZE}%`,
            }}
          />
        ))}

        {!isPlaying && !gameOver && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white">
            Click "Start Game" to begin
          </div>
        )}

        {isPaused && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white">
            Game Paused
          </div>
        )}

        {gameOver && (
          <div className="absolute inset-0 flex items-center justify-center flex-col bg-black/50 text-white">
            <p className="mb-2">Game Over!</p>
            <p>Score: {score}</p>
          </div>
        )}
      </div>

      {/* Mobile controls */}
      <div className="mt-4 grid grid-cols-3 gap-2">
        <div className="col-start-2">
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => handleDirectionClick("UP")}
            disabled={!isPlaying || isPaused || gameOver}
            className="w-full"
          >
            <ArrowUp className="w-4 h-4" />
          </Button>
        </div>
        <div className="col-start-1 col-end-4 grid grid-cols-3 gap-2">
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => handleDirectionClick("LEFT")}
            disabled={!isPlaying || isPaused || gameOver}
            className="w-full"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => handleDirectionClick("DOWN")}
            disabled={!isPlaying || isPaused || gameOver}
            className="w-full"
          >
            <ArrowDown className="w-4 h-4" />
          </Button>
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => handleDirectionClick("RIGHT")}
            disabled={!isPlaying || isPaused || gameOver}
            className="w-full"
          >
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="mt-2 text-xs text-muted-foreground text-center">
        Use arrow keys on keyboard or buttons above on touch devices
      </div>
    </div>
  );
};

export default RelaxingGame;
