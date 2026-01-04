import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, Menu, X, Moon, Sun } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/context/ThemeContext";
import { useAuth } from "@/context/AuthContext";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Analyze", path: "/analyze" },
  { name: "How It Works", path: "/how-it-works" },
  { name: "Track", path: "/track" },
  { name: "Contact", path: "/contact" },
];

export const Navbar = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
      <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 bg-app-background border-b border-app shadow-sm"
    >
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Logo - App ka symbol */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="p-1.5 rounded-lg bg-gradient-to-br from-purple-500 via-blue-500 to-cyan-500">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <span className="text-base font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 dark:from-purple-400 dark:via-blue-400 dark:to-cyan-400 bg-clip-text text-transparent">
              NeuroX
            </span>
          </Link>

          {/* Desktop Navigation - Bade screen ke liye */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                  className={`text-sm font-medium transition-all duration-200 ${
                    location.pathname === link.path
                    ? "text-foreground border-b-2 border-app"
                    : "text-muted-foreground hover:opacity-90"
                  }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Theme Toggle & Mobile Menu - Raat/Din aur chhote screen ka menu */}
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
                className="rounded-lg hover:bg-app-background/50 dark:hover:bg-app-surface/60"
            >
              {theme === "light" ? (
                <Moon className="h-5 w-5 text-gray-700" />
              ) : (
                <Sun className="h-5 w-5 text-yellow-400" />
              )}
            </Button>
            {/* Auth actions */}
            <AuthActions />

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden hover:bg-gray-100 dark:hover:bg-slate-800"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation - Mobile users ke liye navigation */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-3 pb-3 border-t border-app pt-3"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`px-4 py-2 rounded text-sm font-medium transition-all duration-200 ${
                      location.pathname === link.path
                        ? "text-foreground bg-app-background/50"
                        : "text-muted-foreground hover:opacity-90 hover:bg-app-surface/50"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
                {/* Mobile auth links */}
                <MobileAuthActions onClick={() => setIsMobileMenuOpen(false)} />
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

const AuthActions = () => {
  const { user, logout } = useAuth();
  return user ? (
    <div className="hidden md:flex items-center gap-3">
      {user.role === 'admin' && (
        <Link to="/admin" className="text-sm font-medium text-muted-foreground hover:opacity-90">Admin</Link>
      )}
      <Button variant="ghost" size="sm" onClick={logout}>Logout</Button>
    </div>
  ) : (
    <div className="hidden md:flex items-center gap-3">
      <Link to="/login" className="text-sm font-medium text-muted-foreground hover:opacity-90">Login</Link>
      <Link to="/register" className="text-sm font-semibold text-foreground">Sign Up</Link>
    </div>
  );
};

const MobileAuthActions = ({ onClick }: { onClick?: () => void }) => {
  const { user, logout } = useAuth();
  if (user) {
    return (
      <>
        {user.role === 'admin' && (
          <Link to="/admin" onClick={onClick} className="px-4 py-2 rounded text-sm font-medium text-muted-foreground">Admin</Link>
        )}
        <button onClick={() => { logout(); onClick && onClick(); }} className="px-4 py-2 rounded text-sm font-medium text-muted-foreground">Logout</button>
      </>
    );
  }
  return (
    <>
      <Link to="/login" onClick={onClick} className="px-4 py-2 rounded text-sm font-medium text-muted-foreground">Login</Link>
      <Link to="/register" onClick={onClick} className="px-4 py-2 rounded text-sm font-semibold text-foreground">Sign Up</Link>
    </>
  );
};
