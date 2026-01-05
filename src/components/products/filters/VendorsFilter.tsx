import { FilterItem } from "./types";
import { useLocale, useTranslations } from "next-intl";

interface VendorsFilterProps {
  vendors: FilterItem[];
  selectedVendors: string[];
  onChange: (selected: string[]) => void;
}

const VendorsFilter = ({ vendors, selectedVendors, onChange }: VendorsFilterProps) => {
  const locale = useLocale();
  const isArabic = locale === "ar";
  const t = useTranslations("filters");
  const handleToggle = (vendorId: string) => {
    if (selectedVendors.includes(vendorId)) {
      onChange(selectedVendors.filter((id) => id !== vendorId));
    } else {
      onChange([...selectedVendors, vendorId]);
    }
  };

  return (
    <div className="mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
        {t("vendors")}
      </h3>
      <div className="space-y-2 max-h-48 overflow-y-auto">
        {vendors.map((vendor) => (
          <label key={vendor.id} className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={selectedVendors.includes(vendor.id)}
              onChange={() => handleToggle(vendor.id)}
              className="w-4 h-4 rounded border-gray-300 dark:border-gray-600"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              {isArabic ? vendor.nameAr : vendor.nameEn} ({vendor.count})
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default VendorsFilter;
