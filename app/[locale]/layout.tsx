import type { Metadata } from "next";
import { Playfair_Display, Montserrat, Marck_Script } from "next/font/google";
import localFont from "next/font/local";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing, localeDirection, type Locale } from "@/i18n/routing";
import { Header } from "../components/header/Header";
import "../globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "cyrillic"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin", "cyrillic"],
});

const marck = Marck_Script({
  variable: "--font-marck",
  weight: "400",
  subsets: ["latin", "cyrillic"],
});

// Локальные шрифты из app/fonts/.
const greatVibes = localFont({
  src: "../fonts/GreatVibes-Regular.ttf",
  variable: "--font-great-vibes",
  weight: "400",
  display: "swap",
});

const gveretLevin = localFont({
  src: "../fonts/GveretLevin-Regular.ttf",
  variable: "--font-gveret-levin",
  weight: "400",
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  // Валидация локали из URL
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Включаем статический рендеринг для этой локали
  setRequestLocale(locale);

  return (
    <html
      lang={locale}
      dir={localeDirection[locale as Locale]}
      className={`${playfair.variable} ${montserrat.variable} ${marck.variable} ${greatVibes.variable} ${gveretLevin.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col overflow-x-clip">
        <NextIntlClientProvider>
          <Header />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
