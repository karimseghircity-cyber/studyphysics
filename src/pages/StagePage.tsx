import { useParams, Navigate } from "react-router-dom";
import { SiteLayout } from "@/components/SiteLayout";
import { PageHero } from "@/components/PageHero";
import { CategoryCard } from "@/components/CategoryCard";
import { getStage } from "@/data/curriculum";
import { BookMarked } from "lucide-react";

const StagePage = () => {
  const { stageId } = useParams<{ stageId: string }>();
  const stage = stageId ? getStage(stageId) : undefined;

  if (!stage) return <Navigate to="/cours" replace />;

  return (
    <SiteLayout>
      <PageHero
        eyebrow={stage.subtitle}
        title={stage.title}
        description="اختر السنة الدراسية للاطلاع على الوحدات والدروس."
        crumbs={[{ label: "الدروس", to: "/cours" }, { label: stage.title }]}
      />

      <section className="container py-12 md:py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {stage.years.map((year) => (
            <CategoryCard
              key={year.id}
              to={`/cours/${stage.id}/${year.id}`}
              title={year.title}
              subtitle={year.subtitle}
              description={`${year.units.length} وحدات / فصول دراسية.`}
              icon={BookMarked}
            />
          ))}
        </div>
      </section>
    </SiteLayout>
  );
};

export default StagePage;
