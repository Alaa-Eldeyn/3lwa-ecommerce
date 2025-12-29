"use client";

import { useState, useMemo, useEffect } from "react";
import { StarIcon, Heart, ShoppingCart, Minus, Plus, Check, Store } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { useCartStore } from "@/src/store/cartStore";
import { useUserStore } from "@/src/store/userStore";
import { ProductDetails, ProductAttribute, SelectedValueId, CombinationResponse } from "@/src/types/types";
import axios from "axios";
import VendorsSidebar from "./VendorsSidebar";

const ProductInfo = ({product, onProductUpdate}: {product: ProductDetails, onProductUpdate: (updatedProduct: ProductDetails) => void}) => {
  const t = useTranslations("productDetails");
  const locale = useLocale();
  const { addItem } = useCartStore();
  const { isAuthenticated } = useUserStore();

  // Extract dynamic data from product
  const title = locale === 'ar' ? product.titleAr : product.titleEn;
  const description = locale === 'ar' ? product.descriptionAr : product.descriptionEn;
  
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

  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isLoadingCombination, setIsLoadingCombination] = useState(false);
  const [isVendorsSidebarOpen, setIsVendorsSidebarOpen] = useState(false);

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

  const handleQuantityChange = (type: "increment" | "decrement") => {
    if (type === "increment") {
      setQuantity((prev) => prev + 1);
    } else if (type === "decrement" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCart = async () => {
    setIsAddingToCart(true);
    try {
      // Get selected attributes values
      const selectedAttrsData: Record<string, string> = {};
      Object.entries(selectedAttributes).forEach(([attributeId, attr]) => {
        selectedAttrsData[attributeId] = attr.value;
      });
      console.log(product);
      // return
      await addItem(
        {
          id: product.currentCombination?.combinationId || product.id,
          itemId: product.id,
          name: title,
          price: price,
          image: productImage,
          quantity: quantity,
          attributes: selectedAttrsData,
          offerCombinationPricingId: product.currentCombination?.combinationId,
        },
        isAuthenticated()
      );
      // Success notification
      alert(t("addedToCart") || "تم إضافة المنتج للسلة!");
    } catch (error) {
      console.error("Failed to add to cart:", error);
      alert("Failed to add product to cart");
    } finally {
      setIsAddingToCart(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3">
        {title}
      </h1>

      {/* Rating */}
      <div className="flex items-center gap-4 mb-4 flex-wrap">
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <StarIcon
                key={i}
                size={20}
                className={`${
                  i < Math.floor(rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : i < rating
                    ? "fill-yellow-400 text-yellow-400 opacity-50"
                    : "fill-gray-300 text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-gray-900 dark:text-white font-medium">
            {rating}/5
          </span>
        </div>

      </div>

      {/* Price */}
      <div className="flex items-center gap-3 mb-5">
        <span className="text-3xl font-bold text-gray-900 dark:text-white">
          ${price.toFixed(2)}
        </span>
        {maxPrice && maxPrice > price && (
          <>
            <span className="text-2xl font-bold line-through text-gray-400 dark:text-gray-500">
              ${maxPrice.toFixed(2)}
            </span>
            {discount && (
              <span className="text-sm bg-secondary/20 text-secondary px-3 py-1 rounded-full font-medium">
                -{discount}%
              </span>
            )}
          </>
        )}
      </div>

      {/* Description */}
      <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
        {description}
      </p>

      <div className="h-px bg-gray-200 dark:bg-gray-700 mb-6" />

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
        
        const attributeName = locale === 'ar' 
          ? attributes[0]?.nameAr 
          : attributes[0]?.nameEn;
        const isColor = attributes.some(attr => {
          const value = locale === 'ar' ? attr.valueAr : attr.valueEn;
          return isColorValue(value);
        });
        const selectedValue = selectedAttributes[attributeId];
        const selectedValueText = selectedValue?.value;
        
        return (
          <div key={attributeId}>
            <div className="mb-6">
              <h3 className="text-gray-900 dark:text-white font-bold mb-3 text-lg">
                {attributeName}
              </h3>
              
              {isColor ? (
                // عرض الألوان كدوائر ملونة
                <div className="flex items-center gap-3 flex-wrap">
                  {attributes.map((attr, index) => {
                    const value = locale === 'ar' ? attr.valueAr : attr.valueEn;
                    const isSelectedValue = selectedValueText === value;
                    return (
                      <button
                        key={`${attr.attributeId}-${index}`}
                        onClick={() => handleAttributeSelect(attributeId, attr.valueAr, attr.valueEn)}
                        disabled={isLoadingCombination}
                        className={`w-10 h-10 rounded-full border-2 soft relative ${
                          isSelectedValue
                            ? "border-primary dark:border-white scale-110"
                            : "border-gray-300 dark:border-gray-600"
                        } ${isLoadingCombination ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                        style={{ backgroundColor: getColorHex(value) }}
                        title={value}
                        aria-label={value}
                      >
                        {isSelectedValue && (
                          <Check
                            size={16}
                            className="absolute inset-0 m-auto text-white drop-shadow-lg"
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
              ) : (
                // عرض الخيارات الأخرى كأزرار
                <div className="flex items-center gap-3 flex-wrap">
                  {attributes.map((attr, index) => {
                    const value = locale === 'ar' ? attr.valueAr : attr.valueEn;
                    const isSelectedValue = selectedValueText === value;
                    return (
                      <button
                        key={`${attr.attributeId}-${index}`}
                        onClick={() => handleAttributeSelect(attributeId, attr.valueAr, attr.valueEn)}
                        className={`px-6 py-2 rounded-full font-medium soft ${
                          isSelectedValue
                            ? "bg-primary dark:bg-white text-white dark:text-primary"
                            : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
                        } ${isLoadingCombination ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                        disabled={isLoadingCombination}
                      >
                        {value}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
            <div className="h-px bg-gray-200 dark:bg-gray-700 mb-6" />
          </div>
        );
      })}

      {/* Quantity and Actions */}
      <div className="flex items-center gap-4 flex-wrap">
        {/* Quantity */}
        <div className="flex items-center gap-4 bg-gray-50 dark:bg-gray-800 rounded-full">
          <button
            onClick={() => handleQuantityChange("decrement")}
            className="text-gray-900 dark:text-white hover:text-secondary soft bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 p-3 rounded-s-full disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={quantity === 1}
          >
            <Minus size={20} />
          </button>
          <span className="text-gray-900 dark:text-white font-medium w-6 text-center">
            {quantity}
          </span>
          <button
            onClick={() => handleQuantityChange("increment")}
            className="text-gray-900 dark:text-white hover:text-secondary soft bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 p-3 rounded-e-full"
          >
            <Plus size={20} />
          </button>
        </div>

        {/* Add to Cart */}
        <button
          onClick={handleAddToCart}
          disabled={isAddingToCart}
          className="flex-1 min-w-[200px] px-8 py-3 bg-primary dark:bg-white text-white dark:text-primary rounded-full font-medium hover:bg-secondary dark:hover:bg-gray-200 soft center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isAddingToCart ? (
            <>
              <div className="w-5 h-5 border-2 border-white dark:border-primary border-t-transparent rounded-full animate-spin"></div>
              {t("adding") || "جاري الإضافة..."}
            </>
          ) : (
            <>
              <ShoppingCart size={20} />
              {t("addToCart")}
            </>
          )}
        </button>

        {/* Favorite */}
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-full center hover:bg-gray-200 dark:hover:bg-gray-700 soft"
        >
          <Heart
            size={20}
            className={`${
              isFavorite
                ? "fill-red-500 text-red-500"
                : "text-gray-900 dark:text-white"
            } soft`}
          />
        </button>
      </div>
              
        {/* Vendors Button */}
        {product?.isMultiVendor && (
          <button
            onClick={() => setIsVendorsSidebarOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full text-sm font-medium text-gray-900 dark:text-white soft"
          >
            <Store size={16} />
            <span>
              {locale === 'ar' ? 'عروض أخرى' : 'other offers'}
            </span>
          </button>
        )}

      {/* Vendors Sidebar */}
      <VendorsSidebar
        isOpen={isVendorsSidebarOpen}
        onClose={() => setIsVendorsSidebarOpen(false)}
        itemCombinationId={product.currentCombination?.combinationId || product.id}
        productName={title}
      />
    </div>
  );
};

export default ProductInfo;
