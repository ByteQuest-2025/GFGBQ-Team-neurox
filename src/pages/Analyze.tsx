import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Scan, CheckCircle, XCircle, AlertTriangle, Shield, Activity, Eye, Brain } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/button";

type AnalysisStatus = "idle" | "uploading" | "analyzing" | "complete";
type AnalysisResult = "authentic" | "suspicious" | "fake" | null;

const Analyze = () => {
  const [status, setStatus] = useState<AnalysisStatus>("idle");
  const [result, setResult] = useState<AnalysisResult>(null);
  const [fileName, setFileName] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      simulateAnalysis(files[0].name);
    }
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      simulateAnalysis(files[0].name);
    }
  };

  const simulateAnalysis = (name: string) => {
    setFileName(name);
    setResult(null);
    setStatus("uploading");
    setTimeout(() => setStatus("analyzing"), 1500);
    setTimeout(() => {
      setStatus("complete");
      const results: AnalysisResult[] = ["authentic", "suspicious", "fake"];
      setResult(results[Math.floor(Math.random() * 3)]);
    }, 5000);
  };

  const resetAnalysis = () => {
    setStatus("idle");
    setResult(null);
    setFileName("");
  };

  const getResultConfig = () => {
    switch (result) {
      case "authentic":
        return {
          icon: CheckCircle,
          color: "text-success",
          bgColor: "bg-success/20",
          borderColor: "border-success/30",
          label: "Authentic",
          score: 98.7,
          signals: ["Natural audio patterns", "Consistent facial movements", "No splicing detected"],
        };
      case "suspicious":
        return {
          icon: AlertTriangle,
          color: "text-warning",
          bgColor: "bg-warning/20",
          borderColor: "border-warning/30",
          label: "Suspicious",
          score: 67.3,
          signals: ["Unusual audio artifacts", "Minor inconsistencies", "Requires review"],
        };
      case "fake":
        return {
          icon: XCircle,
          color: "text-destructive",
          bgColor: "bg-destructive/20",
          borderColor: "border-destructive/30",
          label: "Fake Detected",
          score: 12.4,
          signals: ["AI-generated audio", "Face manipulation detected", "Temporal inconsistencies"],
        };
      default:
        return null;
    }
  };

  const resultConfig = getResultConfig();

  return (
    <PageLayout>
      <section className="py-20 bg-app-background">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-4 text-foreground">
              AI Media Analysis
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Upload any media file for comprehensive deepfake detection and authenticity verification.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <GlassCard glow className="mb-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 rounded-lg bg-app-surface border-2 border-app shadow-sm">
                  <Brain className="h-6 w-6 text-app-foreground" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">NeuroX Scan Panel</h2>
                  <p className="text-sm text-muted-foreground">Powered by advanced neural networks</p>
                </div>
              </div>

              <div
                className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 cursor-pointer ${
                  isDragging
                    ? "border-primary bg-primary/10"
                    : status === "idle"
                    ? "border-border hover:border-primary/50 hover:bg-secondary/30"
                    : "border-primary/30 bg-secondary/20"
                }`}
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                onClick={() => status === "idle" && document.getElementById("analyze-upload")?.click()}
              >
                <input
                  id="analyze-upload"
                  type="file"
                  className="hidden"
                  accept="image/*,video/*,audio/*"
                  onChange={handleFileInput}
                />

                <AnimatePresence mode="wait">
                  {status === "idle" && (
                    <motion.div
                      key="idle"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col items-center gap-4"
                    >
                      <div className="p-6 rounded-full bg-secondary border border-border">
                        <Upload className="h-12 w-12 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-xl text-foreground font-medium">Upload Media for Analysis</p>
                        <p className="text-muted-foreground mt-2">
                          Drag and drop or click to select • Images, Videos, Audio
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {status === "uploading" && (
                    <motion.div
                      key="uploading"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="flex flex-col items-center gap-4"
                    >
                      <div className="p-6 rounded-full bg-primary/20 animate-pulse border border-primary/30">
                        <Scan className="h-12 w-12 text-primary" />
                      </div>
                      <div>
                        <p className="text-xl text-foreground font-medium">{fileName}</p>
                        <p className="text-primary mt-2">Initializing scan protocols...</p>
                      </div>
                    </motion.div>
                  )}

                  {status === "analyzing" && (
                    <motion.div
                      key="analyzing"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="flex flex-col items-center gap-4"
                    >
                      <div className="relative">
                        <div className="p-6 rounded-full bg-primary/20 border border-primary/30">
                          <Scan className="h-12 w-12 text-primary animate-pulse" />
                        </div>
                        <motion.div
                          className="absolute inset-0 rounded-full border-2 border-primary"
                          animate={{ scale: [1, 1.8, 1], opacity: [1, 0, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                        <motion.div
                          className="absolute inset-0 rounded-full border-2 border-accent"
                          animate={{ scale: [1, 2.2, 1], opacity: [0.5, 0, 0.5] }}
                          transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                        />
                      </div>
                      <div>
                        <p className="text-xl text-foreground font-medium glow-text">NeuroX is analyzing...</p>
                        <p className="text-muted-foreground mt-2">Running 47 detection algorithms</p>
                      </div>

                      {/* Progress dikhane ke liye */}
                      <div className="w-full max-w-md mt-4">
                        <div className="flex justify-between text-xs text-muted-foreground mb-2">
                          <span>Neural Network Processing</span>
                          <span>78%</span>
                        </div>
                        <div className="h-2 rounded-full bg-secondary overflow-hidden">
                          <motion.div
                            className="h-full cyber-gradient"
                            initial={{ width: "0%" }}
                            animate={{ width: "78%" }}
                            transition={{ duration: 3 }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {status === "complete" && resultConfig && (
                    <motion.div
                      key="complete"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="flex flex-col items-center gap-4"
                    >
                      <div className={`p-6 rounded-full ${resultConfig.bgColor} border ${resultConfig.borderColor}`}>
                        <resultConfig.icon className={`h-12 w-12 ${resultConfig.color}`} />
                      </div>
                      <div>
                        <p className={`text-2xl font-bold ${resultConfig.color}`}>{resultConfig.label}</p>
                        <p className="text-muted-foreground mt-2">{fileName}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </GlassCard>

            {/* Results dikhane ka section */}
            {status === "complete" && resultConfig && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                <GlassCard>
                  <div className="flex items-center gap-3 mb-4">
                    <Activity className={`h-5 w-5 ${resultConfig.color}`} />
                    <span className="text-sm text-muted-foreground">Authenticity Score</span>
                  </div>
                  <div className="text-4xl font-bold cyber-gradient-text">{resultConfig.score}%</div>
                </GlassCard>

                <GlassCard>
                  <div className="flex items-center gap-3 mb-4">
                    <Eye className="h-5 w-5 text-primary" />
                    <span className="text-sm text-muted-foreground">Detected Signals</span>
                  </div>
                  <ul className="space-y-2">
                    {resultConfig.signals.map((signal, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-foreground">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                        {signal}
                      </li>
                    ))}
                  </ul>
                </GlassCard>

                <GlassCard>
                  <div className="flex items-center gap-3 mb-4">
                    <Shield className={`h-5 w-5 ${resultConfig.color}`} />
                    <span className="text-sm text-muted-foreground">Verification Status</span>
                  </div>
                  <div className={`text-xl font-semibold ${resultConfig.color}`}>{resultConfig.label}</div>
                  <Button variant="outline" onClick={resetAnalysis} className="w-full mt-4">
                    Analyze Another File
                  </Button>
                </GlassCard>
              </motion.div>
            )}
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Analyze;
