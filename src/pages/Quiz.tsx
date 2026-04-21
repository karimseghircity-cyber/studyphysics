import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Coins, Sparkles, RotateCw, Trophy, Check, X as XIcon, ArrowLeft } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { quizBank, QuizQuestion } from "@/data/quizBank";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const QUESTIONS_PER_GAME = 10;
const COINS_PER_CORRECT = 5;

const shuffle = <T,>(arr: T[]): T[] => {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

const Quiz = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [coinsTotal, setCoinsTotal] = useState<number | null>(null);
  const [savingResult, setSavingResult] = useState(false);

  const startNewGame = () => {
    setQuestions(shuffle(quizBank).slice(0, QUESTIONS_PER_GAME));
    setIndex(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
  };

  useEffect(() => {
    startNewGame();
  }, []);

  // Load user coins
  useEffect(() => {
    if (!user) return;
    supabase
      .from("profiles")
      .select("coins")
      .eq("id", user.id)
      .maybeSingle()
      .then(({ data }) => {
        if (data) setCoinsTotal(data.coins ?? 0);
      });
  }, [user]);

  const current = questions[index];
  const progress = useMemo(
    () => (questions.length ? ((index + (selected !== null ? 1 : 0)) / questions.length) * 100 : 0),
    [index, selected, questions.length]
  );

  const handleAnswer = (i: number) => {
    if (selected !== null) return;
    setSelected(i);
    if (i === current.correct) setScore((s) => s + 1);
  };

  const handleNext = async () => {
    if (index + 1 < questions.length) {
      setIndex((i) => i + 1);
      setSelected(null);
      return;
    }
    // finished
    setFinished(true);
    if (user) {
      setSavingResult(true);
      const finalScore = score + (selected === current.correct ? 0 : 0); // already added
      const earned = finalScore * COINS_PER_CORRECT;
      // Award coins via secure function
      const { data: newTotal, error: rpcErr } = await supabase.rpc("award_coins", { _amount: earned });
      if (!rpcErr && typeof newTotal === "number") setCoinsTotal(newTotal);
      // Log attempt
      await supabase.from("quiz_attempts").insert({
        user_id: user.id,
        score: finalScore,
        total_questions: questions.length,
        coins_earned: earned,
      });
      setSavingResult(false);
    }
  };

  if (!current) {
    return (
      <SiteLayout>
        <div className="container py-20 text-center text-muted-foreground">جاري التحميل…</div>
      </SiteLayout>
    );
  }

  const earnedThisGame = score * COINS_PER_CORRECT;

  return (
    <SiteLayout>
      <div className="container py-8 md:py-12 max-w-2xl">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            رجوع
          </button>
          {user && coinsTotal !== null && (
            <div className="inline-flex items-center gap-2 rounded-full bg-gradient-gold px-3 py-1.5 text-sm font-bold text-accent-foreground shadow-stellar">
              <Coins className="h-4 w-4" />
              {coinsTotal} <span className="text-xs opacity-80">coins</span>
            </div>
          )}
        </div>

        {/* Title */}
        <div className="text-center mb-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-gold text-accent-foreground text-xs font-bold mb-3">
            <Sparkles className="h-3 w-3" /> Physics Quizz
          </span>
          <h1 className="font-display text-2xl md:text-4xl font-extrabold text-foreground">
            تحدّي الفيزياء
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            أجب وكسب {COINS_PER_CORRECT} coins لكل إجابة صحيحة!
          </p>
        </div>

        {!finished ? (
          <Card className="p-6 md:p-8 bg-card border-border shadow-elegant">
            {/* Progress */}
            <div className="mb-5">
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                <span>سؤال {index + 1} من {questions.length}</span>
                <span>النقاط: {score}</span>
              </div>
              <div className="h-2 rounded-full bg-secondary overflow-hidden">
                <div
                  className="h-full bg-gradient-cosmic transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Question */}
            <h2 className="font-display text-lg md:text-xl font-bold text-foreground mb-5 leading-relaxed">
              {current.q}
            </h2>

            {/* Choices */}
            <div className="space-y-2.5">
              {current.choices.map((c, i) => {
                const isSelected = selected === i;
                const isCorrect = i === current.correct;
                const showResult = selected !== null;
                return (
                  <button
                    key={i}
                    onClick={() => handleAnswer(i)}
                    disabled={selected !== null}
                    className={cn(
                      "w-full flex items-center justify-between gap-3 rounded-xl border-2 p-3.5 text-right transition-smooth",
                      "hover:-translate-y-0.5",
                      !showResult && "border-border bg-secondary/40 hover:border-primary hover:bg-secondary",
                      showResult && isCorrect && "border-green-500 bg-green-500/10 text-foreground",
                      showResult && isSelected && !isCorrect && "border-destructive bg-destructive/10 text-foreground",
                      showResult && !isCorrect && !isSelected && "border-border bg-secondary/30 opacity-60"
                    )}
                  >
                    <span className="flex-1 text-sm md:text-base font-medium">{c}</span>
                    {showResult && isCorrect && <Check className="h-5 w-5 text-green-500 shrink-0" />}
                    {showResult && isSelected && !isCorrect && <XIcon className="h-5 w-5 text-destructive shrink-0" />}
                  </button>
                );
              })}
            </div>

            {selected !== null && (
              <Button
                onClick={handleNext}
                className="w-full mt-5 bg-gradient-cosmic text-white hover:opacity-90 shadow-glow"
                size="lg"
              >
                {index + 1 < questions.length ? "السؤال التالي" : "إنهاء التحدّي"}
              </Button>
            )}
          </Card>
        ) : (
          /* RESULTS */
          <Card className="p-6 md:p-10 text-center bg-card border-border shadow-elegant">
            <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-gold shadow-stellar animate-coin-pop">
              <Trophy className="h-10 w-10 text-accent-foreground" />
            </div>
            <h2 className="font-display text-3xl font-extrabold text-foreground mb-2">
              {score === questions.length ? "ممتاز! نتيجة كاملة 🎉" : score >= questions.length / 2 ? "أحسنت!" : "حاول مجدداً!"}
            </h2>
            <p className="text-muted-foreground mb-6">
              نتيجتك: <span className="font-bold text-foreground">{score} / {questions.length}</span>
            </p>

            <div className="inline-flex items-center gap-2 rounded-full bg-gradient-gold px-5 py-2.5 text-base font-extrabold text-accent-foreground shadow-stellar mb-6 animate-coin-pop">
              <Coins className="h-5 w-5" />
              +{earnedThisGame} coins
            </div>

            {!user && (
              <p className="text-xs text-muted-foreground mb-4">
                💡 سجّل الدخول لحفظ النقاط ومتابعة تقدّمك
              </p>
            )}
            {user && coinsTotal !== null && (
              <p className="text-sm text-foreground mb-4">
                رصيدك الحالي: <span className="font-bold text-accent">{coinsTotal} coins</span>
                {savingResult && " (جاري الحفظ…)"}
              </p>
            )}

            <div className="flex flex-col sm:flex-row gap-2 justify-center">
              <Button onClick={startNewGame} className="bg-gradient-cosmic text-white shadow-glow" size="lg">
                <RotateCw className="ml-2 h-4 w-4" />
                لعبة جديدة
              </Button>
              <Button onClick={() => navigate("/")} variant="outline" size="lg">
                العودة للرئيسية
              </Button>
            </div>
          </Card>
        )}
      </div>
    </SiteLayout>
  );
};

export default Quiz;
