
import React from "react";
import { Terminal as TerminalIcon, Code, GitBranch, Cpu } from "lucide-react";

const About: React.FC = () => {
  return (
    <section id="about" className="section-container">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 flex items-center">
          <span className="inline-block mr-3 text-primary">
            <TerminalIcon className="w-6 h-6" />
          </span>
          <h2 className="section-title">About Me</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 animate-slide-right">
            <div className="glass-card p-6 rounded-xl h-full">
              <p className="mb-4 text-lg leading-relaxed">
                Results-driven <span className="text-primary font-semibold">Full Stack Developer</span> with 6+ years of experience 
                in designing, developing, and deploying high-performance web applications.
              </p>
              <p className="mb-4 leading-relaxed">
                My expertise lies in building scalable, cloud-based solutions using modern frameworks and 
                microservices architecture. I have a strong ability to drive projects from concept to deployment, 
                improving efficiency and security.
              </p>
              <p className="leading-relaxed">
                I'm passionate about clean architecture, performance optimization, and creating 
                scalable systems that make a difference. Currently working at Swiss Re on a cloud-based 
                insurance booking application, leveraging the latest technologies to deliver robust solutions.
              </p>
            </div>
          </div>

          <div className="animate-slide-left">
            <div className="glass-card p-6 rounded-xl h-full">
              <h3 className="text-xl font-semibold mb-4 font-mono flex items-center">
                <Code className="w-5 h-5 mr-2 text-primary" />
                <span>Tech Journey</span>
              </h3>
              <ul className="space-y-4">
                <li className="flex">
                  <span className="mr-2 text-primary">❯</span>
                  <span>Started with backend development in C# and .NET Core</span>
                </li>
                <li className="flex">
                  <span className="mr-2 text-primary">❯</span>
                  <span>Expanded to frontend with React and Angular</span>
                </li>
                <li className="flex">
                  <span className="mr-2 text-primary">❯</span>
                  <span>Embraced cloud with Azure and AWS</span>
                </li>
                <li className="flex">
                  <span className="mr-2 text-primary">❯</span>
                  <span>Specialized in microservices architecture</span>
                </li>
                <li className="flex">
                  <span className="mr-2 text-primary">❯</span>
                  <span>Focused on delivering scalable solutions</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card p-6 rounded-xl flex flex-col items-center text-center transition-transform hover:scale-105 animate-scale-in" style={{ animationDelay: "0.1s" }}>
            <GitBranch className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2 font-mono">Version Control</h3>
            <p>Proficient with Git workflow, branching strategies, and collaborative development.</p>
          </div>

          <div className="glass-card p-6 rounded-xl flex flex-col items-center text-center transition-transform hover:scale-105 animate-scale-in" style={{ animationDelay: "0.2s" }}>
            <Cpu className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2 font-mono">Microservices</h3>
            <p>Experience building distributed systems with microservices architecture.</p>
          </div>

          <div className="glass-card p-6 rounded-xl flex flex-col items-center text-center transition-transform hover:scale-105 animate-scale-in" style={{ animationDelay: "0.3s" }}>
            <Code className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2 font-mono">Clean Code</h3>
            <p>Advocate for clean, maintainable code with thorough documentation.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
