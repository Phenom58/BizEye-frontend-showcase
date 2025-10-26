import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, User } from "lucide-react";
import bizeyeLogo from "@/assets/bizeye-logo-main.png";
import { DoodleBackground } from "@/components/DoodleBackground";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is already logged in
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate("/dashboard");
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session && event === "SIGNED_IN") {
        navigate("/dashboard");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: name,
            },
            emailRedirectTo: `${window.location.origin}/dashboard`,
          },
        });

        if (error) throw error;

        toast({
          title: "Account created!",
          description: "You can now sign in with your credentials.",
        });
        setIsSignUp(false);
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        toast({
          title: "Welcome back!",
          description: "You've successfully signed in.",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/10 flex items-center justify-center relative overflow-hidden">
      <DoodleBackground />
      
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(6,182,212,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(14,165,233,0.1),transparent_50%)]" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-md mx-auto"
        >
          {/* Logo */}
          <Link to="/" className="flex items-center justify-center gap-3 mb-8">
            <img src={bizeyeLogo} alt="BizEye Logo" className="w-16 h-16 rounded-lg bg-background/50 p-2 backdrop-blur-sm" />
            <span className="text-3xl font-bold text-gradient">BizEye</span>
          </Link>

          {/* Auth Card */}
          <div className="bg-card/80 backdrop-blur-lg rounded-2xl p-8 card-shadow border border-border/50">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {isSignUp ? "Create Account" : "Welcome Back"}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                {isSignUp && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground/80 flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Full Name
                    </label>
                    <Input
                      type="text"
                      placeholder="Enter your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="bg-background/50 border-border/50 focus:border-primary transition-all"
                      required={isSignUp}
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground/80 flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email
                  </label>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-background/50 border-border/50 focus:border-primary transition-all"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground/80 flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    Password
                  </label>
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-background/50 border-border/50 focus:border-primary transition-all"
                    required
                  />
                </div>

                {!isSignUp && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="remember"
                        checked={rememberMe}
                        onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                      />
                      <label
                        htmlFor="remember"
                        className="text-sm text-foreground/60 cursor-pointer"
                      >
                        Remember me
                      </label>
                    </div>
                    <button
                      type="button"
                      className="text-sm text-primary hover:text-primary/80 transition-colors"
                    >
                      Forgot password?
                    </button>
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 glow-effect h-12 text-base font-semibold"
                  disabled={loading}
                >
                  {loading ? "Please wait..." : isSignUp ? "Create Account" : "Sign In"}
                </Button>
              </form>

              <div className="text-center mt-6">
                <button
                  type="button"
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="text-sm text-foreground/60"
                >
                  {isSignUp ? "Already have an account? " : "Don't have an account? "}
                  <span className="text-primary hover:text-primary/80 font-semibold transition-colors">
                    {isSignUp ? "Sign In" : "Sign Up"}
                  </span>
                </button>
              </div>
            </motion.div>
          </div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-center mt-8 text-sm text-foreground/40"
          >
            © 2025 BizEye. All rights reserved.
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Auth;
