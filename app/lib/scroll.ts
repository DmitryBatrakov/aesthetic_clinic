// Имя события навигации к секции. HeroDeck слушает его, чтобы при необходимости
// сначала поднять занавес Hero (он держит экран и блокирует скролл), а затем
// выполнить плавный скролл к нужной секции.
export const NAVIGATE_EVENT = "hero:navigate";

// Событие состояния занавеса Hero: detail === true, когда занавес поднимается
// (уезжает вверх), и false, когда возвращается. Шапка слушает его, чтобы
// перейти в компактный режим уже в момент начала движения занавеса.
export const REVEAL_EVENT = "hero:reveal";

// Плавный скролл к секции по якорю без добавления хеша в URL.
// Уважает системную настройку "уменьшить движение".
export function scrollToSection(href: string) {
    const el = document.querySelector(href);
    if (!el) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
}

// Точка входа для навигации из меню/футера. Сообщает занавесу Hero, что нужно
// подняться и проскроллить к секции. Если занавес уже поднят, HeroDeck скроллит сразу.
export function navigateToSection(href: string) {
    window.dispatchEvent(new CustomEvent<string>(NAVIGATE_EVENT, { detail: href }));
}
