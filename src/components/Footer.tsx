import { motion } from "framer-motion";
import bizeyeLogo from "@/assets/bizeye-logo-main.jpg";

export const Footer = () => {
  const links = {
    Product: ["Features", "Analytics", "Integrations", "Pricing"],
    Company: ["About", "Blog", "Careers", "Contact"],
    Resources: ["Documentation", "Help Center", "API", "Community"],
    Legal: ["Privacy", "Terms", "Security", "Compliance"],
  };

  return (
    <footer className="border-t border-border bg-card/50 backdrop-blur-sm">
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-5 gap-8 mb-12">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <img src={bizeyeLogo} alt="BizEye Logo" className="w-12 h-12 rounded-lg bg-background/30 p-1" />
              <span className="text-xl font-bold text-gradient">BizEye</span>
            </div>
            <p className="text-sm text-muted-foreground">
              AI-powered business intelligence for modern SMEs
            </p>
          </div>
          
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <h4 className="font-semibold mb-4 text-foreground">{category}</h4>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2025 BizEye. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                Twitter
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                LinkedIn
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
