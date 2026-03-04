import type { Metadata } from "next";
import { services } from "@/data/services";
import { cities } from "@/data/cities";
import { company } from "@/data/company";
import type { Locale } from "@/i18n/routing";

const localeMap: Record<string, string> = {
  nl: "nl_BE",
  fr: "fr_BE",
  en: "en",
};

export function getServiceMeta(
  serviceKey: string,
  locale: Locale
): Metadata {
  const service = services.find((s) => s.key === serviceKey)!;
  const content = service.content[locale];
  const url = `${company.url}/${locale}/${service.slugs[locale]}`;

  return {
    title: content.metaTitle,
    description: content.metaDescription,
    alternates: {
      canonical: url,
      languages: {
        nl: `${company.url}/nl/${service.slugs.nl}`,
        fr: `${company.url}/fr/${service.slugs.fr}`,
        en: `${company.url}/en/${service.slugs.en}`,
      },
    },
    openGraph: {
      title: content.metaTitle,
      description: content.metaDescription,
      url,
      siteName: company.name,
      locale: localeMap[locale],
      type: "website",
    },
  };
}

export function getCityMeta(
  cityKey: string,
  locale: Locale
): Metadata {
  const city = cities.find((c) => c.key === cityKey)!;
  const content = city.content[locale];
  const url = `${company.url}/${locale}/${city.slugs[locale]}`;

  return {
    title: content.metaTitle,
    description: content.metaDescription,
    alternates: {
      canonical: url,
      languages: {
        nl: `${company.url}/nl/${city.slugs.nl}`,
        fr: `${company.url}/fr/${city.slugs.fr}`,
        en: `${company.url}/en/${city.slugs.en}`,
      },
    },
    openGraph: {
      title: content.metaTitle,
      description: content.metaDescription,
      url,
      siteName: company.name,
      locale: localeMap[locale],
      type: "website",
    },
  };
}

export function getContactMeta(locale: Locale): Metadata {
  const titles: Record<Locale, string> = {
    nl: "Contact | Electro Masters | Elektricien Vlaanderen",
    fr: "Contact | Electro Masters | Électricien Flandre",
    en: "Contact | Electro Masters | Electrician Flanders",
  };
  const descriptions: Record<Locale, string> = {
    nl: "Neem contact op met Electro Masters voor al uw elektrische diensten in Vlaanderen. Bel ons 24/7 of vraag een gratis offerte aan.",
    fr: "Contactez Electro Masters pour tous vos services électriques en Flandre. Appelez-nous 24/7 ou demandez un devis gratuit.",
    en: "Contact Electro Masters for all your electrical services in Flanders. Call us 24/7 or request a free quote.",
  };

  const url = `${company.url}/${locale}/contact`;

  return {
    title: titles[locale],
    description: descriptions[locale],
    alternates: {
      canonical: url,
      languages: {
        nl: `${company.url}/nl/contact`,
        fr: `${company.url}/fr/contact`,
        en: `${company.url}/en/contact`,
      },
    },
    openGraph: {
      title: titles[locale],
      description: descriptions[locale],
      url,
      siteName: company.name,
      locale: localeMap[locale],
      type: "website",
    },
  };
}
