"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import firstImage from '@/assets/tech/1.jpg'
import secondImage from '@/assets/tech/2.jpg'
import thirdImage from '@/assets/tech/3.jpg'

const equipmentImages = [firstImage, secondImage, thirdImage];

type Equipment = { name: string; desc: string };

export const Technologies = () => {
    const t = useTranslations("Technologies");
    const equipment = t.raw("equipment") as Equipment[];
    const principles = t.raw("principles") as string[];

    return (
        <section
            id="technologies"
            className="w-full bg-cream px-6 py-20 text-text sm:px-12 md:py-16"
        >
            <div className="mx-auto max-w-6xl h-full px-6">
                {/* Заголовок + интро */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="mx-auto max-w-2xl text-center"
                >
                    <span className="text-sm font-medium uppercase tracking-[0.3em] text-gold">
                        {t("eyebrow")}
                    </span>
                    <h2 className="mt-4 font-serif text-3xl leading-tight sm:text-4xl">
                        {t("title")}
                    </h2>
                    <p className="mt-5 leading-relaxed text-text-muted">{t("intro")}</p>
                </motion.div>

                {/* Принципы — золотые чипы */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="mx-auto my-12 flex flex-col md:flex-row flex-wrap items-start md:items-center justify-center gap-2 md:gap-6"
                >
                    {principles.map((principle, i) => (
                        <div key={i} className="flex items-center justify-center gap-6 ">
                            <span aria-hidden="true" className="size-1.5 rotate-45 bg-gold" />
                            <span className="font-serif text-xl tracking-wide text-graphite">
                                {principle}
                            </span>
                        </div>
                    ))}
                </motion.div>


                {/* Оборудование — зигзаг */}
                <div className="mt-16 flex flex-col gap-12 md:gap-20">
                    {equipment.map((unit, i) => {
                        const isEven = i % 2 === 0;
                        return (
                            <div
                                key={i}
                                className="grid gap-3 md:grid-cols-2 md:items-stretch md:gap-14 mb-5"
                            >
                                <motion.div
                                    initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: "-80px" }}
                                    transition={{ duration: 0.6, ease: "easeOut" }}
                                    className={`overflow-hidden rounded-4xl border border-taupe/30 bg-graphite ${isEven ? "" : "md:order-last"}`}
                                >
                                    <Image
                                        src={equipmentImages[i]}
                                        alt={unit.name}
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                        className="max-h-130 w-full object-cover"
                                    />
                                </motion.div>

                                {/* Описание */}
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-80px" }}
                                    transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                                    className={`flex h-full flex-col items-center justify-between gap-4 p-3 ${isEven ? "md:items-end md:text-end" : "md:items-start md:text-start"}`}
                                >
                                    <span className="font-serif text-[8em] leading-none text-gold/30">
                                        {String(i + 1).padStart(2, "0")}
                                    </span>
                                    <div>
                                        <h3 className="text-3xl font-medium">{unit.name}</h3>
                                        <p className="max-w-md leading-relaxed text-text-muted">
                                            {unit.desc}
                                        </p>
                                    </div>
                                </motion.div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};
