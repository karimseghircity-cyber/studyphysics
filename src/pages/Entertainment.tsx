import { useParams, Link } from "react-router-dom";
import { SiteLayout } from "@/components/SiteLayout";
import { PageHero } from "@/components/PageHero";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Film, Gamepad2, ArrowLeft, Calendar, User, Sparkles, ExternalLink } from "lucide-react";
import { PHYSICS_MOVIES, PHYSICS_GAMES, Movie, Game } from "@/data/entertainment";

const Entertainment = () => (
  <SiteLayout>
    <PageHero
      eyebrow="Entertainment"
      title="فيزياء الترفيه"
      description="أفلام وألعاب تستلهم من الفيزياء الحقيقية. اختر ما يلهمك."
      crumbs={[{ label: "Entertainment" }]}
    />
    <section className="container py-12 grid md:grid-cols-2 gap-6">
      <Link
        to="/entertainment/movies"
        className="group rounded-3xl border-2 border-border bg-gradient-card p-8 shadow-elegant hover:shadow-glow hover:-translate-y-1 transition-smooth"
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-cosmic text-white shadow-glow mb-4">
          <Film className="h-8 w-8" />
        </div>
        <h3 className="font-display text-2xl font-bold">أفلام الفيزياء</h3>
        <p className="mt-2 text-muted-foreground">
          Interstellar · Oppenheimer · Theory of Everything والمزيد.
        </p>
        <span className="mt-4 inline-flex items-center gap-2 text-primary font-semibold">
          استكشف <ArrowLeft className="h-4 w-4 transition-smooth group-hover:-translate-x-1" />
        </span>
      </Link>
      <Link
        to="/entertainment/games"
        className="group rounded-3xl border-2 border-border bg-gradient-card p-8 shadow-elegant hover:shadow-glow hover:-translate-y-1 transition-smooth"
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-gold text-accent-foreground shadow-stellar mb-4">
          <Gamepad2 className="h-8 w-8" />
        </div>
        <h3 className="font-display text-2xl font-bold">ألعاب الفيزياء</h3>
        <p className="mt-2 text-muted-foreground">
          Kerbal · Portal 2 · Universe Sandbox والمزيد.
        </p>
        <span className="mt-4 inline-flex items-center gap-2 text-primary font-semibold">
          استكشف <ArrowLeft className="h-4 w-4 transition-smooth group-hover:-translate-x-1" />
        </span>
      </Link>
    </section>
  </SiteLayout>
);
export default Entertainment;

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
            {kind === "movie" ? (
              <Film className="mx-auto h-12 w-12 text-white/80 mb-3" />
            ) : (
              <Gamepad2 className="mx-auto h-12 w-12 text-white/80 mb-3" />
            )}
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
        <div className={`aspect-[2/3] rounded-2xl bg-gradient-to-br ${m.poster} relative shadow-elegant flex items-center justify-center p-6`}>
          <div className="absolute inset-0 starfield opacity-50 rounded-2xl" />
          <div className="relative text-center">
            <Film className="mx-auto h-16 w-16 text-white/80 mb-3" />
            <h3 className="font-display text-3xl font-black text-white drop-shadow-lg">{m.title}</h3>
            <p className="mt-2 text-white/85">{m.year}</p>
          </div>
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
        <div className={`aspect-[2/3] rounded-2xl bg-gradient-to-br ${g.poster} relative shadow-elegant flex items-center justify-center p-6`}>
          <div className="absolute inset-0 starfield opacity-50 rounded-2xl" />
          <div className="relative text-center">
            <Gamepad2 className="mx-auto h-16 w-16 text-white/80 mb-3" />
            <h3 className="font-display text-3xl font-black text-white drop-shadow-lg">{g.title}</h3>
            <p className="mt-2 text-white/85">{g.platform}</p>
          </div>
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
