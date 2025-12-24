import { FeaturesData } from "./types";
import { useTranslations } from "next-intl";

interface FeaturesFilterProps {
  features: FeaturesData;
  freeShippingOnly: boolean;
  withWarrantyOnly: boolean;
  inStockOnly: boolean;
  onFreeShippingChange: (value: boolean) => void;
  onWithWarrantyChange: (value: boolean) => void;
  onInStockChange: (value: boolean) => void;
}

const FeaturesFilter = ({
  features,
  freeShippingOnly,
  withWarrantyOnly,
  inStockOnly,
  onFreeShippingChange,
  onWithWarrantyChange,
  onInStockChange,
}: FeaturesFilterProps) => {
  const t = useTranslations("filters");
  return (
    <div className="">
      <div className="space-y-2">
        {features.hasFreeShipping && (
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={freeShippingOnly}
              onChange={(e) => onFreeShippingChange(e.target.checked)}
              className="w-4 h-4 rounded border-gray-300 dark:border-gray-600"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              {t("freeShipping")} ({features.freeShippingCount})
            </span>
          </label>
        )}
        {features.hasWarranty && (
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={withWarrantyOnly}
              onChange={(e) => onWithWarrantyChange(e.target.checked)}
              className="w-4 h-4 rounded border-gray-300 dark:border-gray-600"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              {t("warranty")} ({features.withWarrantyCount})
            </span>
          </label>
        )}
        {features.hasInStock && (
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(e) => onInStockChange(e.target.checked)}
              className="w-4 h-4 rounded border-gray-300 dark:border-gray-600"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              {t("inStock")} ({features.inStockCount})
            </span>
          </label>
        )}
      </div>
    </div>
  );
};

export default FeaturesFilter;
