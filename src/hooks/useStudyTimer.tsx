import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

const KEY = "physica-study-seconds";

/**
 * Tracks total study time in localStorage (seconds) while the tab is visible.
 * Periodically flushes a study_session row to the database.
 */
export const useStudyTimer = () => {
  const { user } = useAuth();

  useEffect(() => {
    let last = Date.now();
    let buffered = 0;
    let flushAt = 0;

    const tick = () => {
      if (document.visibilityState !== "visible") {
        last = Date.now();
        return;
      }
      const now = Date.now();
      const delta = Math.min(60, Math.floor((now - last) / 1000));
      last = now;
      if (delta <= 0) return;
      const total = parseInt(localStorage.getItem(KEY) ?? "0", 10) + delta;
      localStorage.setItem(KEY, String(total));
      buffered += delta;
      flushAt += delta;

      if (user && flushAt >= 60) {
        const toFlush = buffered;
        buffered = 0;
        flushAt = 0;
        supabase.from("study_sessions").insert({
          user_id: user.id,
          duration_seconds: toFlush,
          ended_at: new Date().toISOString(),
        });
      }
    };

    const interval = setInterval(tick, 15000);
    return () => clearInterval(interval);
  }, [user]);
};

export const getLocalStudySeconds = () =>
  parseInt(localStorage.getItem(KEY) ?? "0", 10);
