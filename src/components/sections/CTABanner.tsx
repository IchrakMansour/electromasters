import { useTranslations } from "next-intl";
import { company } from "@/data/company";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

interface CTABannerProps {
  variant?: "primary" | "emergency";
}

export function CTABanner({ variant = "primary" }: CTABannerProps) {
  const t = useTranslations("common");

  return (
    <section className="bg-gray-900 py-12">
      <Container>
        <div className="flex flex-col items-center gap-6 text-center md:flex-row md:justify-between md:text-left">
          <div>
            <h2 className="text-xl font-bold text-white sm:text-2xl">
              {t("emergencyCall")}
            </h2>
            <p className="mt-1 text-gray-400">
              {t("available247")}
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              href={`tel:${company.phoneRaw}`}
              variant={variant === "emergency" ? "emergency" : "primary"}
              size="lg"
            >
              <svg className="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              {company.phone}
            </Button>
            <Button href="/contact" variant="outline" size="lg">
              {t("freeQuote")}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
