
import React, { useState, useEffect, useRef } from "react";
import Terminal from "./Terminal";
import { ArrowDown, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero: React.FC = () => {
  const [typedText, setTypedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const fullText = "Full Stack Developer";
  const typingSpeed = 100;
  const cursorRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let currentIndex = 0;
    let typingTimer: ReturnType<typeof setTimeout>;

    const typeText = () => {
      if (currentIndex < fullText.length) {
        setTypedText(fullText.substring(0, currentIndex + 1));
        currentIndex++;
        typingTimer = setTimeout(typeText, typingSpeed);
      } else {
        // Blink cursor after typing is complete
        const blinkCursor = () => {
          setShowCursor((prev) => !prev);
        };
        const blinkInterval = setInterval(blinkCursor, 500);
        return () => clearInterval(blinkInterval);
      }
    };

    typingTimer = setTimeout(typeText, typingSpeed);

    return () => clearTimeout(typingTimer);
  }, []);

  const scrollToNextSection = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center px-4 pt-16">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-terminal-dark via-background to-background opacity-80"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(74,246,38,0.15)_0,transparent_60%)]"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 animate-slide-down">
          <span className="text-glow">Vishal Negi</span>
        </h1>
        
        <h2 className="text-2xl md:text-3xl font-mono font-semibold mb-10 animate-slide-up">
          <span className="text-primary">&gt;</span> {typedText}
          <span 
            ref={cursorRef}
            className={`inline-block w-[3px] h-[1.2em] bg-primary align-middle ml-1 ${showCursor ? 'opacity-100' : 'opacity-0'}`}
          ></span>
        </h2>

        <div className="flex flex-col md:flex-row justify-center gap-6 md:gap-10 mb-12 animate-slide-up" style={{ animationDelay: "0.2s" }}>
          <a 
            href="#projects" 
            className="group inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all hover:translate-y-[-2px] hover:shadow-lg"
          >
            <span>View Projects</span>
            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
          
          <a 
            href="#contact" 
            className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-muted text-foreground font-semibold hover:bg-muted/80 transition-all hover:translate-y-[-2px] hover:shadow-lg border border-border"
          >
            <span>Contact Me</span>
          </a>
        </div>

        <div className="max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "0.3s" }}>
          <Terminal className="shadow-xl" autoFocus={false} />
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce-light">
        <Button
          variant="ghost"
          size="icon"
          onClick={scrollToNextSection}
          className="rounded-full w-12 h-12 border border-border hover:bg-muted/20"
          aria-label="Scroll down"
        >
          <ArrowDown className="w-5 h-5" />
        </Button>
      </div>
    </section>
  );
};

export default Hero;
