import { SiteLayout } from "@/components/SiteLayout";
import { CategoryCard } from "@/components/CategoryCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Atom,
  BookOpen,
  Dumbbell,
  CheckCircle2,
  GraduationCap,
  ScrollText,
  Sparkles,
  ArrowLeft,
} from "lucide-react";

const sections = [
  {
    to: "/cours",
    title: "الدروس",
    subtitle: "Cours",
    description: "ملخصات وشروحات مفصلة لجميع وحدات الفيزياء، للمتوسط والثانوي.",
    icon: BookOpen,
  },
  {
    to: "/exercices",
    title: "مواضيع + تمارين",
    subtitle: "Exercices",
    description: "مواضيع وتمارين مرتبة حسب الوحدة لتثبيت الفهم وتطوير مهارة الحل.",
    icon: Dumbbell,
  },
  {
    to: "/solutions",
    title: "الحلول",
    subtitle: "Solutions",
    description: "حلول نموذجية ومفصلة للتمارين والمواضيع، خطوة بخطوة.",
    icon: CheckCircle2,
  },
  {
    to: "/bacs",
    title: "مواضيع البكالوريا",
    subtitle: "Bacs",
    description: "مواضيع شهادة البكالوريا للسنوات السابقة مع التصحيح.",
    icon: GraduationCap,
  },
  {
    to: "/bems",
    title: "مواضيع الـ BEM",
    subtitle: "Bems",
    description: "مواضيع شهادة التعليم المتوسط لجميع الدورات السابقة.",
    icon: ScrollText,
  },
];

const Index = () => {
  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-hero text-primary-foreground">
        <div className="absolute inset-0 opacity-25 pointer-events-none">
          <div className="absolute top-10 right-10 h-72 w-72 rounded-full bg-white blur-3xl animate-float" />
          <div className="absolute bottom-10 left-10 h-96 w-96 rounded-full bg-accent blur-3xl animate-float" style={{ animationDelay: "2s" }} />
        </div>

        <div className="container relative py-20 md:py-28">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-sm text-xs font-bold mb-6">
              <Sparkles className="h-3.5 w-3.5" />
              منصة شاملة لمادة الفيزياء
            </span>
            <h1 className="font-display text-4xl md:text-6xl font-extrabold leading-tight text-balance">
              كل ما تحتاجه في الفيزياء —
              <br />
              <span className="text-accent">من المتوسط إلى البكالوريا</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-primary-foreground/90 leading-relaxed max-w-2xl">
              دروس مُنظَّمة، تمارين متنوعة، حلول نموذجية، ومواضيع امتحانات سابقة. كل شيء في مكان واحد، بتصميم نظيف يساعدك على التركيز.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-elegant text-base">
                <Link to="/cours">
                  ابدأ بالدروس
                  <ArrowLeft className="mr-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-white/10 border-white/30 text-primary-foreground hover:bg-white/20 hover:text-primary-foreground text-base">
                <Link to="/bacs">مواضيع البكالوريا</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK BAC ACCESS — CLEARLY VISIBLE */}
      <section className="container -mt-12 md:-mt-14 relative z-10">
        <div className="grid md:grid-cols-2 gap-4">
          <CategoryCard
            to="/bacs"
            title="مواضيع البكالوريا"
            subtitle="BAC"
            description="جميع مواضيع شهادة البكالوريا في الفيزياء مع التصحيح، مرتبة حسب السنة والشعبة."
            icon={GraduationCap}
            variant="primary"
          />
          <CategoryCard
            to="/bems"
            title="مواضيع شهادة التعليم المتوسط"
            subtitle="BEM"
            description="مواضيع الـ BEM لجميع الدورات السابقة مع الحلول النموذجية."
            icon={ScrollText}
            variant="accent"
          />
        </div>
      </section>

      {/* MAIN SECTIONS */}
      <section className="container py-16 md:py-24">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-sm font-bold text-primary uppercase tracking-wide">الأقسام</span>
          <h2 className="mt-2 font-display text-3xl md:text-4xl font-bold text-foreground">
            استكشف محتوى المنصة
          </h2>
          <p className="mt-3 text-muted-foreground">
            خمسة أقسام رئيسية تغطي كل احتياجاتك الدراسية في الفيزياء.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {sections.map((s) => (
            <CategoryCard key={s.to} {...s} />
          ))}
        </div>
      </section>

      {/* WHY US */}
      <section className="bg-secondary/40 border-y border-border">
        <div className="container py-16 grid md:grid-cols-3 gap-8">
          {[
            { icon: Atom, title: "محتوى مُنظَّم", desc: "تصنيف واضح حسب المرحلة، السنة والوحدة." },
            { icon: BookOpen, title: "شامل ومجاني", desc: "كل ما تحتاجه من دروس وتمارين وحلول، بدون تكلفة." },
            { icon: Sparkles, title: "تصميم احترافي", desc: "واجهة نظيفة، تجربة قراءة مريحة بالوضعين الفاتح والداكن." },
          ].map((f) => (
            <div key={f.title} className="flex flex-col items-start gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <f.icon className="h-6 w-6" />
              </div>
              <h3 className="font-display text-xl font-bold text-foreground">{f.title}</h3>
              <p className="text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
};

export default Index;
