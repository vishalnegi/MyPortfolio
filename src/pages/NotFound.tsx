
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="glass-card p-8 rounded-xl shadow-lg max-w-md w-full text-center animate-fade-in">
        <Terminal className="w-16 h-16 text-primary mx-auto mb-4" />
        <h1 className="text-4xl font-bold mb-2 font-mono">404</h1>
        <div className="terminal-container mb-6 py-3">
          <p className="flex">
            <span className="terminal-prompt mr-2">visitor@portfolio:~$</span>
            <span className="text-foreground">find {location.pathname}</span>
          </p>
          <p className="text-destructive mt-2">Error: Path not found</p>
        </div>
        <p className="text-muted-foreground mb-6">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Button asChild className="w-full">
          <a href="/">Return to Home</a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
