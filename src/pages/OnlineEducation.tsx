import { Link } from "react-router-dom";
import { SiteLayout } from "@/components/SiteLayout";
import { CategoryCard } from "@/components/CategoryCard";
import { Video, GraduationCap, Sparkles, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const OnlineEducation = () => {
  return (
    <SiteLayout>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-hero text-primary-foreground">
        <div className="absolute inset-0 starfield opacity-70 pointer-events-none" />
        <div className="absolute inset-0 opacity-50 pointer-events-none">
          <div className="absolute top-10 right-10 h-72 w-72 rounded-full bg-cosmic blur-3xl animate-float" />
          <div className="absolute bottom-10 left-10 h-96 w-96 rounded-full bg-nebula blur-3xl animate-float" style={{ animationDelay: "2s" }} />
        </div>

        <div className="container relative py-16 md:py-20">
          <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-on-hero opacity-80 hover:opacity-100 mb-4">
            <ArrowLeft className="h-4 w-4" />
            الرئيسية
          </Link>
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-sm ring-1 ring-white/30 text-xs font-bold mb-4 text-on-hero">
            <Sparkles className="h-3.5 w-3.5 animate-twinkle" />
            Online Education
          </span>
          <h1 className="font-display text-3xl md:text-5xl font-extrabold leading-tight text-on-hero">
            منصة التعليم عن بُعد
          </h1>
          <p className="mt-4 text-base md:text-lg text-on-hero opacity-90 max-w-2xl">
            تعلّم الفيزياء من بيتك، مع أساتذة مختصّين، وحصص مباشرة وتفاعلية.
          </p>
        </div>
      </section>

      {/* Two main options */}
      <section className="container -mt-10 relative z-10 pb-12">
        <div className="grid md:grid-cols-2 gap-4">
          <CategoryCard
            to="/online/teacher-at-home"
            title="أستاذك في منزلك"
            subtitle="Teacher at Home"
            description="حصص خاصة، فردية أو مجموعات صغيرة، يلتقي بها الأستاذ معك في منزلك أو افتراضياً عبر الإنترنت."
            icon={GraduationCap}
            variant="primary"
          />
          <CategoryCard
            to="/online/zoom"
            title="حصص Zoom"
            subtitle="Live Zoom Classes"
            description="حصص جماعية مباشرة عبر تطبيق Zoom — تفاعل، أسئلة، وتمارين محلولة في الوقت الفعلي."
            icon={Video}
            variant="accent"
          />
        </div>
      </section>

      {/* Highlight strip */}
      <section className="container pb-16">
        <div className="rounded-2xl border border-accent/30 bg-gradient-gold/10 p-6 md:p-8 text-center">
          <h2 className="font-display text-xl md:text-2xl font-bold text-foreground">
            🌟 لماذا التعلّم عن بُعد معنا؟
          </h2>
          <p className="mt-2 text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
            مرونة كاملة في الأوقات، شرح بأسلوب احترافي وعصري، تمارين مرافقة، ومتابعة شخصية لتقدّمك.
          </p>
          <Button asChild size="lg" className="mt-5 bg-gradient-cosmic text-white shadow-glow">
            <Link to="/online/zoom">احجز حصّتك الآن</Link>
          </Button>
        </div>
      </section>
    </SiteLayout>
  );
};

export default OnlineEducation;
