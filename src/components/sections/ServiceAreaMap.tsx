import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { cities } from "@/data/cities";
import type { Locale } from "@/i18n/routing";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";

export function ServiceAreaMap() {
  const t = useTranslations("home");
  const locale = useLocale() as Locale;

  return (
    <section className="py-16 lg:py-24">
      <Container>
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
            {t("areasTitle")}
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            {t("areasSubtitle")}
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cities.map((city) => (
            <Link key={city.key} href={`/${city.slugs[locale]}`} className="block">
              <Card className="text-center">
                <div className="mb-2 inline-flex items-center justify-center rounded-full bg-primary-50 p-3 text-primary-500">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900">
                  {city.content[locale].title}
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  {city.postalCodes.slice(0, 3).join(", ")}...
                </p>
              </Card>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
