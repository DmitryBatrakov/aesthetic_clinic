'use client'

import { useTranslations } from "next-intl";
import { LocaleSwitcher } from "../locale-switcher/LocaleSwitcher";
import { Link } from "@/i18n/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion"

export const Header = () => {
    const t = useTranslations("Nav");

    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false)

    const navItems = [
        { key: "about", href: "#about-us" },
        { key: "technologies", href: "#technologies" },
        { key: "services", href: "#services" },
        { key: "pricing", href: "#pricing" },
    ] as const;

    useEffect(() => {
        document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [isMobileMenuOpen]);

    return (
        <header className="w-full border-b border-taupe/20">
            <nav className="mx-auto flex w-full max-w-7xl items-center justify-between gap-6 px-6 py-4 sm:px-12">

                <span className="font-serif text-2xl tracking-[0.2em] text-gold">
                    <Link href='/'>
                        ST
                    </Link>
                </span>

                <nav className="hidden items-center gap-8 md:flex">
                    {navItems.map((item) => (
                        <a
                            key={item.key}
                            href={item.href}
                            className="text-sm tracking-wide text-text-muted transition-colors hover:text-gold"
                        >
                            {t(item.key)}
                        </a>
                    ))}
                </nav>

                <div className="hidden md:flex items-center gap-3">
                    <LocaleSwitcher />
    
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
                        className=" min-h-screen flex flex-col items-center justify-start mt-30 w-full">
                        <motion.div
                            className="flex flex-col gap-10 items-center justify-center h-full"
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
                                    onClick={() => setMobileMenuOpen(false)}
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
                        {/* <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1, transition: { duration: 0.3, delay: 0.8 } }}
                            exit={{ opacity: 0, transition: { duration: 0.3 } }}
                        >
                           
                        </motion.div> */}

                    </div>
                )}
            </AnimatePresence>
        </header>

    );
};
