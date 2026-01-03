import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Scan, CheckCircle, AlertTriangle, FileVideo, FileImage, FileAudio } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";

type AnalysisStatus = "idle" | "uploading" | "analyzing" | "complete";

export const MediaAnalysisCard = () => {
  const [status, setStatus] = useState<AnalysisStatus>("idle");
  const [fileName, setFileName] = useState<string>("");
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
    setStatus("uploading");
    setTimeout(() => setStatus("analyzing"), 1500);
    setTimeout(() => setStatus("complete"), 4000);
  };

  const getFileIcon = () => {
    if (fileName.match(/\.(mp4|mov|avi|webm)$/i)) return <FileVideo className="h-6 w-6" />;
    if (fileName.match(/\.(mp3|wav|ogg)$/i)) return <FileAudio className="h-6 w-6" />;
    return <FileImage className="h-6 w-6" />;
  };

  return (
    <GlassCard className="h-full bg-white dark:bg-gradient-to-br dark:from-slate-800 dark:to-slate-900 border border-gray-200 dark:border-gray-700 shadow-sm dark:shadow-lg hover:shadow-md dark:hover:shadow-xl transition-shadow">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-gradient-to-br from-orange-500 to-red-500">
          <Scan className="h-5 w-5 text-white" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 dark:bg-gradient-to-r dark:from-orange-400 dark:to-red-400 dark:bg-clip-text dark:text-transparent">
          AI Media Analysis
        </h3>
      </div>

      <div
        className={`relative border-2 border-dashed rounded p-8 text-center transition-all duration-300 cursor-pointer ${
          isDragging
            ? "border-orange-500 bg-orange-50 dark:bg-orange-500/10"
            : status === "idle"
            ? "border-gray-300 dark:border-gray-600 hover:border-orange-500 dark:hover:border-orange-500 hover:bg-orange-50 dark:hover:bg-orange-500/5"
            : "border-orange-300 dark:border-orange-700 bg-orange-50 dark:bg-orange-500/5"
        }`}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => status === "idle" && document.getElementById("file-upload")?.click()}
      >
        <input
          id="file-upload"
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
              className="flex flex-col items-center gap-3"
            >
              <div className="p-4 rounded-full bg-secondary">
                <Upload className="h-8 w-8 text-muted-foreground" />
              </div>
              <div>
                <p className="text-foreground font-medium">Upload Media for Analysis</p>
                <p className="text-sm text-muted-foreground mt-1">Click to upload or drag and drop</p>
              </div>
            </motion.div>
          )}

          {status === "uploading" && (
            <motion.div
              key="uploading"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex flex-col items-center gap-3"
            >
              <div className="p-4 rounded-full bg-primary/20 animate-pulse">
                {getFileIcon()}
              </div>
              <div>
                <p className="text-foreground font-medium">{fileName}</p>
                <p className="text-sm text-primary mt-1">File received by NeuroX</p>
              </div>
            </motion.div>
          )}

          {status === "analyzing" && (
            <motion.div
              key="analyzing"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex flex-col items-center gap-3"
            >
              <div className="relative">
                <div className="p-4 rounded-full bg-primary/20">
                  <Scan className="h-8 w-8 text-primary animate-pulse" />
                </div>
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-primary"
                  animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
              <div>
                <p className="text-foreground font-medium glow-text">NeuroX is analyzing...</p>
                <p className="text-sm text-muted-foreground mt-1">Scanning for deepfake signatures</p>
              </div>
            </motion.div>
          )}

          {status === "complete" && (
            <motion.div
              key="complete"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex flex-col items-center gap-3"
            >
              <div className="p-4 rounded-full bg-success/20">
                <CheckCircle className="h-8 w-8 text-success" />
              </div>
              <div>
                <p className="text-success font-medium">Analysis Complete</p>
                <p className="text-sm text-muted-foreground mt-1">Authenticity verified — 98.7% confidence</p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setStatus("idle");
                  setFileName("");
                }}
                className="text-xs text-primary hover:underline mt-2"
              >
                Analyze another file
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* AI Status Indicator - AI ki state dikhane ke liye */}
      <div className="mt-4 flex items-center justify-between p-3 rounded-lg bg-secondary/30">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
          <span className="text-xs text-muted-foreground">NeuroX AI Engine</span>
        </div>
        <span className="text-xs text-primary font-mono">v3.2.1 • Active</span>
      </div>
    </GlassCard>
  );
};
