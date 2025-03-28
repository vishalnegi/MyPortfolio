
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { ThemeProvider } from "./context/ThemeContext";
import ShutdownOverlay from "./components/ShutdownOverlay";
import "./App.css";

function App() {
  const [isShuttingDown, setIsShuttingDown] = useState(false);
  const [isShutDown, setIsShutDown] = useState(false);

  // Add shutdown functionality
  const handleShutdown = () => {
    setIsShuttingDown(true);
  };

  const handleShutdownComplete = () => {
    setIsShutDown(true);
  };

  // Expose shutdown function globally for ease of access
  if (typeof window !== "undefined") {
    (window as any).shutdownApp = handleShutdown;
  }

  if (isShutDown) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center">
        <button 
          onClick={() => {
            setIsShuttingDown(false);
            setIsShutDown(false);
          }}
          className="px-4 py-2 bg-terminal-green text-black rounded font-mono hover:bg-terminal-green/80 transition-colors"
        >
          Power On
        </button>
      </div>
    );
  }

  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index onShutdown={handleShutdown} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <ShutdownOverlay 
        isActive={isShuttingDown} 
        onComplete={handleShutdownComplete} 
      />
    </ThemeProvider>
  );
}

export default App;
