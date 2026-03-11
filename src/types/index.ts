import type { Locale } from "@/i18n/routing";

export interface ContentSection {
  heading: string;
  body: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface LocalizedContent {
  title: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  sections: ContentSection[];
  faqs: FAQ[];
}

export interface Service {
  key: string;
  heroImage?: string;
  slugs: Record<Locale, string>;
  icon: string;
  content: Record<Locale, LocalizedContent>;
}

export interface City {
  key: string;
  slugs: Record<Locale, string>;
  coordinates: { lat: number; lng: number };
  postalCodes: string[];
  content: Record<Locale, LocalizedContent & { localInfo: string }>;
}

export type PageResolution =
  | { type: "service"; key: string }
  | { type: "city"; key: string }
  | { type: "contact" }
  | null;
