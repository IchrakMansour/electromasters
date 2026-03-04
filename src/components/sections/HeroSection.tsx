"use client";

import { useTranslations } from "next-intl";
import { company } from "@/data/company";
import { Button } from "@/components/ui/Button";

interface HeroSectionProps {
  title: string;
  subtitle: string;
  showCta?: boolean;
}

export function HeroSection({
  title,
  subtitle,
  showCta = true,
}: HeroSectionProps) {
  const t = useTranslations("common");

  return (
    <section className="relative bg-white py-20 sm:py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emergency/20 bg-emergency/5 px-4 py-1.5 text-sm font-medium text-emergency">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emergency opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emergency" />
              </span>
              {t("available247")}
            </div>
            <h1 className="mb-6 text-4xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              {title}
            </h1>
            <p className="mb-8 text-lg leading-relaxed text-gray-500 sm:text-xl">
              {subtitle}
            </p>
            {showCta && (
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button
                  href={`tel:${company.phoneRaw}`}
                  variant="primary"
                  size="lg"
                >
                  <svg
                    className="mr-2 h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  {t("callNow")} 24/7
                </Button>
                <Button href="/contact" variant="secondary" size="lg">
                  {t("freeQuote")}
                </Button>
              </div>
            )}
          </div>

          {/* Right side — animated lightning icon */}
          <div className="hidden items-center justify-center lg:flex">
            <div className="relative">
              <div className="absolute inset-0 animate-pulse rounded-full bg-primary-100/50 blur-2xl" />
              <div className="relative flex h-72 w-72 items-center justify-center rounded-3xl bg-gradient-to-br from-gray-50 to-primary-50 ring-1 ring-gray-100">
                <svg className="h-32 w-32 text-primary-500" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M13 2L3 14h7l-2 8L20 10h-7l2-8z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
