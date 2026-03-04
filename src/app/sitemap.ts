import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { services } from "@/data/services";
import { cities } from "@/data/cities";
import { company } from "@/data/company";

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    entries.push({
      url: `${company.url}/${locale}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((l) => [l, `${company.url}/${l}`])
        ),
      },
    });

    for (const service of services) {
      entries.push({
        url: `${company.url}/${locale}/${service.slugs[locale]}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.9,
        alternates: {
          languages: Object.fromEntries(
            routing.locales.map((l) => [
              l,
              `${company.url}/${l}/${service.slugs[l]}`,
            ])
          ),
        },
      });
    }

    for (const city of cities) {
      entries.push({
        url: `${company.url}/${locale}/${city.slugs[locale]}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.8,
        alternates: {
          languages: Object.fromEntries(
            routing.locales.map((l) => [
              l,
              `${company.url}/${l}/${city.slugs[l]}`,
            ])
          ),
        },
      });
    }

    entries.push({
      url: `${company.url}/${locale}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((l) => [l, `${company.url}/${l}/contact`])
        ),
      },
    });
  }

  return entries;
}
