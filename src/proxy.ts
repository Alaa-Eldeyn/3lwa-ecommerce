import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";

const intlMiddleware = createMiddleware({
  locales: ["ar", "en"],
  defaultLocale: "ar",
  localeDetection: false,
});

// Auth pages
const authPages = ["/login", "/register", "/dashboard/login"];

// Customer-only
const customerProtectedPages = ["/checkout"];

export function proxy(req: NextRequest) {
  // Get user cookie
  const userCookie = req.cookies.get("basitUser")?.value;
  const isUserLoggedIn = Boolean(userCookie);
  const userRole = parseUserRole(userCookie);

  let pathname = req.nextUrl.pathname;

  // Get locale
  const localeMatch = pathname.match(/^\/(ar|en)\b/);
  const locale = localeMatch ? localeMatch[1] : "ar";

  // Remove locale from pathname
  pathname = pathname.replace(/^\/(ar|en)/, "") || "/";

  // Protect vendor routes
  // If vendor -> redirect to dashboard
  if (isVendorRole(userRole) && !isVendorPage(pathname)) {
    return NextResponse.redirect(new URL(`/${locale}/dashboard`, req.url));
  }

  // If not vendor -> redirect to home
  if (!isVendorRole(userRole) && isVendorPage(pathname)) {
    return NextResponse.redirect(new URL(`/${locale}`, req.url));
  }

  // Protect customer routes
  // If not customer -> redirect to home
  if (!isCustomerRole(userRole) && customerProtectedPages.includes(pathname)) {
    const redirectUrl = new URL(`/${locale}/login`, req.url);
    redirectUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(redirectUrl);
  }

  // Protect auth pages (if logged in, redirect to home)
  if (isUserLoggedIn && authPages.includes(pathname)) {
    return NextResponse.redirect(new URL(`/${locale}`, req.url));
  }

  return intlMiddleware(req) || NextResponse.next();
}

export const config = {
  matcher: ["/", "/(ar|en)/:path*", "/((?!_next|_vercel|.*\\..*).*)"],
};

// Helper functions
// Parse user role from cookie
function parseUserRole(cookieValue: string | undefined): string | undefined {
  if (!cookieValue) return undefined;
  try {
    return (JSON.parse(cookieValue) as { role?: string })?.role;
  } catch {
    return undefined;
  }
}

// Check if user is a customer
function isCustomerRole(role: string | undefined): boolean {
  return role?.toLowerCase() === "customer";
}

// Check if user is a vendor
function isVendorRole(role: string | undefined): boolean {
  return role?.toLowerCase() === "vendor";
}

// Check if path is a vendor page
function isVendorPage(pathname: string): boolean {
  return pathname.startsWith("/dashboard") && !pathname.startsWith("/dashboard/login");
}
