"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";
import { RxCross1 } from "react-icons/rx";
import { FaWhatsapp } from "react-icons/fa6";

type BookingContextValue = { open: (service?: string) => void };
type Tab = { label: string; items: { name: string }[] };

const BookingContext = createContext<BookingContextValue | null>(null);

export const useBooking = () => {
    const ctx = useContext(BookingContext);
    if (!ctx) throw new Error("useBooking must be used within <BookingProvider>");
    return ctx;
};

export function BookingProvider({ children }: { children: ReactNode }) {
    const t = useTranslations("Booking");
    const pricing = useTranslations("Pricing");
    const footer = useTranslations("Footer");

    const tabs = pricing.raw("tabs") as Tab[];
    const whatsappNumber = footer("whatsappNumber");
    const consultation = t("consultation");

    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState<string>(consultation);

    const open = (service?: string) => {
        setSelected(service ?? consultation);
        setIsOpen(true);
    };
    const close = () => setIsOpen(false);

    // Блокировка скролла + закрытие по Esc
    useEffect(() => {
        if (!isOpen) return;
        document.body.style.overflow = "hidden";
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") close();
        };
        document.addEventListener("keydown", onKey);
        return () => {
            document.body.style.overflow = "";
            document.removeEventListener("keydown", onKey);
        };
    }, [isOpen]);

    const submit = () => {
        const text = t("message", { service: selected });
        const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
        window.open(url, "_blank", "noopener,noreferrer");
        close();
    };

    return (
        <BookingContext.Provider value={{ open }}>
            {children}

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-end justify-center sm:items-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        role="dialog"
                        aria-modal="true"
                        aria-label={t("title")}
                    >
                        {/* Затемнение */}
                        <div
                            className="absolute inset-0 bg-graphite/70 backdrop-blur-sm"
                            onClick={close}
                        />

                        {/* Панель */}
                        <motion.div
                            initial={{ y: 40, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 40, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            className="relative flex max-h-[85vh] w-full flex-col rounded-t-4xl bg-background p-6 sm:m-6 sm:max-w-lg sm:rounded-4xl sm:p-8"
                        >
                            <button
                                type="button"
                                onClick={close}
                                aria-label={t("close")}
                                className="absolute inset-e-5 top-5 text-text-muted transition-colors hover:text-gold"
                            >
                                <RxCross1 size={20} />
                            </button>

                            <h2 className="font-serif text-2xl text-text">{t("title")}</h2>
                            <p className="mt-2 text-sm leading-relaxed text-text-muted">
                                {t("subtitle")}
                            </p>

                            {/* Список услуг */}
                            <div className="mt-6 flex-1 overflow-y-auto pe-1">
                                {/* Консультация */}
                                <button
                                    type="button"
                                    onClick={() => setSelected(consultation)}
                                    className={`mb-4 w-full rounded-2xl border px-4 py-3 text-start text-sm transition-colors ${selected === consultation
                                        ? "border-gold bg-gold/10 text-text"
                                        : "border-taupe/30 text-text-muted hover:border-gold/50"
                                        }`}
                                >
                                    {consultation}
                                </button>

                                {tabs.map((group, gi) => (
                                    <div key={gi} className="mb-5">
                                        <h3 className="mb-2 text-xs uppercase tracking-[0.2em] text-gold">
                                            {group.label}
                                        </h3>
                                        <div className="flex flex-col gap-2">
                                            {group.items.map((item, ii) => {
                                                const isActive = selected === item.name;
                                                return (
                                                    <button
                                                        key={ii}
                                                        type="button"
                                                        onClick={() => setSelected(item.name)}
                                                        className={`w-full rounded-xl border px-4 py-2.5 text-start text-sm transition-colors ${isActive
                                                            ? "border-gold bg-gold/10 text-text"
                                                            : "border-transparent bg-cream text-text-muted hover:text-gold"
                                                            }`}
                                                    >
                                                        {item.name}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Подтверждение */}
                            <button
                                type="button"
                                onClick={submit}
                                className="mt-4 flex items-center justify-center gap-2 rounded-full bg-linear-to-br from-gold-light via-gold to-[#9e7b33] px-7 py-3 text-sm font-medium tracking-wide text-graphite transition-opacity hover:opacity-90"
                            >
                                <FaWhatsapp size={18} />
                                {t("submit")}
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </BookingContext.Provider>
    );
}
