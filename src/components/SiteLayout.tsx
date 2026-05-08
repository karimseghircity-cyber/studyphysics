import { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { IntroSplash } from "./IntroSplash";
import { useStudyTimer } from "@/hooks/useStudyTimer";

export const SiteLayout = ({ children }: { children: ReactNode }) => {
  useStudyTimer();
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <IntroSplash />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};
