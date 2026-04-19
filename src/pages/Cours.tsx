import { SiteLayout } from "@/components/SiteLayout";
import { PageHero } from "@/components/PageHero";
import { CategoryCard } from "@/components/CategoryCard";
import { stages } from "@/data/curriculum";
import { GraduationCap, School } from "lucide-react";

const Cours = () => {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="الدروس"
        title="اختر المرحلة الدراسية"
        description="ادخل إلى المرحلة المناسبة لتظهر لك السنوات ثم الوحدات الكاملة."
        crumbs={[{ label: "الدروس" }]}
      />

      <section className="container py-12 md:py-16">
        <div className="grid md:grid-cols-2 gap-6">
          {stages.map((stage) => (
            <CategoryCard
              key={stage.id}
              to={`/cours/${stage.id}`}
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

export default Cours;
