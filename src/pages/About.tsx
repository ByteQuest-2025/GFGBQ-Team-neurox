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
  return (
    <PageLayout>
      <section className="py-20 bg-gradient-to-b from-white to-gray-50 dark:from-slate-900 dark:to-slate-800">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-4 text-foreground">
              About NeuroX
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Pioneering the future of digital trust through advanced AI technology.
            </p>
          </motion.div>

          {/* Mission Statement - Humaara mission */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-4xl mx-auto mb-16"
          >
            <GlassCard glow className="text-center py-12">
                <div className="w-20 h-20 bg-app-surface rounded-lg flex items-center justify-center mx-auto mb-6 border-2 border-app shadow-sm">
                <Shield className="h-10 w-10 text-foreground" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Protecting Digital Trust in an AI-Generated World
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                NeuroX is a cutting-edge AI platform dedicated to combating deepfake fraud and 
                preserving digital authenticity. Our mission is to empower individuals, organizations, 
                and governments with the tools they need to verify digital content and maintain trust 
                in an increasingly synthetic media landscape.
              </p>
            </GlassCard>
          </motion.div>

          {/* Features Grid - Sabke features */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <GlassCard className="h-full hover:border-primary/30 transition-all duration-300">
                  <div className="p-3 rounded-lg bg-app-surface border-2 border-app w-fit mb-4 shadow-sm">
                    <feature.icon className="h-6 w-6 text-app-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>

          {/* Stats - Hamare statistics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-16"
          >
            <GlassCard className="max-w-4xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                {[
                  { value: "2.5M+", label: "Files Analyzed" },
                  { value: "99.7%", label: "Detection Rate" },
                  { value: "120+", label: "Enterprise Clients" },
                  { value: "<3s", label: "Avg. Processing" },
                ].map((stat, index) => (
                  <div key={index}>
                    <div className="text-3xl md:text-4xl font-bold cyber-gradient-text mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
};

export default About;
