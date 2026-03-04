"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { services } from "@/data/services";
import type { Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations("nav");
  const locale = useLocale() as Locale;

  const navItems = [
    { label: t("home"), href: "/" },
    { label: t("emergency"), href: `/${services[0].slugs[locale]}` },
    { label: t("installation"), href: `/${services[1].slugs[locale]}` },
    { label: t("repairs"), href: `/${services[2].slugs[locale]}` },
    { label: t("smartHome"), href: `/${services[3].slugs[locale]}` },
    { label: t("industrial"), href: `/${services[4].slugs[locale]}` },
    { label: t("contact"), href: "/contact" },
  ];

  return (
    <div className="lg:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-accent-100 hover:text-primary-500 transition-colors"
        aria-expanded={isOpen}
        aria-label="Toggle menu"
      >
        {isOpen ? (
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      <div
        className={cn(
          "fixed inset-0 top-[120px] z-40 bg-white transition-transform duration-300 lg:hidden",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <nav className="flex flex-col p-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="border-b border-accent-100 py-3 text-lg font-medium text-gray-700 hover:text-primary-500 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <div className="mt-6">
            <LanguageSwitcher />
          </div>
        </nav>
      </div>
    </div>
  );
}
