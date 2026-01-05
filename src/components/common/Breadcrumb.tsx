"use client";
import { usePathname } from "next/navigation";
import { Link } from "@/src/i18n/routing";
import { useLocale, useTranslations } from "next-intl";

interface BreadcrumbItem {
  label: string;
  href: string;
}

const Breadcrumb = ({ className }: { className?: string }) => {
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations("breadcrumb");

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
    <nav className={`flex py-4 container ${className}`} aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
        <li className="inline-flex items-center">
          <Link
            href="/"
            className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-secondary dark:text-gray-400 dark:hover:text-white">
            <svg
              className="w-3 h-3 me-2.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20">
              <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
            </svg>
            {t("home", { default: "Home" })}
          </Link>
        </li>

        {breadcrumbItems.map((item, index) => {
          const isLast = index === breadcrumbItems.length - 1;
          const isLink = index < 1;
          return (
            <li key={item.href} aria-current={isLast ? "page" : undefined}>
              <div className="flex items-center">
                <svg
                  className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10">
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 9 4-4-4-4"
                  />
                </svg>
                {isLink ? (
                  <Link
                    href={item.href}
                    className="ms-1 text-sm font-medium text-gray-700 hover:text-secondary md:ms-2 dark:text-gray-400 dark:hover:text-white">
                    {item.label}
                  </Link>
                ) : (
                  <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">
                    {item.label}
                  </span>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
