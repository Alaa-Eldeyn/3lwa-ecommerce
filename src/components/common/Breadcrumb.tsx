"use client";
import { usePathname } from "next/navigation";
import { Link } from "@/src/i18n/routing";
import { useLocale, useTranslations } from "next-intl";
import { Home, ChevronRight } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href: string;
}

const Breadcrumb = () => {
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations("breadcrumb");
  const isArabic = locale === "ar";

  const pathWithoutLocale = pathname.replace(`/${locale}`, "");

  const pathSegments = pathWithoutLocale.split("/").filter((segment) => segment);

  // Helper function to check if a segment is a UUID or ID
  const isIdSegment = (segment: string): boolean => {
    // Check for UUID pattern (8-4-4-4-12 format)
    const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    // Check for other ID patterns (long alphanumeric strings)
    const idPattern = /^[0-9a-f]{20,}$/i;

    return uuidPattern.test(segment) || idPattern.test(segment);
  };

  const breadcrumbItems: BreadcrumbItem[] = pathSegments
    .filter((segment) => !isIdSegment(segment)) // Filter out ID segments
    .map((segment, index) => {
      const href = "/" + pathSegments.slice(0, pathSegments.indexOf(segment) + 1).join("/");
      const formattedLabel = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " ");

      const label = index < 2 ? t(segment, { default: formattedLabel }) : formattedLabel;

      return { label, href };
    });

  if (pathSegments.length === 0) {
    return null;
  }

  return (
    <div className="bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 mb-6">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-3">
        <nav className="flex text-sm text-gray-500 dark:text-gray-400" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1">
            <li className="inline-flex items-center">
              <Link
                href="/"
                className="inline-flex items-center hover:text-primary dark:hover:text-primary transition-colors">
                <Home size={14} className="mr-2 rtl:ml-2" />
                {t("home", { default: "Home" })}
              </Link>
            </li>

            {breadcrumbItems.map((item, index) => {
              const isLast = index === breadcrumbItems.length - 1;
              const isLink = index < 1;
              return (
                <li key={item.href} aria-current={isLast ? "page" : undefined}>
                  <div className="flex items-center">
                    <ChevronRight
                      size={12}
                      className={`text-gray-400 dark:text-gray-500 mx-2 ${
                        isArabic ? "rotate-180" : ""
                      }`}
                    />
                    {isLink ? (
                      <Link
                        href={item.href}
                        className="hover:text-primary dark:hover:text-primary transition-colors">
                        {item.label}
                      </Link>
                    ) : (
                      <span className="text-gray-900 dark:text-white font-medium">
                        {item.label}
                      </span>
                    )}
                  </div>
                </li>
              );
            })}
          </ol>
        </nav>
      </div>
    </div>
  );
};

export default Breadcrumb;
