import { company } from "@/data/company";
import { cities } from "@/data/cities";

interface JsonLdProps {
  type: "localBusiness" | "service" | "breadcrumb";
  data?: Record<string, unknown>;
}

export function JsonLd({ type, data }: JsonLdProps) {
  let schema: Record<string, unknown>;

  if (type === "localBusiness") {
    schema = {
      "@context": "https://schema.org",
      "@type": "Electrician",
      name: company.name,
      telephone: company.phone,
      email: company.email,
      url: company.url,
      address: {
        "@type": "PostalAddress",
        streetAddress: company.address.street,
        addressLocality: company.address.city,
        postalCode: company.address.postalCode,
        addressRegion: company.address.region,
        addressCountry: company.address.country,
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: company.coordinates.lat,
        longitude: company.coordinates.lng,
      },
      areaServed: cities.map((city) => ({
        "@type": "City",
        name: city.content.nl.title.replace("Elektricien ", ""),
      })),
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "00:00",
        closes: "23:59",
      },
      priceRange: "$$",
    };
  } else if (type === "service") {
    schema = {
      "@context": "https://schema.org",
      "@type": "Service",
      provider: {
        "@type": "Electrician",
        name: company.name,
      },
      areaServed: {
        "@type": "State",
        name: "Vlaanderen",
      },
      ...data,
    };
  } else {
    schema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      ...data,
    };
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
