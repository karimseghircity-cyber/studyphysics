import { Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useProgress } from "@/hooks/useProgress";
import { cn } from "@/lib/utils";

type Props = {
  section: string;
  stage?: string | null;
  year?: string | null;
  topicKey: string;
  topicLabel?: string;
  className?: string;
};

export const SolvedButton = ({ section, stage, year, topicKey, topicLabel, className }: Props) => {
  const { isSolved, markSolved } = useProgress();
  const solved = isSolved(topicKey);

  return (
    <Button
      onClick={() => markSolved({ section, stage, year, topicKey, topicLabel })}
      disabled={solved}
      className={cn(
        "gap-2",
        solved
          ? "bg-aurora/20 text-foreground hover:bg-aurora/20 cursor-default"
          : "bg-gradient-cosmic text-white shadow-glow hover:opacity-90",
        className
      )}
    >
      {solved ? (
        <>
          <Check className="h-4 w-4" /> تم الحل ✓
        </>
      ) : (
        <>
          <Sparkles className="h-4 w-4" /> تم الحل (+10 XP)
        </>
      )}
    </Button>
  );
};
