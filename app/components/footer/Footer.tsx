"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { motion } from "framer-motion";
import { FaWhatsapp, FaInstagram, FaFacebookF } from "react-icons/fa6";

const navItems = [
    { key: "about", href: "#about-us" },
    { key: "technologies", href: "#technologies" },
    { key: "services", href: "#services" },
    { key: "pricing", href: "#pricing" },
] as const;

export const Footer = () => {
    const t = useTranslations("Footer");
    const nav = useTranslations("Nav");

    const whatsappNumber = t("whatsappNumber");
    const address = t("address");
    const hours = t.raw("hours") as string[];
    const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`;

    return (
        <footer id="contact" className="w-full bg-graphite text-cream">
            <div className="mx-auto max-w-7xl px-6 py-20 sm:px-12 md:py-28">
                {/* Контактная зона */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="grid gap-12 md:grid-cols-2 md:gap-16"
                >
                    {/* CTA + соцсети */}
                    <div className="flex flex-col gap-6">
                        <span className="text-sm font-medium uppercase tracking-[0.3em] text-gold">
                            {t("eyebrow")}
                        </span>
                        <h2 className="font-serif text-3xl leading-tight sm:text-4xl">
                            {t("ctaTitle")}
                        </h2>
                        <p className="max-w-md leading-relaxed text-cream/70">{t("ctaText")}</p>

                        <div className="mt-2 flex flex-wrap items-center gap-4">
                            <a
                                href={`https://wa.me/${whatsappNumber}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 rounded-full bg-linear-to-br from-gold-light via-gold to-[#9e7b33] px-6 py-3 text-sm font-medium tracking-wide text-graphite transition-opacity hover:opacity-90"
                            >
                                <FaWhatsapp size={18} />
                                {t("whatsappLabel")}
                            </a>
                            <a
                                href={`tel:+${whatsappNumber}`}
                                className="rounded-full border border-cream/30 px-6 py-3 text-sm tracking-wide text-cream transition-colors hover:border-gold hover:text-gold"
                            >
                                {t("phone")}
                            </a>
                        </div>

                        {/* Соцсети */}
                        <div className="mt-4 flex flex-col gap-3">
                            <span className="text-xs uppercase tracking-[0.2em] text-cream/50">
                                {t("socialTitle")}
                            </span>
                            <div className="flex gap-3">
                                <a
                                    href={t("instagram")}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Instagram"
                                    className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/20 text-cream transition-colors hover:border-gold hover:text-gold"
                                >
                                    <FaInstagram size={18} />
                                </a>
                                <a
                                    href={t("facebook")}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Facebook"
                                    className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/20 text-cream transition-colors hover:border-gold hover:text-gold"
                                >
                                    <FaFacebookF size={16} />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Адрес + часы + карта */}
                    <div className="flex flex-col gap-6">
                        <div className="grid gap-6 sm:grid-cols-2">
                            <div>
                                <h3 className="text-xs uppercase tracking-[0.2em] text-cream/50">
                                    {t("addressTitle")}
                                </h3>
                                <p className="mt-2 leading-relaxed text-cream/80">{address}</p>
                            </div>
                            <div>
                                <h3 className="text-xs uppercase tracking-[0.2em] text-cream/50">
                                    {t("hoursTitle")}
                                </h3>
                                <ul className="mt-2 flex flex-col gap-1 text-cream/80">
                                    {hours.map((line, i) => (
                                        <li key={i}>{line}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Карта */}
                        <div className="overflow-hidden rounded-4xl border border-cream/10">
                            <iframe
                                src={mapSrc}
                                title={address}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="h-56 w-full grayscale"
                            />
                        </div>
                    </div>
                </motion.div>

                {/* Нижняя полоса */}
                <div className="mt-16 flex flex-col items-center gap-6 border-t border-cream/10 pt-8 sm:flex-row sm:justify-between">
                    <span className="font-serif text-2xl tracking-[0.2em] text-gold">
                        <Link href="/">ST</Link>
                    </span>

                    <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
                        {navItems.map((item) => (
                            <a
                                key={item.key}
                                href={item.href}
                                className="text-sm tracking-wide text-cream/60 transition-colors hover:text-gold"
                            >
                                {nav(item.key)}
                            </a>
                        ))}
                    </nav>

                    <span className="text-xs text-cream/40">{t("rights")}</span>
                </div>
            </div>
        </footer>
    );
};
