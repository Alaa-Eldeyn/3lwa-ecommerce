import { AttributeItem } from "./types";
import { useTranslations } from "next-intl";

interface AttributesFilterProps {
  attributes: AttributeItem[];
  selectedAttributes: Record<string, string[]>;
  onChange: (selected: Record<string, string[]>) => void;
}

const AttributesFilter = ({ attributes, selectedAttributes, onChange }: AttributesFilterProps) => {
  const t = useTranslations("filters");
  const handleToggle = (attrName: string, value: string) => {
    const current = selectedAttributes[attrName] || [];
    let updated: string[];
    
    if (current.includes(value)) {
      updated = current.filter((v) => v !== value);
    } else {
      updated = [...current, value];
    }
    
    onChange({
      ...selectedAttributes,
      [attrName]: updated,
    });
  };

  return (
    <div className="mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
        {t("attributes")}
      </h3>
      <div className="space-y-3">
        {attributes.map((attr, index) => (
          <div key={index}>
            <h4 className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-2">
              {attr.name}
            </h4>
            <div className="space-y-1 ml-2">
              {attr.values?.map((value, vIndex) => (
                <label key={vIndex} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedAttributes[attr.name]?.includes(value) || false}
                    onChange={() => handleToggle(attr.name, value)}
                    className="w-4 h-4 rounded border-gray-300 dark:border-gray-600"
                  />
                  <span className="text-xs text-gray-600 dark:text-gray-400">
                    {value}
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
