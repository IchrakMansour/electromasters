import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { company } from "@/data/company";
import { services } from "@/data/services";
import type { Locale } from "@/i18n/routing";
import { Logo } from "@/components/ui/Logo";

export function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const locale = useLocale() as Locale;

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="h-1 bg-gradient-to-r from-primary-500 via-primary-400 to-primary-600" />
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <div className="mb-4">
              <Logo size="md" variant="white" />
            </div>
            <p className="text-sm leading-relaxed">{t("description")}</p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              {t("services")}
            </h3>
            <ul className="space-y-2">
              {services.filter((s) => s.key !== "smart-home").map((service) => (
                <li key={service.key}>
                  <Link
                    href={`/${service.slugs[locale]}`}
                    className="text-sm hover:text-primary-400 transition-colors"
                  >
                    {service.content[locale].title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              {t("contact")}
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <svg className="mt-0.5 h-5 w-5 shrink-0 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a
                  href={`tel:${company.phoneRaw}`}
                  className="text-sm hover:text-primary-400 transition-colors"
                >
                  {company.phone}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <svg className="mt-0.5 h-5 w-5 shrink-0 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a
                  href={`mailto:${company.email}`}
                  className="text-sm hover:text-primary-400 transition-colors"
                >
                  {company.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-800 pt-8">
          <p className="text-center text-sm">
            &copy; {new Date().getFullYear()} {company.name}. {t("rights")}
          </p>
        </div>
      </div>
    </footer>
  );
}
