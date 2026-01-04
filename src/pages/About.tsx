import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, Target, Users, Zap, Globe, Lock } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { GlassCard } from "@/components/ui/GlassCard";

const features = [
  {
    icon: Shield,
    title: "Digital Trust Protection",
    description: "Safeguarding online authenticity through advanced AI detection systems.",
  },
  {
    icon: Target,
    title: "99.7% Accuracy",
    description: "Industry-leading detection rates powered by continuous neural network training.",
  },
  {
    icon: Zap,
    title: "Real-Time Analysis",
    description: "Instant results with processing times under 3 seconds for most media.",
  },
  {
    icon: Globe,
    title: "Global Coverage",
    description: "Supporting 40+ languages with localized detection models.",
  },
  {
    icon: Lock,
    title: "Enterprise Security",
    description: "SOC 2 Type II certified with end-to-end encryption.",
  },
  {
    icon: Users,
    title: "Trusted Worldwide",
    description: "Used by governments, enterprises, and media organizations globally.",
  },
];

const About = () => {
  const navigate = useNavigate();
  // This page is removed per request — redirect users back to main.
  useEffect(() => {
    navigate('/', { replace: true });
  }, [navigate]);

  return null;
};

export default About;
