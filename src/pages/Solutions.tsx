import { SiteLayout } from "@/components/SiteLayout";
import { PageHero } from "@/components/PageHero";
import { CategoryCard } from "@/components/CategoryCard";
import { stages } from "@/data/curriculum";
import { GraduationCap, School } from "lucide-react";

const Solutions = () => {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Solutions"
        title="الحلول"
        description="حلول نموذجية مفصلة. اختر المرحلة الدراسية ثم السنة."
        crumbs={[{ label: "الحلول" }]}
      />

      <section className="container py-12 md:py-16">
        <div className="grid md:grid-cols-2 gap-6">
          {stages.map((stage) => (
            <CategoryCard
              key={stage.id}
              to={`/solutions/${stage.id}`}
              title={stage.id === "moyen" ? "متوسط" : "ثانوي"}
              subtitle={stage.subtitle}
              description={stage.description}
              icon={stage.id === "moyen" ? School : GraduationCap}
              variant={stage.id === "moyen" ? "accent" : "primary"}
            />
          ))}
        </div>
      </section>
    </SiteLayout>
  );
};

export default Solutions;
