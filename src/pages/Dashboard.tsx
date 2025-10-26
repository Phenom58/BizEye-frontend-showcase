import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { User } from "@supabase/supabase-js";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check authentication
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser(session.user);
      } else {
        navigate("/auth");
      }
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT") {
        navigate("/auth");
      } else if (session?.user) {
        setUser(session.user);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Error signing out",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Signed out successfully",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-foreground/60">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/10">
      <div className="container mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gradient">Dashboard</h1>
            <p className="text-foreground/60 mt-2">Welcome back, {user?.user_metadata?.full_name || user?.email}!</p>
          </div>
          <Button onClick={handleSignOut} variant="outline">
            Sign Out
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="bg-card/80 backdrop-blur-lg rounded-2xl p-6 card-shadow border border-border/50">
            <h3 className="text-xl font-semibold mb-2">Your Profile</h3>
            <p className="text-foreground/60">Email: {user?.email}</p>
          </div>

          <div className="bg-card/80 backdrop-blur-lg rounded-2xl p-6 card-shadow border border-border/50">
            <h3 className="text-xl font-semibold mb-2">Analytics</h3>
            <p className="text-foreground/60">View your business analytics here</p>
          </div>

          <div className="bg-card/80 backdrop-blur-lg rounded-2xl p-6 card-shadow border border-border/50">
            <h3 className="text-xl font-semibold mb-2">Settings</h3>
            <p className="text-foreground/60">Manage your account settings</p>
          </div>
        </div>

        <div className="mt-8 bg-card/80 backdrop-blur-lg rounded-2xl p-8 card-shadow border border-border/50">
          <h2 className="text-2xl font-bold mb-4">Getting Started</h2>
          <p className="text-foreground/60 mb-4">
            This is your dashboard placeholder. You can now replace this with your actual dashboard from the zip file.
          </p>
          <p className="text-foreground/60">
            The authentication is fully functional - users will be redirected here after signing in.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
