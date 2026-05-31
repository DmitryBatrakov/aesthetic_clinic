"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";
import { RxChevronDown } from "react-icons/rx";

type Service = { name: string; desc: string };

export const Services = () => {
    const t = useTranslations("Services");
    const items = t.raw("items") as Service[];
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section
            id="services"
            className="w-full bg-background px-6 py-20 text-text sm:px-12 md:py-32"
        >
            <div className="mx-auto max-w-3xl">
                {/* Заголовок + интро */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="text-center"
                >
                    <span className="text-sm font-medium uppercase tracking-[0.3em] text-gold">
                        {t("eyebrow")}
                    </span>
                    <h2 className="mt-4 font-serif text-3xl leading-tight sm:text-4xl">
                        {t("title")}
                    </h2>
                    <p className="mt-5 leading-relaxed text-text-muted">{t("intro")}</p>
                </motion.div>

                {/* Аккордеон */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="mt-12"
                >
                    {items.map((item, i) => {
                        const isOpen = openIndex === i;
                        return (
                            <div key={i} className="border-b border-taupe/30">
                                <button
                                    type="button"
                                    onClick={() => setOpenIndex(isOpen ? null : i)}
                                    aria-expanded={isOpen}
                                    className="flex w-full items-center justify-between gap-4 py-5 text-start transition-colors hover:text-gold"
                                >
                                    <span className="font-serif text-xl">{item.name}</span>
                                    <RxChevronDown
                                        size={22}
                                        className={`shrink-0 text-gold transition-transform duration-300 ${isOpen ? "rotate-180" : ""
                                            }`}
                                    />
                                </button>
                                <AnimatePresence initial={false}>
                                    {isOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                            className="overflow-hidden"
                                        >
                                            <p className="pb-5 leading-relaxed text-text-muted">
                                                {item.desc}
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })}
                </motion.div>

                {/* Примечание + CTA */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="mt-10 flex flex-col items-center gap-6 text-center"
                >
                    <p className="max-w-xl text-sm leading-relaxed text-text-muted">
                        {t("note")}
                    </p>
                    <a
                        href="#pricing"
                        className="rounded-full bg-linear-to-br from-gold-light via-gold to-[#9e7b33] px-7 py-3 text-sm font-medium tracking-wide text-graphite transition-opacity hover:opacity-90"
                    >
                        {t("cta")}
                    </a>
                </motion.div>
            </div>
        </section>
    );
};
