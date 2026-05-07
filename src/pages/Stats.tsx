import { useEffect, useMemo, useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { PageHero } from "@/components/PageHero";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
} from "recharts";
import { useAuth } from "@/hooks/useAuth";
import { useProgress, progressInLevel, xpForLevel } from "@/hooks/useProgress";
import { getLocalStudySeconds } from "@/hooks/useStudyTimer";
import { supabase } from "@/integrations/supabase/client";
import { Trophy, Coins, Flame, Clock, Target, BookCheck, TrendingUp, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

type DayPoint = { day: string; solved: number; minutes: number };

const fmtDuration = (sec: number) => {
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  if (h > 0) return `${h}س ${m}د`;
  return `${m}د`;
};

const Stats = () => {
  const { user } = useAuth();
  const { stats, refresh } = useProgress();
  const [solvedRows, setSolvedRows] = useState<any[]>([]);
  const [sessionRows, setSessionRows] = useState<any[]>([]);
  const [studySec, setStudySec] = useState(0);

  useEffect(() => {
    refresh();
    setStudySec(getLocalStudySeconds());
    if (!user) return;
    (async () => {
      const since = new Date(Date.now() - 30 * 86400_000).toISOString();
      const [{ data: solved }, { data: sessions }] = await Promise.all([
        supabase
          .from("solved_topics")
          .select("section,created_at,topic_label")
          .eq("user_id", user.id)
          .gte("created_at", since)
          .order("created_at", { ascending: false }),
        supabase
          .from("study_sessions")
          .select("started_at,duration_seconds,section")
          .eq("user_id", user.id)
          .gte("started_at", since),
      ]);
      setSolvedRows(solved ?? []);
      setSessionRows(sessions ?? []);
    })();
  }, [user, refresh]);

  // Last 14 days
  const dailySeries: DayPoint[] = useMemo(() => {
    const days: DayPoint[] = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    for (let i = 13; i >= 0; i--) {
      const d = new Date(today.getTime() - i * 86400_000);
      const key = d.toISOString().slice(0, 10);
      const solved = solvedRows.filter((r) => r.created_at?.slice(0, 10) === key).length;
      const minutes = Math.round(
        sessionRows
          .filter((s) => s.started_at?.slice(0, 10) === key)
          .reduce((acc, s) => acc + (s.duration_seconds ?? 0), 0) / 60
      );
      days.push({
        day: d.toLocaleDateString("ar-EG", { weekday: "short" }),
        solved,
        minutes,
      });
    }
    return days;
  }, [solvedRows, sessionRows]);

  // Strength by section
  const sectionStrength = useMemo(() => {
    const counts: Record<string, number> = {};
    solvedRows.forEach((r) => {
      counts[r.section] = (counts[r.section] ?? 0) + 1;
    });
    const labels: Record<string, string> = {
      bac: "BAC",
      bem: "BEM",
      exercices: "تمارين",
      solutions: "حلول",
      quiz: "Quiz",
    };
    return Object.entries(counts).map(([k, v]) => ({ name: labels[k] ?? k, value: v }));
  }, [solvedRows]);

  // Streak (consecutive days with solved or study)
  const streak = useMemo(() => {
    const set = new Set<string>([
      ...solvedRows.map((r) => r.created_at?.slice(0, 10)),
      ...sessionRows.map((r) => r.started_at?.slice(0, 10)),
    ]);
    let s = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    for (let i = 0; i < 365; i++) {
      const k = new Date(today.getTime() - i * 86400_000).toISOString().slice(0, 10);
      if (set.has(k)) s++;
      else if (i > 0) break;
    }
    return s;
  }, [solvedRows, sessionRows]);

  const totalSessionSec = sessionRows.reduce((a, s) => a + (s.duration_seconds ?? 0), 0);
  const totalStudy = totalSessionSec + studySec;
  const xpInLvl = progressInLevel(stats.xp);

  if (!user) {
    return (
      <SiteLayout>
        <PageHero
          eyebrow="Stats"
          title="إحصائياتي"
          description="سجّل الدخول لمتابعة تقدّمك."
          crumbs={[{ label: "إحصائياتي" }]}
        />
        <section className="container py-16 text-center">
          <Button asChild size="lg" className="bg-gradient-cosmic text-white shadow-glow">
            <Link to="/auth">تسجيل الدخول</Link>
          </Button>
        </section>
      </SiteLayout>
    );
  }

  const radial = [{ name: "XP", value: xpInLvl, fill: "hsl(var(--primary))" }];

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Dashboard"
        title="إحصائياتي"
        description="نظرة شاملة على تقدّمك، نقاط قوتك، وزمن دراستك."
        crumbs={[{ label: "إحصائياتي" }]}
      />

      <section className="container py-10 space-y-8">
        {/* TOP CARDS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="p-5 bg-gradient-cosmic text-white shadow-glow border-0">
            <div className="flex items-center gap-3">
              <Trophy className="h-8 w-8" />
              <div>
                <p className="text-xs opacity-80">المستوى</p>
                <p className="font-display text-3xl font-black">{stats.level}</p>
              </div>
            </div>
            <div className="mt-3">
              <Progress value={xpInLvl} className="h-2 bg-white/25" />
              <p className="mt-1 text-[11px] opacity-90">{stats.xp} / {xpForLevel(stats.level)} XP</p>
            </div>
          </Card>

          <Card className="p-5 bg-gradient-gold text-accent-foreground shadow-stellar border-0">
            <div className="flex items-center gap-3">
              <Coins className="h-8 w-8" />
              <div>
                <p className="text-xs opacity-80">النقاط</p>
                <p className="font-display text-3xl font-black">{stats.coins}</p>
              </div>
            </div>
            <p className="mt-3 text-xs opacity-90">من الـ Quizz واكتساب XP</p>
          </Card>

          <Card className="p-5 bg-gradient-card border-2 border-border">
            <div className="flex items-center gap-3">
              <BookCheck className="h-8 w-8 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">مواضيع محلولة</p>
                <p className="font-display text-3xl font-black text-foreground">{stats.solvedCount}</p>
              </div>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">إجمالي ما حللته</p>
          </Card>

          <Card className="p-5 bg-gradient-card border-2 border-border">
            <div className="flex items-center gap-3">
              <Flame className="h-8 w-8 text-destructive" />
              <div>
                <p className="text-xs text-muted-foreground">سلسلة أيام</p>
                <p className="font-display text-3xl font-black text-foreground">{streak}</p>
              </div>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">أيام دراسة متتالية</p>
          </Card>
        </div>

        {/* MID GRID */}
        <div className="grid lg:grid-cols-3 gap-5">
          <Card className="p-6 lg:col-span-2 bg-gradient-card">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="h-5 w-5 text-primary" />
              <h3 className="font-display text-lg font-bold">المواضيع المحلولة (آخر 14 يوم)</h3>
            </div>
            <div className="h-64">
              <ResponsiveContainer>
                <AreaChart data={dailySeries}>
                  <defs>
                    <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.6} />
                      <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0.02} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={11} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} allowDecimals={false} />
                  <Tooltip
                    contentStyle={{
                      background: "hsl(var(--popover))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: 8,
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="solved"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    fill="url(#g1)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-card flex flex-col items-center justify-center">
            <div className="flex items-center gap-2 mb-3 self-start">
              <Target className="h-5 w-5 text-primary" />
              <h3 className="font-display text-lg font-bold">تقدّم المستوى</h3>
            </div>
            <div className="h-52 w-full">
              <ResponsiveContainer>
                <RadialBarChart innerRadius="70%" outerRadius="100%" data={radial} startAngle={90} endAngle={-270}>
                  <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
                  <RadialBar dataKey="value" background cornerRadius={10} />
                </RadialBarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-center -mt-32 font-display text-3xl font-black text-foreground pointer-events-none">{xpInLvl}%</p>
            <p className="text-center mt-24 text-sm text-muted-foreground">
              {100 - xpInLvl} XP للمستوى {stats.level + 1}
            </p>
          </Card>
        </div>

        {/* BOTTOM GRID */}
        <div className="grid lg:grid-cols-3 gap-5">
          <Card className="p-6 lg:col-span-2 bg-gradient-card">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="h-5 w-5 text-primary" />
              <h3 className="font-display text-lg font-bold">دقائق الدراسة اليومية</h3>
            </div>
            <div className="h-60">
              <ResponsiveContainer>
                <BarChart data={dailySeries}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={11} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} />
                  <Tooltip
                    contentStyle={{
                      background: "hsl(var(--popover))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: 8,
                    }}
                  />
                  <Bar dataKey="minutes" fill="hsl(var(--accent))" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              إجمالي وقت الدراسة: <strong className="text-foreground">{fmtDuration(totalStudy)}</strong>
            </p>
          </Card>

          <Card className="p-6 bg-gradient-card">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="h-5 w-5 text-primary" />
              <h3 className="font-display text-lg font-bold">نقاط القوة</h3>
            </div>
            {sectionStrength.length === 0 ? (
              <p className="text-sm text-muted-foreground">ابدأ بحل المواضيع لتظهر نقاط قوتك.</p>
            ) : (
              <ul className="space-y-3">
                {sectionStrength.map((s) => {
                  const max = Math.max(...sectionStrength.map((x) => x.value));
                  const pct = Math.round((s.value / max) * 100);
                  return (
                    <li key={s.name}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-semibold">{s.name}</span>
                        <span className="text-muted-foreground">{s.value}</span>
                      </div>
                      <Progress value={pct} className="h-2" />
                    </li>
                  );
                })}
              </ul>
            )}
          </Card>
        </div>

        {/* RECENT */}
        <Card className="p-6 bg-gradient-card">
          <h3 className="font-display text-lg font-bold mb-4">آخر مواضيع محلولة</h3>
          {solvedRows.length === 0 ? (
            <p className="text-sm text-muted-foreground">لا يوجد بعد. اضغط زر «تم الحل» في أي موضوع لبدء التتبع.</p>
          ) : (
            <ul className="divide-y divide-border">
              {solvedRows.slice(0, 8).map((r, i) => (
                <li key={i} className="flex items-center justify-between py-2 text-sm">
                  <span className="font-medium">{r.topic_label ?? "موضوع"}</span>
                  <span className="text-xs text-muted-foreground">
                    {new Date(r.created_at).toLocaleDateString("ar-EG")}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </section>
    </SiteLayout>
  );
};

export default Stats;
