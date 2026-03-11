import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { ClickLightning } from "@/components/ui/ClickLightning";
import { ElectricSparks } from "@/components/ui/ElectricSparks";
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
    <html lang={locale} suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider>
          <ElectricSparks />
          {children}
          <ClickLightning />
        </ThemeProvider>
      </body>
    </html>
  );
}
