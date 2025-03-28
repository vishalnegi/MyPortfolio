
import React, { useRef, useEffect } from "react";
import { useTerminal, TerminalHistoryItem } from "@/hooks/useTerminal";

interface TerminalProps {
  className?: string;
  autoFocus?: boolean;
}

const Terminal: React.FC<TerminalProps> = ({ className = "", autoFocus = false }) => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { input, setInput, history, handleSubmit, handleKeyDown } = useTerminal(terminalRef);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div 
      className={`terminal-container scrollbar-thin overflow-y-auto max-h-[500px] ${className}`} 
      onClick={focusInput}
      ref={terminalRef}
    >
      <div className="terminal-header">
        <div className="terminal-dot bg-red-500"></div>
        <div className="terminal-dot bg-yellow-500"></div>
        <div className="terminal-dot bg-green-500"></div>
        <div className="flex-1 text-center text-sm text-muted-foreground">bash ~ portfolio</div>
      </div>

      <div className="space-y-2">
        {history.map((item, index) => (
          <div key={index} className="space-y-1">
            {item.input && (
              <div className="flex">
                <span className="terminal-prompt mr-2">visitor@portfolio:~$</span>
                <span>{item.input}</span>
              </div>
            )}
            <div className={`${item.input ? 'pl-5' : ''}`}>
              {typeof item.output === 'string' ? (
                <p>{item.output}</p>
              ) : (
                item.output
              )}
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="mt-4 flex">
        <span className="terminal-prompt mr-2">visitor@portfolio:~$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="command-line-input"
          aria-label="Terminal input"
          spellCheck="false"
          autoCapitalize="off"
          autoComplete="off"
          autoCorrect="off"
        />
      </form>
    </div>
  );
};

export default Terminal;
