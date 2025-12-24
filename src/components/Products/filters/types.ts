export interface FilterItem {
  id: string;
  nameAr: string;
  nameEn: string;
  count: number;
}

export interface AttributeItem {
  name: string;
  values: string[];
}

export interface FeaturesData {
  freeShippingCount: number;
  hasFreeShipping: boolean;
  withWarrantyCount: number;
  hasWarranty: boolean;
  inStockCount: number;
  hasInStock: boolean;
  totalItems: number;
}

export interface DynamicFilters {
  categories?: FilterItem[];
  brands?: FilterItem[];
  vendors?: FilterItem[];
  conditions?: FilterItem[];
  attributes?: AttributeItem[];
  features?: FeaturesData;
  priceRange?: {
    minPrice: number;
    maxPrice: number;
    avgPrice: number;
  };
}
