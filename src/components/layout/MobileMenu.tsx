"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { services } from "@/data/services";
import { company } from "@/data/company";
import type { Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { ThemeToggle } from "./ThemeToggle";

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations("nav");
  const locale = useLocale() as Locale;

  const navItems = [
    { label: t("home"), href: "/" },
    { label: t("emergency"), href: `/${services[0].slugs[locale]}` },
    { label: t("installation"), href: `/${services[1].slugs[locale]}` },
    { label: t("repairs"), href: `/${services[2].slugs[locale]}` },
    { label: t("industrial"), href: `/${services[4].slugs[locale]}` },
    { label: t("contact"), href: "/contact" },
  ];

  return (
    <div className="lg:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 dark:text-gray-200 hover:bg-accent-100 dark:hover:bg-gray-700 hover:text-primary-500 transition-colors"
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

      {/* Backdrop overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Menu panel */}
      <div
        className={cn(
          "fixed inset-y-0 right-0 top-16 z-40 w-full max-w-sm bg-white dark:bg-gray-900 shadow-xl transition-transform duration-300 ease-in-out lg:hidden",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <nav className="flex h-full flex-col overflow-y-auto p-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="border-b border-accent-100 dark:border-gray-700 py-3 text-base font-medium text-gray-700 dark:text-gray-200 hover:text-primary-500 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <a
            href={`tel:${company.phoneRaw}`}
            className="mt-6 flex items-center gap-3 rounded-lg bg-primary-500 px-4 py-3 text-base font-semibold text-white"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            {company.phone}
          </a>
          <div className="mt-4 flex items-center gap-3">
            <ThemeToggle />
            <LanguageSwitcher />
          </div>
        </nav>
      </div>
    </div>
  );
}
