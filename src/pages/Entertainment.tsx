import { useParams, Link } from "react-router-dom";
import { useState, useMemo } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { PageHero } from "@/components/PageHero";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Film,
  Gamepad2,
  ArrowLeft,
  Calendar,
  User,
  Sparkles,
  ExternalLink,
  Atom,
  Award,
  Search,
  MapPin,
  Trophy,
} from "lucide-react";
import { PHYSICS_MOVIES, PHYSICS_GAMES, Movie, Game } from "@/data/entertainment";
import { PHYSICISTS } from "@/data/physicists";
import { NOBEL_PHYSICS } from "@/data/nobelPhysics";

/* ───────────── HUB ───────────── */
const Entertainment = () => (
  <SiteLayout>
    <PageHero
      eyebrow="Entertainment"
      title="فيزياء الترفيه"
      description="أفلام، ألعاب، علماء، وجوائز نوبل — اكتشف عالم الفيزياء بطريقة ممتعة."
      crumbs={[{ label: "Entertainment" }]}
    />
    <section className="container py-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <HubCard
        to="/entertainment/movies"
        icon={<Film className="h-7 w-7" />}
        title="أفلام الفيزياء"
        desc="Interstellar · Oppenheimer …"
        gradient="bg-gradient-cosmic"
      />
      <HubCard
        to="/entertainment/games"
        icon={<Gamepad2 className="h-7 w-7" />}
        title="ألعاب الفيزياء"
        desc="Kerbal · Portal · Universe Sandbox"
        gradient="bg-gradient-gold"
      />
      <HubCard
        to="/entertainment/physicists"
        icon={<Atom className="h-7 w-7" />}
        title="علماء الفيزياء"
        desc={`${PHYSICISTS.length}+ من أعظم علماء الفيزياء`}
        gradient="bg-gradient-to-br from-violet-600 to-fuchsia-600"
      />
      <HubCard
        to="/entertainment/nobel"
        icon={<Award className="h-7 w-7" />}
        title="جائزة نوبل في الفيزياء"
        desc="من 1901 إلى اليوم — كل الجوائز"
        gradient="bg-gradient-to-br from-amber-500 to-orange-600"
      />
    </section>
  </SiteLayout>
);
export default Entertainment;

const HubCard = ({
  to,
  icon,
  title,
  desc,
  gradient,
}: {
  to: string;
  icon: React.ReactNode;
  title: string;
  desc: string;
  gradient: string;
}) => (
  <Link
    to={to}
    className="group rounded-3xl border-2 border-border bg-gradient-card p-6 shadow-elegant hover:shadow-glow hover:-translate-y-1 transition-smooth"
  >
    <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${gradient} text-white shadow-glow mb-4`}>
      {icon}
    </div>
    <h3 className="font-display text-xl font-bold">{title}</h3>
    <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
    <span className="mt-4 inline-flex items-center gap-2 text-primary font-semibold text-sm">
      استكشف <ArrowLeft className="h-4 w-4 transition-smooth group-hover:-translate-x-1" />
    </span>
  </Link>
);

/* ───────── Movie/Game cards ───────── */
const PosterCard = ({ item, to, kind }: { item: Movie | Game; to: string; kind: "movie" | "game" }) => (
  <Link
    to={to}
    className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-soft hover:shadow-elegant hover:-translate-y-1 transition-smooth"
  >
    <div className={`relative aspect-[2/3] overflow-hidden bg-gradient-to-br ${item.poster}`}>
      {item.posterUrl ? (
        <>
          <img
            src={item.posterUrl}
            alt={item.title}
            loading="lazy"
            referrerPolicy="no-referrer"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-3 text-white">
            <h3 className="font-display text-base font-extrabold drop-shadow-lg line-clamp-1">{item.title}</h3>
            {"year" in item && <p className="text-[11px] text-white/85">{(item as Movie).year}</p>}
          </div>
        </>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center p-6">
          <div className="absolute inset-0 starfield opacity-50" />
          <div className="relative text-center">
            {kind === "movie" ? <Film className="mx-auto h-12 w-12 text-white/80 mb-3" /> : <Gamepad2 className="mx-auto h-12 w-12 text-white/80 mb-3" />}
            <h3 className="font-display text-xl font-black text-white drop-shadow-lg">{item.title}</h3>
          </div>
        </div>
      )}
    </div>
    <div className="p-4">
      <p className="text-xs text-primary font-bold mb-1">{item.topic}</p>
      <p className="text-sm text-muted-foreground line-clamp-2">{item.short}</p>
    </div>
  </Link>
);

export const MoviesIndex = () => (
  <SiteLayout>
    <PageHero
      eyebrow="Movies"
      title="أفلام الفيزياء"
      description="مجموعة مختارة من الأفلام التي تستلهم من الفيزياء الحقيقية."
      crumbs={[{ label: "Entertainment", to: "/entertainment" }, { label: "أفلام" }]}
    />
    <section className="container py-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
      {PHYSICS_MOVIES.map((m) => (
        <PosterCard key={m.id} item={m} to={`/entertainment/movies/${m.id}`} kind="movie" />
      ))}
    </section>
  </SiteLayout>
);

export const GamesIndex = () => (
  <SiteLayout>
    <PageHero
      eyebrow="Games"
      title="ألعاب الفيزياء"
      description="ألعاب تعتمد على فيزياء حقيقية ومحاكاة علمية."
      crumbs={[{ label: "Entertainment", to: "/entertainment" }, { label: "ألعاب" }]}
    />
    <section className="container py-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
      {PHYSICS_GAMES.map((g) => (
        <PosterCard key={g.id} item={g} to={`/entertainment/games/${g.id}`} kind="game" />
      ))}
    </section>
  </SiteLayout>
);

export const MovieDetail = () => {
  const { id } = useParams();
  const m = PHYSICS_MOVIES.find((x) => x.id === id);
  if (!m) return <SiteLayout><div className="container py-20 text-center">غير موجود</div></SiteLayout>;
  return (
    <SiteLayout>
      <PageHero
        eyebrow={`Film · ${m.year}`}
        title={m.title}
        description={m.topic}
        crumbs={[
          { label: "Entertainment", to: "/entertainment" },
          { label: "أفلام", to: "/entertainment/movies" },
          { label: m.title },
        ]}
      />
      <section className="container py-12 grid md:grid-cols-[300px_1fr] gap-8">
        <div className={`relative aspect-[2/3] overflow-hidden rounded-2xl bg-gradient-to-br ${m.poster} shadow-elegant`}>
          {m.posterUrl ? (
            <img src={m.posterUrl} alt={m.title} referrerPolicy="no-referrer" className="absolute inset-0 h-full w-full object-cover" />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center p-6">
              <div className="absolute inset-0 starfield opacity-50" />
              <div className="relative text-center">
                <Film className="mx-auto h-16 w-16 text-white/80 mb-3" />
                <h3 className="font-display text-3xl font-black text-white drop-shadow-lg">{m.title}</h3>
                <p className="mt-2 text-white/85">{m.year}</p>
              </div>
            </div>
          )}
        </div>
        <Card className="p-6 md:p-8 bg-gradient-card">
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
            <span className="inline-flex items-center gap-1.5"><User className="h-4 w-4" /> {m.director}</span>
            <span className="inline-flex items-center gap-1.5"><Calendar className="h-4 w-4" /> {m.year}</span>
            <span className="inline-flex items-center gap-1.5"><Sparkles className="h-4 w-4" /> {m.topic}</span>
          </div>
          <h2 className="font-display text-2xl font-bold mb-3">القصة والفيزياء</h2>
          <p className="leading-loose text-foreground/90">{m.long}</p>
          {m.imdb && (
            <Button asChild variant="outline" className="mt-6">
              <a href={`https://www.imdb.com/title/${m.imdb}`} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="ml-2 h-4 w-4" /> IMDb
              </a>
            </Button>
          )}
        </Card>
      </section>
    </SiteLayout>
  );
};

export const GameDetail = () => {
  const { id } = useParams();
  const g = PHYSICS_GAMES.find((x) => x.id === id);
  if (!g) return <SiteLayout><div className="container py-20 text-center">غير موجود</div></SiteLayout>;
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Game"
        title={g.title}
        description={g.topic}
        crumbs={[
          { label: "Entertainment", to: "/entertainment" },
          { label: "ألعاب", to: "/entertainment/games" },
          { label: g.title },
        ]}
      />
      <section className="container py-12 grid md:grid-cols-[300px_1fr] gap-8">
        <div className={`relative aspect-[2/3] overflow-hidden rounded-2xl bg-gradient-to-br ${g.poster} shadow-elegant`}>
          {g.posterUrl ? (
            <img src={g.posterUrl} alt={g.title} referrerPolicy="no-referrer" className="absolute inset-0 h-full w-full object-cover" />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center p-6">
              <div className="absolute inset-0 starfield opacity-50" />
              <div className="relative text-center">
                <Gamepad2 className="mx-auto h-16 w-16 text-white/80 mb-3" />
                <h3 className="font-display text-3xl font-black text-white drop-shadow-lg">{g.title}</h3>
                <p className="mt-2 text-white/85">{g.platform}</p>
              </div>
            </div>
          )}
        </div>
        <Card className="p-6 md:p-8 bg-gradient-card">
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
            <span className="inline-flex items-center gap-1.5"><Gamepad2 className="h-4 w-4" /> {g.platform}</span>
            <span className="inline-flex items-center gap-1.5"><Sparkles className="h-4 w-4" /> {g.topic}</span>
          </div>
          <h2 className="font-display text-2xl font-bold mb-3">عن اللعبة</h2>
          <p className="leading-loose text-foreground/90">{g.long}</p>
          {g.url && (
            <Button asChild variant="outline" className="mt-6">
              <a href={g.url} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="ml-2 h-4 w-4" /> الموقع الرسمي
              </a>
            </Button>
          )}
        </Card>
      </section>
    </SiteLayout>
  );
};

/* ───────── PHYSICISTS ───────── */
export const PhysicistsIndex = () => {
  const [q, setQ] = useState("");
  const list = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return PHYSICISTS;
    return PHYSICISTS.filter(
      (p) =>
        p.name.toLowerCase().includes(s) ||
        p.nameAr.includes(s) ||
        p.field.toLowerCase().includes(s),
    );
  }, [q]);

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Physicists"
        title="علماء الفيزياء"
        description="من ابن الهيثم إلى أينشتاين وهوكينغ — تعرّف على أعظم العقول التي شكّلت الفيزياء."
        crumbs={[{ label: "Entertainment", to: "/entertainment" }, { label: "علماء الفيزياء" }]}
      />
      <section className="container py-8">
        <div className="max-w-md mx-auto relative mb-8">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="ابحث عن عالم…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="pr-10"
          />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {list.map((p) => (
            <Link
              key={p.id}
              to={`/entertainment/physicists/${p.id}`}
              className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-soft hover:shadow-elegant hover:-translate-y-1 transition-smooth"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-br from-slate-700 via-slate-800 to-slate-950">
                <img
                  src={p.image}
                  alt={p.nameAr}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = "none")}
                />
                <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-3 text-white">
                  <h3 className="font-display text-base font-extrabold drop-shadow line-clamp-1">{p.nameAr}</h3>
                  <p className="text-[11px] text-white/80">{p.years}</p>
                </div>
              </div>
              <div className="p-3">
                <p className="text-xs text-primary font-bold line-clamp-1">{p.field}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
};

export const PhysicistDetail = () => {
  const { id } = useParams();
  const p = PHYSICISTS.find((x) => x.id === id);
  if (!p)
    return (
      <SiteLayout>
        <div className="container py-20 text-center">غير موجود</div>
      </SiteLayout>
    );
  return (
    <SiteLayout>
      <PageHero
        eyebrow={p.years}
        title={p.nameAr}
        description={`${p.name} · ${p.field}`}
        crumbs={[
          { label: "Entertainment", to: "/entertainment" },
          { label: "علماء", to: "/entertainment/physicists" },
          { label: p.nameAr },
        ]}
      />
      <section className="container py-12 grid md:grid-cols-[280px_1fr] gap-8">
        <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-gradient-to-br from-slate-700 to-slate-950 shadow-elegant">
          <img src={p.image} alt={p.nameAr} referrerPolicy="no-referrer" className="absolute inset-0 h-full w-full object-cover" />
        </div>
        <Card className="p-6 md:p-8 bg-gradient-card">
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
            <span className="inline-flex items-center gap-1.5"><Calendar className="h-4 w-4" /> {p.years}</span>
            <span className="inline-flex items-center gap-1.5"><MapPin className="h-4 w-4" /> {p.nationality}</span>
            <span className="inline-flex items-center gap-1.5"><Sparkles className="h-4 w-4" /> {p.field}</span>
          </div>
          <h2 className="font-display text-2xl font-bold mb-3">السيرة</h2>
          <p className="leading-loose text-foreground/90 mb-6">{p.long}</p>
          <h3 className="font-display text-xl font-bold mb-3 flex items-center gap-2">
            <Trophy className="h-5 w-5 text-primary" /> أبرز الإنجازات
          </h3>
          <ul className="grid sm:grid-cols-2 gap-2">
            {p.achievements.map((a) => (
              <li
                key={a}
                className="flex items-start gap-2 text-sm bg-muted/50 rounded-lg px-3 py-2"
              >
                <Sparkles className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <span>{a}</span>
              </li>
            ))}
          </ul>
        </Card>
      </section>
    </SiteLayout>
  );
};

/* ───────── NOBEL ───────── */
export const NobelIndex = () => {
  const [q, setQ] = useState("");
  const list = useMemo(() => {
    const s = q.trim().toLowerCase();
    const sorted = [...NOBEL_PHYSICS].sort((a, b) => b.year - a.year);
    if (!s) return sorted;
    return sorted.filter(
      (n) =>
        String(n.year).includes(s) ||
        n.work.toLowerCase().includes(s) ||
        n.workAr.includes(s) ||
        n.laureates.some((l) => l.name.toLowerCase().includes(s) || l.nameAr?.includes(s)),
    );
  }, [q]);

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Nobel Prize"
        title="جائزة نوبل في الفيزياء"
        description={`القائمة الكاملة من 1901 إلى 2024 — ${NOBEL_PHYSICS.length} سنة، كل الفائزين وإنجازاتهم.`}
        crumbs={[{ label: "Entertainment", to: "/entertainment" }, { label: "Nobel Prize" }]}
      />
      <section className="container py-8">
        <div className="max-w-md mx-auto relative mb-8">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="ابحث بالسنة أو الاسم أو الموضوع…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="pr-10"
          />
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {list.map((n) => (
            <Link
              key={n.year}
              to={`/entertainment/nobel/${n.year}`}
              className={`group rounded-2xl border-2 p-5 shadow-soft hover:shadow-elegant hover:-translate-y-1 transition-smooth ${
                n.notAwarded
                  ? "border-dashed border-muted-foreground/30 bg-muted/30"
                  : "border-border bg-gradient-card"
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <span className="font-display text-3xl font-black bg-gradient-gold bg-clip-text text-transparent">
                  {n.year}
                </span>
                <Award className={`h-7 w-7 ${n.notAwarded ? "text-muted-foreground/40" : "text-amber-500"}`} />
              </div>
              {n.notAwarded ? (
                <p className="text-sm text-muted-foreground italic">{n.workAr}</p>
              ) : (
                <>
                  <p className="text-sm font-bold mb-1.5 line-clamp-2">
                    {n.laureates.map((l) => l.nameAr || l.name).join(" · ")}
                  </p>
                  <p className="text-xs text-muted-foreground line-clamp-2">{n.workAr}</p>
                </>
              )}
            </Link>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
};

export const NobelDetail = () => {
  const { year } = useParams();
  const y = Number(year);
  const n = NOBEL_PHYSICS.find((x) => x.year === y);
  if (!n)
    return (
      <SiteLayout>
        <div className="container py-20 text-center">غير موجود</div>
      </SiteLayout>
    );

  return (
    <SiteLayout>
      <PageHero
        eyebrow={`Nobel · ${n.year}`}
        title={`جائزة نوبل في الفيزياء ${n.year}`}
        description={n.notAwarded ? n.workAr : n.workAr}
        crumbs={[
          { label: "Entertainment", to: "/entertainment" },
          { label: "Nobel Prize", to: "/entertainment/nobel" },
          { label: String(n.year) },
        ]}
      />
      <section className="container py-12 max-w-3xl">
        <Card className="p-6 md:p-8 bg-gradient-card">
          <div className="flex items-center gap-4 mb-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-orange-600 text-white shadow-glow">
              <Award className="h-8 w-8" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">السنة</p>
              <p className="font-display text-3xl font-black">{n.year}</p>
            </div>
          </div>

          {n.notAwarded ? (
            <div className="text-center py-8">
              <p className="text-lg font-semibold text-muted-foreground">{n.workAr}</p>
            </div>
          ) : (
            <>
              <h2 className="font-display text-xl font-bold mb-3">الفائزون</h2>
              <div className="space-y-3 mb-6">
                {n.laureates.map((l, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 bg-muted/40 rounded-xl px-4 py-3"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-gold text-white font-bold shadow-soft">
                      {i + 1}
                    </div>
                    <div>
                      <p className="font-bold">{l.name}</p>
                      {l.nameAr && <p className="text-sm text-muted-foreground">{l.nameAr}</p>}
                    </div>
                  </div>
                ))}
              </div>

              <h2 className="font-display text-xl font-bold mb-2">الإنجاز</h2>
              <p className="leading-loose text-foreground/90 mb-2">{n.workAr}</p>
              <p className="text-sm text-muted-foreground italic">{n.work}</p>

              {n.details && (
                <div className="mt-6 p-4 rounded-xl bg-primary/10 border border-primary/20">
                  <p className="text-sm">{n.details}</p>
                </div>
              )}

              <Button asChild variant="outline" className="mt-6">
                <a
                  href={`https://www.nobelprize.org/prizes/physics/${n.year}/summary/`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="ml-2 h-4 w-4" /> nobelprize.org
                </a>
              </Button>
            </>
          )}
        </Card>
      </section>
    </SiteLayout>
  );
};
