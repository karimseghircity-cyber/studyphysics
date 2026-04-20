import { SiteLayout } from "@/components/SiteLayout";
import { PageHero } from "@/components/PageHero";
import { CategoryCard } from "@/components/CategoryCard";
import { stages } from "@/data/curriculum";
import { GraduationCap, School } from "lucide-react";

const Exercices = () => {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Sujets + Exercices"
        title="مواضيع + تمارين"
        description="اختر المرحلة الدراسية ثم السنة لاستعراض المواضيع والتمارين الخاصة بكل وحدة."
        crumbs={[{ label: "مواضيع + تمارين" }]}
      />

      <section className="container py-12 md:py-16">
        <div className="grid md:grid-cols-2 gap-6">
          {stages.map((stage) => (
            <CategoryCard
              key={stage.id}
              to={`/exercices/${stage.id}`}
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

export default Exercices;
