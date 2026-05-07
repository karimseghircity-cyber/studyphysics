import { SiteLayout } from "@/components/SiteLayout";
import { PageHero, Crumb } from "@/components/PageHero";
import { Card } from "@/components/ui/card";
import { Construction } from "lucide-react";
import { SolvedButton } from "@/components/SolvedButton";
import { useLocation } from "react-router-dom";

type ComingSoonProps = {
  eyebrow: string;
  title: string;
  description: string;
  crumbs: Crumb[];
};

const sectionFromPath = (path: string) => {
  if (path.startsWith("/bacs")) return "bac";
  if (path.startsWith("/bems")) return "bem";
  if (path.startsWith("/solutions")) return "solutions";
  if (path.startsWith("/exercices")) return "exercices";
  return "other";
};

export const ComingSoonPage = ({ eyebrow, title, description, crumbs }: ComingSoonProps) => {
  const { pathname } = useLocation();
  const section = sectionFromPath(pathname);
  const isTopic = ["bac", "bem", "solutions", "exercices"].includes(section);

  return (
    <SiteLayout>
      <PageHero eyebrow={eyebrow} title={title} description={description} crumbs={crumbs} />
      <section className="container py-16">
        <Card className="p-10 md:p-14 text-center bg-gradient-card border border-border max-w-2xl mx-auto">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-5">
            <Construction className="h-8 w-8" />
          </div>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
            المحتوى قيد التحضير
          </h2>
          <p className="mt-3 text-muted-foreground leading-relaxed">
            نعمل حالياً على إثراء هذا القسم بمحتوى عالي الجودة. تابعنا قريباً للاطلاع على الإضافات الجديدة.
          </p>
          {isTopic && (
            <div className="mt-6 flex justify-center">
              <SolvedButton
                section={section}
                topicKey={`${section}:${pathname}`}
                topicLabel={title}
              />
            </div>
          )}
        </Card>
      </section>
    </SiteLayout>
  );
};
