
import React, { useState, useEffect } from "react";
import ThemeToggle from "./ThemeToggle";
import { Menu, X, Terminal, Code, Laptop, Github, Linkedin, Mail } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme } = useTheme();

  const navItems: NavItem[] = [
    { label: "About", href: "#about", icon: <Terminal className="w-4 h-4" /> },
    { label: "Skills", href: "#skills", icon: <Code className="w-4 h-4" /> },
    { label: "Projects", href: "#projects", icon: <Laptop className="w-4 h-4" /> },
    { label: "Experience", href: "#experience", icon: <Laptop className="w-4 h-4" /> },
    { label: "Contact", href: "#contact", icon: <Mail className="w-4 h-4" /> },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-card/80 backdrop-blur-lg shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <a 
            href="#" 
            className="flex items-center space-x-2 text-foreground font-bold text-xl"
          >
            <span className="font-mono text-glow text-primary">&gt;_</span>
            <span className="font-mono">vishal.negi</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex md:items-center md:space-x-6">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-muted-foreground hover:text-foreground transition-colors flex items-center space-x-1 px-2 py-1 rounded-md hover:bg-muted/20"
                onClick={closeMenu}
              >
                {item.icon}
                <span>{item.label}</span>
              </a>
            ))}
            <div className="border-l border-border h-6 mx-2"></div>
            <div className="flex items-center space-x-3">
              <a
                href="https://github.com/vishal-negi"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/vishal-negi/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <ThemeToggle />
            </div>
          </nav>

          {/* Mobile Navigation Toggle */}
          <div className="flex items-center space-x-3 md:hidden">
            <ThemeToggle />
            <button
              onClick={toggleMenu}
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="px-4 py-2 space-y-1 bg-card/90 backdrop-blur-lg shadow-lg">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="block py-3 px-4 text-muted-foreground hover:text-foreground hover:bg-muted/20 rounded-md transition-all flex items-center space-x-2"
              onClick={closeMenu}
            >
              {item.icon}
              <span>{item.label}</span>
            </a>
          ))}
          <div className="flex space-x-4 py-3 px-4">
            <a
              href="https://github.com/vishal-negi"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/vishal-negi/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
