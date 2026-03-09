"use client";

import { useState, useRef, useEffect } from "react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { getAlternateSlug } from "@/lib/slug-resolver";
import { cn } from "@/lib/utils";

const localeConfig: Record<Locale, { flagCode: string; label: string; code: string }> = {
  nl: { flagCode: "nl", label: "Nederlands", code: "NL" },
  fr: { flagCode: "fr", label: "Fran\u00E7ais", code: "FR" },
  en: { flagCode: "gb", label: "English", code: "EN" },
};

export function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSwitch = (targetLocale: Locale) => {
    if (targetLocale === locale) {
      setIsOpen(false);
      return;
    }

    const segments = pathname.split("/").filter(Boolean);
    if (segments.length === 0) {
      router.push("/", { locale: targetLocale });
    } else {
      const currentSlug = segments.join("/");
      const targetSlug = getAlternateSlug(currentSlug, locale, targetLocale);
      router.push(`/${targetSlug}`, { locale: targetLocale });
    }
    setIsOpen(false);
  };

  const current = localeConfig[locale];

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition-all duration-200",
          isOpen
            ? "border-primary-200 bg-primary-50 text-primary-700"
            : "border-accent-200 bg-white text-gray-700 hover:border-primary-200 hover:bg-accent-50"
        )}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <img
          src={`https://flagcdn.com/20x15/${current.flagCode}.png`}
          width={20}
          height={15}
          alt={current.label}
          className="rounded-sm"
        />
        <span>{current.code}</span>
        <svg
          className={cn("h-3 w-3 text-gray-400 transition-transform duration-200", isOpen && "rotate-180")}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <div
        className={cn(
          "absolute right-0 top-full z-50 mt-2 w-48 origin-top-right rounded-xl border border-accent-200 bg-white py-1 shadow-lg transition-all duration-200",
          isOpen
            ? "visible scale-100 opacity-100"
            : "invisible scale-95 opacity-0"
        )}
        role="listbox"
        aria-label="Select language"
      >
        {routing.locales.map((loc) => {
          const config = localeConfig[loc];
          const isActive = loc === locale;

          return (
            <button
              key={loc}
              onClick={() => handleSwitch(loc)}
              role="option"
              aria-selected={isActive}
              className={cn(
                "flex w-full items-center gap-3 px-4 py-2.5 text-sm transition-colors",
                isActive
                  ? "bg-primary-50 text-primary-700"
                  : "text-gray-700 hover:bg-accent-50"
              )}
            >
              <img
                src={`https://flagcdn.com/20x15/${config.flagCode}.png`}
                width={20}
                height={15}
                alt={config.label}
                className="rounded-sm"
              />
              <span className="flex-1 text-left font-medium">{config.label}</span>
              {isActive && (
                <svg className="h-4 w-4 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
