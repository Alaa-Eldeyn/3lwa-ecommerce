/**
 * Types for GET /Item/search API.
 */

export interface ItemSearchResponse {
  success: boolean;
  statusCode: number;
  data: ItemSearchData;
  message: string;
  errorCode: string | null;
  errors: string[];
}

export interface ItemSearchData {
  items: Item[];
  totalRecords: number;
}

export interface Item {
  id: string;
  titleAr: string;
  titleEn: string;
  title: string;
  shortDescriptionAr: string | null;
  shortDescriptionEn: string | null;
  descriptionAr: string | null;
  descriptionEn: string | null;
  categoryId: string;
  brandId: string;
  unitId: string;
  categoryTitleAr: string | null;
  categoryTitleEn: string | null;
  categoryTitle: string | null;
  brandTitleAr: string | null;
  brandTitleEn: string | null;
  brandTitle: string | null;
  unitTitleAr: string | null;
  unitTitleEn: string | null;
  unitTitle: string | null;
  videoProviderTitleAr: string | null;
  videoProviderTitleEn: string | null;
  videoProviderTitle: string | null;
  videoProviderId: string | null;
  videoUrl: string | null;
  thumbnailImage: string | null;
  offerConditionId: string | null;
  barcode: string | null;
  sku: string | null;
  basePrice: number;
  baseSalesPrice: number | null;
  quantity: number | null;
  minimumPrice: number | null;
  maximumPrice: number | null;
  visibilityScope: number;
  createdDateUtc: string;
  images: string[];
  defaultOfferData: ItemDefaultOfferData;
  itemAttributes: unknown[];
  seoTitle: string | null;
  seoDescription: string | null;
  seoMetaTags: string | null;
}

export interface ItemDefaultOfferData {
  itemId: string;
  warehouseId: string;
  estimatedDeliveryDays: number | null;
  isFreeShipping: boolean;
  fulfillmentType: number;
  warrantyId: string | null;
  offerCombinationPricings: unknown | null;
  id: string;
}

// GET /Item/{itemId} - full item with structured images and itemAttributes
export interface ItemImage {
  path: string;
  order: number;
  itemId: string;
  isNew: boolean;
  id: string;
}

export interface ItemAttributeValue {
  itemId: string;
  attributeId: string;
  value: string;
  id: string;
}

export interface ItemDetail {
  id: string;
  titleAr: string;
  titleEn: string;
  title: string;
  shortDescriptionAr: string | null;
  shortDescriptionEn: string | null;
  descriptionAr: string | null;
  descriptionEn: string | null;
  categoryId: string;
  brandId: string;
  unitId: string;
  categoryTitleAr: string | null;
  categoryTitleEn: string | null;
  categoryTitle: string | null;
  brandTitleAr: string | null;
  brandTitleEn: string | null;
  brandTitle: string | null;
  unitTitleAr: string | null;
  unitTitleEn: string | null;
  unitTitle: string | null;
  videoProviderTitleAr: string | null;
  videoProviderTitleEn: string | null;
  videoProviderTitle: string | null;
  videoProviderId: string | null;
  videoUrl: string | null;
  thumbnailImage: string | null;
  offerConditionId: string | null;
  barcode: string | null;
  sku: string | null;
  basePrice: number;
  baseSalesPrice: number | null;
  quantity: number | null;
  minimumPrice: number | null;
  maximumPrice: number | null;
  visibilityScope: number;
  createdDateUtc: string;
  images: ItemImage[];
  defaultOfferData: ItemDefaultOfferData;
  itemAttributes: ItemAttributeValue[];
  seoTitle: string | null;
  seoDescription: string | null;
  seoMetaTags: string | null;
}

export interface ItemByIdResponse {
  success: boolean;
  statusCode: number;
  data: ItemDetail;
  message: string;
  errorCode: string | null;
  errors: string[];
}

// GET /Attribute/category/{categoryId} (admin-only; used in AddItem when API is available to vendor)
export interface AttributeOption {
  titleAr: string;
  titleEn: string;
  displayOrder: number;
  value: string | null;
  attributeId: string;
  id: string;
}

export interface CategoryAttribute {
  categoryId: string;
  attributeId: string;
  titleAr: string;
  titleEn: string;
  isRangeFieldType: boolean;
  affectsPricing: boolean;
  isRequired: boolean;
  displayOrder: number;
  fieldType: number;
  maxLength: number;
  AttributeOptionsJson: AttributeOption[];
  id: string;
}

export interface CategoryAttributesResponse {
  success: boolean;
  statusCode: number;
  data: CategoryAttribute[];
  message: string;
  errorCode: string | null;
  errors: string[];
}
