
import React, { useState } from "react";
import { Mail, Linkedin, Phone, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import RelaxingGame from "./RelaxingGame";
import { useToast } from "@/hooks/use-toast";

const Contact: React.FC = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message sent",
        description: "Thank you for your message. I'll get back to you soon!",
      });
      setFormData({ name: "", email: "", message: "" });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <section id="contact" className="section-container">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6 flex items-center">
          <span className="inline-block mr-3 text-primary">
            <Mail className="w-6 h-6" />
          </span>
          <h2 className="section-title">Contact Me</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="glass-card p-6 rounded-xl animate-slide-right">
            <h3 className="text-xl font-semibold mb-6 font-mono">Get In Touch</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full p-3 bg-muted/20 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="Your name"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full p-3 bg-muted/20 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="Your email"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full p-3 bg-muted/20 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                  placeholder="Your message"
                ></textarea>
              </div>
              
              <Button 
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 flex items-center justify-center gap-2"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </div>

          <div className="space-y-8 animate-slide-left">
            <div className="glass-card p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-6 font-mono">Contact Information</h3>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="p-2 rounded-md bg-primary/10 text-primary mr-4">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Email</p>
                    <a 
                      href="mailto:vishalnegi375@gmail.com" 
                      className="text-foreground hover:text-primary transition-colors"
                    >
                      vishalnegi375@gmail.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="p-2 rounded-md bg-primary/10 text-primary mr-4">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Phone</p>
                    <p>+44 7423714243</p>
                    <p>+91 9555121068</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="p-2 rounded-md bg-primary/10 text-primary mr-4">
                    <Linkedin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">LinkedIn</p>
                    <a 
                      href="https://www.linkedin.com/in/vishal-negi/" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground hover:text-primary transition-colors"
                    >
                      linkedin.com/in/vishal-negi
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <RelaxingGame />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
