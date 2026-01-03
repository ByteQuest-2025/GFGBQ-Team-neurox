import { Shield } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="border-t border-app bg-app-surface">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-3">
            <div className="p-1.5 rounded-lg bg-gradient-to-br from-purple-500 via-blue-500 to-cyan-500">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="font-semibold text-foreground">NeuroX</p>
              <p className="text-sm text-muted-foreground">AI for Digital Trust</p>
            </div>
          </div>
          <div className="flex items-center gap-8 text-sm">
            <a href="#" className="text-muted-foreground hover:opacity-90 transition-opacity">
              Privacy
            </a>
            <a href="#" className="text-muted-foreground hover:opacity-90 transition-opacity">
              Terms
            </a>
            <a href="#" className="text-muted-foreground hover:opacity-90 transition-opacity">
              Security
            </a>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-app text-center text-sm text-muted-foreground">
          <p>© 2026 NeuroX. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
