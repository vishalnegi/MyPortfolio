
import React, { useState } from "react";
import { Laptop, ExternalLink, Github, Server, Database, Layout } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

interface Project {
  title: string;
  description: string;
  image: string;
  techStack: string[];
  category: "frontend" | "backend" | "fullstack";
  demoLink?: string;
  codeLink?: string;
}

const Projects: React.FC = () => {
  const { theme } = useTheme();
  const [filter, setFilter] = useState<"all" | "frontend" | "backend" | "fullstack">("all");
  
  const projects: Project[] = [
    {
      title: "Insurance Booking Platform",
      description: "Cloud-based application for marine cargo and parametric earthquake insurance with robust booking and management features.",
      image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=2070&auto=format&fit=crop",
      techStack: ["C#", ".NET Core", "Azure", "React", "Vite", "Ant Design", "Cosmos DB"],
      category: "fullstack",
    },
    {
      title: "Network Edge Gateway",
      description: "System managing authentication, request transformation, routing, and throttling for Amazon Prime Video infrastructure.",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2034&auto=format&fit=crop",
      techStack: ["Java", "TypeScript", "AWS CloudWatch", "Lambda", "API Gateway"],
      category: "backend",
    },
    {
      title: "Ship Management Portal",
      description: "React-based micro frontend portal integrating vessel tracking, insurance, and crew management services.",
      image: "https://images.unsplash.com/photo-1605745341112-85968b19335b?q=80&w=2071&auto=format&fit=crop",
      techStack: ["React", "AWS", "Serverless Framework", "Node.js", "SQS", "SNS"],
      category: "fullstack",
    },
    {
      title: "Taxpayer System UI",
      description: "Angular-based frontend for a taxpayer system handling millions of IT returns, with responsive design and localization.",
      image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2070&auto=format&fit=crop",
      techStack: ["Angular", "Material UI", "i18n", "RxJS", "Chart.js"],
      category: "frontend",
    },
  ];

  const filteredProjects = filter === "all" 
    ? projects 
    : projects.filter(project => project.category === filter);

  const handleFilterChange = (newFilter: "all" | "frontend" | "backend" | "fullstack") => {
    setFilter(newFilter);
  };

  const getCategoryIcon = (category: "frontend" | "backend" | "fullstack") => {
    switch (category) {
      case "frontend":
        return <Layout className="w-4 h-4" />;
      case "backend":
        return <Server className="w-4 h-4" />;
      case "fullstack":
        return <Database className="w-4 h-4" />;
    }
  };

  return (
    <section id="projects" className="section-container">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6 flex items-center">
          <span className="inline-block mr-3 text-primary">
            <Laptop className="w-6 h-6" />
          </span>
          <h2 className="section-title">Projects</h2>
        </div>

        <div className="flex justify-center mb-10">
          <div className="inline-flex rounded-lg border border-border p-1 bg-muted/10">
            <button
              onClick={() => handleFilterChange("all")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                filter === "all"
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted/30"
              }`}
            >
              All
            </button>
            <button
              onClick={() => handleFilterChange("frontend")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                filter === "frontend"
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted/30"
              }`}
            >
              Frontend
            </button>
            <button
              onClick={() => handleFilterChange("backend")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                filter === "backend"
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted/30"
              }`}
            >
              Backend
            </button>
            <button
              onClick={() => handleFilterChange("fullstack")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                filter === "fullstack"
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted/30"
              }`}
            >
              Full Stack
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project, index) => (
            <div 
              key={project.title}
              className="group glass-card rounded-xl overflow-hidden transition-all hover-glow animate-scale-in"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-terminal-dark/90 to-transparent"></div>
                <div className="absolute bottom-4 left-4 flex items-center">
                  <span className="py-1 px-3 rounded-full bg-primary/80 text-primary-foreground text-xs font-semibold flex items-center gap-1">
                    {getCategoryIcon(project.category)}
                    <span className="capitalize">{project.category}</span>
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 font-mono">{project.title}</h3>
                <p className="text-muted-foreground mb-4">{project.description}</p>
                
                <div className="mb-4 flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span 
                      key={tech} 
                      className="px-2 py-1 rounded-md text-xs font-medium bg-muted/20 text-muted-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex justify-between">
                  {project.demoLink && (
                    <a
                      href={project.demoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4 mr-1" />
                      Live Demo
                    </a>
                  )}
                  {project.codeLink && (
                    <a
                      href={project.codeLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                    >
                      <Github className="w-4 h-4 mr-1" />
                      View Code
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
