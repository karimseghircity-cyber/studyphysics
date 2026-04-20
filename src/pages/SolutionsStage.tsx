import { useParams, Navigate } from "react-router-dom";
import { SiteLayout } from "@/components/SiteLayout";
import { PageHero } from "@/components/PageHero";
import { CategoryCard } from "@/components/CategoryCard";
import { getStage } from "@/data/curriculum";
import { BookMarked } from "lucide-react";

const SolutionsStage = () => {
  const { stageId } = useParams<{ stageId: string }>();
  const stage = stageId ? getStage(stageId) : undefined;

  if (!stage) return <Navigate to="/solutions" replace />;

  const stageLabel = stage.id === "moyen" ? "متوسط" : "ثانوي";

  return (
    <SiteLayout>
      <PageHero
        eyebrow={stage.subtitle}
        title={`حلول - ${stageLabel}`}
        description="اختر السنة الدراسية لاستعراض الحلول."
        crumbs={[{ label: "الحلول", to: "/solutions" }, { label: stageLabel }]}
      />

      <section className="container py-12 md:py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {stage.years.map((year) => (
            <CategoryCard
              key={year.id}
              to={`/solutions/${stage.id}/${year.id}`}
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

export default SolutionsStage;
