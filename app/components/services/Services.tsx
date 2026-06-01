"use client";

import { useTranslations } from "next-intl";
import { motion, type Variants } from "framer-motion";

type Service = { name: string; desc: string };

const container: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
};
const cardVariant: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export const Services = () => {
    const t = useTranslations("Services");
    const items = t.raw("items") as Service[];

    return (
        <section
            id="services"
            className="w-full bg-background px-6 py-20 text-text sm:px-12 md:py-16"
        >
            <div className="mx-auto max-w-6xl">
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

                {/* Карточки услуг */}
                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-80px" }}
                    className="mt-14 grid gap-6 sm:grid-cols-2"
                >
                    {items.map((item, i) => (
                        <motion.article
                            key={i}
                            variants={cardVariant}
                            className="group relative aspect-4/5 overflow-hidden rounded-4xl bg-graphite"
                        >
                            {/* Фон-фото (плейсхолдер).
                                TODO: положить public/services/<name>.jpg и заменить блок ниже на
                                <Image src={...} alt={item.name} fill
                                       sizes="(min-width:640px) 50vw, 100vw"
                                       className="object-cover transition-transform duration-700 group-hover:scale-105" /> */}
                            <div className="absolute inset-0 bg-linear-to-br from-graphite to-graphite/60 transition-transform duration-700 group-hover:scale-105" />

                            {/* Номер-вотермарк */}
                            <span className="absolute inset-e-6 top-5 font-serif text-5xl text-cream/10">
                                {String(i + 1).padStart(2, "0")}
                            </span>

                            {/* Градиентный оверлей снизу под текст */}
                            <div className="absolute inset-0 bg-linear-to-t from-graphite via-graphite/40 to-transparent" />

                            {/* Контент */}
                            <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 p-6">
                                <span className="h-px w-10 bg-gold transition-all duration-500 group-hover:w-16" />
                                <h3 className="font-serif text-2xl text-cream">{item.name}</h3>
                                <p className="text-sm leading-relaxed text-cream/70">
                                    {item.desc}
                                </p>
                            </div>
                        </motion.article>
                    ))}
                </motion.div>

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
