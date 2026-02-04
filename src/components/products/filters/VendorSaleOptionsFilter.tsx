"use client"
import { useState } from "react";
import { useTranslations } from "next-intl";

interface VendorSaleOptionsFilterProps {
  verifiedVendorsOnly: boolean;
  onVerifiedVendorsOnlyChange: (value: boolean) => void;
  primeVendorsOnly: boolean;
  onPrimeVendorsOnlyChange: (value: boolean) => void;
  onSaleOnly: boolean;
  onOnSaleOnlyChange: (value: boolean) => void;
  buyBoxWinnersOnly: boolean;
  onBuyBoxWinnersOnlyChange: (value: boolean) => void;
  withWarrantyOnly: boolean;
  onWithWarrantyOnlyChange: (value: boolean) => void;
  showAllOffers: boolean;
  onShowAllOffersChange: (value: boolean) => void;
}

const VendorSaleOptionsFilter = ({
  verifiedVendorsOnly,
  onVerifiedVendorsOnlyChange,
  primeVendorsOnly,
  onPrimeVendorsOnlyChange,
  onSaleOnly,
  onOnSaleOnlyChange,
  buyBoxWinnersOnly,
  onBuyBoxWinnersOnlyChange,
  withWarrantyOnly,
  onWithWarrantyOnlyChange,
  showAllOffers,
  onShowAllOffersChange,
}: VendorSaleOptionsFilterProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const t = useTranslations("filters");

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-lg font-bold text-gray-900 dark:text-white mb-3"
      >
        {t("vendorSaleOptions")}
        <svg
          className={`w-5 h-5 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="pb-4 space-y-2">
          {/* Verified Vendors Only */}
          <label className="flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800">
            <input
              type="checkbox"
              checked={verifiedVendorsOnly}
              onChange={(e) => onVerifiedVendorsOnlyChange(e.target.checked)}
              className="w-4 h-4 text-gray-900 dark:text-white bg-gray-100 border-gray-300 rounded focus:ring-0"
            />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {t("verifiedVendorsOnly")}
            </span>
          </label>

          {/* Prime Vendors Only */}
          <label className="flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800">
            <input
              type="checkbox"
              checked={primeVendorsOnly}
              onChange={(e) => onPrimeVendorsOnlyChange(e.target.checked)}
              className="w-4 h-4 text-gray-900 dark:text-white bg-gray-100 border-gray-300 rounded focus:ring-0"
            />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {t("primeVendorsOnly")}
            </span>
          </label>

          {/* On Sale Only */}
          <label className="flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800">
            <input
              type="checkbox"
              checked={onSaleOnly}
              onChange={(e) => onOnSaleOnlyChange(e.target.checked)}
              className="w-4 h-4 text-gray-900 dark:text-white bg-gray-100 border-gray-300 rounded focus:ring-0"
            />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {t("onSaleOnly")}
            </span>
          </label>

          {/* Buy Box Winners Only */}
          <label className="flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800">
            <input
              type="checkbox"
              checked={buyBoxWinnersOnly}
              onChange={(e) => onBuyBoxWinnersOnlyChange(e.target.checked)}
              className="w-4 h-4 text-gray-900 dark:text-white bg-gray-100 border-gray-300 rounded focus:ring-0"
            />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {t("buyBoxWinnersOnly")}
            </span>
          </label>

          {/* With Warranty Only */}
          <label className="flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800">
            <input
              type="checkbox"
              checked={withWarrantyOnly}
              onChange={(e) => onWithWarrantyOnlyChange(e.target.checked)}
              className="w-4 h-4 text-gray-900 dark:text-white bg-gray-100 border-gray-300 rounded focus:ring-0"
            />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {t("withWarrantyOnly")}
            </span>
          </label>

          {/* Show All Offers */}
          <label className="flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800">
            <input
              type="checkbox"
              checked={showAllOffers}
              onChange={(e) => onShowAllOffersChange(e.target.checked)}
              className="w-4 h-4 text-gray-900 dark:text-white bg-gray-100 border-gray-300 rounded focus:ring-0"
            />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {t("showAllOffers")}
            </span>
          </label>
        </div>
      )}
    </div>
  );
};

export default VendorSaleOptionsFilter;
