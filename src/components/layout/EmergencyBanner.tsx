import { useTranslations } from "next-intl";
import { company } from "@/data/company";

export function EmergencyBanner() {
  const t = useTranslations("common");

  return (
    <div className="bg-emergency text-white">
      <div className="mx-auto max-w-7xl px-4 py-2 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center gap-2 text-sm font-medium">
          <svg
            className="h-4 w-4 animate-pulse"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
          <span>{t("emergencyCall")}</span>
          <a
            href={`tel:${company.phoneRaw}`}
            className="font-bold underline hover:no-underline"
          >
            {company.phone}
          </a>
        </div>
      </div>
    </div>
  );
}
