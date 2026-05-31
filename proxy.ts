import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// В Next.js 16 middleware называется Proxy (файл proxy.ts). Функционал тот же.
export default createMiddleware(routing);

export const config = {
  // Пропускаем всё, кроме внутренних путей Next и файлов с расширением
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)",
};
