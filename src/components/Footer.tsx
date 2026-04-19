import { Atom } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="border-t border-border bg-card/50 mt-20">
      <div className="container py-10 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-hero">
            <Atom className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="font-display font-bold text-foreground">منصة الفيزياء</span>
        </div>
        <p className="text-sm text-muted-foreground text-center">
          © {new Date().getFullYear()} — كل الحقوق محفوظة. مصدر مجاني للطلبة الجزائريين.
        </p>
      </div>
    </footer>
  );
};
