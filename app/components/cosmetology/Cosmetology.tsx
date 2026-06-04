"use client";

import { useLocale, useTranslations } from "next-intl";
import { motion, type Variants } from "framer-motion";
import { IconType } from "react-icons";
import { FiStar, FiDroplet, FiSmile, FiClipboard } from "react-icons/fi";

// Иконки в коде, тексты — в локалях (Cosmetology.items по индексу)
const itemIcons: IconType[] = [FiStar, FiDroplet, FiSmile, FiClipboard];

type CosmetologyItem = { title: string; desc: string };

const container: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
};
const card: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export const Cosmetology = () => {
    const t = useTranslations("Cosmetology");
    const locale = useLocale();
    const items = t.raw("items") as CosmetologyItem[];

    return (
        <section
            id="cosmetology"
            className="w-full bg-graphite/80 px-6 py-20 text-cream sm:px-12 md:py-32"
        >
            <div className="mx-auto max-w-6xl md:px-6">
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
                    <p className="mt-5 leading-relaxed text-cream/70">{t("intro")}</p>
                </motion.div>

                {/* Карточки специализаций 2×2 */}
                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-80px" }}
                    className="mt-14 grid gap-6 sm:grid-cols-2"
                >
                    {items.map((item, i) => {
                        const Icon = itemIcons[i] ?? FiStar;
                        return (
                            <motion.div
                                key={i}
                                variants={card}
                                className="flex gap-4 rounded-2xl border border-gold/20 bg-cream/5 p-6 transition-colors hover:border-gold/50"
                            >
                                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gold/10 text-gold">
                                    <Icon size={22} />
                                </span>
                                <div className="flex flex-col gap-1">
                                    <h3 className="font-serif text-xl text-cream">{item.title}</h3>
                                    <p className="text-sm leading-relaxed text-cream/60">
                                        {item.desc}
                                    </p>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>

                {/* Философия */}
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className={`mx-auto mt-14 max-w-3xl text-center text-rose ${locale === "he" ? "font-gveret text-2xl" : "font-vibes text-3xl"
                        }`}
                >
                    {t("quote")}
                </motion.p>
            </div>
        </section>
    );
};
