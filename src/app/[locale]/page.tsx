import type { Metadata } from "next";
import { use } from "react";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { company } from "@/data/company";
import type { Locale } from "@/i18n/routing";
import { HeroSection } from "@/components/sections/HeroSection";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { EmergencySection } from "@/components/sections/EmergencySection";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { CTABanner } from "@/components/sections/CTABanner";
import { ContactForm } from "@/components/forms/ContactForm";
import { Container } from "@/components/ui/Container";

const meta: Record<
  Locale,
  { title: string; description: string; heroTitle: string; heroSubtitle: string }
> = {
  nl: {
    title: "Elektro Master | Elektricien Vlaanderen | 24/7 Beschikbaar",
    description:
      "Professionele elektricien in Vlaanderen. 24/7 beschikbaar voor noodgevallen, installaties, herstellingen en smart home. Bel nu voor snelle service!",
    heroTitle: "Uw Betrouwbare Elektricien in Vlaanderen",
    heroSubtitle:
      "Professionele elektriciteitsdiensten voor particulieren en bedrijven. 24/7 beschikbaar voor noodgevallen in Antwerpen, Gent, Brugge, Leuven en heel Vlaanderen.",
  },
  fr: {
    title: "Elektro Master | Électricien Flandre | Disponible 24/7",
    description:
      "Électricien professionnel en Flandre. Disponible 24/7 pour urgences, installations, réparations et maison intelligente. Appelez maintenant!",
    heroTitle: "Votre Électricien de Confiance en Flandre",
    heroSubtitle:
      "Services électriques professionnels pour particuliers et entreprises. Disponible 24/7 pour les urgences à Anvers, Gand, Bruges, Louvain et dans toute la Flandre.",
  },
  en: {
    title: "Elektro Master | Electrician Flanders | Available 24/7",
    description:
      "Professional electrician in Flanders. Available 24/7 for emergencies, installations, repairs, and smart home. Call now for fast service!",
    heroTitle: "Your Trusted Electrician in Flanders",
    heroSubtitle:
      "Professional electrical services for residential and commercial clients. Available 24/7 for emergencies in Antwerp, Ghent, Bruges, Leuven, and all of Flanders.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const l = locale as Locale;
  if (!meta[l]) return {};
  const url = `${company.url}/${locale}`;

  return {
    title: meta[l].title,
    description: meta[l].description,
    alternates: {
      canonical: url,
      languages: {
        nl: `${company.url}/nl`,
        fr: `${company.url}/fr`,
        en: `${company.url}/en`,
      },
    },
    openGraph: {
      title: meta[l].title,
      description: meta[l].description,
      url,
      siteName: company.name,
      locale: locale === "nl" ? "nl_BE" : locale === "fr" ? "fr_BE" : "en",
      type: "website",
    },
  };
}

export default function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  setRequestLocale(locale);
  const l = locale as Locale;
  if (!meta[l]) notFound();

  return (
    <>
      <HeroSection
        title={meta[l].heroTitle}
        subtitle={meta[l].heroSubtitle}
      />
      <ServicesGrid />
      <EmergencySection />
      <WhyChooseUs />
      <CTABanner variant="emergency" />
      <section id="contact-form" className="py-16 lg:py-24">
        <Container>
          <div className="mx-auto max-w-2xl">
            <ContactForm />
          </div>
        </Container>
      </section>
    </>
  );
}
