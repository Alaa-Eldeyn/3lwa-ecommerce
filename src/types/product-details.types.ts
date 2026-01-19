// Product Details
export interface ProductDetails {
  id: string;
  titleAr: string;
  titleEn: string;
  descriptionAr?: string;
  descriptionEn?: string;
  shortDescriptionAr?: string;
  shortDescriptionEn?: string;
  thumbnailImage: string;
  category?: ProductCategory;
  brand?: ProductBrand;
  hasCombinations?: boolean;
  isMultiVendor?: boolean;
  pricingSystemType?: number;
  pricingSystemName?: string;
  averageRating?: number;
  generalImages?: ProductImage[];
  attributes?: ProductAttribute[];
  currentCombination?: ProductCombination;
  pricing?: ProductPricing;
}

/* --------------------- Product Details - Nested Types --------------------- */
// Product Category
export interface ProductCategory {
  id: string;
  nameAr: string;
  nameEn: string;
}

// Product Brand
export interface ProductBrand {
  id: string;
  nameAr: string;
  nameEn: string;
  logoUrl: string;
}

// Product Image
export interface ProductImage {
  id: string;
  path: string;
  order: number;
  itemId: string;
  isNew: boolean;
}

// Product Attribute
export interface ProductAttribute {
  attributeId: string;
  nameAr: string;
  nameEn: string;
  fieldType: number;
  displayOrder: number;
  valueAr: string;
  valueEn: string;
  combinationValueId?: string;
}

// Product Combination
export interface ProductCombination {
  combinationId: string;
  isDefault: boolean;
  pricingAttributes: PricingAttribute[];
  images: CombinationImage[];
}

// Product Pricing
export interface ProductPricing {
  vendorCount: number;
  minPrice: number;
  maxPrice: number;
  bestOffer?: BestOffer;
}

/* ------------------- Product Combination - Nested Types ------------------- */
// Pricing Attribute
export interface PricingAttribute {
  attributeId: string;
  attributeNameAr: string;
  attributeNameEn: string;
  combinationValueId: string;
  valueAr: string;
  valueEn: string;
  isSelected: boolean;
}

export interface CombinationImage {
  id: string;
  path: string;
  order: number;
  isDefault: boolean;
}

/* --------------------- Product Pricing - Nested Types --------------------- */
// Best Offer
export interface BestOffer {
  offerId: string;
  offerPricingId: string;
  vendorId: string;
  vendorName: string;
  vendorRating: number;
  price: number;
  salesPrice: number;
  discountPercentage: number;
  availableQuantity: number;
  stockStatus: number;
  isFreeShipping: boolean;
  estimatedDeliveryDays: number;
  isBuyBoxWinner: boolean;
  minOrderQuantity: number;
  maxOrderQuantity: number;
  quantityTiers: QuantityTier[];
}

/* ------------------------ Best Offer - Nested Types ----------------------- */
// Quantity Tier
export interface QuantityTier {
  minQuantity: number;
  maxQuantity: number;
  unitPrice: number;
}
