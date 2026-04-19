import { useParams, Navigate } from "react-router-dom";
import { SiteLayout } from "@/components/SiteLayout";
import { PageHero } from "@/components/PageHero";
import { getStage, getYear } from "@/data/curriculum";
import { Card } from "@/components/ui/card";
import { FileText } from "lucide-react";

const YearPage = () => {
  const { stageId, yearId } = useParams<{ stageId: string; yearId: string }>();
  const stage = stageId ? getStage(stageId) : undefined;
  const year = stageId && yearId ? getYear(stageId, yearId) : undefined;

  if (!stage || !year) return <Navigate to="/cours" replace />;

  return (
    <SiteLayout>
      <PageHero
        eyebrow={year.subtitle}
        title={year.title}
        description="جميع الوحدات والفصول الدراسية. اضغط على وحدة للاطلاع على دروسها."
        crumbs={[
          { label: "الدروس", to: "/cours" },
          { label: stage.title, to: `/cours/${stage.id}` },
          { label: year.title },
        ]}
      />

      <section className="container py-12 md:py-16">
        <div className="grid md:grid-cols-2 gap-5">
          {year.units.map((unit, idx) => (
            <Card
              key={unit.id}
              className="group p-6 bg-gradient-card border border-border hover:border-primary/40 hover:shadow-elegant transition-smooth hover:-translate-y-1 cursor-pointer"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary font-display font-bold text-lg">
                  {String(idx + 1).padStart(2, "0")}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-display text-lg md:text-xl font-bold text-foreground leading-snug">
                    {unit.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {unit.description}
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-primary">
                    <FileText className="h-3.5 w-3.5" />
                    دروس وتمارين قريباً
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
};

export default YearPage;
