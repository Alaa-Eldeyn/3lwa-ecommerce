export interface FilterItem {
  id: string;
  nameAr: string;
  nameEn: string;
  count: number;
}

export interface AttributeValue {
  valueId: string;
  valueAr: string;
  valueEn: string;
  count: number;
}

export interface AttributeItem {
  attributeId: string; // Fixed: was 'id'
  nameAr: string;
  nameEn: string;
  displayOrder: number;
  values: AttributeValue[];
}

export interface DynamicFilters {
  categories: any[];
  brands: any[];
  vendors: any[];
  attributes: AttributeItem[];
  conditions: any[];
  priceRange: {
    minPrice: number;
    maxPrice: number;
  };
}