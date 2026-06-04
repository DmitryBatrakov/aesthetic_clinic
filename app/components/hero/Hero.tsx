"use client";

import { useLocale, useTranslations } from "next-intl";
import { FiMinus } from "react-icons/fi";
import { GiSyringe } from "react-icons/gi";

import { FaHandSparkles, FaSpa } from "react-icons/fa6";
import { MdFaceRetouchingNatural, MdSpa } from "react-icons/md";
import { LuScanFace } from "react-icons/lu";
import { TbFaceMask } from "react-icons/tb";
import { GiLipstick } from "react-icons/gi";

import heroPhoto from '@/assets/hero6.jpeg'
import Image from "next/image";

export const Hero = () => {
    const t = useTranslations("Hero");
    const locale = useLocale()

    const photoClip =
        locale === "he"
            ? "md:[clip-path:polygon(70%_0,0_0,0_100%,100%_100%)]"
            : "md:[clip-path:polygon(30%_0,100%_0,100%_100%,0_100%)]"

    return (
        <section className="relative flex flex-col h-full w-full items-center overflow-hidden bg-background">
            <div className="w-full h-full flex items-center justify-start md:justify-center max-w-6xl px-2 md:px-6">
                <div className={`pointer-events-none absolute inset-y-0 inset-e-0 w-1/3 md:w-100 lg:w-160 ${photoClip} md:block`}>
                    <div className="bg-black/30 absolute top-0 w-full h-full" />
                    <Image
                        src={heroPhoto}
                        alt="hero photo"
                        className="object-cover object-[75%_100%] md:object-right w-full h-full"
                        priority
                    />
                </div>

                <div className="relative z-10 w-2/3 md:w-full h-full flex flex-col items-start justify-center gap-1">
                    <div className="w-full md:w-fit flex flex-col gap-8 items-center md:items-start justify-center px-2">
                        <div className="w-fit flex flex-col items-center">
                            <span className="text-4xl md:text-5xl uppercase tracking-wider font-semibold">aesthetic</span>
                            <div className="flex items-start justify-center gap-2">
                                <FiMinus />
                                <span className="text-base tracking-[10]">medicine</span>
                                <FiMinus />
                            </div>
                        </div>
                        <div className="w-full max-w-sm md:max-w-lg space-y-1 flex flex-col items-center md:items-start gap-2">
                            <p className="font-medium uppercase tracking-wide">{t("taglineTitle")}</p>
                            <p className={` text-rose text-center md:text-start  ${locale === 'he' ? 'font-gveret text-xl' : 'font-vibes text-2xl md:text-3xl'} `}>{t("taglineScript")}</p>
                        </div>
                        <div className="w-full grid grid-cols-3 place-items-center">
                            <GiSyringe size={30} className="text-graphite"/>
                            <FaHandSparkles size={30} className="text-graphite" />
                            <MdSpa size={30} className="text-graphite" />

                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
