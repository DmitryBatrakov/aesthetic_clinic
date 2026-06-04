"use client";

import { useLocale, useTranslations } from "next-intl";
import { FiMinus } from "react-icons/fi";
import heroPhoto from '@/assets/hero6.jpeg'
import Image from "next/image";

export const Hero = () => {
    const t = useTranslations("Hero");
    const locale = useLocale()

    const photoClip =
        locale === "he"
            ? "[clip-path:polygon(70%_0,0_0,0_100%,100%_100%)]"
            : "[clip-path:polygon(30%_0,100%_0,100%_100%,0_100%)]"

    return (
        <section className="relative flex flex-col h-full w-full items-center overflow-hidden bg-background">
            <div className={`pointer-events-none absolute inset-y-0 inset-e-0 hidden md:w-100 lg:w-160 ${photoClip} md:block`}>
                <div className="bg-black/30 absolute top-0 w-full h-full" />
                <Image
                    src={heroPhoto}
                    alt="hero photo"
                    className="object-cover object-right w-full h-full"
                    priority
                />
            </div>

            <div className="relative z-10 w-full h-full max-w-6xl flex flex-col items-start justify-center gap-1 px-4">
                <div className="w-full md:w-fit flex flex-col gap-8 items-center md:items-start justify-center">
                    <div className="w-fit flex flex-col items-center">
                        <span className="text-5xl uppercase tracking-wider font-semibold">aesthetic</span>
                        <div className="flex items-start justify-center gap-2">
                            <FiMinus />
                            <span className="text-base tracking-[10]">medicine</span>
                            <FiMinus />
                        </div>
                    </div>
                    <div className="w-full max-w-sm md:max-w-lg space-y-1 flex flex-col items-center md:items-start  gap-2">
                        <p className="font-medium uppercase tracking-wide">{t("taglineTitle")}</p>
                        <p className={` text-rose  ${locale === 'he' ? 'font-gveret text-xl' : 'font-vibes text-2xl md:text-3xl'} `}>{t("taglineScript")}</p>
                    </div>
                </div>
            </div>
        </section>
    );
};
