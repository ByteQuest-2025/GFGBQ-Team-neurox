import { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

interface PageLayoutProps {
  children: ReactNode;
}

export const PageLayout = ({ children }: PageLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-app-background">
      <Navbar />
      <main className="flex-1 pt-20 bg-app-background">
        {children}
      </main>
      <Footer />
    </div>
  );
};
