-- Add XP / Level to profiles
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS xp INTEGER NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS level INTEGER NOT NULL DEFAULT 1;

-- Solved topics tracker
CREATE TABLE IF NOT EXISTS public.solved_topics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  section TEXT NOT NULL,        -- 'bac' | 'bem' | 'exercices' | 'solutions' | 'quiz'
  stage TEXT,                   -- 'moyen' | 'lycee' | null
  year TEXT,                    -- e.g. '2024', '1AS'
  topic_key TEXT NOT NULL,      -- unique slug
  topic_label TEXT,
  xp_awarded INTEGER NOT NULL DEFAULT 10,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, topic_key)
);

ALTER TABLE public.solved_topics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "users view own solved" ON public.solved_topics
  FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "users insert own solved" ON public.solved_topics
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "users delete own solved" ON public.solved_topics
  FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- Study sessions
CREATE TABLE IF NOT EXISTS public.study_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  started_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  ended_at TIMESTAMPTZ,
  duration_seconds INTEGER NOT NULL DEFAULT 0,
  section TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.study_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "users view own sessions" ON public.study_sessions
  FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "users insert own sessions" ON public.study_sessions
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "users update own sessions" ON public.study_sessions
  FOR UPDATE TO authenticated USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_solved_user ON public.solved_topics(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_sessions_user ON public.study_sessions(user_id, started_at DESC);

-- Mark a topic solved (idempotent), award XP and bump level (every 100 XP = 1 level)
CREATE OR REPLACE FUNCTION public.mark_topic_solved(
  _section TEXT,
  _stage TEXT,
  _year TEXT,
  _topic_key TEXT,
  _topic_label TEXT
) RETURNS TABLE(new_xp INTEGER, new_level INTEGER, awarded BOOLEAN)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _uid UUID := auth.uid();
  _xp_award INTEGER := 10;
  _inserted BOOLEAN := FALSE;
  _xp INTEGER;
  _lvl INTEGER;
BEGIN
  IF _uid IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;

  INSERT INTO public.solved_topics(user_id, section, stage, year, topic_key, topic_label, xp_awarded)
  VALUES (_uid, _section, _stage, _year, _topic_key, _topic_label, _xp_award)
  ON CONFLICT (user_id, topic_key) DO NOTHING;

  GET DIAGNOSTICS _inserted = ROW_COUNT;

  IF _inserted THEN
    UPDATE public.profiles
      SET xp = xp + _xp_award,
          level = GREATEST(1, ((xp + _xp_award) / 100) + 1),
          updated_at = now()
      WHERE id = _uid
      RETURNING xp, level INTO _xp, _lvl;
  ELSE
    SELECT xp, level INTO _xp, _lvl FROM public.profiles WHERE id = _uid;
  END IF;

  RETURN QUERY SELECT COALESCE(_xp,0), COALESCE(_lvl,1), _inserted;
END;
$$;