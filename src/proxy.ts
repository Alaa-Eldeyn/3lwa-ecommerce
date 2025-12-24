import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";

const intlMiddleware = createMiddleware({
  locales: ["ar", "en"],
  defaultLocale: "ar",
  localeDetection: false,
});

// الصفحات اللي مش عايز اليوزر يفتحها لو هو لوج إن
const authPages = ["/login", "/signin", "/signup"];

// الصفحات اللي مش عايز اليوزر يفتحها لو هو مش لوجد إن
const protectedPages = ["/checkout"];

export function proxy(req: NextRequest) {
  const user = req.cookies.get("basitUser")?.value;
  // const isUserLoggedIn = Boolean(user);
  const isUserLoggedIn = true;

  const url = new URL(req.url);
  let pathname = url.pathname; 
  
  const localeMatch = pathname.match(/^\/(ar|en)\b/);
  const locale = localeMatch ? localeMatch[1] : "ar";

  pathname = pathname.replace(/^\/(ar|en)/, "");

  if (!isUserLoggedIn && protectedPages.includes(pathname)) {
    return NextResponse.redirect(new URL(`/${locale}/login`, req.url));
  }

  if (user && authPages.some((page) => pathname.includes(page))) {
    return NextResponse.redirect(new URL(`/${locale}`, req.url));
  }

  
  return intlMiddleware(req) || NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/(ar|en)/:path*",
    "/((?!_next|_vercel|.*\\..*).*)",
  ],
};