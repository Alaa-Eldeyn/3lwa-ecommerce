"use client"
import { AttributeItem } from "./types";
import { useTranslations } from "next-intl";

interface AttributesFilterProps {
  attributes: AttributeItem[];
  selectedAttributes: Record<string, string[]>;
  onChange: (selected: Record<string, string[]>) => void;
}

const AttributesFilter = ({ attributes, selectedAttributes, onChange }: AttributesFilterProps) => {
  const t = useTranslations("filters");

  const handleToggle = (attributeId: string, valueId: string) => {
    // Use attributeId (from API) instead of name
    const current = selectedAttributes[attributeId] || [];
    let updated: string[];
    
    if (current.includes(valueId)) {
      updated = current.filter((v) => v !== valueId);
    } else {
      updated = [...current, valueId];
    }
    
    onChange({
      ...selectedAttributes,
      [attributeId]: updated, // Update state using the ID
    });
  };

  return (
    <div className="mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
        {t("attributes")}
      </h3>
      <div className="space-y-3">
        {attributes.map((attr) => (
          <div key={attr.attributeId}>
            <h4 className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-2">
              {attr.nameEn || attr.nameAr || "Attribute"}
            </h4>
            <div className="space-y-1 ml-2">
              {attr.values?.map((val) => (
                <label key={val.valueId} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    // Use attributeId to look up selected values
                    checked={selectedAttributes[attr.attributeId]?.includes(val.valueId) || false}
                    onChange={() => handleToggle(attr.attributeId, val.valueId)}
                    className="w-4 h-4 rounded border-gray-300 dark:border-gray-600"
                  />
                  <span className="text-xs text-gray-600 dark:text-gray-400">
                    {/* Fallback to ID if name is missing or a GUID */}
                    {val.valueEn && val.valueEn.length < 20 ? val.valueEn : val.valueId}
                  </span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AttributesFilter;