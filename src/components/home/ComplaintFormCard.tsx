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
    <GlassCard className="h-full bg-app-surface border border-app shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600">
          <FileText className="h-5 w-5 text-white" />
        </div>
        <h3 className="text-lg font-semibold text-foreground">
          Complaint Form
        </h3>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-muted-foreground mb-2 block">
            Full Name
          </label>
          <Input
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border-app dark:border-app dark:bg-app-surface dark:text-foreground"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-muted-foreground mb-2 block">
            Language
          </label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="flex h-11 w-full rounded border border-app bg-app-surface text-app-foreground px-4 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:border-app transition-all duration-300"
          >
            {languages.map((lang) => (
              <option key={lang} value={lang} className="bg-app-surface dark:bg-app-surface text-foreground">
                {lang}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm font-medium text-muted-foreground mb-2 block">
            Complaint Details
          </label>
          <Textarea
            placeholder="Describe your grievance in detail..."
            value={complaint}
            onChange={(e) => setComplaint(e.target.value)}
            className="min-h-[100px] border-app dark:border-app dark:bg-app-surface dark:text-foreground"
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
            className="border-app dark:border-app text-muted-foreground dark:text-muted-foreground hover:bg-app-background/50 dark:hover:bg-app-surface/50"
          >
            <RotateCcw className="h-4 w-4" />
            Clear
          </Button>
        </div>
      </div>
    </GlassCard>
  );
};
