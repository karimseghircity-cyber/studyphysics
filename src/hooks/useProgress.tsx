import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";

export type ProfileStats = {
  xp: number;
  level: number;
  coins: number;
  solvedCount: number;
};

export const xpForLevel = (level: number) => level * 100;
export const progressInLevel = (xp: number) => xp % 100;

export const useProgress = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<ProfileStats>({ xp: 0, level: 1, coins: 0, solvedCount: 0 });
  const [solvedKeys, setSolvedKeys] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(false);

  const refresh = useCallback(async () => {
    if (!user) {
      setStats({ xp: 0, level: 1, coins: 0, solvedCount: 0 });
      setSolvedKeys(new Set());
      return;
    }
    setLoading(true);
    const [{ data: profile }, { data: solved }] = await Promise.all([
      supabase.from("profiles").select("xp,level,coins").eq("id", user.id).maybeSingle(),
      supabase.from("solved_topics").select("topic_key").eq("user_id", user.id),
    ]);
    setStats({
      xp: (profile as any)?.xp ?? 0,
      level: (profile as any)?.level ?? 1,
      coins: (profile as any)?.coins ?? 0,
      solvedCount: solved?.length ?? 0,
    });
    setSolvedKeys(new Set((solved ?? []).map((r: any) => r.topic_key)));
    setLoading(false);
  }, [user]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const markSolved = useCallback(
    async (args: {
      section: string;
      stage?: string | null;
      year?: string | null;
      topicKey: string;
      topicLabel?: string;
    }) => {
      if (!user) {
        toast({ title: "سجّل الدخول لتتبّع تقدّمك", variant: "destructive" });
        return null;
      }
      const { data, error } = await (supabase.rpc as any)("mark_topic_solved", {
        _section: args.section,
        _stage: args.stage ?? null,
        _year: args.year ?? null,
        _topic_key: args.topicKey,
        _topic_label: args.topicLabel ?? null,
      });
      if (error) {
        toast({ title: "خطأ", description: error.message, variant: "destructive" });
        return null;
      }
      const row = Array.isArray(data) ? data[0] : data;
      if (row?.awarded) {
        toast({ title: "🎉 +10 XP", description: `أحسنت! المستوى ${row.new_level}` });
      } else {
        toast({ title: "✓ محلول مسبقاً" });
      }
      await refresh();
      return row;
    },
    [user, refresh]
  );

  const isSolved = useCallback((key: string) => solvedKeys.has(key), [solvedKeys]);

  return { stats, isSolved, markSolved, refresh, loading };
};
