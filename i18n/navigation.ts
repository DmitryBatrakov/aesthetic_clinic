import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

// Локале-aware обёртки навигации. Используй их вместо next/link и next/navigation.
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
