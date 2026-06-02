'use client'

import { useTranslations } from "next-intl";
import { LocaleSwitcher } from "../locale-switcher/LocaleSwitcher";
import { Link } from "@/i18n/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion"
import { navigateToSection, REVEAL_EVENT } from "@/app/lib/scroll";
import { FaWhatsapp, FaInstagram, FaFacebookF } from "react-icons/fa6";

export const Header = () => {
    const t = useTranslations("Nav");
    const f = useTranslations("Footer");

    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [isScrolled, setScrolled] = useState(false)
    const [isHeroLifted, setHeroLifted] = useState(false)

    // Компактный режим: либо занавес Hero пошёл вверх, либо есть скролл страницы.
    const isCompact = isScrolled || isHeroLifted

    const navItems = [
        { key: "about", href: "#about-us" },
        { key: "technologies", href: "#technologies" },
        { key: "services", href: "#services" },
        { key: "pricing", href: "#pricing" },
    ] as const;

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 8);
        const onReveal = (e: Event) => setHeroLifted((e as CustomEvent<boolean>).detail);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener(REVEAL_EVENT, onReveal);
        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener(REVEAL_EVENT, onReveal);
        };
    }, []);

    useEffect(() => {
        document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [isMobileMenuOpen]);

    return (
        <header className={`fixed top-0 z-50 w-full transition-all duration-100 delay-300 ease-in-out ${isCompact ? 'border-b border-taupe/20' : ''}`}>
            <nav className={`relative z-50 mx-auto flex w-full items-center justify-between gap-6 px-6 py-4 sm:px-12 ease-in-out  transition-colors duration-500 ${isCompact ? 'bg-background' : 'delay-400'}`}>

                <span
                    className={`font-serif tracking-[0.2em] text-gold leading-none transition-[font-size] duration-500 ease-out ${isCompact ? "text-3xl" : "text-7xl delay-400"}`}
                >
                    <Link href='/'>
                        ST
                    </Link>
                </span>

                <nav className="hidden items-center gap-8 md:flex max-w-7xl">
                    {navItems.map((item) => (
                        <a
                            key={item.key}
                            href={item.href}
                            onClick={(e) => {
                                e.preventDefault();
                                navigateToSection(item.href);
                            }}
                            className={`text-sm tracking-wide transition-colors duration-500 delay-300 hover:text-gold hover:duration-0 hover:delay-0 ${isCompact ? 'text-graphite' : 'text-text-muted'}`}
                        >
                            {t(item.key)}
                        </a>
                    ))}
                </nav>

                <div className="hidden md:flex items-center gap-3">
                    <LocaleSwitcher isCompact={isCompact} />

                </div>

                <div className="flex md:hidden items-center justify-center gap-5">
                    <LocaleSwitcher />
                    <button
                        type="button"
                        onClick={() => setMobileMenuOpen((open) => !open)}
                        aria-label={isMobileMenuOpen ? t("closeMenu") : t("openMenu")}
                        aria-expanded={isMobileMenuOpen}
                        aria-controls="mobile-menu"
                        className="relative h-6 w-6 text-text transition-colors hover:text-gold"
                    >
                        {/* Верхняя полоска */}
                        <span
                            className={`absolute inset-s-0 h-0.5 w-6 rounded-full bg-current transition-all duration-300 ease-in-out ${isMobileMenuOpen ? "top-1/2 -translate-y-1/2 rotate-45" : "top-1"
                                }`}
                        />
                        {/* Средняя полоска */}
                        <span
                            className={`absolute inset-s-0 top-1/2 h-0.5 w-6 -translate-y-1/2 rounded-full bg-current transition-all duration-300 ease-in-out ${isMobileMenuOpen ? "opacity-0" : "opacity-100"
                                }`}
                        />
                        {/* Нижняя полоска */}
                        <span
                            className={`absolute inset-s-0 h-0.5 w-6 rounded-full bg-current transition-all duration-300 ease-in-out ${isMobileMenuOpen ? "bottom-1/2 translate-y-1/2 -rotate-45" : "bottom-1"
                                }`}
                        />
                    </button>
                </div>
            </nav>
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <div
                        id="mobile-menu"
                        className="fixed inset-0 z-50 flex flex-col items-center justify-center w-full bg-background">
                        <motion.div
                            className="flex flex-col gap-10 items-center justify-center h-full mb-30"
                            variants={{
                                hidden: {
                                    transition: { staggerChildren: 0.08, staggerDirection: -1 },
                                },
                                visible: {
                                    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
                                },
                            }}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                        >
                            {navItems.map((item) => (
                                <motion.a
                                    key={item.key}
                                    href={item.href}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setMobileMenuOpen(false);
                                        navigateToSection(item.href);
                                    }}
                                    variants={{
                                        hidden: { opacity: 0, y: 20 },
                                        visible: { opacity: 1, y: 0 },
                                    }}
                                    className="text-2xl tracking-wide text-text-muted transition-colors hover:text-gold"
                                >
                                    {t(item.key)}
                                </motion.a>
                            ))}
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1, transition: { duration: 0.3, delay: 0.8 } }}
                            exit={{ opacity: 0, transition: { duration: 0.3 } }}
                            className="mb-16 flex flex-col items-center gap-5"
                        >
                            <a
                                href={`tel:+${f("whatsappNumber")}`}
                                className="text-lg tracking-wide text-text transition-colors hover:text-gold"
                            >
                                {f("phone")}
                            </a>
                            <div className="flex gap-3">
                                <a
                                    href={`https://wa.me/${f("whatsappNumber")}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="WhatsApp"
                                    className="flex h-11 w-11 items-center justify-center rounded-full border border-taupe/30 text-text transition-colors hover:border-gold hover:text-gold"
                                >
                                    <FaWhatsapp size={18} />
                                </a>
                                <a
                                    href={f("instagram")}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Instagram"
                                    className="flex h-11 w-11 items-center justify-center rounded-full border border-taupe/30 text-text transition-colors hover:border-gold hover:text-gold"
                                >
                                    <FaInstagram size={18} />
                                </a>
                                <a
                                    href={f("facebook")}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Facebook"
                                    className="flex h-11 w-11 items-center justify-center rounded-full border border-taupe/30 text-text transition-colors hover:border-gold hover:text-gold"
                                >
                                    <FaFacebookF size={16} />
                                </a>
                            </div>
                        </motion.div>

                    </div>
                )}
            </AnimatePresence>
        </header>

    );
};
