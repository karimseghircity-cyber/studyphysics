import { SiteLayout } from "@/components/SiteLayout";
import { PageHero } from "@/components/PageHero";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, Award, GraduationCap, MapPin, Sparkles, MessageCircle } from "lucide-react";
import karimImg from "@/assets/karim-seghir.jpg";

type Teacher = {
  id: string;
  name: string;
  subject: string;
  level: string;
  city: string;
  phone: string;
  whatsapp?: string;
  bio: string;
  diplomas: string[];
  image?: string;
  featured?: boolean;
};

const TEACHERS: Teacher[] = [
  {
    id: "karim-seghir",
    name: "Karim Seghir",
    subject: "علوم فيزيائية",
    level: "متوسط · ثانوي · بكالوريا",
    city: "الجزائر",
    phone: "0782688176",
    whatsapp: "213782688176",
    bio: "أستاذ علوم فيزيائية، خرّيج المدرسة العليا للأساتذة، حاصل على شهادة ماستر 2 في الفيزياء النظرية. خبرة متعددة في تحضير طلبة البكالوريا.",
    diplomas: ["المدرسة العليا للأساتذة (ENS)", "أستاذ علوم فيزيائية", "ماستر 2 — فيزياء نظرية"],
    image: karimImg,
    featured: true,
  },
];

const TeacherAtHome = () => (
  <SiteLayout>
    <PageHero
      eyebrow="Teacher at Home"
      title="أستاذك في منزلك"
      description="حصص خاصة، فردية أو مجموعات صغيرة، يأتيك الأستاذ إلى المنزل أو يقدّمها أونلاين."
      crumbs={[{ label: "التعليم عن بُعد", to: "/online" }, { label: "أستاذك في منزلك" }]}
    />

    <section className="container py-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {TEACHERS.map((t) => (
        <Card
          key={t.id}
          className="relative overflow-hidden border-2 hover:border-primary/50 hover:shadow-elegant transition-smooth hover:-translate-y-1 group"
        >
          {t.featured && (
            <span className="absolute top-3 left-3 z-10 inline-flex items-center gap-1 rounded-full bg-gradient-gold px-2.5 py-1 text-[10px] font-extrabold text-accent-foreground shadow-stellar">
              <Sparkles className="h-3 w-3" /> مميّز
            </span>
          )}

          <div className="relative h-32 bg-gradient-hero overflow-hidden">
            <div className="absolute inset-0 starfield opacity-60" />
          </div>

          <div className="px-5 pb-5 -mt-12 relative">
            <div className="flex items-end gap-3 mb-3">
              <div className="h-24 w-24 rounded-2xl bg-gradient-gold p-1 shadow-stellar shrink-0">
                {t.image ? (
                  <img src={t.image} alt={t.name} className="h-full w-full rounded-xl object-cover ring-2 ring-background" />
                ) : (
                  <div className="h-full w-full rounded-xl bg-secondary flex items-center justify-center text-3xl font-black text-primary">
                    {t.name.charAt(0)}
                  </div>
                )}
              </div>
              <div className="pb-1">
                <h3 className="font-display text-lg font-extrabold text-foreground leading-tight">{t.name}</h3>
                <p className="text-xs text-primary font-bold">{t.subject}</p>
              </div>
            </div>

            <div className="space-y-1.5 text-xs text-muted-foreground mb-4">
              <p className="flex items-center gap-1.5"><GraduationCap className="h-3.5 w-3.5 text-primary" /> {t.level}</p>
              <p className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-primary" /> {t.city}</p>
            </div>

            <p className="text-sm text-foreground/85 leading-relaxed mb-4 line-clamp-3">{t.bio}</p>

            <div className="space-y-1.5 mb-4">
              {t.diplomas.map((d) => (
                <div key={d} className="flex items-start gap-1.5 text-[11px]">
                  <Award className="h-3 w-3 text-accent mt-0.5 shrink-0" />
                  <span className="text-foreground/75">{d}</span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-2">
              <Button asChild size="sm" className="bg-gradient-cosmic text-white shadow-glow">
                <a href={`tel:${t.phone}`}>
                  <Phone className="ml-1 h-3.5 w-3.5" /> اتصال
                </a>
              </Button>
              {t.whatsapp && (
                <Button asChild size="sm" variant="outline" className="border-green-500/50 text-green-600 hover:bg-green-500/10">
                  <a href={`https://wa.me/${t.whatsapp}`} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="ml-1 h-3.5 w-3.5" /> WhatsApp
                  </a>
                </Button>
              )}
            </div>

            <p dir="ltr" className="mt-2 text-center text-xs font-mono text-muted-foreground">{t.phone}</p>
          </div>
        </Card>
      ))}

      {/* Placeholder card for future teachers */}
      <Card className="border-2 border-dashed border-border bg-muted/20 flex flex-col items-center justify-center text-center p-8 min-h-[420px]">
        <GraduationCap className="h-12 w-12 text-muted-foreground/40 mb-3" />
        <h3 className="font-bold text-foreground/70 mb-1">المزيد من الأساتذة قريباً</h3>
        <p className="text-xs text-muted-foreground">سيتم إضافة أساتذة في الرياضيات والعلوم.</p>
      </Card>
    </section>
  </SiteLayout>
);

export default TeacherAtHome;
