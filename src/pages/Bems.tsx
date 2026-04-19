import { SiteLayout } from "@/components/SiteLayout";
import { PageHero } from "@/components/PageHero";
import { CategoryCard } from "@/components/CategoryCard";
import { FileText, CheckCircle2 } from "lucide-react";

const Bems = () => {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="BEM"
        title="مواضيع شهادة التعليم المتوسط"
        description="مواضيع الـ BEM لجميع الدورات السابقة مع الحلول النموذجية."
        crumbs={[{ label: "مواضيع شهادة التعليم المتوسط" }]}
      />

      <section className="container py-12 md:py-16">
        <div className="grid md:grid-cols-2 gap-6">
          <CategoryCard
            to="/bems/sujets"
            title="مواضيع شهادة التعليم المتوسط"
            subtitle="Sujets"
            description="مواضيع الـ BEM في الفيزياء لجميع الدورات السابقة."
            icon={FileText}
            variant="primary"
          />
          <CategoryCard
            to="/bems/corrections"
            title="حل مواضيع شهادة التعليم المتوسط"
            subtitle="Corrections"
            description="حلول نموذجية مفصلة لمواضيع الـ BEM، خطوة بخطوة."
            icon={CheckCircle2}
            variant="accent"
          />
        </div>
      </section>
    </SiteLayout>
  );
};

export default Bems;
