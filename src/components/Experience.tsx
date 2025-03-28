
import React from "react";
import { Briefcase, Calendar } from "lucide-react";

interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  description: string[];
  technologies: string[];
}

const Experience: React.FC = () => {
  const experiences: ExperienceItem[] = [
    {
      company: "Swiss Re - DMP",
      role: "Full Stack Developer",
      period: "Sep 2023 - Present",
      description: [
        "Developed a cloud-based insurance booking application for marine cargo and parametric earthquake insurance using C#, .NET Core, and Azure services.",
        "Built RESTful microservices leveraging Azure Service Bus, App Config, Key Vault, Cosmos DB, and Application Insights for monitoring.",
        "Led frontend development with React and Vite, integrating Ant Design and establishing a micro frontend architecture.",
        "Designed data pipelines using Azure Data Factory, optimizing data processing efficiency."
      ],
      technologies: ["C#", ".NET Core", "Azure", "React", "Vite", "Ant Design", "Cosmos DB", "Azure Service Bus"]
    },
    {
      company: "Amazon Prime Video - Network Edge",
      role: "Software Development Engineer",
      period: "Jan 2023 - Jun 2023",
      description: [
        "Contributed to the Network Edge Gateway managing authentication, request transformation, routing, and throttling using Java and TypeScript.",
        "Improved service health monitoring with CloudWatch alarms and dashboards.",
        "Developed a shadowing test mechanism to validate changes against live traffic, reducing deployment risks.",
        "Enhanced security by securing service connections over public internet using AWS Secrets Manager."
      ],
      technologies: ["Java", "TypeScript", "AWS", "CloudWatch", "AWS Secrets Manager", "CI/CD"]
    },
    {
      company: "Infosys - PwC Risk Compliance and Controls",
      role: "Full Stack Developer",
      period: "Jan 2021 - Dec 2022",
      description: [
        "Built a Salesforce-SendGrid API integration for automated consultation tracking, improving transparency in reporting and approvals.",
        "Developed a Node.js & RabbitMQ-based RESTful service for data processing and visualization with Angular-based dashboards.",
        "Enhanced user interface with responsive design patterns and accessibility improvements."
      ],
      technologies: ["Node.js", "RabbitMQ", "Angular", "Salesforce API", "SendGrid API", "RESTful services"]
    },
    {
      company: "Infosys - Fleet Management Limited (FML)",
      role: "Frontend Developer",
      period: "Jul 2019 - Dec 2020",
      description: [
        "Engineered a React-based micro frontend portal for ship management, integrating vessel tracking, insurance, training, and crew management.",
        "Designed AWS-based microservices using Serverless Framework, API Gateway, SQS, SNS, and Node.js Lambda functions.",
        "Wrote test scripts using Jest, React Testing Library, and Postman, improving application reliability."
      ],
      technologies: ["React", "AWS", "Serverless Framework", "Lambda", "SQS", "SNS", "Jest", "React Testing Library"]
    },
    {
      company: "Infosys - Income Tax Department",
      role: "UI Developer",
      period: "Jan 2019 - Jun 2019",
      description: [
        "Developed UI components for a taxpayer system handling millions of IT returns, using Angular, Material UI, and i18n for localization.",
        "Enhanced accessibility, theming, and reusable UI components, boosting system usability.",
        "Implemented responsive design patterns for optimal viewing across devices."
      ],
      technologies: ["Angular", "Material UI", "i18n", "RxJS", "TypeScript", "Responsive Design"]
    }
  ];

  return (
    <section id="experience" className="section-container bg-muted/5">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 flex items-center">
          <span className="inline-block mr-3 text-primary">
            <Briefcase className="w-6 h-6" />
          </span>
          <h2 className="section-title">Work Experience</h2>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-[2px] bg-border"></div>

          {experiences.map((exp, index) => (
            <div 
              key={`${exp.company}-${exp.period}`}
              className={`relative mb-12 md:mb-0 animate-fade-in`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className={`md:flex items-stretch ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                {/* Timeline dot */}
                <div className="hidden md:block absolute top-6 left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-primary z-10 animate-glow-pulse"></div>
                
                {/* Content */}
                <div className="md:w-1/2 p-1">
                  <div className={`glass-card p-6 rounded-xl ${index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'}`}>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xl font-semibold font-mono text-primary">{exp.company}</h3>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span>{exp.period}</span>
                      </div>
                    </div>
                    
                    <h4 className="text-lg font-medium mb-3">{exp.role}</h4>
                    
                    <ul className="mb-4 space-y-2">
                      {exp.description.map((item, i) => (
                        <li key={i} className="flex">
                          <span className="mr-2 text-primary">❯</span>
                          <span className="text-muted-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech) => (
                        <span 
                          key={tech} 
                          className="px-2 py-1 rounded-md text-xs font-medium bg-muted/20 text-muted-foreground"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Spacer for alternating layout */}
                <div className="hidden md:block md:w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
