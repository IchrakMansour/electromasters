import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Electro Masters | Elektricien Vlaanderen | 24/7 Beschikbaar",
    template: "%s | Electro Masters",
  },
  description:
    "Professionele elektricien in Vlaanderen. 24/7 beschikbaar voor noodgevallen, installaties, herstellingen en smart home. Bel nu!",
  icons: {
    icon: "/favicon.svg",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();

  return (
    <html lang={locale}>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
