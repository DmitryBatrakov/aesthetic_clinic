"use client";

import { useLocale, useTranslations } from "next-intl";
import { FiMinus } from "react-icons/fi";

export const Hero = () => {
    const t = useTranslations("Hero");
    const locale = useLocale()

    return (
        <section className="relative flex h-full w-full items-center overflow-hidden bg-background">
            <div className="w-full h-full flex flex-col items-center justify-center gap-5 mb-20">
                <div className="w-full flex flex-col gap-5 text-center items-center justify-center">
                    <div>
                        <span className="text-2xl uppercase tracking-wider font-semibold">aesthetic</span>
                        <div className="flex items-center justify-center gap-2">
                            <FiMinus />
                            <span className="text-base tracking-[10]">medicine</span>
                            <FiMinus />
                        </div>
                    </div>
                    <div className="max-w-sm md:max-w-lg space-y-1">
                        <p className="font-medium uppercase tracking-wide">{t("taglineTitle")}</p>
                        <p className={` text-rose  ${locale === 'he' ? 'font-gveret text-xl' : 'font-vibes text-2xl md:text-3xl'} `}>{t("taglineScript")}</p>
                    </div>
                </div>
            </div>
        </section>
    );
};
