
import React, { useState, useEffect } from "react";

interface ShutdownOverlayProps {
  isActive: boolean;
  onComplete?: () => void;
}

const ShutdownOverlay: React.FC<ShutdownOverlayProps> = ({ 
  isActive, 
  onComplete 
}) => {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    if (!isActive) {
      setProgress(0);
      return;
    }
    
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          onComplete?.();
          return 100;
        }
        return prev + 5;
      });
    }, 150);
    
    return () => clearInterval(interval);
  }, [isActive, onComplete]);
  
  if (!isActive) return null;
  
  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center">
      <div className="text-terminal-green font-mono text-xl mb-8">
        System shutting down...
      </div>
      
      <div className="w-1/2 max-w-md h-2 bg-muted rounded-full overflow-hidden">
        <div 
          className="h-full bg-terminal-green transition-all duration-150 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>
      
      <div className="text-terminal-green font-mono mt-4">
        {Math.round(progress)}% complete
      </div>
      
      {progress >= 100 && (
        <div className="text-terminal-green font-mono mt-8 animate-pulse">
          System powered off
        </div>
      )}
    </div>
  );
};

export default ShutdownOverlay;
