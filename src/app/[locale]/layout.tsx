import { use } from "react";
import { NextIntlClientProvider, useMessages } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { EmergencyBanner } from "@/components/layout/EmergencyBanner";
import { StickyCallButton } from "@/components/layout/StickyCallButton";
import { JsonLd } from "@/components/seo/JsonLd";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  setRequestLocale(locale);
  const messages = useMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <JsonLd type="localBusiness" />
      <EmergencyBanner />
      <Header />
      <main>{children}</main>
      <Footer />
      <StickyCallButton />
    </NextIntlClientProvider>
  );
}
