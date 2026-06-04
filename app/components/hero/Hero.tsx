"use client";

import { useLocale, useTranslations } from "next-intl";
import { FiMinus } from "react-icons/fi";
import heroPhoto from '@/assets/hero2.jpeg'
import Image from "next/image";

export const Hero = () => {
    const t = useTranslations("Hero");
    const locale = useLocale()

    return (
        <section className="relative flex flex-col h-full w-full items-center overflow-hidden bg-background">
            <div className="pointer-events-none absolute right-0 inset-y-0 inset-e-0 hidden w-170 [clip-path:polygon(45%_0,100%_0,100%_100%,0_100%)] md:block">
                <Image
                    src={heroPhoto}
                    alt="hero photo"
                    className="object-cover w-full h-full"
                    priority
                />
            </div>

            <div className="relative z-10 w-full h-full max-w-5xl flex flex-col items-start justify-center gap-15 px-6">
                <div className="w-fit flex flex-col gap-5 text-center items-start justify-center">
                    <div className="w-fit flex flex-col items-start">
                        <span className="text-5xl uppercase tracking-wider font-semibold">aesthetic</span>
                        <div className="flex items-start justify-center gap-2">
                            <FiMinus />
                            <span className="text-base tracking-[10]">medicine</span>
                            <FiMinus />
                        </div>
                    </div>
                    <div className="max-w-sm md:max-w-lg space-y-1 flex flex-col items-start">
                        <p className="font-medium uppercase tracking-wide">{t("taglineTitle")}</p>
                        <p className={` text-rose  ${locale === 'he' ? 'font-gveret text-xl' : 'font-vibes text-2xl md:text-3xl'} `}>{t("taglineScript")}</p>
                    </div>
                </div>
            </div>
        </section>
    );
};
