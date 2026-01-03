import { motion } from "framer-motion";
import { Shield, Home } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center relative z-10"
      >
        <div className="flex justify-center mb-8">
          <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-500 via-blue-500 to-cyan-500">
            <Shield className="h-16 w-16 text-white" />
          </div>
        </div>

        <h1 className="text-6xl md:text-8xl font-bold cyber-gradient-text mb-4">404</h1>
        <p className="text-xl text-muted-foreground mb-8">
          This page has been classified or doesn't exist.
        </p>

        <Button asChild size="lg">
          <Link to="/">
            <Home className="h-4 w-4" />
            Return to Command Center
          </Link>
        </Button>
      </motion.div>
    </div>
  );
};

export default NotFound;
