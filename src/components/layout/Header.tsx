"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslations, useLocale } from "next-intl";
import { usePathname } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { services } from "@/data/services";
import type { Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/ui/Logo";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { ThemeToggle } from "./ThemeToggle";
import { MobileMenu } from "./MobileMenu";
import { company } from "@/data/company";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("nav");
  const locale = useLocale() as Locale;
  const pathname = usePathname();

  const handleHomeClick = (e: React.MouseEvent) => {
    const isHome = pathname === `/${locale}` || pathname === "/";
    if (isHome) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

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
    { label: t("industrial"), href: `/${services[3].slugs[locale]}` },
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
          <Link href="/" onClick={handleHomeClick}>
            <Logo size="md" />
          </Link>

          <nav className="hidden items-center gap-6 lg:flex">
            <Link
              href="/"
              onClick={handleHomeClick}
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
            <span className="relative inline-flex">
              <span className="absolute inset-0 animate-ping rounded-lg bg-[#25D366] opacity-50" />
            <a
              href={`https://wa.me/${company.whatsapp.replace(/\D/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-flex items-center justify-center rounded-lg bg-[#25D366] p-3 text-white shadow-sm transition-colors hover:bg-[#1ebe5d]"
              aria-label="WhatsApp"
            >
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </a>
            </span>
            <a
              href="/#contact-form"
              className="inline-flex items-center gap-2 rounded-lg bg-primary-500 px-6 py-3 text-lg font-semibold text-white shadow-sm transition-colors hover:bg-primary-600"
            >
              {t("requestQuoteNow")}
            </a>
            <a
              href={`https://wa.me/${company.whatsapp.replace(/\D/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-lg bg-[#25D366] p-3 text-white shadow-sm transition-colors hover:bg-[#1ebe5d]"
              aria-label="WhatsApp"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </a>
          </div>

          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
