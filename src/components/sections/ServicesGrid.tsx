import { useTranslations, useLocale } from "next-intl";
import { services } from "@/data/services";
import type { Locale } from "@/i18n/routing";
import { Container } from "@/components/ui/Container";
import { ServiceCard } from "./ServiceCard";

export function ServicesGrid() {
  const t = useTranslations("home");
  const locale = useLocale() as Locale;

  return (
    <section className="border-t border-gray-100 bg-white py-16 lg:py-24">
      <Container>
        <div className="mb-10 text-center">
          <h2 className="mb-3 text-3xl font-bold text-gray-900">
            {t("servicesTitle")}
          </h2>
          <p className="mx-auto max-w-xl text-gray-500">
            {t("servicesSubtitle")}
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard
              key={service.key}
              title={service.content[locale].title}
              description={service.content[locale].intro.slice(0, 120) + "..."}
              href={`/${service.slugs[locale]}`}
              icon={service.icon}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
