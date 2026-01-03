import { motion } from "framer-motion";
import { Upload, Scan, CheckCircle, BarChart3, Shield } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { GlassCard } from "@/components/ui/GlassCard";

const steps = [
  {
    icon: Upload,
    title: "Upload",
    description: "Submit any media file — images, videos, or audio recordings. Our platform accepts all major formats for comprehensive analysis.",
    details: ["Drag and drop interface", "Batch upload support", "Secure encrypted transfer"],
  },
  {
    icon: Scan,
    title: "AI Detection",
    description: "Our neural networks analyze the content using 47+ detection algorithms, scanning for manipulation artifacts and synthetic signatures.",
    details: ["Deep neural analysis", "Pattern recognition", "Artifact detection"],
  },
  {
    icon: CheckCircle,
    title: "Verification",
    description: "Multi-layer verification cross-references detected signals against our database of known deepfake techniques and generation methods.",
    details: ["Cross-reference database", "Technique matching", "Historical comparison"],
  },
  {
    icon: BarChart3,
    title: "Scoring",
    description: "A comprehensive authenticity score is generated, providing clear insight into the likelihood of manipulation or synthetic generation.",
    details: ["Confidence scoring", "Detailed breakdown", "Visual reports"],
  },
  {
    icon: Shield,
    title: "Action",
    description: "Based on the analysis, receive actionable recommendations and secure verification certificates for authentic content.",
    details: ["Verification certificates", "Action recommendations", "Secure archival"],
  },
];

const HowItWorks = () => {
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
              How It Works
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our advanced AI platform uses cutting-edge neural networks to detect deepfakes 
              and verify digital content authenticity in seconds.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Connecting Line */}
              <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-accent to-primary/20 hidden md:block" />

              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.15 }}
                  className="relative mb-8 last:mb-0"
                >
                  <div className="flex gap-6">
                    {/* Step Number */}
                    <div className="relative z-10">
                      <div className="w-16 h-16 rounded-lg bg-app-surface flex items-center justify-center shadow-sm border-2 border-app">
                        <step.icon className="h-7 w-7 text-foreground" />
                      </div>
                    </div>

                    {/* Content */}
                    <GlassCard className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-xs font-mono text-primary bg-primary/10 px-2 py-1 rounded">
                          STEP {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">{step.title}</h3>
                      <p className="text-muted-foreground mb-4">{step.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {step.details.map((detail, i) => (
                          <span
                            key={i}
                            className="text-xs px-3 py-1 rounded-full bg-secondary text-foreground border border-border"
                          >
                            {detail}
                          </span>
                        ))}
                      </div>
                    </GlassCard>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default HowItWorks;
