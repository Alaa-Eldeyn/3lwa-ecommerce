import { FilterItem } from "./types";
import { useLocale, useTranslations } from "next-intl";

interface ConditionsFilterProps {
  conditions: FilterItem[];
  selectedConditions: string[];
  onChange: (selected: string[]) => void;
}

const ConditionsFilter = ({ conditions, selectedConditions, onChange }: ConditionsFilterProps) => {
  const locale = useLocale();
  const isArabic = locale === "ar";
  const t = useTranslations("filters");
  const handleToggle = (conditionId: string) => {
    if (selectedConditions.includes(conditionId)) {
      onChange(selectedConditions.filter((id) => id !== conditionId));
    } else {
      onChange([...selectedConditions, conditionId]);
    }
  };

  return (
    <div className="mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
        {t("conditions")}
      </h3>
      <div className="space-y-2">
        {conditions.map((condition) => (
          <label key={condition.id} className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={selectedConditions.includes(condition.id)}
              onChange={() => handleToggle(condition.id)}
              className="w-4 h-4 rounded border-gray-300 dark:border-gray-600"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              {isArabic ? condition.nameAr : condition.nameEn} ({condition.count})
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default ConditionsFilter;
