import { useParams, Navigate } from "react-router-dom";
import { SiteLayout } from "@/components/SiteLayout";
import { PageHero } from "@/components/PageHero";
import { YearsGrid, buildYearsRange } from "@/components/YearsGrid";
import { CategoryCard } from "@/components/CategoryCard";
import { Calculator, FlaskConical } from "lucide-react";

type Mode = "sujets" | "corrections";

const STREAMS = [
  {
    id: "math",
    title: "شعبة الرياضيات والتقني رياضي",
    subtitle: "Math + Tech-Math",
    icon: Calculator,
    variant: "primary" as const,
  },
  {
    id: "sciences",
    title: "شعبة العلوم التجريبية",
    subtitle: "Sciences expérimentales",
    icon: FlaskConical,
    variant: "accent" as const,
  },
];

type Props = { mode: Mode };

const BacStreamList = ({ mode }: Props) => {
  const eyebrow = "BAC";
  const isSujets = mode === "sujets";
  const title = isSujets ? "مواضيع البكالوريا" : "حل مواضيع البكالوريا";
  const baseHref = isSujets ? "/bacs/sujets" : "/bacs/corrections";

  return (
    <SiteLayout>
      <PageHero
        eyebrow={eyebrow}
        title={title}
        description={
          isSujets
            ? "اختر الشعبة لاستعراض مواضيع البكالوريا حسب السنة (2008 - 2026)."
            : "اختر الشعبة لاستعراض الحلول النموذجية لمواضيع البكالوريا حسب السنة (2008 - 2026)."
        }
        crumbs={[
          { label: "مواضيع البكالوريا", to: "/bacs" },
          { label: isSujets ? "المواضيع" : "الحلول" },
        ]}
      />

      <section className="container py-12 md:py-16">
        <div className="grid md:grid-cols-2 gap-6">
          {STREAMS.map((s) => (
            <CategoryCard
              key={s.id}
              to={`${baseHref}/${s.id}`}
              title={isSujets ? `مواضيع البكالوريا - ${s.title}` : `حلول البكالوريا - ${s.title}`}
              subtitle={s.subtitle}
              description={
                isSujets
                  ? "جميع مواضيع البكالوريا من 2008 إلى 2026."
                  : "جميع حلول مواضيع البكالوريا من 2008 إلى 2026."
              }
              icon={s.icon}
              variant={s.variant}
            />
          ))}
        </div>
      </section>
    </SiteLayout>
  );
};

export default BacStreamList;

// Stream years page (e.g. /bacs/sujets/math)
export const BacStreamYears = ({ mode }: Props) => {
  const { streamId } = useParams<{ streamId: string }>();
  const stream = STREAMS.find((s) => s.id === streamId);
  if (!stream) return <Navigate to="/bacs" replace />;

  const isSujets = mode === "sujets";
  const baseHref = isSujets ? "/bacs/sujets" : "/bacs/corrections";
  const years = buildYearsRange(2008, 2026);

  return (
    <SiteLayout>
      <PageHero
        eyebrow="BAC"
        title={isSujets ? `مواضيع البكالوريا - ${stream.title}` : `حلول البكالوريا - ${stream.title}`}
        description="اختر السنة لاستعراض المحتوى."
        crumbs={[
          { label: "مواضيع البكالوريا", to: "/bacs" },
          { label: isSujets ? "المواضيع" : "الحلول", to: baseHref },
          { label: stream.title },
        ]}
      />
      <section className="container py-12 md:py-16">
        <YearsGrid
          years={years}
          prefix="BAC"
          buildHref={(y) => `${baseHref}/${stream.id}/${y}`}
        />
      </section>
    </SiteLayout>
  );
};
