import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // Иврит — основной (RTL), русский — второй (LTR)
  locales: ["he", "ru"],
  defaultLocale: "he",
});

export type Locale = (typeof routing.locales)[number];

// Направление письма по локали
export const localeDirection: Record<Locale, "rtl" | "ltr"> = {
  he: "rtl",
  ru: "ltr",
};
