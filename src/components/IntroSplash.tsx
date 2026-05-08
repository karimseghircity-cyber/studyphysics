import { useEffect, useState } from "react";
import { Atom, Sparkles } from "lucide-react";

const KEY = "physica.intro.shown";

export const IntroSplash = () => {
  const [show, setShow] = useState(false);
  const [hide, setHide] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(KEY)) return;
    setShow(true);
    sessionStorage.setItem(KEY, "1");
    const t1 = setTimeout(() => setHide(true), 2200);
    const t2 = setTimeout(() => setShow(false), 2800);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  if (!show) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-gradient-hero transition-opacity duration-700 ${
        hide ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="absolute inset-0 starfield opacity-80" />
      <div className="absolute inset-0 opacity-60">
        <div className="absolute top-1/4 left-1/4 h-72 w-72 rounded-full bg-cosmic blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-nebula blur-3xl animate-float" style={{ animationDelay: "1s" }} />
      </div>

      <div className="relative flex flex-col items-center gap-5 animate-intro-zoom">
        <div className="relative">
          <div className="absolute inset-0 rounded-3xl bg-gradient-cosmic blur-2xl opacity-80 animate-pulse" />
          <div className="relative flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-cosmic shadow-glow animate-intro-spin">
            <Atom className="h-12 w-12 text-white" />
          </div>
        </div>

        <h1
          className="font-display text-6xl md:text-8xl font-black tracking-tight bg-clip-text text-transparent animate-intro-letters"
          style={{
            backgroundImage:
              "linear-gradient(90deg, hsl(188 100% 70%), hsl(258 95% 80%), hsl(330 95% 75%))",
            WebkitTextFillColor: "transparent",
          }}
        >
          Physica
        </h1>

        <div className="flex items-center gap-2 text-white/90 text-sm md:text-base font-medium">
          <Sparkles className="h-4 w-4 animate-twinkle text-accent" />
          <span>تجربة ممتعة تجعلك تدمن الفيزياء</span>
          <Sparkles className="h-4 w-4 animate-twinkle text-accent" />
        </div>

        <div className="mt-2 h-1 w-48 overflow-hidden rounded-full bg-white/20">
          <div className="h-full w-full bg-gradient-cosmic animate-intro-bar" />
        </div>
      </div>
    </div>
  );
};
