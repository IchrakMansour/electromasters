import { services } from "@/data/services";
import { cities } from "@/data/cities";
import type { PageResolution } from "@/types";
import type { Locale } from "@/i18n/routing";

export function resolveSlug(
  slug: string[],
  locale: Locale
): PageResolution {
  const fullSlug = slug.join("/");

  if (fullSlug === "contact") {
    return { type: "contact" };
  }

  const service = services.find((s) => s.slugs[locale] === fullSlug);
  if (service) {
    return { type: "service", key: service.key };
  }

  const city = cities.find((c) => c.slugs[locale] === fullSlug);
  if (city) {
    return { type: "city", key: city.key };
  }

  return null;
}

export function getAlternateSlug(
  currentSlug: string,
  currentLocale: Locale,
  targetLocale: Locale
): string {
  if (currentSlug === "contact") return "contact";

  const service = services.find((s) => s.slugs[currentLocale] === currentSlug);
  if (service) return service.slugs[targetLocale];

  const city = cities.find((c) => c.slugs[currentLocale] === currentSlug);
  if (city) return city.slugs[targetLocale];

  return currentSlug;
}
