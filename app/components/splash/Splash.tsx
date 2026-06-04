"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";

const HOLD_MS = 500;

export const Splash = () => {
    const t = useTranslations("Splash");
    const [isVisible, setVisible] = useState(true);
    const startedRef = useRef(false);
    const locale = useLocale()

    useEffect(() => {
        document.body.style.overflow = isVisible ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [isVisible]);

    const startCloseTimer = () => {
        if (startedRef.current) return;
        startedRef.current = true;
        setTimeout(() => setVisible(false), HOLD_MS);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className="fixed inset-0 z-70 flex flex-col items-center justify-center gap-4 bg-graphite p-10"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                >
                    <div className="pointer-events-none absolute inset-7 md:inset-15 border-2 border-gold/80 animate-pulse rounded-lg" />
                    <motion.span
                        className="font-serif text-7xl tracking-tighter text-gold"
                        initial={{ x: -120, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        ST
                    </motion.span>

                    <motion.span
                        className={`  tracking-[0.4em] text-cream/60  ${locale === 'he' ? 'font-gveret text-xs' : 'font-serif text-sm'}`}
                        initial={{ x: 120, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        onAnimationComplete={startCloseTimer}
                    >
                        {t("loading")}...
                    </motion.span>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
