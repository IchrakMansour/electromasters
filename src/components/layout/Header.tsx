"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { services } from "@/data/services";
import type { Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/ui/Logo";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { ThemeToggle } from "./ThemeToggle";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("nav");
  const locale = useLocale() as Locale;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const serviceItems = [
    { label: t("emergency"), href: `/${services[0].slugs[locale]}` },
    { label: t("installation"), href: `/${services[1].slugs[locale]}` },
    { label: t("repairs"), href: `/${services[2].slugs[locale]}` },
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

            <div ref={servicesRef} className="relative">
              <button
                onClick={() => setServicesOpen(!servicesOpen)}
                className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-primary-500 transition-colors"
              >
                {t("services")}
                <svg className={cn("h-4 w-4 transition-transform duration-200", servicesOpen && "rotate-180")} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className={cn(
                "absolute left-0 top-full z-50 mt-2 w-56 origin-top-left rounded-lg bg-white py-2 shadow-lg ring-1 ring-black/5 transition-all duration-200",
                servicesOpen ? "visible scale-100 opacity-100" : "invisible scale-95 opacity-0"
              )}>
                {serviceItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setServicesOpen(false)}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-accent-50 hover:text-primary-500"
                  >
                    {item.label}
                  </Link>
                ))}
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
            <ThemeToggle />
            <LanguageSwitcher />
            <a
              href="/#contact-form"
              className="inline-flex items-center gap-2 rounded-lg bg-primary-500 px-6 py-3 text-lg font-semibold text-white shadow-sm transition-colors hover:bg-primary-600"
            >
              {t("requestQuoteNow")}
            </a>
          </div>

          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
