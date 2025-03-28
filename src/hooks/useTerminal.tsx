import { useState, useCallback, useEffect } from "react";

type CommandType = {
  command: string;
  description: string;
  action: (args?: string[]) => string | JSX.Element;
};

export type TerminalHistoryItem = {
  input?: string;
  output: string | JSX.Element;
};

export const useTerminal = (scrollToRef?: React.RefObject<HTMLDivElement>) => {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<TerminalHistoryItem[]>([
    { output: "Welcome to Vishal Negi's portfolio terminal! Type 'help' to see available commands." }
  ]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  // Define available commands
  const commands: CommandType[] = [
    {
      command: "help",
      description: "Display available commands",
      action: () => {
        return (
          <div className="mt-2">
            <p className="text-primary font-semibold mb-1">Available commands:</p>
            <ul className="pl-4 space-y-1">
              {commands.map((cmd) => (
                <li key={cmd.command}>
                  <span className="text-accent font-semibold">{cmd.command}</span> - {cmd.description}
                </li>
              ))}
            </ul>
          </div>
        );
      },
    },
    {
      command: "about",
      description: "Learn about Vishal Negi",
      action: () => {
        return (
          <div className="mt-2 space-y-2">
            <p>
              Full Stack Developer with 6+ years of experience in designing, developing, and deploying 
              high-performance web applications.
            </p>
            <p>
              Expertise in building scalable, cloud-based solutions using modern frameworks and 
              microservices architecture.
            </p>
            <p>
              Passionate about clean architecture, performance optimization, and scalable systems.
            </p>
          </div>
        );
      },
    },
    {
      command: "skills",
      description: "View technical skills",
      action: () => {
        return (
          <div className="mt-2 space-y-2">
            <p className="text-primary font-semibold">Languages:</p>
            <p>C#, JavaScript, TypeScript</p>
            
            <p className="text-primary font-semibold">Frontend:</p>
            <p>React, Angular, Vite, Webpack, Rollup, Ant Design, Material UI, Bootstrap, Tailwind CSS</p>
            
            <p className="text-primary font-semibold">Backend:</p>
            <p>.NET Core, Node.js, RESTful APIs, Microservices</p>
            
            <p className="text-primary font-semibold">Cloud & DevOps:</p>
            <p>Microsoft Azure, AWS, Docker, Kubernetes, Azure DevOps, Redis, Message Queue</p>
            
            <p className="text-primary font-semibold">Databases:</p>
            <p>SQL Server, MongoDB, Cosmos DB</p>
          </div>
        );
      },
    },
    {
      command: "experience",
      description: "View work experience",
      action: () => {
        return (
          <div className="mt-2 space-y-3">
            <div>
              <p className="text-primary font-semibold">Swiss Re - DMP | Sep 2023 - Present</p>
              <ul className="pl-4 list-disc space-y-1 mt-1">
                <li>Developed a cloud-based insurance booking application using C#, .NET Core, and Azure services.</li>
                <li>Built RESTful microservices leveraging Azure Service Bus, App Config, and Cosmos DB.</li>
                <li>Led frontend development with React and Vite, establishing a micro frontend architecture.</li>
              </ul>
            </div>
            <div>
              <p className="text-primary font-semibold">Amazon Prime Video - Network Edge | Jan 2023 - Jun 2023</p>
              <ul className="pl-4 list-disc space-y-1 mt-1">
                <li>Contributed to the Network Edge Gateway using Java and TypeScript.</li>
                <li>Improved service health monitoring with CloudWatch alarms and dashboards.</li>
                <li>Enhanced security using AWS Secrets Manager.</li>
              </ul>
            </div>
            <div>
              <p className="text-primary font-semibold">Infosys | Jan 2019 - Dec 2022</p>
              <ul className="pl-4 list-disc space-y-1 mt-1">
                <li>Built a Salesforce-SendGrid API integration for automated consultation tracking.</li>
                <li>Developed a React-based micro frontend portal for ship management.</li>
                <li>Designed AWS-based microservices using Serverless Framework and Node.js Lambda functions.</li>
              </ul>
            </div>
          </div>
        );
      },
    },
    {
      command: "projects",
      description: "View highlighted projects",
      action: () => {
        return (
          <div className="mt-2 space-y-3">
            <div>
              <p className="text-primary font-semibold">Insurance Booking Platform</p>
              <p>Cloud-based application for marine cargo and parametric earthquake insurance.</p>
              <p className="text-muted-foreground text-sm">Tech: C#, .NET Core, Azure, React, Vite, Ant Design</p>
            </div>
            <div>
              <p className="text-primary font-semibold">Network Edge Gateway</p>
              <p>System managing authentication, request transformation, routing, and throttling.</p>
              <p className="text-muted-foreground text-sm">Tech: Java, TypeScript, AWS CloudWatch</p>
            </div>
            <div>
              <p className="text-primary font-semibold">Ship Management Portal</p>
              <p>Micro frontend portal integrating vessel tracking, insurance, and crew management.</p>
              <p className="text-muted-foreground text-sm">Tech: React, AWS, Serverless Framework, Node.js</p>
            </div>
          </div>
        );
      },
    },
    {
      command: "contact",
      description: "View contact information",
      action: () => {
        return (
          <div className="mt-2 space-y-2">
            <p>
              <span className="text-primary font-semibold">Email:</span> vishalnegi375@gmail.com
            </p>
            <p>
              <span className="text-primary font-semibold">Phone:</span> +44 7423714243 | +91 9555121068
            </p>
            <p>
              <span className="text-primary font-semibold">LinkedIn:</span>{" "}
              <a
                href="https://www.linkedin.com/in/vishal-negi/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent underline hover:text-accent/80"
              >
                vishal-negi
              </a>
            </p>
          </div>
        );
      },
    },
    {
      command: "clear",
      description: "Clear terminal history",
      action: () => {
        setTimeout(() => {
          setHistory([]);
        }, 100);
        return "";
      },
    },
  ];

  const processCommand = useCallback((cmd: string) => {
    const trimmedCmd = cmd.trim();
    if (!trimmedCmd) return;

    // Add command to history
    setCommandHistory(prev => [trimmedCmd, ...prev]);
    setHistoryIndex(-1);

    // Parse command and arguments
    const parts = trimmedCmd.split(" ");
    const commandName = parts[0].toLowerCase();
    const args = parts.slice(1);

    // Find command
    const command = commands.find(c => c.command === commandName);

    // Update terminal history
    setHistory(prev => [
      ...prev,
      { input: trimmedCmd, output: command ? command.action(args) : `Command not found: ${commandName}. Type 'help' for available commands.` }
    ]);

    // Scroll to bottom after update
    setTimeout(() => {
      if (scrollToRef?.current) {
        scrollToRef.current.scrollTop = scrollToRef.current.scrollHeight;
      }
    }, 100);
  }, [commands, scrollToRef]);

  const handleSubmit = useCallback((e?: React.FormEvent) => {
    if (e) e.preventDefault();
    processCommand(input);
    setInput("");
  }, [input, processCommand]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0 && historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput("");
      }
    }
  }, [commandHistory, historyIndex]);

  return {
    input,
    setInput,
    history,
    handleSubmit,
    handleKeyDown,
    processCommand
  };
};
