"use client";

import { useState, useMemo, useEffect } from "react";
import { StarIcon, Check } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { ProductDetails, ProductAttribute, SelectedValueId, CombinationResponse } from "@/src/types/types";
import axios from "axios";
import Link from "next/link";

interface ProductInfoProps {
  product: ProductDetails;
  onProductUpdate: (updatedProduct: ProductDetails) => void;
  onSelectedAttributesChange?: (attributes: Record<string, { value: string; combinationValueId: string }>) => void;
}

const ProductInfo = ({product, onProductUpdate, onSelectedAttributesChange}: ProductInfoProps) => {
  const t = useTranslations("productDetails");
  const locale = useLocale();

  // Extract dynamic data from product
  const title = locale === 'ar' ? product.titleAr : product.titleEn;
  const description = locale === 'ar' ? product.descriptionAr : product.descriptionEn;
  const brand = locale === 'ar' ? product?.brand?.nameAr : product?.brand?.nameEn;
  
  // Get pricing from bestOffer
  const bestOffer = product.pricing?.bestOffer;
  const price = bestOffer?.salesPrice || bestOffer?.price || product.pricing?.minPrice || 0;
  const maxPrice = bestOffer?.price || product.pricing?.maxPrice;
  const discount = bestOffer?.discountPercentage || (maxPrice && price ? Math.round(((maxPrice - price) / maxPrice) * 100) : null);
  const rating = product.averageRating || 0;
  const productImage = product.thumbnailImage || product.generalImages?.[0]?.path || "";

  // Group attributes by attributeId and remove duplicates
  const groupedAttributes = useMemo(() => {
    const groups: Record<string, ProductAttribute[]> = {};
    const seen = new Set<string>(); // Track seen attributeId + value combinations
    
    product.attributes?.forEach(attr => {
      if (!groups[attr.attributeId]) {
        groups[attr.attributeId] = [];
      }
      
      // Create unique key for attributeId + valueAr + valueEn
      const uniqueKey = `${attr.attributeId}-${attr.valueAr}-${attr.valueEn}`;
      if (!seen.has(uniqueKey)) {
        seen.add(uniqueKey);
        groups[attr.attributeId].push(attr);
      }
    });
    
    return groups;
  }, [product.attributes]);

  // Initialize selected attributes from currentCombination pricingAttributes
  // Store combinationValueId for each attribute
  const [selectedAttributes, setSelectedAttributes] = useState<Record<string, { value: string; combinationValueId: string }>>(() => {
    const initial: Record<string, { value: string; combinationValueId: string }> = {};
    
    // Use currentCombination pricingAttributes if available
    if (product.currentCombination?.pricingAttributes) {
      product.currentCombination.pricingAttributes.forEach(attr => {
        if (attr.isSelected) {
          const value = locale === 'ar' ? attr.valueAr : attr.valueEn;
          initial[attr.attributeId] = {
            value,
            combinationValueId: attr.combinationValueId
          };
        }
      });
    }
    
    // Fallback to first attribute value if not set
    Object.keys(groupedAttributes).forEach(attributeId => {
      if (!initial[attributeId]) {
        const firstAttr = groupedAttributes[attributeId][0];
        if (firstAttr) {
          const value = locale === 'ar' ? firstAttr.valueAr : firstAttr.valueEn;
          // Try to find combinationValueId from currentCombination
          const pricingAttr = product.currentCombination?.pricingAttributes?.find(
            pa => pa.attributeId === attributeId && 
            (pa.valueAr === firstAttr.valueAr || pa.valueEn === firstAttr.valueEn)
          );
          initial[attributeId] = {
            value: value || "",
            combinationValueId: pricingAttr?.combinationValueId || firstAttr.combinationValueId || ""
          };
        }
      }
    });
    
    return initial;
  });
  
  // Update selectedAttributes when product.currentCombination changes
  useEffect(() => {
    if (product.currentCombination?.pricingAttributes) {
      const updated: Record<string, { value: string; combinationValueId: string }> = {};
      product.currentCombination.pricingAttributes.forEach(attr => {
        if (attr.isSelected) {
          const value = locale === 'ar' ? attr.valueAr : attr.valueEn;
          updated[attr.attributeId] = {
            value,
            combinationValueId: attr.combinationValueId
          };
        }
      });
      setSelectedAttributes(prev => ({ ...prev, ...updated }));
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
    const colorNames = ['أحمر', 'أزرق', 'أخضر', 'أصفر', 'أسود', 'أبيض', 'رمادي',
                        'red', 'blue', 'green', 'yellow', 'black', 'white', 'gray',
                        'orange', 'برتقالي', 'pink', 'وردي', 'purple', 'بنفسجي'];
    return colorNames.some(c => value.toLowerCase().includes(c.toLowerCase()));
  }

  // Helper function to get color hex code
  function getColorHex(colorName: string): string {
    const colorMap: Record<string, string> = {
      'red': '#EF4444', 'أحمر': '#EF4444',
      'blue': '#3B82F6', 'أزرق': '#3B82F6',
      'green': '#10B981', 'أخضر': '#10B981',
      'yellow': '#FBBF24', 'أصفر': '#FBBF24',
      'black': '#000000', 'أسود': '#000000',
      'white': '#FFFFFF', 'أبيض': '#FFFFFF',
      'gray': '#6B7280', 'رمادي': '#6B7280',
      'orange': '#F97316', 'برتقالي': '#F97316',
      'pink': '#EC4899', 'وردي': '#EC4899',
      'purple': '#A855F7', 'بنفسجي': '#A855F7',
    };
    
    // If it's already a hex code, return it
    if (colorName.match(/^#[0-9A-F]{6}$/i)) return colorName;
    
    // Find matching color
    const matchedColor = Object.keys(colorMap).find(key => 
      colorName.toLowerCase().includes(key.toLowerCase())
    );
    
    return matchedColor ? colorMap[matchedColor] : '#9CA3AF';
  }

  // Fetch combination by attributes
  const fetchCombinationByAttributes = async (selectedValueIds: SelectedValueId[]) => {
    if (!product.id || selectedValueIds.length === 0) return;
    
    setIsLoadingCombination(true);
    try {
      const response = await axios.post<{ data: CombinationResponse }>(
        `${process.env.NEXT_PUBLIC_BASE_URL}/ItemDetails/combinations/by-attributes`,
        {
          selectedValueIds
        }
      );
      
      const combinationData = response.data.data || response.data;
      
      if (combinationData) {
        // Update product details with new combination data
        const updatedProduct: ProductDetails = {
          ...product,
          currentCombination: {
            combinationId: combinationData.combinationId,
            sku: combinationData.sku,
            barcode: combinationData.barcode,
            isDefault: false,
            pricingAttributes: combinationData.pricingAttributes,
            images: combinationData.images.map(img => ({
              id: img.id,
              path: img.path,
              order: img.order,
              isDefault: img.isNew || false
            }))
          },
          pricing: {
            vendorCount: combinationData.summary.totalVendors,
            minPrice: combinationData.summary.minPrice,
            maxPrice: combinationData.summary.maxPrice,
            bestOffer: combinationData.offers && combinationData.offers.length > 0 ? {
              offerId: combinationData.offers[0].offerId,
              vendorId: combinationData.offers[0].vendorId,
              vendorName: combinationData.offers[0].vendorName,
              vendorRating: combinationData.offers[0].vendorRating,
              price: combinationData.offers[0].price,
              salesPrice: combinationData.offers[0].salesPrice,
              discountPercentage: combinationData.offers[0].discountPercentage,
              availableQuantity: combinationData.offers[0].availableQuantity,
              stockStatus: combinationData.offers[0].stockStatus,
              isFreeShipping: combinationData.offers[0].isFreeShipping,
              estimatedDeliveryDays: combinationData.offers[0].estimatedDeliveryDays,
              isBuyBoxWinner: combinationData.offers[0].isBuyBoxWinner,
              minOrderQuantity: combinationData.offers[0].minOrderQuantity,
              maxOrderQuantity: combinationData.offers[0].maxOrderQuantity,
              quantityTiers: combinationData.offers[0].quantityTiers
            } : product.pricing?.bestOffer || {
              offerId: "",
              vendorId: "",
              vendorName: "",
              vendorRating: 0,
              price: 0,
              salesPrice: 0,
              discountPercentage: 0,
              availableQuantity: 0,
              stockStatus: 0,
              isFreeShipping: false,
              estimatedDeliveryDays: 0,
              isBuyBoxWinner: false,
              minOrderQuantity: 0,
              maxOrderQuantity: 0,
              quantityTiers: []
            }
          }
        };
        
        // Update parent component
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
  const findCombinationValueId = (attributeId: string, valueAr: string, valueEn: string): string => {
    // First, try to find in current combination pricingAttributes
    // Match by both valueAr and valueEn to be more accurate
    const pricingAttr = product.currentCombination?.pricingAttributes?.find(
      attr => attr.attributeId === attributeId && 
      (attr.valueAr === valueAr || attr.valueEn === valueEn || 
       (attr.valueAr === valueAr && attr.valueEn === valueEn))
    );
    if (pricingAttr?.combinationValueId) return pricingAttr.combinationValueId;
    
    // Try to find in all pricingAttributes (not just selected ones)
    // This helps when user selects a different value that exists in other combinations
    const allPricingAttrs = product.currentCombination?.pricingAttributes?.filter(
      attr => attr.attributeId === attributeId
    );
    if (allPricingAttrs) {
      const matchingAttr = allPricingAttrs.find(
        attr => attr.valueAr === valueAr || attr.valueEn === valueEn
      );
      if (matchingAttr?.combinationValueId) return matchingAttr.combinationValueId;
    }
    
    // Try to find in selectedAttributes (might have been set from previous selection)
    const selectedAttr = selectedAttributes[attributeId];
    if (selectedAttr) {
      const selectedValue = locale === 'ar' ? selectedAttr.value : selectedAttr.value;
      const currentValue = locale === 'ar' ? valueAr : valueEn;
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
    const value = locale === 'ar' ? valueAr : valueEn;
    
    // Find combinationValueId
    let combinationValueId = findCombinationValueId(attributeId, valueAr, valueEn);
    
    // If not found, keep the existing one or use empty string
    if (!combinationValueId && selectedAttributes[attributeId]) {
      combinationValueId = selectedAttributes[attributeId].combinationValueId;
    }
    
    // Update local state immediately
    const updatedAttributes = {
      ...selectedAttributes,
      [attributeId]: { value, combinationValueId }
    };
    setSelectedAttributes(updatedAttributes);
    
    // Build selectedValueIds array for API
    const selectedValueIds: SelectedValueId[] = Object.entries(updatedAttributes)
      .filter(([, attr]) => attr.combinationValueId) // Only include if we have combinationValueId
      .map(([, attr], index, array) => ({
        combinationAttributeValueId: attr.combinationValueId,
        isLastSelected: index === array.length - 1 // Last selected attribute
      }));
    
    // If we have combinationValueIds, fetch new combination
    if (selectedValueIds.length > 0) {
      await fetchCombinationByAttributes(selectedValueIds);
    } else {
      console.warn("No combinationValueIds available for selected attributes. Waiting for initial combination data.");
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
                  {locale === "ar" ? "وفّر" : "Save"} ${(maxPrice - price).toFixed(2)}
                </span>
              )}
            </>
          )}
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {locale === "ar" ? "جميع الأسعار شاملة ضريبة القيمة المضافة" : "All prices include VAT"}
        </p>
      </div>

      {/* Loading indicator for combination */}
      {isLoadingCombination && (
        <div className="mb-4 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
          <span>{t("loading") || "جاري التحديث..."}</span>
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

        {/* Dynamic Attributes Selection */}
        {Object.entries(groupedAttributes).map(([attributeId, attributes]) => {
          if (attributes.length === 0) return null;

          const attributeName = locale === "ar" ? attributes[0]?.nameAr : attributes[0]?.nameEn;
          const isColor = attributes.some((attr) => {
            const value = locale === "ar" ? attr.valueAr : attr.valueEn;
            return isColorValue(value);
          });
          const selectedValue = selectedAttributes[attributeId];
          const selectedValueText = selectedValue?.value;

          return (
            <div key={attributeId}>
              {isColor ? (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {attributeName}: <span className="text-gray-900 dark:text-white font-bold">{selectedValueText}</span>
                  </label>
                  <div className="flex gap-3">
                    {attributes.map((attr, index) => {
                      const value = locale === "ar" ? attr.valueAr : attr.valueEn;
                      const isSelectedValue = selectedValueText === value;
                      return (
                        <button
                          key={`${attr.attributeId}-${index}`}
                          onClick={() => handleAttributeSelect(attributeId, attr.valueAr, attr.valueEn)}
                          disabled={isLoadingCombination}
                          className={`w-10 h-10 rounded-full border-2 relative transition-transform ${
                            isSelectedValue
                              ? "border-primary dark:border-primary ring-2 ring-offset-2 ring-primary/30"
                              : "border-gray-200 dark:border-gray-600 hover:scale-110"
                          } ${isLoadingCombination ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                          style={{ backgroundColor: getColorHex(value) }}
                          title={value}
                          aria-label={value}>
                          {isSelectedValue && (
                            <Check size={12} className="absolute inset-0 m-auto text-white drop-shadow-lg" />
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
                      {attributeName}: <span className="text-gray-900 dark:text-white font-bold">{selectedValueText}</span>
                    </label>
                    {attributeName?.toLowerCase().includes("size") && (
                      <button className="text-xs text-primary dark:text-primary hover:underline flex items-center gap-1">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                        </svg>
                        {locale === "ar" ? "دليل المقاسات" : "Size Guide"}
                      </button>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {attributes.map((attr, index) => {
                      const value = locale === "ar" ? attr.valueAr : attr.valueEn;
                      const isSelectedValue = selectedValueText === value;
                      const isDisabled = false; // You can add logic to check if variant is disabled
                      return (
                        <button
                          key={`${attr.attributeId}-${index}`}
                          onClick={() => handleAttributeSelect(attributeId, attr.valueAr, attr.valueEn)}
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

        {/* Material (Read-only attribute example) */}
        {product.attributes && product.attributes.length > 0 && (
          <div className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg border border-gray-100 dark:border-gray-700">
            <span className="text-xs text-gray-500 dark:text-gray-400 uppercase font-bold tracking-wider">
              {locale === "ar" ? "المادة" : "Material"}
            </span>
            <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
              {locale === "ar" ? "متنوع" : "Various"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductInfo;
