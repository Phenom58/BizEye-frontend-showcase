import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import bizeyeLogo from "@/assets/bizeye-logo-main.png";

export const Navbar = () => {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/60 backdrop-blur-lg border-b border-border/50"
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img src={bizeyeLogo} alt="BizEye Logo" className="w-12 h-12 rounded-lg bg-background/50 p-1 backdrop-blur-sm" />
            <span className="text-2xl font-bold text-gradient">BizEye</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-foreground hover:text-primary transition-colors">
              Features
            </a>
            <a href="#capabilities" className="text-foreground hover:text-primary transition-colors">
              Capabilities
            </a>
            <a href="#analytics" className="text-foreground hover:text-primary transition-colors">
              Analytics
            </a>
            <Link to="/auth">
              <Button variant="default" className="bg-primary hover:bg-primary/90 glow-effect">
                Get Started
              </Button>
            </Link>
          </div>
          
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="w-6 h-6" />
          </Button>
        </div>
      </div>
    </motion.nav>
  );
};
