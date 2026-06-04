"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";
import { RxCross1 } from "react-icons/rx";
import { FiChevronDown } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa6";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer";

type BookingContextValue = { open: (service?: string) => void };
type Tab = { label: string; items: { name: string; price: string }[] };

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
    const [openGroup, setOpenGroup] = useState<number | null>(null);

    // Индекс группы, содержащей услугу (для авто-раскрытия аккордеона).
    const findGroup = (service: string) =>
        tabs.findIndex((g) => g.items.some((i) => i.name === service));

    const open = (service?: string) => {
        const name = service ?? consultation;
        setSelected(name);
        const gi = findGroup(name);
        setOpenGroup(gi >= 0 ? gi : null);
        setIsOpen(true);
    };

    const submit = () => {
        const text = t("message", { service: selected });
        const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
        window.open(url, "_blank", "noopener,noreferrer");
        setIsOpen(false);
    };

    return (
        <BookingContext.Provider value={{ open }}>
            {children}

            {/* Управляется стейтом — окно открывается программно через open().
                vaul сам блокирует скролл, закрывает по Esc / клику по оверлею / свайпу. */}
            <Drawer open={isOpen} onOpenChange={setIsOpen} direction="right">
                <DrawerContent className="bg-background text-text rounded-0">
                    <DrawerClose asChild>
                        <button
                            type="button"
                            aria-label={t("close")}
                            className="absolute inset-e-4 top-4 text-text-muted transition-colors hover:text-gold"
                        >
                            <RxCross1 size={20} />
                        </button>
                    </DrawerClose>

                    <DrawerHeader className="text-start">
                        <DrawerTitle className="font-serif text-2xl text-text">
                            {t("title")}
                        </DrawerTitle>
                        <DrawerDescription className="text-sm leading-relaxed text-text-muted">
                            {t("subtitle")}
                        </DrawerDescription>
                    </DrawerHeader>

                    {/* Список услуг */}
                    <div className="flex-1 overflow-y-auto px-4 pe-2">
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

                        {/* Аккордеон по группам — внутри выбор конкретной услуги */}
                        {tabs.map((group, gi) => {
                            const isExpanded = openGroup === gi;
                            const hasSelected = group.items.some((i) => i.name === selected);
                            return (
                                <div key={gi} className="border-b border-taupe/20">
                                    <button
                                        type="button"
                                        onClick={() => setOpenGroup(isExpanded ? null : gi)}
                                        aria-expanded={isExpanded}
                                        className="flex w-full items-center justify-between gap-3 py-3 text-start"
                                    >
                                        <span className="flex items-center gap-2 text-sm font-medium tracking-wide text-text">
                                            {group.label}
                                            {hasSelected && (
                                                <span aria-hidden className="size-1.5 rounded-full bg-gold" />
                                            )}
                                        </span>
                                        <FiChevronDown
                                            className={`shrink-0 text-gold transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
                                            size={18}
                                        />
                                    </button>

                                    <AnimatePresence initial={false}>
                                        {isExpanded && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.25, ease: "easeOut" }}
                                                className="overflow-hidden"
                                            >
                                                <div className="flex flex-col gap-2 pb-3">
                                                    {group.items.map((item, ii) => {
                                                        const isActive = selected === item.name;
                                                        return (
                                                            <button
                                                                key={ii}
                                                                type="button"
                                                                onClick={() => setSelected(item.name)}
                                                                className={`flex w-full items-baseline justify-between gap-3 rounded-xl border px-4 py-2.5 text-start text-sm transition-colors ${isActive
                                                                    ? "border-gold bg-gold/10 text-text"
                                                                    : "border-transparent bg-cream text-text-muted hover:text-gold"
                                                                    }`}
                                                            >
                                                                <span>{item.name}</span>
                                                                <span className="shrink-0 font-serif text-gold">
                                                                    {item.price}
                                                                </span>
                                                            </button>
                                                        );
                                                    })}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            );
                        })}
                    </div>

                    <DrawerFooter>
                        <button
                            type="button"
                            onClick={submit}
                            className="flex items-center justify-center gap-2 rounded-full bg-linear-to-br from-gold-light via-gold to-[#9e7b33] px-7 py-3 text-sm font-medium tracking-wide text-graphite transition-opacity hover:opacity-90"
                        >
                            <FaWhatsapp size={18} />
                            {t("submit")}
                        </button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </BookingContext.Provider>
    );
}
