"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Hero } from "./Hero";


export const HeroDeck = () => {
    const [revealed, setRevealed] = useState(false); // Hero уехал вверх
    const [animating, setAnimating] = useState(false);

    useEffect(() => {
        const locked = !revealed || animating;
        document.body.style.overflow = locked ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [revealed, animating]);

    useEffect(() => {
        let touchStartY = 0;

        const lift = () => {
            if (animating || revealed) return;
            setAnimating(true);
            setRevealed(true);
        };
        const drop = () => {
            if (animating || !revealed) return;
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

        window.addEventListener("wheel", onWheel, { passive: true });
        window.addEventListener("keydown", onKey);
        window.addEventListener("touchstart", onTouchStart, { passive: true });
        window.addEventListener("touchmove", onTouchMove, { passive: true });
        return () => {
            window.removeEventListener("wheel", onWheel);
            window.removeEventListener("keydown", onKey);
            window.removeEventListener("touchstart", onTouchStart);
            window.removeEventListener("touchmove", onTouchMove);
        };
    }, [revealed, animating]);

    return (
        <motion.div
            className="fixed inset-0 z-40 overflow-hidden"
            style={{ pointerEvents: revealed && !animating ? "none" : "auto" }}
            animate={{ y: revealed ? "-100%" : "0%" }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
            onAnimationComplete={() => setAnimating(false)}
        >
            <Hero />
        </motion.div>
    );
};
