import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { ClickLightning } from "@/components/ui/ClickLightning";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Elektro Master | Elektricien Vlaanderen | 24/7 Beschikbaar",
    template: "%s | Elektro Master",
  },
  description:
    "Professionele elektricien in Vlaanderen. 24/7 beschikbaar voor noodgevallen, installaties en herstellingen. Bel nu!",
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
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme:dark)').matches)){document.documentElement.classList.add('dark')}else{document.documentElement.classList.add('light')}}catch(e){}})()`,
          }}
        />
      </head>
      <body className="font-sans antialiased">
        <ThemeProvider>
          {children}
          <ClickLightning />
        </ThemeProvider>
      </body>
    </html>
  );
}
