import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import Cours from "./pages/Cours.tsx";
import StagePage from "./pages/StagePage.tsx";
import YearPage from "./pages/YearPage.tsx";
import Exercices from "./pages/Exercices.tsx";
import ExercicesStage from "./pages/ExercicesStage.tsx";
import ExercicesYear from "./pages/ExercicesYear.tsx";
import Solutions from "./pages/Solutions.tsx";
import Bacs from "./pages/Bacs.tsx";
import Bems from "./pages/Bems.tsx";
import Auth from "./pages/Auth.tsx";
import { ComingSoonPage } from "./pages/ComingSoonPage.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/cours" element={<Cours />} />
              <Route path="/cours/:stageId" element={<StagePage />} />
              <Route path="/cours/:stageId/:yearId" element={<YearPage />} />
              <Route path="/exercices" element={<Exercices />} />
              <Route path="/exercices/:stageId" element={<ExercicesStage />} />
              <Route path="/exercices/:stageId/:yearId" element={<ExercicesYear />} />
              <Route path="/solutions" element={<Solutions />} />
              <Route path="/bacs" element={<Bacs />} />
              <Route
                path="/bacs/sujets"
                element={
                  <ComingSoonPage
                    eyebrow="BAC"
                    title="مواضيع البكالوريا"
                    description="مواضيع شهادة البكالوريا للسنوات السابقة."
                    crumbs={[{ label: "مواضيع البكالوريا", to: "/bacs" }, { label: "المواضيع" }]}
                  />
                }
              />
              <Route
                path="/bacs/corrections"
                element={
                  <ComingSoonPage
                    eyebrow="BAC"
                    title="حل مواضيع البكالوريا"
                    description="حلول نموذجية مفصلة لمواضيع البكالوريا."
                    crumbs={[{ label: "مواضيع البكالوريا", to: "/bacs" }, { label: "الحلول" }]}
                  />
                }
              />
              <Route path="/bems" element={<Bems />} />
              <Route
                path="/bems/sujets"
                element={
                  <ComingSoonPage
                    eyebrow="BEM"
                    title="مواضيع شهادة التعليم المتوسط"
                    description="مواضيع الـ BEM لجميع الدورات السابقة."
                    crumbs={[{ label: "مواضيع شهادة التعليم المتوسط", to: "/bems" }, { label: "المواضيع" }]}
                  />
                }
              />
              <Route
                path="/bems/corrections"
                element={
                  <ComingSoonPage
                    eyebrow="BEM"
                    title="حل مواضيع شهادة التعليم المتوسط"
                    description="حلول نموذجية مفصلة لمواضيع الـ BEM."
                    crumbs={[{ label: "مواضيع شهادة التعليم المتوسط", to: "/bems" }, { label: "الحلول" }]}
                  />
                }
              />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
