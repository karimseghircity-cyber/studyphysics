import { SiteLayout } from "@/components/SiteLayout";
import { PageHero } from "@/components/PageHero";
import { YearsGrid, buildYearsRange } from "@/components/YearsGrid";

type Mode = "sujets" | "corrections";

const BemYearList = ({ mode }: Mode extends "sujets" ? { mode: Mode } : { mode: Mode }) => {
  const isSujets = mode === "sujets";
  const baseHref = isSujets ? "/bems/sujets" : "/bems/corrections";
  const years = buildYearsRange(2008, 2016);

  return (
    <SiteLayout>
      <PageHero
        eyebrow="BEM"
        title={isSujets ? "مواضيع شهادة التعليم المتوسط" : "حل مواضيع شهادة التعليم المتوسط"}
        description={
          isSujets
            ? "جميع مواضيع شهادة التعليم المتوسط من 2008 إلى 2016."
            : "جميع حلول مواضيع شهادة التعليم المتوسط من 2008 إلى 2016."
        }
        crumbs={[
          { label: "مواضيع شهادة التعليم المتوسط", to: "/bems" },
          { label: isSujets ? "المواضيع" : "الحلول" },
        ]}
      />

      <section className="container py-12 md:py-16">
        <YearsGrid
          years={years}
          prefix="BEM"
          buildHref={(y) => `${baseHref}/${y}`}
        />
      </section>
    </SiteLayout>
  );
};

export default BemYearList;
