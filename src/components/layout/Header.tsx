"use client";

import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { company } from "@/data/company";
import { services } from "@/data/services";
import type { Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/ui/Logo";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const t = useTranslations("nav");
  const locale = useLocale() as Locale;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const serviceItems = [
    { label: t("emergency"), href: `/${services[0].slugs[locale]}` },
    { label: t("installation"), href: `/${services[1].slugs[locale]}` },
    { label: t("repairs"), href: `/${services[2].slugs[locale]}` },
    { label: t("smartHome"), href: `/${services[3].slugs[locale]}` },
    { label: t("industrial"), href: `/${services[4].slugs[locale]}` },
  ];

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-200",
        isScrolled
          ? "bg-white/95 shadow-md backdrop-blur-sm"
          : "bg-white shadow-sm"
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between lg:h-20">
          <Link href="/">
            <Logo size="md" />
          </Link>

          <nav className="hidden items-center gap-6 lg:flex">
            <Link
              href="/"
              className="text-sm font-medium text-gray-700 hover:text-primary-500 transition-colors"
            >
              {t("home")}
            </Link>

            <div className="group relative">
              <button className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-primary-500 transition-colors">
                {t("services")}
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="invisible absolute left-0 top-full pt-2 opacity-0 transition-all group-hover:visible group-hover:opacity-100">
                <div className="w-56 rounded-lg bg-white py-2 shadow-lg ring-1 ring-black/5">
                  {serviceItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-accent-50 hover:text-primary-500"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link
              href="/contact"
              className="text-sm font-medium text-gray-700 hover:text-primary-500 transition-colors"
            >
              {t("contact")}
            </Link>
          </nav>

          <div className="hidden items-center gap-4 lg:flex">
            <LanguageSwitcher />
            <a
              href={`tel:${company.phoneRaw}`}
              className="inline-flex items-center gap-2 rounded-lg bg-primary-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-600"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              {company.phone}
            </a>
          </div>

          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
