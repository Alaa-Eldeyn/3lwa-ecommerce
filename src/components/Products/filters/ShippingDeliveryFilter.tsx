"use client"
import { useState } from "react";
import { useTranslations } from "next-intl";

interface ShippingDeliveryFilterProps {
  freeShippingOnly: boolean;
  onFreeShippingOnlyChange: (value: boolean) => void;
}

const ShippingDeliveryFilter = ({
  freeShippingOnly,
  onFreeShippingOnlyChange,
}: ShippingDeliveryFilterProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const t = useTranslations("filters");

  return (
    <div className="border-b border-gray-200 dark:border-gray-700 pb-2 mb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-lg font-bold text-gray-900 dark:text-white mb-3"
      >
        {t("shippingDelivery")}
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
        <div className="pb-4 space-y-4">
          {/* Free Shipping Only Checkbox */}
          <label className="flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800">
            <input
              type="checkbox"
              checked={freeShippingOnly}
              onChange={(e) => onFreeShippingOnlyChange(e.target.checked)}
              className="w-4 h-4 text-gray-900 dark:text-white bg-gray-100 border-gray-300 rounded focus:ring-0"
            />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {t("freeShippingOnly")}
            </span>
          </label>
        </div>
      )}
    </div>
  );
};

export default ShippingDeliveryFilter;
