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

const categories = [
  "Aadhaar",
  "Passport",
  "Income Tax",
  "GST",
  "Pension",
  "Ration / PDS",
  "Electricity",
  "Water Supply",
  "Roads & Infrastructure",
  "Healthcare",
  "Education",
  "Police Services",
  "Municipal Services",
  "Environment",
  "Labour / Employment",
  "Property / Land Records",
  "Corruption / RTI",
  "Other",
];

export const ComplaintFormCard = () => {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [language, setLanguage] = useState("English");
  const [category, setCategory] = useState(categories[0]);
  const [complaint, setComplaint] = useState("");
  const [lastId, setLastId] = useState<string | null>(null);
  const { toast } = useToast();
  const BACKEND = (import.meta.env.VITE_BACKEND_URL as string) || "http://localhost:4000";

  const handleSubmit = () => {
    if (!title || !complaint || !category) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    // Submit publicly and show generated tracking ID
    (async () => {
      try {
        const res = await fetch(`${BACKEND}/api/grievances/public`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title, description: complaint, category }),
        });
        const data = await res.json();
        if (!res.ok) {
          toast({ title: 'Submit failed', description: data.error || 'Server error', variant: 'destructive' });
          return;
        }
        setLastId(data.grievance.id);
        toast({ title: 'Complaint Submitted', description: `Your grievance ID: ${data.grievance.id}` });
        // clear form
        setName(''); setTitle(''); setCategory(categories[0]); setLanguage('English'); setComplaint('');
      } catch (err) {
        console.error('Submit error', err);
        const msg = (err && (err as any).message) ? (err as any).message : 'Failed to submit grievance — check backend is running';
        toast({ title: 'Network error', description: msg, variant: 'destructive' });
      }
    })();
  };

  const handleClear = () => {
    setTitle("");
    setName("");
    setCategory(categories[0]);
    setLanguage("English");
    setComplaint("");
    setLastId(null);
  };

  return (
    <GlassCard className="h-full bg-app-surface border border-app shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-app-primary">
          <FileText className="h-5 w-5 text-white" />
        </div>
        <h3 className="text-lg font-semibold text-foreground">
          Complaint Form
        </h3>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-muted-foreground mb-2 block">Title</label>
          <Input
            placeholder="Short title for your grievance"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-app"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-muted-foreground mb-2 block">Full Name (optional)</label>
          <Input
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border-app"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-muted-foreground mb-2 block">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="flex h-11 w-full rounded border border-app bg-app-surface text-foreground px-4 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:border-app transition-all duration-300"
            >
              {categories.map((c) => (
                <option key={c} value={c} className="bg-app-surface text-foreground">{c}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-muted-foreground mb-2 block">Language</label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="flex h-11 w-full rounded border border-app bg-app-surface text-foreground px-4 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:border-app transition-all duration-300"
            >
              {languages.map((lang) => (
                <option key={lang} value={lang} className="bg-app-surface text-foreground">{lang}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-muted-foreground mb-2 block">
            Complaint Details
          </label>
          <Textarea
            placeholder="Describe your grievance in detail..."
            value={complaint}
            onChange={(e) => setComplaint(e.target.value)}
            className="min-h-[100px] border-app"
          />
        </div>

        <div className="flex gap-3 pt-2">
          <Button
            onClick={handleSubmit}
            className="flex-1 bg-app-primary text-white font-medium"
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
        {lastId && (
          <div className="mt-3 text-sm text-muted-foreground">Your tracking ID: <span className="text-foreground font-medium">{lastId}</span></div>
        )}
      </div>
    </GlassCard>
  );
};
