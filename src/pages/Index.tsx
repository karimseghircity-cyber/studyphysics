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
  Video,
  Trophy,
  Coins,
} from "lucide-react";

const sections = [
  { to: "/cours", title: "الدروس", subtitle: "Cours", description: "ملخصات وشروحات مفصلة لجميع وحدات الفيزياء، للمتوسط والثانوي.", icon: BookOpen },
  { to: "/exercices", title: "مواضيع + تمارين", subtitle: "Exercices", description: "مواضيع وتمارين مرتبة حسب الوحدة لتثبيت الفهم وتطوير مهارة الحل.", icon: Dumbbell },
  { to: "/solutions", title: "الحلول", subtitle: "Solutions", description: "حلول نموذجية ومفصلة للتمارين والمواضيع، خطوة بخطوة.", icon: CheckCircle2 },
  { to: "/bacs", title: "مواضيع البكالوريا", subtitle: "Bacs", description: "مواضيع شهادة البكالوريا للسنوات السابقة مع التصحيح.", icon: GraduationCap },
  { to: "/bems", title: "مواضيع الـ BEM", subtitle: "Bems", description: "مواضيع شهادة التعليم المتوسط لجميع الدورات السابقة.", icon: ScrollText },
  { to: "/online", title: "التعليم عن بُعد", subtitle: "Online Education", description: "حصص حية، أستاذك في منزلك، ودروس Zoom تفاعلية.", icon: Video },
];

const Index = () => {
  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-hero">
        <div className="absolute inset-0 starfield opacity-80 pointer-events-none" />
        <div className="absolute inset-0 opacity-60 pointer-events-none">
          <div className="absolute top-10 right-10 h-72 w-72 rounded-full bg-cosmic blur-3xl animate-float" />
          <div className="absolute bottom-10 left-10 h-96 w-96 rounded-full bg-nebula blur-3xl animate-float" style={{ animationDelay: "2s" }} />
          <div className="absolute top-1/3 left-1/2 h-56 w-56 rounded-full bg-accent/40 blur-3xl animate-float" style={{ animationDelay: "4s" }} />
        </div>
        <div aria-hidden className="absolute top-16 left-8 md:top-20 md:left-20 hidden sm:block animate-float" style={{ animationDelay: "1s" }}>
          <div className="relative h-16 w-16 md:h-20 md:w-20 rounded-full bg-gradient-to-br from-accent via-accent/70 to-accent/30 shadow-stellar">
            <div className="absolute inset-0 rounded-full bg-gradient-to-tl from-transparent via-transparent to-white/40" />
          </div>
        </div>

        <div className="container relative py-20 md:py-28">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-sm ring-1 ring-white/30 text-xs font-bold mb-6 text-on-hero">
              <Sparkles className="h-3.5 w-3.5 animate-twinkle" />
              منصة شاملة لمادة الفيزياء
            </span>
            <h1 className="font-display text-4xl md:text-6xl font-extrabold leading-tight text-balance text-on-hero">
              كل ما تحتاجه في الفيزياء —
              <br />
              <span
                className="bg-gradient-to-r from-accent via-accent to-nebula bg-clip-text"
                style={{ WebkitTextFillColor: "transparent" }}
              >
                من المتوسط إلى البكالوريا
              </span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-on-hero opacity-95 leading-relaxed max-w-2xl">
              دروس مُنظَّمة، تمارين متنوعة، حلول نموذجية، ومواضيع امتحانات سابقة. كل شيء في مكان واحد، بتصميم نظيف يساعدك على التركيز.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-stellar text-base">
                <Link to="/cours">
                  ابدأ بالدروس
                  <ArrowLeft className="mr-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-white/10 border-white/40 text-on-hero hover:bg-white/20 text-base backdrop-blur-sm">
                <Link to="/bacs">مواضيع البكالوريا</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK BAC ACCESS */}
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

      {/* MAIN SECTIONS — clearly framed */}
      <section className="container py-16 md:py-20">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-sm font-bold text-primary uppercase tracking-wide">الأقسام</span>
          <h2 className="mt-2 font-display text-3xl md:text-4xl font-bold text-foreground">
            استكشف محتوى المنصة
          </h2>
          <p className="mt-3 text-muted-foreground">
            ستة أقسام رئيسية تغطي كل احتياجاتك الدراسية في الفيزياء.
          </p>
        </div>

        <div className="rounded-3xl border-2 border-border bg-gradient-card p-5 md:p-8 shadow-elegant">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {sections.map((s) => (
              <CategoryCard key={s.to} {...s} />
            ))}
          </div>
        </div>

        {/* QUIZZ — Golden featured card */}
        <Link
          to="/quiz"
          className="group relative mt-6 flex flex-col md:flex-row items-center gap-5 overflow-hidden rounded-3xl border-2 border-accent/60 bg-gradient-gold p-6 md:p-8 shadow-stellar hover:shadow-glow transition-smooth hover:-translate-y-1"
        >
          <span aria-hidden className="absolute inset-0 starfield opacity-40 pointer-events-none" />
          <span aria-hidden className="absolute inset-0 opacity-0 group-hover:opacity-100 animate-shine pointer-events-none" />
          <div className="relative flex h-16 w-16 md:h-20 md:w-20 items-center justify-center rounded-2xl bg-white/25 backdrop-blur-sm ring-2 ring-white/40 shrink-0">
            <Trophy className="h-8 w-8 md:h-10 md:w-10 text-accent-foreground" />
          </div>
          <div className="relative flex-1 text-center md:text-right">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/30 text-accent-foreground text-[11px] font-extrabold mb-2">
              <Sparkles className="h-3 w-3" /> NEW · لعبة فيزياء
            </span>
            <h3 className="font-display text-2xl md:text-3xl font-extrabold text-accent-foreground">
              تحدّي الفيزياء — Quizz
            </h3>
            <p className="mt-1.5 text-sm md:text-base text-accent-foreground/85">
              أجب على أسئلة فيزياء عامة، اربح <strong>coins</strong> ذهبية، واحفظها لمكافآت قادمة 🪙
            </p>
          </div>
          <div className="relative inline-flex items-center gap-2 rounded-full border-2 border-accent-foreground/40 bg-accent-foreground/10 px-5 py-2.5 text-sm font-bold text-accent-foreground shrink-0">
            <Coins className="h-4 w-4" />
            ابدأ اللعبة
            <ArrowLeft className="h-4 w-4 transition-smooth group-hover:-translate-x-1" />
          </div>
        </Link>
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
