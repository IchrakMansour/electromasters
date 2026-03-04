import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["nl", "en", "fr"],
  defaultLocale: "nl",
  localePrefix: "always",
});

export type Locale = (typeof routing.locales)[number];
