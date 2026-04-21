import { useState } from "react";
import { Atom, Instagram, Phone, GraduationCap, Award, Sparkles, Mail } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import karimImg from "@/assets/karim-seghir.jpg";

// TikTok icon (lucide doesn't ship it)
const TikTokIcon = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.97a8.16 8.16 0 0 0 4.77 1.52V7.05a4.85 4.85 0 0 1-1.84-.36Z" />
  </svg>
);

export const Footer = () => {
  const [open, setOpen] = useState(false);

  return (
    <footer className="border-t border-border bg-card/50 mt-20">
      <div className="container py-10 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-hero">
            <Atom className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="font-display font-bold text-foreground">منصة الفيزياء</span>
        </div>

        <p className="text-sm text-muted-foreground text-center order-3 md:order-2">
          © {new Date().getFullYear()} — كل الحقوق محفوظة. مصدر مجاني للطلبة الجزائريين.
        </p>

        {/* Karim Seghir signature chip */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <button
              className="group relative inline-flex items-center gap-2 rounded-full border border-accent/40 bg-gradient-gold px-3 py-1.5 text-xs font-bold text-accent-foreground shadow-stellar hover:shadow-glow transition-smooth hover:-translate-y-0.5 order-2 md:order-3"
              aria-label="معلومات الأستاذ"
            >
              <span className="relative flex h-6 w-6 items-center justify-center rounded-full overflow-hidden ring-2 ring-accent-foreground/20">
                <img src={karimImg} alt="Karim Seghir" className="h-full w-full object-cover" />
              </span>
              <span className="tracking-wide">By Karim Seghir</span>
              <Sparkles className="h-3 w-3 animate-twinkle" />
              <span aria-hidden className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 animate-shine pointer-events-none" />
            </button>
          </DialogTrigger>

          <DialogContent className="max-w-md p-0 overflow-hidden border-accent/30">
            {/* Hero header */}
            <div className="relative bg-gradient-hero p-6 pb-20 text-center">
              <div aria-hidden className="absolute inset-0 starfield opacity-50" />
              <div className="relative">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-sm ring-1 ring-white/30 text-[11px] font-bold text-white">
                  <Sparkles className="h-3 w-3" /> Physics Teacher
                </span>
                <h3 className="mt-3 font-display text-2xl font-extrabold text-white">
                  Karim Seghir
                </h3>
                <p className="mt-1 text-sm text-white/85">أستاذ العلوم الفيزيائية</p>
              </div>
            </div>

            {/* Avatar */}
            <div className="relative -mt-16 flex justify-center">
              <div className="relative h-28 w-28 rounded-full bg-gradient-gold p-1 shadow-stellar">
                <img
                  src={karimImg}
                  alt="Karim Seghir"
                  className="h-full w-full rounded-full object-cover ring-4 ring-background"
                />
                <span className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-gradient-gold ring-2 ring-background">
                  <Award className="h-3.5 w-3.5 text-accent-foreground" />
                </span>
              </div>
            </div>

            {/* Body */}
            <div className="px-6 pt-4 pb-6">
              {/* Diplomas */}
              <div className="space-y-2 mb-5">
                <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-1.5">
                  <GraduationCap className="h-3.5 w-3.5" />
                  الشهادات / Diplomas
                </h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2 rounded-lg bg-secondary/60 p-2.5">
                    <span className="mt-0.5 text-accent">★</span>
                    <div>
                      <div className="font-semibold text-foreground">المدرسة العليا للأساتذة</div>
                      <div className="text-xs text-muted-foreground">École Normale Supérieure</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-2 rounded-lg bg-secondary/60 p-2.5">
                    <span className="mt-0.5 text-accent">★</span>
                    <div>
                      <div className="font-semibold text-foreground">شهادة أستاذ علوم فيزيائية</div>
                      <div className="text-xs text-muted-foreground">Professor in Physical Sciences</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-2 rounded-lg bg-secondary/60 p-2.5">
                    <span className="mt-0.5 text-accent">★</span>
                    <div>
                      <div className="font-semibold text-foreground">ماستر 2 في الفيزياء النظرية</div>
                      <div className="text-xs text-muted-foreground">Master 2 — Theoretical Physics</div>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Contact */}
              <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">
                التواصل / Contact
              </h4>
              <div className="grid grid-cols-3 gap-2">
                <a
                  href="https://instagram.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-1 rounded-xl bg-gradient-to-br from-pink-500/15 to-purple-500/15 p-3 hover:from-pink-500/25 hover:to-purple-500/25 transition-smooth"
                >
                  <Instagram className="h-5 w-5 text-pink-500" />
                  <span className="text-[11px] font-semibold text-foreground">Instagram</span>
                </a>
                <a
                  href="https://tiktok.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-1 rounded-xl bg-secondary p-3 hover:bg-muted transition-smooth"
                >
                  <TikTokIcon className="h-5 w-5 text-foreground" />
                  <span className="text-[11px] font-semibold text-foreground">TikTok</span>
                </a>
                <a
                  href="tel:+213000000000"
                  className="flex flex-col items-center gap-1 rounded-xl bg-gradient-gold/20 p-3 hover:bg-gradient-gold/30 transition-smooth"
                >
                  <Phone className="h-5 w-5 text-accent" />
                  <span className="text-[11px] font-semibold text-foreground">Téléphone</span>
                </a>
              </div>

              <p className="mt-4 text-center text-[11px] text-muted-foreground">
                اضغط على أي أيقونة للتواصل المباشر
              </p>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </footer>
  );
};
