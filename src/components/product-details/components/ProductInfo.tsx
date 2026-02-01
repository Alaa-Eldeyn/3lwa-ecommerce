"use client";

import { useState, useMemo, useEffect } from "react";
import { StarIcon, Check } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { PricingAttribute, ProductDetails } from "@/src/types/product-details.types";
import axios from "axios";
import { Link } from "@/src/i18n/routing";
import { SelectedValueId } from "@/src/types/types";

interface ProductInfoProps {
  product: ProductDetails;
  onProductUpdate: (updatedProduct: ProductDetails) => void;
  onSelectedAttributesChange?: (
    attributes: Record<string, { value: string; combinationValueId: string }>
  ) => void;
}

const ProductInfo = ({
  product,
  onProductUpdate,
  onSelectedAttributesChange,
}: ProductInfoProps) => {
  const t = useTranslations("productDetails");
  const tProduct = useTranslations("product");
  const locale = useLocale();
  const isArabic = locale === "ar";

  // Extract dynamic data from product
  const title = isArabic ? product.titleAr : product.titleEn;
  const description = isArabic ? product.descriptionAr : product.descriptionEn;
  const brand = isArabic ? product?.brand?.nameAr : product?.brand?.nameEn;

  // Get pricing from bestOffer
  const bestOffer = product.pricing?.bestOffer;
  const price = bestOffer?.salesPrice || bestOffer?.price || product.pricing?.minPrice || undefined;
  const maxPrice = bestOffer?.price || product.pricing?.maxPrice;
  const discount =
    bestOffer?.discountPercentage ||
    (maxPrice && price ? Math.round(((maxPrice - price) / maxPrice) * 100) : null);
  const rating = product.averageRating || 0;

  // Group pricingAttributes by attributeId and remove duplicates (for interactive selection)
  const groupedPricingAttributes = useMemo(() => {
    const groups: Record<string, PricingAttribute[]> = {};
    const seen = new Set<string>(); // Track seen attributeId + combinationValueId combinations

    product.currentCombination?.pricingAttributes?.forEach((attr) => {
      if (!groups[attr.attributeId]) {
        groups[attr.attributeId] = [];
      }

      // Create unique key for attributeId + combinationValueId
      const uniqueKey = `${attr.attributeId}-${attr.combinationValueId}`;
      if (!seen.has(uniqueKey)) {
        seen.add(uniqueKey);
        groups[attr.attributeId].push(attr);
      }
    });

    return groups;
  }, [product.currentCombination?.pricingAttributes]);

  // Initialize selected attributes from currentCombination pricingAttributes
  // Store combinationValueId for each attribute
  const [selectedAttributes, setSelectedAttributes] = useState<
    Record<string, { value: string; combinationValueId: string }>
  >(() => {
    const initial: Record<string, { value: string; combinationValueId: string }> = {};

    // Use currentCombination pricingAttributes if available
    if (product.currentCombination?.pricingAttributes) {
      // Group by attributeId to get first value for each attribute
      const attributeGroups: Record<string, PricingAttribute[]> = {};
      product.currentCombination.pricingAttributes.forEach((attr) => {
        if (!attributeGroups[attr.attributeId]) {
          attributeGroups[attr.attributeId] = [];
        }
        attributeGroups[attr.attributeId].push(attr);
      });

      // Initialize with selected attributes, or first value if none selected
      Object.keys(attributeGroups).forEach((attributeId) => {
        const attrs = attributeGroups[attributeId];
        const selectedAttr = attrs.find((attr) => attr.isSelected);
        const attrToUse = selectedAttr || attrs[0];

        if (attrToUse) {
          const value = isArabic ? attrToUse.valueAr : attrToUse.valueEn;
          initial[attributeId] = {
            value,
            combinationValueId: attrToUse.combinationValueId,
          };
        }
      });
    }

    return initial;
  });

  // Update selectedAttributes when product.currentCombination changes
  useEffect(() => {
    if (product.currentCombination?.pricingAttributes) {
      const updated: Record<string, { value: string; combinationValueId: string }> = {};
      product.currentCombination.pricingAttributes.forEach((attr) => {
        if (attr.isSelected) {
          const value = isArabic ? attr.valueAr : attr.valueEn;
          updated[attr.attributeId] = {
            value,
            combinationValueId: attr.combinationValueId,
          };
        }
      });
      setSelectedAttributes((prev) => ({ ...prev, ...updated }));
    }
  }, [product.currentCombination, locale]);

  const [isLoadingCombination, setIsLoadingCombination] = useState(false);

  // Expose selectedAttributes to parent
  useEffect(() => {
    if (onSelectedAttributesChange) {
      onSelectedAttributesChange(selectedAttributes);
    }
  }, [selectedAttributes, onSelectedAttributesChange]);

  // Helper function to check if value is a color
  function isColorValue(value: string): boolean {
    // Check if hex color
    if (value.match(/^#[0-9A-F]{6}$/i)) return true;

    // Check if color name
    const colorNames = [
      "أحمر",
      "أزرق",
      "أخضر",
      "أصفر",
      "أسود",
      "أبيض",
      "رمادي",
      "red",
      "blue",
      "green",
      "yellow",
      "black",
      "white",
      "gray",
      "orange",
      "برتقالي",
      "pink",
      "وردي",
      "purple",
      "بنفسجي",
    ];
    return colorNames.some((c) => value.toLowerCase().includes(c.toLowerCase()));
  }

  // Helper function to get color hex code
  function getColorHex(colorName: string): string {
    const colorMap: Record<string, string> = {
      red: "#EF4444",
      أحمر: "#EF4444",
      blue: "#3B82F6",
      أزرق: "#3B82F6",
      green: "#10B981",
      أخضر: "#10B981",
      yellow: "#FBBF24",
      أصفر: "#FBBF24",
      black: "#000000",
      أسود: "#000000",
      white: "#FFFFFF",
      أبيض: "#FFFFFF",
      gray: "#6B7280",
      رمادي: "#6B7280",
      orange: "#F97316",
      برتقالي: "#F97316",
      pink: "#EC4899",
      وردي: "#EC4899",
      purple: "#A855F7",
      بنفسجي: "#A855F7",
    };

    // If it's already a hex code, return it
    if (colorName.match(/^#[0-9A-F]{6}$/i)) return colorName;

    // Find matching color
    const matchedColor = Object.keys(colorMap).find((key) =>
      colorName.toLowerCase().includes(key.toLowerCase())
    );

    return matchedColor ? colorMap[matchedColor] : "#9CA3AF";
  }

  // Fetch combination by attributes
  const fetchCombinationByAttributes = async (selectedValueIds: SelectedValueId[]) => {
    if (!product.id || selectedValueIds.length === 0) return;

    setIsLoadingCombination(true);
    try {
      const response = await axios.post<ProductDetails>(
        `${process.env.NEXT_PUBLIC_BASE_URL}/ItemDetails/combinations/by-attributes`,
        {
          selectedValueIds,
        }
      );

      const combinationData = response.data;

      // Update product details with new combination data (or set to unavailable)
      if (combinationData.currentCombination) {
        const updatedProduct: ProductDetails = {
          ...product,
          currentCombination: {
            combinationId: combinationData.currentCombination.combinationId,
            isDefault: combinationData.currentCombination.isDefault,
            pricingAttributes: combinationData.currentCombination.pricingAttributes,
            images: combinationData.currentCombination.images,
          },
          pricing: {
            vendorCount: combinationData.pricing?.vendorCount || 0,
            minPrice: combinationData.pricing?.minPrice || 0,
            maxPrice: combinationData.pricing?.maxPrice || 0,
            bestOffer: combinationData.pricing?.bestOffer || undefined,
          },
        };

        // Update parent component
        onProductUpdate(updatedProduct);
      } else {
        // Combination is unavailable - update product to reflect this
        const updatedProduct: ProductDetails = {
          ...product,
          pricing: undefined,
        };
        onProductUpdate(updatedProduct);
      }
    } catch (error) {
      console.error("Error fetching combination:", error);
    } finally {
      setIsLoadingCombination(false);
    }
  };

  // Find combinationValueId for a given attribute value
  // We need to search in pricingAttributes because attributes don't have combinationValueId
  const findCombinationValueId = (
    attributeId: string,
    valueAr: string,
    valueEn: string
  ): string => {
    // First, try to find in current combination pricingAttributes
    // Match by both valueAr and valueEn to be more accurate
    const pricingAttr = product.currentCombination?.pricingAttributes?.find(
      (attr) =>
        attr.attributeId === attributeId &&
        (attr.valueAr === valueAr ||
          attr.valueEn === valueEn ||
          (attr.valueAr === valueAr && attr.valueEn === valueEn))
    );
    if (pricingAttr?.combinationValueId) return pricingAttr.combinationValueId;

    // Try to find in all pricingAttributes (not just selected ones)
    // This helps when user selects a different value that exists in other combinations
    const allPricingAttrs = product.currentCombination?.pricingAttributes?.filter(
      (attr) => attr.attributeId === attributeId
    );
    if (allPricingAttrs) {
      const matchingAttr = allPricingAttrs.find(
        (attr) => attr.valueAr === valueAr || attr.valueEn === valueEn
      );
      if (matchingAttr?.combinationValueId) return matchingAttr.combinationValueId;
    }

    // Try to find in selectedAttributes (might have been set from previous selection)
    const selectedAttr = selectedAttributes[attributeId];
    if (selectedAttr) {
      const selectedValue = selectedAttr.value;
      const currentValue = valueAr;
      if (selectedValue === currentValue && selectedAttr.combinationValueId) {
        return selectedAttr.combinationValueId;
      }
    }

    // If not found, return empty string - will be set after API response
    // The API will return the correct combinationValueId in the response
    return "";
  };

  // Update selected attribute
  const handleAttributeSelect = async (attributeId: string, valueAr: string, valueEn: string) => {
    const value = isArabic ? valueAr : valueEn;

    // Get combinationValueId directly from pricingAttributes
    const pricingAttr = product.currentCombination?.pricingAttributes?.find(
      (attr) =>
        attr.attributeId === attributeId && (attr.valueAr === valueAr || attr.valueEn === valueEn)
    );

    let combinationValueId = pricingAttr?.combinationValueId || "";

    // If not found, try findCombinationValueId as fallback
    if (!combinationValueId) {
      combinationValueId = findCombinationValueId(attributeId, valueAr, valueEn);
    }

    // If still not found, keep the existing one or use empty string
    if (!combinationValueId && selectedAttributes[attributeId]) {
      combinationValueId = selectedAttributes[attributeId].combinationValueId;
    }

    // Update local state immediately
    const updatedAttributes = {
      ...selectedAttributes,
      [attributeId]: { value, combinationValueId },
    };
    setSelectedAttributes(updatedAttributes);

    // Build selectedValueIds array for API
    const selectedValueIds: SelectedValueId[] = Object.entries(updatedAttributes)
      .filter(([, attr]) => attr.combinationValueId) // Only include if we have combinationValueId
      .map(([, attr], index, array) => ({
        combinationAttributeValueId: attr.combinationValueId,
        isLastSelected: index === array.length - 1, // Last selected attribute
      }));

    // If we have combinationValueIds, fetch new combination
    if (selectedValueIds.length > 0) {
      await fetchCombinationByAttributes(selectedValueIds);
    } else {
      console.warn(
        "No combinationValueIds available for selected attributes. Waiting for initial combination data."
      );
    }
  };

  return (
    <div className="space-y-6">
      {/* Brand & Rating */}
      <div className="space-y-2">
        <div className="flex items-start justify-between">
          <div>
            <Link
              href={`/brand/${product?.brand?.id}`}
              className="text-primary dark:text-primary text-sm font-semibold hover:underline mb-1 inline-block">
              {brand}
            </Link>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white leading-tight mb-2">
              {title}
            </h1>
            <div className="flex items-center gap-2">
              <div className="flex text-yellow-400 text-sm">
                {[...Array(5)].map((_, i) => (
                  <StarIcon
                    key={i}
                    size={16}
                    className={`${
                      i < Math.floor(rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : i < rating
                        ? "fill-yellow-400 text-yellow-400 opacity-50"
                        : "fill-gray-300 dark:fill-gray-600 text-gray-300 dark:text-gray-600"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                {rating.toFixed(1)}
              </span>
            </div>
          </div>
          {product?.brand?.logoUrl && (
            <Link
              href={`/brand/${product?.brand?.id}`}
              className="w-16 h-16 border border-gray-200 dark:border-gray-700 rounded-lg p-2 flex items-center justify-center hover:shadow-md transition-shadow bg-white dark:bg-gray-800">
              <img
                src={`${process.env.NEXT_PUBLIC_DOMAIN}/${product.brand.logoUrl}`}
                alt={brand}
                className="w-full h-full object-contain"
              />
            </Link>
          )}
        </div>

        {/* Short Description */}
        {description && (
          <div className="prose prose-sm text-gray-600 dark:text-gray-400">
            <p>{description}</p>
          </div>
        )}
      </div>

      <hr className="border-gray-200 dark:border-gray-700" />

      {/* Pricing */}
      {price && (
        <div>
          <div className="flex items-baseline gap-3 mb-1">
            <span className="text-3xl font-bold text-primary dark:text-primary">
              ${price.toFixed(2)}
            </span>
            {maxPrice && maxPrice > price && (
              <>
                <span className="text-lg text-gray-400 dark:text-gray-500 line-through decoration-red-400">
                  ${maxPrice.toFixed(2)}
                </span>
                {discount && (
                  <span className="text-xs font-bold text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded">
                    {tProduct("save")} ${(maxPrice - price).toFixed(2)}
                  </span>
                )}
              </>
            )}
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {tProduct("allPricesIncludeVAT")}
          </p>
        </div>
      )}
      
      {/* Variants Selection */}
      <div className="space-y-4">
        {/* Loading indicator for combination */}
        {isLoadingCombination && (
          <div className="mb-4 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
            <span>{t("loading") || "جاري التحديث..."}</span>
          </div>
        )}

        {/* Dynamic Pricing Attributes Selection (Interactive) */}
        {Object.entries(groupedPricingAttributes).map(([attributeId, pricingAttributes]) => {
          if (pricingAttributes.length === 0) return null;

          const attributeName =
            isArabic
              ? pricingAttributes[0]?.attributeNameAr
              : pricingAttributes[0]?.attributeNameEn;
          const isColor = pricingAttributes.some((attr) => {
            const value = isArabic ? attr.valueAr : attr.valueEn;
            return isColorValue(value);
          });
          const selectedValue = selectedAttributes[attributeId];
          const selectedValueText = selectedValue?.value;

          return (
            <div key={attributeId}>
              {isColor ? (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {attributeName}:{" "}
                    <span className="text-gray-900 dark:text-white font-bold">
                      {selectedValueText}
                    </span>
                  </label>
                  <div className="flex gap-3">
                    {pricingAttributes.map((attr, index) => {
                      const value = isArabic ? attr.valueAr : attr.valueEn;
                      const isSelectedValue = selectedValueText === value;
                      return (
                        <button
                          key={`${attr.attributeId}-${attr.combinationValueId}-${index}`}
                          onClick={() =>
                            handleAttributeSelect(attributeId, attr.valueAr, attr.valueEn)
                          }
                          disabled={isLoadingCombination}
                          className={`w-10 h-10 rounded-full border-2 relative transition-transform ${
                            isSelectedValue
                              ? "border-primary dark:border-primary ring-2 ring-offset-2 ring-primary/30"
                              : "border-gray-200 dark:border-gray-600 hover:scale-110"
                          } ${
                            isLoadingCombination
                              ? "opacity-50 cursor-not-allowed"
                              : "cursor-pointer"
                          }`}
                          style={{ backgroundColor: getColorHex(value) }}
                          title={value}
                          aria-label={value}>
                          {isSelectedValue && (
                            <Check
                              size={12}
                              className="absolute inset-0 m-auto text-white drop-shadow-lg"
                            />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      {attributeName}:{" "}
                      <span className="text-gray-900 dark:text-white font-bold">
                        {selectedValueText}
                      </span>
                    </label>
                    {/* {attributeName?.toLowerCase().includes("size") && (
                      <button className="text-xs text-primary dark:text-primary hover:underline flex items-center gap-1">
                        <svg
                          className="w-3 h-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 6h16M4 10h16M4 14h16M4 18h16"
                          />
                        </svg>
                        {tProduct("sizeGuide")}
                      </button>
                    )} */}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {pricingAttributes.map((attr, index) => {
                      const value = isArabic ? attr.valueAr : attr.valueEn;
                      const isSelectedValue = selectedValueText === value;
                      const isDisabled = false; // You can add logic to check if variant is disabled
                      return (
                        <button
                          key={`${attr.attributeId}-${attr.combinationValueId}-${index}`}
                          onClick={() =>
                            handleAttributeSelect(attributeId, attr.valueAr, attr.valueEn)
                          }
                          disabled={isLoadingCombination || isDisabled}
                          className={`px-4 py-2 border rounded-md text-sm transition-colors ${
                            isSelectedValue
                              ? "border-2 border-primary dark:border-primary bg-primary/5 dark:bg-primary/10 text-primary dark:text-primary font-bold"
                              : isDisabled
                              ? "border border-gray-200 dark:border-gray-600 text-gray-300 dark:text-gray-500 cursor-not-allowed bg-gray-50 dark:bg-gray-800"
                              : "border border-gray-200 dark:border-gray-600 hover:border-primary dark:hover:border-primary hover:text-primary dark:hover:text-primary"
                          } ${isLoadingCombination ? "opacity-50 cursor-not-allowed" : ""}`}>
                          {value}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {/* Display-only Attributes (Read-only) */}
        {product.attributes && product.attributes.length > 0 && (
          <div className="space-y-2">
            {product.attributes.map((attr, index) => {
              const attributeName = isArabic ? attr.nameAr : attr.nameEn;
              const attributeValue = isArabic ? attr.valueAr : attr.valueEn;
              return (
                <div
                  key={`${attr.attributeId}-${index}`}
                  className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg border border-gray-100 dark:border-gray-700">
                  <span className="text-xs text-gray-500 dark:text-gray-400 uppercase font-bold tracking-wider">
                    {attributeName}
                  </span>
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-200 mt-1">
                    {attributeValue}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductInfo;
