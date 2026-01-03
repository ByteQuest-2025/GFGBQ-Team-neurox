import { motion } from "framer-motion";
import { Shield, Zap, Lock } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { ComplaintFormCard } from "@/components/home/ComplaintFormCard";
import { ComplaintStatusCard } from "@/components/home/ComplaintStatusCard";
import { MediaAnalysisCard } from "@/components/home/MediaAnalysisCard";

const Index = () => {
  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-b from-white to-gray-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-200/20 dark:bg-blue-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-200/20 dark:bg-cyan-500/20 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-500/20 border border-blue-200 dark:border-blue-500/30 mb-6"
            >
              <div className="p-1 rounded bg-gradient-to-br from-purple-500 via-blue-500 to-cyan-500">
                <Shield className="h-4 w-4 text-white" />
              </div>
              <span className="text-sm text-blue-700 dark:text-blue-300 font-medium">
                AI-Powered Security Platform
              </span>
            </motion.div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-gray-900 dark:bg-gradient-to-r dark:from-violet-400 dark:via-purple-400 dark:to-indigo-400 dark:bg-clip-text dark:text-transparent">
              Grievance Intake System
            </h1>

            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Advanced AI-driven platform for secure complaint processing, 
              deepfake detection, and digital trust verification.
            </p>
          </motion.div>

          {/* Feature Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {[
              { icon: Zap, text: "Real-time Analysis", gradient: "from-yellow-500 to-orange-500" },
              { icon: Lock, text: "Enterprise Security", gradient: "from-green-500 to-emerald-500" },
              { icon: Shield, text: "99.9% Accuracy", gradient: "from-blue-500 to-cyan-500" },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md dark:hover:shadow-lg transition-shadow"
              >
                <div className={`p-1.5 rounded bg-gradient-to-r ${item.gradient}`}>
                  <item.icon className="h-4 w-4 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {item.text}
                </span>
              </div>
            ))}
          </motion.div>

          {/* Main Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <ComplaintFormCard />
            <ComplaintStatusCard />
            <MediaAnalysisCard />
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Index;
