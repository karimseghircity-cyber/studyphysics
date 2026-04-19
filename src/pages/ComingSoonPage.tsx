import { SiteLayout } from "@/components/SiteLayout";
import { PageHero, Crumb } from "@/components/PageHero";
import { Card } from "@/components/ui/card";
import { Construction } from "lucide-react";

type ComingSoonProps = {
  eyebrow: string;
  title: string;
  description: string;
  crumbs: Crumb[];
};

export const ComingSoonPage = ({ eyebrow, title, description, crumbs }: ComingSoonProps) => {
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
        </Card>
      </section>
    </SiteLayout>
  );
};
