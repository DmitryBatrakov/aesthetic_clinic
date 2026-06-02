"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { AnimatePresence, motion } from "framer-motion";
import { MdOutlineLanguage } from "react-icons/md";
import { RxChevronDown } from "react-icons/rx";

export function LocaleSwitcher() {
    const t = useTranslations("LocaleSwitcher");
    const activeLocale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const [isPending, startTransition] = useTransition();
    const [isOpen, setOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    function onSelect(nextLocale: Locale) {
        setOpen(false);
        if (nextLocale === activeLocale) return;
        startTransition(() => {
            router.replace(pathname, { locale: nextLocale });
        });
    }

    // Закрытие по клику вне и по Esc
    useEffect(() => {
        if (!isOpen) return;

        function onPointerDown(event: MouseEvent) {
            if (!containerRef.current?.contains(event.target as Node)) {
                setOpen(false);
            }
        }
        function onKeyDown(event: KeyboardEvent) {
            if (event.key === "Escape") setOpen(false);
        }

        document.addEventListener("mousedown", onPointerDown);
        document.addEventListener("keydown", onKeyDown);
        return () => {
            document.removeEventListener("mousedown", onPointerDown);
            document.removeEventListener("keydown", onKeyDown);
        };
    }, [isOpen]);

    return (
        <div ref={containerRef} className="relative">
            {/* Триггер */}
            <button
                type="button"
                onClick={() => setOpen((open) => !open)}
                disabled={isPending}
                aria-haspopup="listbox"
                aria-expanded={isOpen}
                aria-label={t("label")}
                className="flex items-center gap-2 rounded-full border border-background px-4 py-1.5 text-xs font-medium tracking-wide text-background transition-colors hover:text-gold disabled:opacity-60"
            >
                {t(activeLocale)} <MdOutlineLanguage size={16} />
            </button>

            {/* Список */}
            <AnimatePresence>
                {isOpen && (
                    <motion.ul
                        role="listbox"
                        aria-label={t("label")}
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.15 }}
                        className="absolute inset-e-0 top-full z-50 mt-2 overflow-hidden rounded-2xl border border-taupe/30 bg-background/95 p-1 shadow-lg backdrop-blur"
                    >
                        {routing.locales.map((loc) => {
                            const isActive = loc === activeLocale;
                            return (
                                <li key={loc} role="option" aria-selected={isActive}>
                                    <button
                                        type="button"
                                        onClick={() => onSelect(loc)}
                                        disabled={isPending}
                                        className={`flex items-center justify-center w-full rounded-xl px-3 py-2 text-start text-xs font-medium tracking-wide transition-colors disabled:opacity-60 ${isActive
                                            ? "bg-gold text-graphite"
                                            : "text-text-muted hover:bg-taupe/10 hover:text-gold"
                                            }`}
                                    >
                                        {t(loc)}
                                    </button>
                                </li>
                            );
                        })}
                    </motion.ul>
                )}
            </AnimatePresence>
        </div>
    );
}
