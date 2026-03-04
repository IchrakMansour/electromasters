import { useTranslations, useLocale } from "next-intl";
import { Container } from "@/components/ui/Container";
import type { Locale } from "@/i18n/routing";

const reviews = [
  {
    name: "Jan De Smedt",
    location: "Antwerpen",
    rating: 5,
    text: {
      nl: "Uitstekende service! De elektricien was binnen 30 minuten ter plaatse toen onze stroom uitviel op een zaterdagavond. Zeer professioneel en vriendelijk. Absoluut aan te raden!",
      fr: "Excellent service! L'électricien était sur place en 30 minutes lorsque notre courant a coupé un samedi soir. Très professionnel et aimable. Absolument recommandé!",
      en: "Excellent service! The electrician was on-site within 30 minutes when our power went out on a Saturday evening. Very professional and friendly. Absolutely recommended!",
    },
  },
  {
    name: "Marie Claes",
    location: "Gent",
    rating: 5,
    text: {
      nl: "Electro Masters heeft onze volledige woning gerenoveerd qua elektriciteit. Netjes werk, goede communicatie en eerlijke prijs. De keuring is in één keer geslaagd!",
      fr: "Electro Masters a entièrement rénové l'électricité de notre maison. Travail soigné, bonne communication et prix honnête. Le contrôle a été réussi du premier coup!",
      en: "Electro Masters completely renovated our home's electrical system. Clean work, good communication, and fair price. The inspection passed on the first try!",
    },
  },
  {
    name: "Peter Van den Berg",
    location: "Leuven",
    rating: 5,
    text: {
      nl: "Fantastisch team! Ze hebben ons smart home systeem geïnstalleerd en alles werkt perfect. Verlichting, verwarming en beveiliging allemaal vanuit één app. Heel tevreden!",
      fr: "Équipe fantastique! Ils ont installé notre système smart home et tout fonctionne parfaitement. Éclairage, chauffage et sécurité, tout depuis une seule application. Très satisfait!",
      en: "Fantastic team! They installed our smart home system and everything works perfectly. Lighting, heating, and security all from one app. Very satisfied!",
    },
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`h-5 w-5 ${i < rating ? "text-yellow-400" : "text-gray-300"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export function Testimonials() {
  const t = useTranslations("home");
  const locale = useLocale() as Locale;

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-accent-50 to-white py-16 lg:py-24">
      <Container>
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
            {t("reviewsTitle")}
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            {t("reviewsSubtitle")}
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {reviews.map((review) => (
            <div
              key={review.name}
              className="relative rounded-xl border border-accent-100 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1"
            >
              <div className="absolute -top-3 left-6 text-5xl font-serif text-primary-100 select-none">
                &ldquo;
              </div>
              <div className="relative pt-4">
                <StarRating rating={review.rating} />
                <p className="mt-4 text-gray-600 leading-relaxed">
                  &ldquo;{review.text[locale]}&rdquo;
                </p>
                <div className="mt-6 flex items-center gap-3 border-t border-accent-100 pt-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-50 text-sm font-bold text-primary-600">
                    {review.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{review.name}</p>
                    <p className="text-sm text-gray-500">{review.location}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
