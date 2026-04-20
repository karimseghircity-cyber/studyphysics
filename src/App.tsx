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
import SolutionsStage from "./pages/SolutionsStage.tsx";
import Bacs from "./pages/Bacs.tsx";
import Bems from "./pages/Bems.tsx";
import Auth from "./pages/Auth.tsx";
import { ComingSoonPage } from "./pages/ComingSoonPage.tsx";
import BacStreamList, { BacStreamYears } from "./pages/BacStreamList.tsx";
import BemYearList from "./pages/BemYearList.tsx";
import {
  YearCategoriesPage,
  YearDevoirsPage,
  YearTrimesterPage,
  YearUnitsPage,
} from "./pages/YearStructurePages.tsx";

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

              {/* Cours */}
              <Route path="/cours" element={<Cours />} />
              <Route path="/cours/:stageId" element={<StagePage />} />
              <Route path="/cours/:stageId/:yearId" element={<YearPage />} />

              {/* Exercices (مواضيع + تمارين) */}
              <Route path="/exercices" element={<Exercices />} />
              <Route path="/exercices/:stageId" element={<ExercicesStage />} />
              <Route path="/exercices/:stageId/:yearId" element={<ExercicesYear />} />
              <Route
                path="/exercices/:stageId/:yearId/devoirs"
                element={<YearDevoirsPage section="exercices" />}
              />
              <Route
                path="/exercices/:stageId/:yearId/devoirs/:trimesterId"
                element={<YearTrimesterPage section="exercices" />}
              />
              <Route
                path="/exercices/:stageId/:yearId/devoirs/:trimesterId/devoirs"
                element={
                  <ComingSoonPage
                    eyebrow="Devoirs"
                    title="الفروض"
                    description="فروض الفصل."
                    crumbs={[{ label: "الفروض" }]}
                  />
                }
              />
              <Route
                path="/exercices/:stageId/:yearId/devoirs/:trimesterId/compositions"
                element={
                  <ComingSoonPage
                    eyebrow="Compositions"
                    title="الاختبارات"
                    description="اختبارات الفصل."
                    crumbs={[{ label: "الاختبارات" }]}
                  />
                }
              />
              <Route
                path="/exercices/:stageId/:yearId/unites"
                element={<YearUnitsPage section="exercices" />}
              />

              {/* Solutions — same structure as Exercices */}
              <Route path="/solutions" element={<Solutions />} />
              <Route path="/solutions/:stageId" element={<SolutionsStage />} />
              <Route
                path="/solutions/:stageId/:yearId"
                element={<YearCategoriesPage section="solutions" />}
              />
              <Route
                path="/solutions/:stageId/:yearId/devoirs"
                element={<YearDevoirsPage section="solutions" />}
              />
              <Route
                path="/solutions/:stageId/:yearId/devoirs/:trimesterId"
                element={<YearTrimesterPage section="solutions" />}
              />
              <Route
                path="/solutions/:stageId/:yearId/devoirs/:trimesterId/devoirs"
                element={
                  <ComingSoonPage
                    eyebrow="Solutions"
                    title="حلول الفروض"
                    description="حلول فروض الفصل."
                    crumbs={[{ label: "حلول الفروض" }]}
                  />
                }
              />
              <Route
                path="/solutions/:stageId/:yearId/devoirs/:trimesterId/compositions"
                element={
                  <ComingSoonPage
                    eyebrow="Solutions"
                    title="حلول الاختبارات"
                    description="حلول اختبارات الفصل."
                    crumbs={[{ label: "حلول الاختبارات" }]}
                  />
                }
              />
              <Route
                path="/solutions/:stageId/:yearId/unites"
                element={<YearUnitsPage section="solutions" />}
              />

              {/* BAC */}
              <Route path="/bacs" element={<Bacs />} />
              <Route path="/bacs/sujets" element={<BacStreamList mode="sujets" />} />
              <Route
                path="/bacs/sujets/:streamId"
                element={<BacStreamYears mode="sujets" />}
              />
              <Route
                path="/bacs/sujets/:streamId/:year"
                element={
                  <ComingSoonPage
                    eyebrow="BAC"
                    title="موضوع البكالوريا"
                    description="سيتم إضافة الملف قريباً."
                    crumbs={[{ label: "مواضيع البكالوريا", to: "/bacs" }]}
                  />
                }
              />
              <Route path="/bacs/corrections" element={<BacStreamList mode="corrections" />} />
              <Route
                path="/bacs/corrections/:streamId"
                element={<BacStreamYears mode="corrections" />}
              />
              <Route
                path="/bacs/corrections/:streamId/:year"
                element={
                  <ComingSoonPage
                    eyebrow="BAC"
                    title="حل موضوع البكالوريا"
                    description="سيتم إضافة الحل قريباً."
                    crumbs={[{ label: "مواضيع البكالوريا", to: "/bacs" }]}
                  />
                }
              />

              {/* BEM */}
              <Route path="/bems" element={<Bems />} />
              <Route path="/bems/sujets" element={<BemYearList mode="sujets" />} />
              <Route
                path="/bems/sujets/:year"
                element={
                  <ComingSoonPage
                    eyebrow="BEM"
                    title="موضوع شهادة التعليم المتوسط"
                    description="سيتم إضافة الملف قريباً."
                    crumbs={[{ label: "مواضيع شهادة التعليم المتوسط", to: "/bems" }]}
                  />
                }
              />
              <Route path="/bems/corrections" element={<BemYearList mode="corrections" />} />
              <Route
                path="/bems/corrections/:year"
                element={
                  <ComingSoonPage
                    eyebrow="BEM"
                    title="حل موضوع شهادة التعليم المتوسط"
                    description="سيتم إضافة الحل قريباً."
                    crumbs={[{ label: "مواضيع شهادة التعليم المتوسط", to: "/bems" }]}
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
