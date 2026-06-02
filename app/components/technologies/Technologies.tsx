"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { IconType } from "react-icons";
import { FiActivity, FiZap, FiSearch } from "react-icons/fi";

const equipmentIcons: IconType[] = [FiActivity, FiZap, FiSearch];

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
            <div className="mx-auto max-w-6xl h-full">
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
                    className="my-5 flex flex-wrap items-center justify-center gap-3"
                >
                    {principles.map((principle, i) => (
                        <span
                            key={i}
                            className="rounded-full border border-gold/40 bg-gold/5 px-6 py-3 text-sm font-medium tracking-wide text-gold shadow-md shadow-rose/70"
                        >
                            {principle}
                        </span>
                    ))}
                </motion.div>

                {/* Оборудование — зигзаг */}
                <div className="mt-16 flex flex-col gap-12 md:gap-20">
                    {equipment.map((unit, i) => {
                        const Icon = equipmentIcons[i] ?? FiActivity;
                        const isEven = i % 2 === 0;
                        return (
                            <div
                                key={i}
                                className="grid gap-3 md:grid-cols-2 md:items-stretch md:gap-14 mb-5"
                            >
                                {/* Фото (плейсхолдер).
                                    TODO: заменить на <Image src="/technologies/..." fill className="object-cover" /> */}
                                <motion.div
                                    initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: "-80px" }}
                                    transition={{ duration: 0.6, ease: "easeOut" }}
                                    className={`relative aspect-4/3 w-full overflow-hidden rounded-4xl border border-taupe/30 bg-graphite ${isEven ? "" : "md:order-last"
                                        }`}
                                >
                                    <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-graphite to-graphite/60">
                                        <Icon className="text-gold/70" size={64} />
                                    </div>
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
