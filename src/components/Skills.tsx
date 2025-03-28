
import React from "react";
import { Code, Server, Database, Cloud, Layout, Terminal } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

interface SkillCategory {
  category: string;
  icon: React.ReactNode;
  skills: { name: string; level: number }[];
}

const Skills: React.FC = () => {
  const { theme } = useTheme();
  
  const skillCategories: SkillCategory[] = [
    {
      category: "Languages",
      icon: <Code className="w-6 h-6" />,
      skills: [
        { name: "C#", level: 90 },
        { name: "JavaScript", level: 95 },
        { name: "TypeScript", level: 90 },
        { name: "HTML/CSS", level: 85 },
      ],
    },
    {
      category: "Frontend",
      icon: <Layout className="w-6 h-6" />,
      skills: [
        { name: "React", level: 95 },
        { name: "Angular", level: 85 },
        { name: "Vite", level: 80 },
        { name: "Material UI", level: 85 },
        { name: "Tailwind CSS", level: 90 },
      ],
    },
    {
      category: "Backend",
      icon: <Server className="w-6 h-6" />,
      skills: [
        { name: ".NET Core", level: 90 },
        { name: "Node.js", level: 85 },
        { name: "RESTful APIs", level: 95 },
        { name: "Microservices", level: 90 },
      ],
    },
    {
      category: "Cloud & DevOps",
      icon: <Cloud className="w-6 h-6" />,
      skills: [
        { name: "Microsoft Azure", level: 85 },
        { name: "AWS", level: 80 },
        { name: "Docker", level: 75 },
        { name: "Kubernetes", level: 70 },
        { name: "Azure DevOps", level: 85 },
      ],
    },
    {
      category: "Databases",
      icon: <Database className="w-6 h-6" />,
      skills: [
        { name: "SQL Server", level: 90 },
        { name: "MongoDB", level: 80 },
        { name: "Cosmos DB", level: 85 },
      ],
    },
    {
      category: "Tools & Workflow",
      icon: <Terminal className="w-6 h-6" />,
      skills: [
        { name: "Git", level: 95 },
        { name: "Agile", level: 90 },
        { name: "Jira", level: 85 },
        { name: "CI/CD", level: 80 },
      ],
    },
  ];

  return (
    <section id="skills" className="section-container bg-muted/5">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 flex items-center">
          <span className="inline-block mr-3 text-primary">
            <Code className="w-6 h-6" />
          </span>
          <h2 className="section-title">Technical Skills</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillCategories.map((category, index) => (
            <div 
              key={category.category} 
              className="glass-card p-6 rounded-xl animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center mb-4">
                <span className="p-2 rounded-md bg-primary/10 text-primary mr-3">{category.icon}</span>
                <h3 className="text-xl font-semibold font-mono">{category.category}</h3>
              </div>
              <div className="space-y-4">
                {category.skills.map((skill) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{skill.name}</span>
                      <span className="text-sm text-muted-foreground">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-muted/30 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary rounded-full transition-all duration-1000 animate-slide-right"
                        style={{ 
                          width: `${skill.level}%`,
                          boxShadow: theme === 'dark' ? '0 0 8px rgba(74, 246, 38, 0.5)' : 'none'
                        }} 
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
