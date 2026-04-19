import { SiteLayout } from "@/components/SiteLayout";
import { PageHero } from "@/components/PageHero";
import { CategoryCard } from "@/components/CategoryCard";
import { FileText, CheckCircle2 } from "lucide-react";

const Bacs = () => {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="BAC"
        title="مواضيع البكالوريا"
        description="جميع مواضيع شهادة البكالوريا في الفيزياء، مع الحلول النموذجية."
        crumbs={[{ label: "مواضيع البكالوريا" }]}
      />

      <section className="container py-12 md:py-16">
        <div className="grid md:grid-cols-2 gap-6">
          <CategoryCard
            to="/bacs/sujets"
            title="مواضيع البكالوريا"
            subtitle="Sujets"
            description="مواضيع شهادة البكالوريا للسنوات السابقة، مرتبة حسب السنة والشعبة."
            icon={FileText}
            variant="primary"
          />
          <CategoryCard
            to="/bacs/corrections"
            title="حل مواضيع البكالوريا"
            subtitle="Corrections"
            description="حلول نموذجية مفصلة لمواضيع البكالوريا، خطوة بخطوة."
            icon={CheckCircle2}
            variant="accent"
          />
        </div>
      </section>
    </SiteLayout>
  );
};

export default Bacs;
