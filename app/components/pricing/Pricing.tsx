"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { useBooking } from "../booking/BookingProvider";

type PriceItem = { name: string; price: string; unit?: string; includes?: string[] };
type Tab = { label: string; items: PriceItem[] };

const list: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.04 } },
};
const row: Variants = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

export const Pricing = () => {
    const t = useTranslations("Pricing");
    const tabs = t.raw("tabs") as Tab[];
    const [active, setActive] = useState(0);
    const { open } = useBooking();

    return (
        <section
            id="pricing"
            className="w-full bg-cream px-6 py-20 text-text sm:px-12 md:py-16"
        >
            <div className="mx-auto max-w-5xl">
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

                {/* Табы */}
                <div className="mt-12 flex justify-center">
                    <div
                        role="tablist"
                        aria-label={t("title")}
                        className="flex flex-wrap justify-center gap-2 sm:gap-1 sm:rounded-4xl sm:border sm:border-taupe/30 sm:p-1"
                    >
                        {tabs.map((tab, i) => {
                            const isActive = active === i;
                            return (
                                <button
                                    key={i}
                                    role="tab"
                                    aria-selected={isActive}
                                    onClick={() => setActive(i)}
                                    className={`rounded-full border px-5 py-2 text-sm font-medium tracking-wide transition-colors sm:border-0 ${isActive
                                        ? "border-gold bg-gold text-graphite"
                                        : "border-taupe/30 text-text-muted hover:text-gold"
                                        }`}
                                >
                                    {tab.label}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Список процедур активного таба */}
                <AnimatePresence mode="wait">
                    <motion.ul
                        key={active}
                        variants={list}
                        initial="hidden"
                        animate="visible"
                        exit={{ opacity: 0, transition: { duration: 0.15 } }}
                        className="mt-12 grid gap-x-10 gap-y-4 sm:grid-cols-2"
                    >
                        {tabs[active].items.map((item, i) => (
                            <motion.li key={i} variants={row} className="border-b border-taupe/20">
                                <button
                                    type="button"
                                    onClick={() => open(item.name)}
                                    className="group w-full pb-4 text-start"
                                >
                                    <div className="flex items-baseline justify-between gap-4">
                                        <span className="font-medium leading-relaxed transition-colors group-hover:text-gold">
                                            {item.name}
                                        </span>
                                        <span className="shrink-0 font-serif text-lg text-gold">
                                            {item.price}
                                        </span>
                                    </div>
                                    {item.unit && (
                                        <p className="mt-1 text-xs text-text-muted">{item.unit}</p>
                                    )}
                                    {item.includes && (
                                        <ul className="mt-3 flex flex-col gap-1.5">
                                            {item.includes.map((inc, j) => (
                                                <li
                                                    key={j}
                                                    className="flex items-center gap-2 text-sm text-text-muted"
                                                >
                                                    <span className="h-1 w-1 shrink-0 rounded-full bg-taupe" />
                                                    {inc}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </button>
                            </motion.li>
                        ))}
                    </motion.ul>
                </AnimatePresence>

                {/* Примечание + CTA */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="mt-14 flex flex-col items-center gap-6 text-center"
                >
                    <p className="max-w-xl text-sm leading-relaxed text-text-muted">
                        {t("note")}
                    </p>
                    <button
                        type="button"
                        onClick={() => open()}
                        className="rounded-full bg-linear-to-br from-gold-light via-gold to-[#9e7b33] px-7 py-3 text-sm font-medium tracking-wide text-graphite transition-opacity hover:opacity-90"
                    >
                        {t("cta")}
                    </button>
                </motion.div>
            </div>
        </section>
    );
};
