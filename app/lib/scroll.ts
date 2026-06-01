// Плавный скролл к секции по якорю без добавления хеша в URL.
// Уважает системную настройку "уменьшить движение".
export function scrollToSection(href: string) {
    const el = document.querySelector(href);
    if (!el) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
}
