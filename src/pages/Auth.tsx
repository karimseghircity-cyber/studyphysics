import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { z } from "zod";
import { Atom, Mail, Lock, User as UserIcon, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ThemeToggle } from "@/components/theme-toggle";
import { toast } from "@/hooks/use-toast";

const signInSchema = z.object({
  email: z.string().trim().email({ message: "بريد إلكتروني غير صالح" }).max(255),
  password: z.string().min(6, { message: "كلمة السر 6 أحرف على الأقل" }).max(72),
});

const signUpSchema = signInSchema.extend({
  displayName: z.string().trim().min(2, { message: "الاسم قصير جداً" }).max(60),
});

const Auth = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const [tab, setTab] = useState<"signin" | "signup">("signin");
  const [submitting, setSubmitting] = useState(false);

  // sign-in fields
  const [siEmail, setSiEmail] = useState("");
  const [siPassword, setSiPassword] = useState("");

  // sign-up fields
  const [suName, setSuName] = useState("");
  const [suEmail, setSuEmail] = useState("");
  const [suPassword, setSuPassword] = useState("");

  useEffect(() => {
    if (!authLoading && user) navigate("/", { replace: true });
  }, [user, authLoading, navigate]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = signInSchema.safeParse({ email: siEmail, password: siPassword });
    if (!parsed.success) {
      toast({ title: "خطأ", description: parsed.error.issues[0].message, variant: "destructive" });
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.auth.signInWithPassword(parsed.data);
    setSubmitting(false);
    if (error) {
      toast({
        title: "فشل تسجيل الدخول",
        description: error.message.includes("Invalid login")
          ? "البريد أو كلمة السر غير صحيحة"
          : error.message,
        variant: "destructive",
      });
      return;
    }
    toast({ title: "أهلاً بك 👋", description: "تم تسجيل الدخول بنجاح" });
    navigate("/", { replace: true });
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = signUpSchema.safeParse({
      email: suEmail,
      password: suPassword,
      displayName: suName,
    });
    if (!parsed.success) {
      toast({ title: "خطأ", description: parsed.error.issues[0].message, variant: "destructive" });
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.auth.signUp({
      email: parsed.data.email,
      password: parsed.data.password,
      options: {
        emailRedirectTo: `${window.location.origin}/`,
        data: { display_name: parsed.data.displayName },
      },
    });
    setSubmitting(false);
    if (error) {
      toast({
        title: "فشل إنشاء الحساب",
        description: error.message.includes("already")
          ? "هذا البريد مسجّل مسبقاً"
          : error.message,
        variant: "destructive",
      });
      return;
    }
    toast({ title: "تم إنشاء الحساب 🎉", description: "أهلاً بك في منصة الفيزياء" });
    navigate("/", { replace: true });
  };

  const handleGoogle = async () => {
    setSubmitting(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/` },
    });
    if (error) {
      setSubmitting(false);
      toast({
        title: "تعذّر تسجيل الدخول عبر Google",
        description: "تأكد من تفعيل Google في إعدادات Cloud → Authentication.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen relative flex flex-col bg-background overflow-hidden">
      {/* cosmic background */}
      <div aria-hidden className="absolute inset-0 starfield opacity-60" />
      <div
        aria-hidden
        className="absolute -top-32 -right-32 h-[500px] w-[500px] rounded-full bg-primary/20 blur-[120px]"
      />
      <div
        aria-hidden
        className="absolute -bottom-32 -left-32 h-[500px] w-[500px] rounded-full bg-accent/20 blur-[120px]"
      />

      <header className="relative z-10 container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-hero shadow-soft">
            <Atom className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-display text-base font-bold text-foreground">منصة الفيزياء</span>
        </Link>
        <ThemeToggle />
      </header>

      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-8">
        <Card className="w-full max-w-md p-6 md:p-8 bg-card/80 backdrop-blur-xl border-border/60 shadow-elegant">
          <div className="text-center mb-6">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-cosmic shadow-glow">
              <Atom className="h-7 w-7 text-white" />
            </div>
            <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">
              أهلاً بك في منصة الفيزياء
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              سجّل دخولك للوصول إلى جميع الدروس والتمارين والمواضيع.
            </p>
          </div>

          <Tabs value={tab} onValueChange={(v) => setTab(v as "signin" | "signup")}>
            <TabsList className="grid grid-cols-2 w-full mb-5">
              <TabsTrigger value="signin">تسجيل الدخول</TabsTrigger>
              <TabsTrigger value="signup">حساب جديد</TabsTrigger>
            </TabsList>

            <TabsContent value="signin">
              <form onSubmit={handleSignIn} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="si-email">البريد الإلكتروني</Label>
                  <div className="relative">
                    <Mail className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="si-email"
                      type="email"
                      dir="ltr"
                      placeholder="you@example.com"
                      value={siEmail}
                      onChange={(e) => setSiEmail(e.target.value)}
                      className="pr-10"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="si-password">كلمة السر</Label>
                  <div className="relative">
                    <Lock className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="si-password"
                      type="password"
                      dir="ltr"
                      placeholder="••••••••"
                      value={siPassword}
                      onChange={(e) => setSiPassword(e.target.value)}
                      className="pr-10"
                      required
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full" disabled={submitting}>
                  {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "تسجيل الدخول"}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup">
              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="su-name">الاسم الكامل</Label>
                  <div className="relative">
                    <UserIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="su-name"
                      type="text"
                      placeholder="اسمك"
                      value={suName}
                      onChange={(e) => setSuName(e.target.value)}
                      className="pr-10"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="su-email">البريد الإلكتروني</Label>
                  <div className="relative">
                    <Mail className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="su-email"
                      type="email"
                      dir="ltr"
                      placeholder="you@example.com"
                      value={suEmail}
                      onChange={(e) => setSuEmail(e.target.value)}
                      className="pr-10"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="su-password">كلمة السر</Label>
                  <div className="relative">
                    <Lock className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="su-password"
                      type="password"
                      dir="ltr"
                      placeholder="6 أحرف على الأقل"
                      value={suPassword}
                      onChange={(e) => setSuPassword(e.target.value)}
                      className="pr-10"
                      required
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full" disabled={submitting}>
                  {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "إنشاء الحساب"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-3 text-muted-foreground">أو</span>
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            className="w-full gap-2"
            onClick={handleGoogle}
            disabled={submitting}
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            متابعة عبر Google
          </Button>
        </Card>
      </main>
    </div>
  );
};

export default Auth;
