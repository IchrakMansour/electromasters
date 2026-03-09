"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
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
    <section className="relative min-h-[600px] flex items-center py-20 sm:py-28 lg:py-36 overflow-hidden">
      {/* Background image */}
      <Image
        src="/Background.png"
        alt="Elektricien achtergrond"
        fill
        priority
        className="object-cover object-center"
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/65" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-sm font-medium text-white">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emergency opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emergency" />
            </span>
            {t("available247")}
          </div>
          <h1 className="mb-6 text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mb-8 text-lg leading-relaxed text-gray-200 sm:text-xl">
            {subtitle}
          </p>
          {showCta && (
            <div className="flex justify-center">
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
                {t("callNow")} {company.phone}
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
