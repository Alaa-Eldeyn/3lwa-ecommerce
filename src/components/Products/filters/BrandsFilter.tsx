import { FilterItem } from "./types";
import { useLocale, useTranslations } from "next-intl";

interface BrandsFilterProps {
  brands: FilterItem[];
  selectedBrands: string[];
  onChange: (selected: string[]) => void;
}

const BrandsFilter = ({ brands, selectedBrands, onChange }: BrandsFilterProps) => {
  const locale = useLocale();
  const isArabic = locale === "ar";
  const t = useTranslations("filters");
  const handleToggle = (brandId: string) => {
    if (selectedBrands.includes(brandId)) {
      onChange(selectedBrands.filter((id) => id !== brandId));
    } else {
      onChange([...selectedBrands, brandId]);
    }
  };

  return (
    <div className="mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
        {t("brands")}
      </h3>
      <div className="space-y-2 max-h-48 overflow-y-auto">
        {brands.map((brand) => (
          <label key={brand.id} className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={selectedBrands.includes(brand.id)}
              onChange={() => handleToggle(brand.id)}
              className="w-4 h-4 rounded border-gray-300 dark:border-gray-600"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              {isArabic ? brand.nameAr : brand.nameEn} ({brand.count})
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default BrandsFilter;
