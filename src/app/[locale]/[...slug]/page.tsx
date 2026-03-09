import { use } from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import { services } from "@/data/services";
import { cities } from "@/data/cities";
import { company } from "@/data/company";
import { resolveSlug } from "@/lib/slug-resolver";
import { getServiceMeta, getCityMeta, getContactMeta } from "@/lib/metadata";
import { Container } from "@/components/ui/Container";
import { HeroSection } from "@/components/sections/HeroSection";
import { CTABanner } from "@/components/sections/CTABanner";
import { FAQSection } from "@/components/sections/FAQSection";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { ServiceAreaMap } from "@/components/sections/ServiceAreaMap";
import { ContactForm } from "@/components/forms/ContactForm";
import { JsonLd } from "@/components/seo/JsonLd";

export function generateStaticParams() {
  const params: { locale: string; slug: string[] }[] = [];

  for (const locale of routing.locales) {
    for (const service of services) {
      params.push({ locale, slug: [service.slugs[locale]] });
    }
    for (const city of cities) {
      params.push({ locale, slug: [city.slugs[locale]] });
    }
    params.push({ locale, slug: ["contact"] });
  }

  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string[] }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const resolution = resolveSlug(slug, locale as Locale);

  if (!resolution) return {};

  switch (resolution.type) {
    case "service":
      return getServiceMeta(resolution.key, locale as Locale);
    case "city":
      return getCityMeta(resolution.key, locale as Locale);
    case "contact":
      return getContactMeta(locale as Locale);
  }
}

export default function CatchAllPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string[] }>;
}) {
  const { locale, slug } = use(params);
  setRequestLocale(locale);

  const resolution = resolveSlug(slug, locale as Locale);
  if (!resolution) notFound();

  switch (resolution.type) {
    case "service":
      return <ServicePage serviceKey={resolution.key} locale={locale as Locale} />;
    case "city":
      return <CityPage cityKey={resolution.key} locale={locale as Locale} />;
    case "contact":
      return <ContactPage locale={locale as Locale} />;
  }
}

function ServicePage({
  serviceKey,
  locale,
}: {
  serviceKey: string;
  locale: Locale;
}) {
  const service = services.find((s) => s.key === serviceKey)!;
  const content = service.content[locale];

  const faqTitles: Record<Locale, string> = {
    nl: "Veelgestelde Vragen",
    fr: "Questions Fréquentes",
    en: "Frequently Asked Questions",
  };

  return (
    <>
      <JsonLd
        type="service"
        data={{
          name: content.title,
          description: content.metaDescription,
        }}
      />
      <HeroSection title={content.h1} subtitle={content.intro.slice(0, 200) + "..."} />
      <article className="py-16 lg:py-24">
        <Container>
          <div className="mx-auto max-w-4xl">
            <p className="mb-12 text-lg leading-relaxed text-gray-600">
              {content.intro}
            </p>
            {content.sections.map((section, i) => (
              <section key={i} className="mb-12">
                <h2 className="mb-4 text-2xl font-bold text-gray-900">
                  {section.heading}
                </h2>
                <p className="leading-relaxed text-gray-600">{section.body}</p>
              </section>
            ))}
          </div>
        </Container>
      </article>
      <CTABanner />
      <FAQSection faqs={content.faqs} title={faqTitles[locale]} />
      <CTABanner variant="emergency" />
    </>
  );
}

function CityPage({
  cityKey,
  locale,
}: {
  cityKey: string;
  locale: Locale;
}) {
  const city = cities.find((c) => c.key === cityKey)!;
  const content = city.content[locale];

  const faqTitles: Record<Locale, string> = {
    nl: "Veelgestelde Vragen",
    fr: "Questions Fréquentes",
    en: "Frequently Asked Questions",
  };

  const postalLabel: Record<Locale, string> = {
    nl: "Postcodes die wij bedienen",
    fr: "Codes postaux desservis",
    en: "Postal codes we serve",
  };

  return (
    <>
      <JsonLd
        type="service"
        data={{
          name: content.title,
          description: content.metaDescription,
          areaServed: {
            "@type": "City",
            name: city.content.nl.title.replace("Elektricien ", ""),
          },
        }}
      />
      <HeroSection title={content.h1} subtitle={content.intro.slice(0, 200) + "..."} />
      <article className="py-16 lg:py-24">
        <Container>
          <div className="mx-auto max-w-4xl">
            <p className="mb-12 text-lg leading-relaxed text-gray-600">
              {content.intro}
            </p>
            {content.sections.map((section, i) => (
              <section key={i} className="mb-12">
                <h2 className="mb-4 text-2xl font-bold text-gray-900">
                  {section.heading}
                </h2>
                <p className="leading-relaxed text-gray-600">{section.body}</p>
              </section>
            ))}

            <section className="mb-12">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">
                {postalLabel[locale]}
              </h2>
              <div className="flex flex-wrap gap-2">
                {city.postalCodes.map((code) => (
                  <span
                    key={code}
                    className="rounded-full bg-primary-50 px-4 py-1 text-sm font-medium text-primary-700"
                  >
                    {code}
                  </span>
                ))}
              </div>
            </section>

            {content.localInfo && (
              <section className="mb-12">
                <p className="leading-relaxed text-gray-600">
                  {content.localInfo}
                </p>
              </section>
            )}
          </div>
        </Container>
      </article>
      <CTABanner />
      <ServicesGrid />
      <FAQSection faqs={content.faqs} title={faqTitles[locale]} />
      <CTABanner variant="emergency" />
    </>
  );
}

function ContactPage({ locale }: { locale: Locale }) {
  const contactLabels: Record<Locale, { title: string; subtitle: string }> = {
    nl: {
      title: "Neem Contact Op",
      subtitle:
        "Heeft u een vraag of wilt u een offerte aanvragen? Neem gerust contact met ons op. Wij reageren binnen 24 uur.",
    },
    fr: {
      title: "Contactez-Nous",
      subtitle:
        "Vous avez une question ou souhaitez demander un devis? N'hésitez pas à nous contacter. Nous répondons sous 24 heures.",
    },
    en: {
      title: "Get in Touch",
      subtitle:
        "Have a question or want to request a quote? Don't hesitate to contact us. We respond within 24 hours.",
    },
  };

  const infoLabels: Record<Locale, Record<string, string>> = {
    nl: {
      phone: "Telefoon",
      email: "E-mail",
      address: "Adres",
      hours: "Beschikbaarheid",
      hoursValue: "24/7 voor noodgevallen",
    },
    fr: {
      phone: "Téléphone",
      email: "E-mail",
      address: "Adresse",
      hours: "Disponibilité",
      hoursValue: "24/7 pour les urgences",
    },
    en: {
      phone: "Phone",
      email: "Email",
      address: "Address",
      hours: "Availability",
      hoursValue: "24/7 for emergencies",
    },
  };

  const labels = contactLabels[locale];
  const info = infoLabels[locale];

  return (
    <>
      <HeroSection title={labels.title} subtitle={labels.subtitle} showCta={false} />
      <section className="py-16 lg:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <ContactForm />
            </div>
            <div>
              <div className="rounded-xl bg-accent-50 p-8">
                <h2 className="mb-6 text-2xl font-bold text-gray-900">
                  {locale === "nl"
                    ? "Contactgegevens"
                    : locale === "fr"
                      ? "Coordonnées"
                      : "Contact Details"}
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="rounded-lg bg-primary-100 p-3 text-primary-500">
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{info.phone}</p>
                      <a
                        href={`tel:${company.phoneRaw}`}
                        className="text-primary-500 hover:underline"
                      >
                        {company.phone}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="rounded-lg bg-primary-100 p-3 text-primary-500">
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{info.email}</p>
                      <a
                        href={`mailto:${company.email}`}
                        className="text-primary-500 hover:underline"
                      >
                        {company.email}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="rounded-lg bg-primary-100 p-3 text-primary-500">
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{info.hours}</p>
                      <p className="text-gray-600">{info.hoursValue}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
