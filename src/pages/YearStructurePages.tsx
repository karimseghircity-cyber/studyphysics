import { useParams, Navigate } from "react-router-dom";
import { SiteLayout } from "@/components/SiteLayout";
import { PageHero } from "@/components/PageHero";
import { CategoryCard } from "@/components/CategoryCard";
import { getStage, getYear } from "@/data/curriculum";
import { ClipboardList, Dumbbell, FileCheck2, FilePen } from "lucide-react";

type Section = "exercices" | "solutions";

const labelFor = (section: Section) =>
  section === "exercices"
    ? { root: "مواضيع + تمارين", path: "/exercices", colorTitle: "تمارين" }
    : { root: "الحلول", path: "/solutions", colorTitle: "حلول" };

/** /[section]/:stageId/:yearId — two cards: exam-papers vs unit exercises */
export const YearCategoriesPage = ({ section }: { section: Section }) => {
  const { stageId, yearId } = useParams<{ stageId: string; yearId: string }>();
  const stage = stageId ? getStage(stageId) : undefined;
  const year = stageId && yearId ? getYear(stageId, yearId) : undefined;
  const meta = labelFor(section);

  if (!stage || !year) return <Navigate to={meta.path} replace />;

  const stageLabel = stage.id === "moyen" ? "متوسط" : "ثانوي";
  const isExo = section === "exercices";

  return (
    <SiteLayout>
      <PageHero
        eyebrow={year.subtitle}
        title={`${isExo ? "مواضيع وتمارين" : "حلول"} ${year.title}`}
        description="اختر نوع المحتوى الذي تريد استعراضه."
        crumbs={[
          { label: meta.root, to: meta.path },
          { label: stageLabel, to: `${meta.path}/${stage.id}` },
          { label: year.title },
        ]}
      />

      <section className="container py-12 md:py-16">
        <div className="grid md:grid-cols-2 gap-6">
          <CategoryCard
            to={`${meta.path}/${stage.id}/${year.id}/devoirs`}
            title={isExo ? "مواضيع الفروض والاختبارات" : "حلول الفروض والاختبارات"}
            subtitle="Devoirs & Compositions"
            description="فروض واختبارات مرتبة حسب الفصول الدراسية الثلاثة."
            icon={ClipboardList}
            variant="primary"
          />
          <CategoryCard
            to={`${meta.path}/${stage.id}/${year.id}/unites`}
            title={isExo ? "تمارين الوحدات" : "حلول تمارين الوحدات"}
            subtitle="Exercices par unité"
            description="تمارين مرتبة حسب الوحدات/الميادين الدراسية."
            icon={Dumbbell}
            variant="accent"
          />
        </div>
      </section>
    </SiteLayout>
  );
};

/** /[section]/:stageId/:yearId/devoirs — three cards: trimester 1/2/3 */
export const YearDevoirsPage = ({ section }: { section: Section }) => {
  const { stageId, yearId } = useParams<{ stageId: string; yearId: string }>();
  const stage = stageId ? getStage(stageId) : undefined;
  const year = stageId && yearId ? getYear(stageId, yearId) : undefined;
  const meta = labelFor(section);

  if (!stage || !year) return <Navigate to={meta.path} replace />;

  const stageLabel = stage.id === "moyen" ? "متوسط" : "ثانوي";
  const isExo = section === "exercices";
  const trimesters = [
    { id: "t1", label: "الفصل الأول", sub: "Trimestre 1" },
    { id: "t2", label: "الفصل الثاني", sub: "Trimestre 2" },
    { id: "t3", label: "الفصل الثالث", sub: "Trimestre 3" },
  ];

  return (
    <SiteLayout>
      <PageHero
        eyebrow={year.subtitle}
        title={`${isExo ? "مواضيع الفروض والاختبارات" : "حلول الفروض والاختبارات"} - ${year.title}`}
        description="اختر الفصل الدراسي."
        crumbs={[
          { label: meta.root, to: meta.path },
          { label: stageLabel, to: `${meta.path}/${stage.id}` },
          { label: year.title, to: `${meta.path}/${stage.id}/${year.id}` },
          { label: isExo ? "مواضيع الفروض والاختبارات" : "حلول الفروض والاختبارات" },
        ]}
      />

      <section className="container py-12 md:py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {trimesters.map((t, i) => (
            <CategoryCard
              key={t.id}
              to={`${meta.path}/${stage.id}/${year.id}/devoirs/${t.id}`}
              title={t.label}
              subtitle={t.sub}
              description="فروض واختبارات الفصل."
              icon={ClipboardList}
              variant={i === 0 ? "primary" : i === 1 ? "accent" : "default"}
            />
          ))}
        </div>
      </section>
    </SiteLayout>
  );
};

/** /[section]/:stageId/:yearId/devoirs/:trimesterId — devoirs vs compositions */
export const YearTrimesterPage = ({ section }: { section: Section }) => {
  const { stageId, yearId, trimesterId } =
    useParams<{ stageId: string; yearId: string; trimesterId: string }>();
  const stage = stageId ? getStage(stageId) : undefined;
  const year = stageId && yearId ? getYear(stageId, yearId) : undefined;
  const meta = labelFor(section);

  if (!stage || !year) return <Navigate to={meta.path} replace />;

  const stageLabel = stage.id === "moyen" ? "متوسط" : "ثانوي";
  const isExo = section === "exercices";
  const trimesterLabel =
    trimesterId === "t1"
      ? "الفصل الأول"
      : trimesterId === "t2"
        ? "الفصل الثاني"
        : "الفصل الثالث";

  return (
    <SiteLayout>
      <PageHero
        eyebrow={year.subtitle}
        title={`${trimesterLabel} - ${year.title}`}
        description={isExo ? "اختر بين الفروض والاختبارات." : "اختر بين حلول الفروض وحلول الاختبارات."}
        crumbs={[
          { label: meta.root, to: meta.path },
          { label: stageLabel, to: `${meta.path}/${stage.id}` },
          { label: year.title, to: `${meta.path}/${stage.id}/${year.id}` },
          {
            label: isExo ? "مواضيع الفروض والاختبارات" : "حلول الفروض والاختبارات",
            to: `${meta.path}/${stage.id}/${year.id}/devoirs`,
          },
          { label: trimesterLabel },
        ]}
      />

      <section className="container py-12 md:py-16">
        <div className="grid md:grid-cols-2 gap-6">
          <CategoryCard
            to={`${meta.path}/${stage.id}/${year.id}/devoirs/${trimesterId}/devoirs`}
            title={isExo ? "الفروض" : "حلول الفروض"}
            subtitle="Devoirs"
            description="مجموعة فروض الفصل."
            icon={FilePen}
            variant="primary"
          />
          <CategoryCard
            to={`${meta.path}/${stage.id}/${year.id}/devoirs/${trimesterId}/compositions`}
            title={isExo ? "الاختبارات" : "حلول الاختبارات"}
            subtitle="Compositions"
            description="مجموعة اختبارات الفصل."
            icon={FileCheck2}
            variant="accent"
          />
        </div>
      </section>
    </SiteLayout>
  );
};

/** /[section]/:stageId/:yearId/unites — list units */
export const YearUnitsPage = ({ section }: { section: Section }) => {
  const { stageId, yearId } = useParams<{ stageId: string; yearId: string }>();
  const stage = stageId ? getStage(stageId) : undefined;
  const year = stageId && yearId ? getYear(stageId, yearId) : undefined;
  const meta = labelFor(section);

  if (!stage || !year) return <Navigate to={meta.path} replace />;

  const stageLabel = stage.id === "moyen" ? "متوسط" : "ثانوي";
  const isExo = section === "exercices";

  return (
    <SiteLayout>
      <PageHero
        eyebrow={year.subtitle}
        title={`${isExo ? "تمارين" : "حلول تمارين"} ${year.title}`}
        description="تمارين مرتبة حسب الوحدة."
        crumbs={[
          { label: meta.root, to: meta.path },
          { label: stageLabel, to: `${meta.path}/${stage.id}` },
          { label: year.title, to: `${meta.path}/${stage.id}/${year.id}` },
          { label: isExo ? "تمارين الوحدات" : "حلول تمارين الوحدات" },
        ]}
      />

      <section className="container py-12 md:py-16">
        <div className="grid md:grid-cols-2 gap-5">
          {year.units.map((unit, idx) => (
            <div
              key={unit.id}
              className="group p-6 rounded-2xl bg-gradient-card border border-border hover:border-primary/40 hover:shadow-elegant transition-smooth hover:-translate-y-1"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary font-display font-bold text-lg">
                  {String(idx + 1).padStart(2, "0")}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-display text-lg md:text-xl font-bold text-foreground leading-snug">
                    {unit.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {unit.description}
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-primary">
                    <Dumbbell className="h-3.5 w-3.5" />
                    {isExo ? "تمارين قريباً" : "حلول قريباً"}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
};
