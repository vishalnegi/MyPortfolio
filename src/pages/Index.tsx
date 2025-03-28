
import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { PowerOff } from "lucide-react";

interface IndexProps {
  onShutdown?: () => void;
}

const Index: React.FC<IndexProps> = ({ onShutdown }) => {
  return (
    <div className="min-h-screen relative">
      <Navbar />

      <div className="fixed bottom-4 right-4 z-40">
        <button
          onClick={onShutdown}
          className="bg-destructive p-3 rounded-full shadow-lg hover:bg-destructive/80 transition-colors"
          aria-label="Shutdown application"
          title="Shutdown"
        >
          <PowerOff size={20} />
        </button>
      </div>

      <main className="relative z-10">
        <section id="home">
          <Hero />
        </section>

        <section id="about">
          <About />
        </section>

        <section id="experience">
          <Experience />
        </section>

        <section id="skills">
          <Skills />
        </section>

        <section id="projects">
          <Projects />
        </section>

        <section id="contact">
          <Contact />
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
