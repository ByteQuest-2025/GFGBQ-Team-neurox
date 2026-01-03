import { useState } from "react";
import { motion } from "framer-motion";
import { FileText, Send, RotateCcw } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const languages = [
  "English",
  "Spanish",
  "French",
  "German",
  "Mandarin",
  "Hindi",
  "Arabic",
  "Portuguese",
];

export const ComplaintFormCard = () => {
  const [name, setName] = useState("");
  const [language, setLanguage] = useState("English");
  const [complaint, setComplaint] = useState("");
  const { toast } = useToast();

  const handleSubmit = () => {
    if (!name || !complaint) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Complaint Submitted",
      description: "Your grievance has been received by NeuroX.",
    });
  };

  const handleClear = () => {
    setName("");
    setLanguage("English");
    setComplaint("");
  };

  return (
    <GlassCard className="h-full bg-white dark:bg-gradient-to-br dark:from-slate-800 dark:to-slate-900 border border-gray-200 dark:border-gray-700 shadow-sm dark:shadow-lg hover:shadow-md dark:hover:shadow-xl transition-shadow">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600">
          <FileText className="h-5 w-5 text-white" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 dark:bg-gradient-to-r dark:from-blue-400 dark:to-cyan-400 dark:bg-clip-text dark:text-transparent">
          Complaint Form
        </h3>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
            Full Name
          </label>
          <Input
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border-gray-300 dark:border-gray-600 dark:bg-slate-700 dark:text-white"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
            Language
          </label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="flex h-11 w-full rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-700 dark:text-white px-4 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 focus-visible:border-blue-500 transition-all duration-300"
          >
            {languages.map((lang) => (
              <option key={lang} value={lang} className="bg-white dark:bg-slate-700 text-foreground">
                {lang}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
            Complaint Details
          </label>
          <Textarea
            placeholder="Describe your grievance in detail..."
            value={complaint}
            onChange={(e) => setComplaint(e.target.value)}
            className="min-h-[100px] border-gray-300 dark:border-gray-600 dark:bg-slate-700 dark:text-white"
          />
        </div>

        <div className="flex gap-3 pt-2">
          <Button
            onClick={handleSubmit}
            className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium"
          >
            <Send className="h-4 w-4" />
            Submit
          </Button>
          <Button
            variant="outline"
            onClick={handleClear}
            className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700"
          >
            <RotateCcw className="h-4 w-4" />
            Clear
          </Button>
        </div>
      </div>
    </GlassCard>
  );
};
