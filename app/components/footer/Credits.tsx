import { useLocale, useTranslations } from "next-intl";

export const Credits = () => {
    const t = useTranslations("Credits");
    const locale = useLocale();

    return (
        <div className="w-full bg-graphite text-center text-cream/40" >
            <p
                dir={locale === "he" ? "rtl" : "ltr"}
                className="border-t border-cream/10 py-4 text-xs tracking-wide"
            >
                {t("label")}{" "}
                <a
                    href={t("url")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cream/60 transition-colors hover:text-gold"
                >
                    {t("name")}
                </a>
            </p>
        </div>
    );
};
