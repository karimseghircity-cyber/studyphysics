import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import Cours from "./pages/Cours.tsx";
import StagePage from "./pages/StagePage.tsx";
import YearPage from "./pages/YearPage.tsx";
import Exercices from "./pages/Exercices.tsx";
import Solutions from "./pages/Solutions.tsx";
import Bacs from "./pages/Bacs.tsx";
import Bems from "./pages/Bems.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/cours" element={<Cours />} />
            <Route path="/cours/:stageId" element={<StagePage />} />
            <Route path="/cours/:stageId/:yearId" element={<YearPage />} />
            <Route path="/exercices" element={<Exercices />} />
            <Route path="/solutions" element={<Solutions />} />
            <Route path="/bacs" element={<Bacs />} />
            <Route path="/bems" element={<Bems />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
