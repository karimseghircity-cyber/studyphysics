import { useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { PageHero } from "@/components/PageHero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle2, Calendar, Clock, User, Phone, GraduationCap, Sparkles } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const TEACHERS = [
  { id: "karim", name: "Karim Seghir", subject: "علوم فيزيائية" },
];
const DURATIONS = ["1 ساعة", "1 ساعة و30 دقيقة", "2 ساعة"];
const TIMES = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00"];

const ZoomBooking = () => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    teacher: "karim",
    day: "",
    time: "",
    duration: DURATIONS[0],
  });

  const update = (k: keyof typeof form) => (v: string) => setForm((f) => ({ ...f, [k]: v }));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.firstName || !form.lastName || !form.phone || !form.day || !form.time) {
      toast({ title: "يرجى إكمال جميع الحقول", variant: "destructive" });
      return;
    }
    setSubmitted(true);
    toast({ title: "تم استلام الحجز ✅", description: "سنتواصل معك قريباً لتأكيد الموعد." });
  };

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Zoom Live"
        title="احجز حصّتك المباشرة"
        description="املأ النموذج لحجز حصة Zoom مع الأستاذ. سيتم التأكيد عبر الهاتف."
        crumbs={[{ label: "التعليم عن بُعد", to: "/online" }, { label: "Zoom" }]}
      />

      <section className="container py-10 grid lg:grid-cols-[1fr_320px] gap-8">
        <Card className="p-6 md:p-8 bg-gradient-card border-2">
          {submitted ? (
            <div className="py-12 text-center">
              <CheckCircle2 className="mx-auto h-16 w-16 text-primary mb-4" />
              <h2 className="font-display text-2xl font-bold mb-2">تم استلام طلب الحجز</h2>
              <p className="text-muted-foreground">سنتواصل معك على الرقم {form.phone} لتأكيد الموعد.</p>
              <Button className="mt-6" onClick={() => setSubmitted(false)}>حجز جديد</Button>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label className="mb-1.5 inline-flex items-center gap-1.5"><User className="h-3.5 w-3.5" />الاسم</Label>
                  <Input value={form.firstName} onChange={(e) => update("firstName")(e.target.value)} placeholder="مثال: أحمد" />
                </div>
                <div>
                  <Label className="mb-1.5 inline-flex items-center gap-1.5"><User className="h-3.5 w-3.5" />اللقب</Label>
                  <Input value={form.lastName} onChange={(e) => update("lastName")(e.target.value)} placeholder="مثال: بن علي" />
                </div>
              </div>

              <div>
                <Label className="mb-1.5 inline-flex items-center gap-1.5"><Phone className="h-3.5 w-3.5" />رقم الهاتف</Label>
                <Input dir="ltr" value={form.phone} onChange={(e) => update("phone")(e.target.value)} placeholder="0xxxxxxxxx" />
              </div>

              <div>
                <Label className="mb-1.5 inline-flex items-center gap-1.5"><GraduationCap className="h-3.5 w-3.5" />الأستاذ</Label>
                <Select value={form.teacher} onValueChange={update("teacher")}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {TEACHERS.map((t) => (
                      <SelectItem key={t.id} value={t.id}>{t.name} — {t.subject}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid sm:grid-cols-3 gap-4">
                <div>
                  <Label className="mb-1.5 inline-flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" />اليوم</Label>
                  <Input type="date" value={form.day} onChange={(e) => update("day")(e.target.value)} />
                </div>
                <div>
                  <Label className="mb-1.5 inline-flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" />التوقيت</Label>
                  <Select value={form.time} onValueChange={update("time")}>
                    <SelectTrigger><SelectValue placeholder="اختر" /></SelectTrigger>
                    <SelectContent>
                      {TIMES.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="mb-1.5 inline-flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" />المدة</Label>
                  <Select value={form.duration} onValueChange={update("duration")}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {DURATIONS.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button type="submit" size="lg" className="w-full bg-gradient-cosmic text-white shadow-glow">
                <Sparkles className="ml-2 h-4 w-4" />
                تأكيد الحجز
              </Button>
            </form>
          )}
        </Card>

        <aside className="space-y-4">
          <Card className="p-5 bg-gradient-gold/10 border-accent/40">
            <h3 className="font-display text-lg font-bold mb-2">لماذا Zoom؟</h3>
            <ul className="text-sm text-muted-foreground space-y-1.5">
              <li>✅ تفاعل مباشر مع الأستاذ</li>
              <li>✅ شرح بالسبورة الإلكترونية</li>
              <li>✅ تسجيل الحصة لمراجعتها لاحقاً</li>
              <li>✅ مجموعات صغيرة لاهتمام أكبر</li>
            </ul>
          </Card>
          <Card className="p-5">
            <h3 className="font-display text-lg font-bold mb-1">الدفع</h3>
            <p className="text-sm text-muted-foreground">يتم تأكيد التفاصيل والأسعار عبر الهاتف بعد الحجز.</p>
          </Card>
        </aside>
      </section>
    </SiteLayout>
  );
};

export default ZoomBooking;
