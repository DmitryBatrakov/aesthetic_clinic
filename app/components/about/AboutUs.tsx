"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { animate, motion, useInView } from "framer-motion";
import Image from "next/image";
import imageOfDoctor from '@/assets/doctor.jpg'

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });
    const [value, setValue] = useState(0);


    useEffect(() => {
        if (!inView) return;
        const controls = animate(0, to, {
            duration: 1.6,
            ease: "easeOut",
            onUpdate: (v) => setValue(Math.round(v)),
        });
        return () => controls.stop();
    }, [inView, to]);

    return (
        <span ref={ref} className="font-serif text-5xl text-gold sm:text-6xl">
            {value}
            {suffix}
        </span>
    );
}

const stats = [
    { to: 28, suffix: "" },
    { to: 10, suffix: "+" },
    { to: 100, suffix: "%" },
];

export const AboutUs = () => {
    const t = useTranslations("About");
    const statLabels = t.raw("stats") as string[];
    const locale = useLocale()

    return (
        <section
            id="about-us"
            className="w-full bg-cream px-6 py-20 text-text sm:px-12 md:py-32"
        >
            <div className="mx-auto max-w-7xl">
                <div className="grid items-start gap-10 md:grid-cols-2 md:gap-16">
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                        className="relative mx-auto aspect-4/5 w-full max-w-md overflow-hidden rounded-4xl border border-gold/40 bg-graphite"
                    >
                        <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-graphite to-graphite/60">
                            <Image 
                                src={imageOfDoctor} 
                                alt={t("doctorName")} 
                                sizes="(min-width:768px) 50vw, 100vw" 
                                className="object-cover" 
                            />
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                        className="flex flex-col gap-5"
                    >
                        <span className="text-sm font-medium uppercase tracking-[0.3em] text-gold">
                            {t("eyebrow")}
                        </span>
                        <h2 className="font-serif text-3xl leading-tight sm:text-4xl">
                            {t("title")}
                        </h2>

                        <div>
                            <p className="font-medium text-lg">{t("doctorName")}</p>
                            <p className="text-sm text-text-muted">{t("doctorRole")}</p>
                        </div>

                        <p className="leading-relaxed text-text-muted">{t("p1")}</p>
                        <p className="leading-relaxed text-text-muted">{t("p2")}</p>

                        <p className={`text-rose  ${locale === 'he' ? 'font-gveret text-xl' : 'font-vibes text-3xl'}`}>
                            {t("quote")}
                        </p>
                    </motion.div>
                </div>

                {/* Счётчики */}
                <div className="mt-16 grid grid-cols-1 gap-8 border-t border-taupe/20 pt-12 sm:grid-cols-3">
                    {stats.map((stat, i) => (
                        <div key={i} className="flex flex-col items-center gap-2 text-center">
                            <Counter to={stat.to} suffix={stat.suffix} />
                            <span className="text-xs uppercase tracking-[0.2em] text-text-muted">
                                {statLabels[i]}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
