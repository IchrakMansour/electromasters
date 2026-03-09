import { useTranslations } from "next-intl";
import { company } from "@/data/company";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function EmergencySection() {
  const t = useTranslations("home");

  const features = [
    t("emergencyFeature1"),
    t("emergencyFeature2"),
    t("emergencyFeature3"),
  ];

  return (
    <section className="bg-white py-16 lg:py-24">
      <Container>
        <div className="overflow-hidden rounded-2xl bg-gray-900">
          <div className="grid items-center lg:grid-cols-2">
            <div className="p-8 text-white lg:p-12">
              <h2 className="mb-3 text-2xl font-bold sm:text-3xl">
                {t("emergencyTitle")}
              </h2>
              <p className="mb-6 leading-relaxed text-gray-400">
                {t("emergencySubtitle")}
              </p>
              <ul className="mb-8 space-y-3">
                {features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm">
                    <svg className="h-4 w-4 shrink-0 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button href={`tel:${company.phoneRaw}`} variant="primary" size="lg">
                <svg className="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {company.phone}
              </Button>
            </div>
            <div className="flex items-center justify-center bg-gray-800 p-12">
              <div className="relative">
                <div className="absolute inset-0 animate-ping rounded-full bg-primary-500/20" style={{ animationDuration: '2s' }} />
                <div className="relative flex h-28 w-28 items-center justify-center rounded-full bg-primary-500 text-white shadow-lg shadow-primary-500/30">
                  <svg className="h-14 w-14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M13 2L3 14h7l-2 8L20 10h-7l2-8z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
