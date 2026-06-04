"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Hero } from "./Hero";
import { NAVIGATE_EVENT, REVEAL_EVENT, scrollToSection } from "@/app/lib/scroll";


export const HeroDeck = () => {
    const [revealed, setRevealed] = useState(false); 
    const [animating, setAnimating] = useState(false);
    const pendingScroll = useRef<string | null>(null);

    useEffect(() => {
        const locked = !revealed || animating;
        document.body.style.overflow = locked ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [revealed, animating]);

    useEffect(() => {
        window.dispatchEvent(new CustomEvent<boolean>(REVEAL_EVENT, { detail: revealed }));
    }, [revealed]);

    useEffect(() => {
        let touchStartY = 0;

        const menuOpen = () => document.getElementById("mobile-menu") !== null;

        const lift = () => {
            if (menuOpen() || animating || revealed) return;
            setAnimating(true);
            setRevealed(true);
        };
        const drop = () => {
            if (menuOpen() || animating || !revealed) return;
            if (window.scrollY > 0) return;
            setAnimating(true);
            setRevealed(false);
        };

        const onWheel = (e: WheelEvent) => {
            if (e.deltaY > 0) lift();
            else if (e.deltaY < 0) drop();
        };
        const onKey = (e: KeyboardEvent) => {
            if (["ArrowDown", "PageDown", "End", " "].includes(e.key)) {
                e.preventDefault();
                lift();
            } else if (["ArrowUp", "PageUp", "Home"].includes(e.key)) {
                drop();
            }
        };
        const onTouchStart = (e: TouchEvent) => {
            touchStartY = e.touches[0].clientY;
        };
        const onTouchMove = (e: TouchEvent) => {
            const dy = touchStartY - e.touches[0].clientY;
            if (dy > 4) lift();
            else if (dy < -4) drop();
        };

        const onNavigate = (e: Event) => {
            const href = (e as CustomEvent<string>).detail;
            if (revealed && !animating) {
                scrollToSection(href);
                return;
            }
            if (animating) return;
            pendingScroll.current = href;
            setAnimating(true);
            setRevealed(true);
        };

        window.addEventListener("wheel", onWheel, { passive: true });
        window.addEventListener("keydown", onKey);
        window.addEventListener("touchstart", onTouchStart, { passive: true });
        window.addEventListener("touchmove", onTouchMove, { passive: true });
        window.addEventListener(NAVIGATE_EVENT, onNavigate);
        return () => {
            window.removeEventListener("wheel", onWheel);
            window.removeEventListener("keydown", onKey);
            window.removeEventListener("touchstart", onTouchStart);
            window.removeEventListener("touchmove", onTouchMove);
            window.removeEventListener(NAVIGATE_EVENT, onNavigate);
        };
    }, [revealed, animating]);

    return (
        <motion.div
            className="fixed inset-0 z-40 overflow-hidden transform-gpu"
            style={{
                pointerEvents: revealed && !animating ? "none" : "auto",
                willChange: "transform",
                backfaceVisibility: "hidden",
            }}
            animate={{ y: revealed ? "-100%" : "0%" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: revealed ? 0.2 : 0 }}
            onAnimationComplete={() => {
                setAnimating(false);
                if (revealed && pendingScroll.current) {
                    const href = pendingScroll.current;
                    pendingScroll.current = null;
                    document.body.style.overflow = "";
                    scrollToSection(href);
                }
            }}
        >
            <Hero />
        </motion.div>
    );
};
