@AGENTS.md

# Палитра и шрифты сайта (ST Aesthetic Medicine)

Палитра разобрана из брендового макета (чёрный графит + золото + тёплый беж, акцент — пыльная роза).
Цвета заданы как CSS-переменные в `app/globals.css` и проброшены в Tailwind v4 через `@theme`.
**Не хардкодить hex в разметке** — использовать токены Tailwind (`bg-graphite`, `text-gold` и т.д.).

## Токены цветов

| Токен Tailwind | HEX | Назначение |
|----------------|-----|------------|
| `graphite` | `#1C1A17` | тёмный фон, шапка/футер, тёмные блоки |
| `bg` / `background` | `#EFE7DB` | основной фон страниц |
| `cream` | `#F5EFE6` | светлые карточки, текст на тёмном |
| `gold` | `#C9A24B` | главный акцент: заголовки, кнопки, иконки |
| `gold-light` | `#E3C885` | блик / hover / верх градиента |
| `rose` | `#C99A8F` | вторичный акцент, курсивные подзаголовки |
| `rose-light` | `#E0C4BC` | мягкие подложки, бейджи |
| `taupe` | `#B8A990` | бордеры, тени, разделители |
| `text` / `foreground` | `#2B2723` | основной текст на светлом |
| `text-muted` | `#6E665B` | подписи, мелкий текст |

Золотой градиент (как в логотипе): `from-gold-light via-gold to-[#9e7b33]`, направление `bg-gradient-to-br`.

## Шрифты (подключены в `app/layout.tsx`, все с `subsets: ["latin", "cyrillic"]`)

| Токен | Шрифт | Применение |
|-------|-------|------------|
| `font-serif` | Playfair Display | заголовки (как лого) |
| `font-sans` | Montserrat | основной текст, кнопки (базовый для body) |
| `font-script` | Marck Script | курсивный акцент-слоган |

## Правила применения

- Баланс **60 / 30 / 10**: ~60% беж/крем (фон), ~30% графит (тёмные блоки), ~10% золото (акценты). Роза — точечно (≤5%).
- Кнопки: золотой градиент на графите **или** контур `border-taupe`/`border-gold` на беже. Hover → `gold-light`.
- Текст: на светлом — `text`, на тёмном — `cream` или `gold` для заголовков.
- **Низкий контраст, избегать:** золото на розе и роза на золоте. Золото читается только на графите/беже.

## Канон классов Tailwind v4 (линтер ругается на старые формы)

- `bg-linear-to-*` вместо `bg-gradient-to-*`
- `rounded-4xl` вместо `rounded-[2rem]`
- `aspect-4/5` вместо `aspect-[4/5]` (дробь без скобок)
- `inset-s-*` / `inset-e-*` вместо `start-*` / `end-*`
- Логические отступы (`ms-*`, `me-*`, `ps-*`, `pe-*`) — обязательны для RTL.

## i18n (next-intl 4.x, с префиксом локали)

- **Локали:** `he` (по умолчанию, RTL) и `ru` (LTR). Заданы в `i18n/routing.ts`; направление — `localeDirection`.
- **Структура:** все страницы внутри `app/[locale]/`. Корневой layout — `app/[locale]/layout.tsx` (другого root layout нет).
- **Переводы:** `messages/he.json`, `messages/ru.json`. Неймспейсы: `Metadata`, `Nav`, `LocaleSwitcher`. Ключи должны совпадать в обоих файлах.
- **Конфиг:** `i18n/request.ts` (грузит messages), `next.config.ts` обёрнут `createNextIntlPlugin`.
- **Proxy, не middleware:** в Next 16 middleware → `proxy.ts` (в корне). Там подключён `createMiddleware(routing)`.
- **Навигация:** использовать `Link`, `useRouter`, `usePathname`, `redirect` из `@/i18n/navigation` (локале-aware), НЕ из `next/link` / `next/navigation`.
- **В компонентах:** `useTranslations("Namespace")` (работает и в server, и в client). В страницах/layout вызывать `setRequestLocale(locale)` для статики.
- **TODO:** секции `cosmetologist/technology/services-section.tsx` пока с хардкодом иврита — при необходимости вынести строки в `messages/*`.
