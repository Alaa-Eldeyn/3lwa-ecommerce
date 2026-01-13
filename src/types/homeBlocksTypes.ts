// Block Type
export type Block = {
  id: string;
  titleAr: string;
  titleEn: string;
  subtitleAr?: string;
  subtitleEn?: string;
  type: "ManualItems" | "Dynamic" | "ManualCategories";
  layout: "Featured" | "TwoColumn" | "Compact" | "Carousel" | "FullWidth";
  displayOrder: number;
  showViewAllLink: boolean; //TODO
  viewAllLinkTitleAr: string; //TODO
  viewAllLinkTitleEn: string; //TODO
  campaign?: Campaign;
  products: Array<Product>;
  categories: Array<Category>;
};

// Campaign Type
export type Campaign = {
  Id: string;
  NameAr: string;
  NameEn: string;
  IsFlashSale: boolean; //TODO
  FlashSaleEndTime: Date;
  BadgeTextAr: string;
  BadgeTextEn: string;
  BadgeColor: string;
};

// Product Type
export type Product = {
  itemId: string;
  itemCombinationId: string;
  nameAr: string;
  nameEn: string;
  mainImageUrl: string;
  rating: number;
  isAvailable: boolean;
  inStock: boolean;
  campaignBadgeAr: string | null;
  campaignBadgeEn: string | null;
};

// Category Type
export type Category = {
  categoryId: string;
  nameAr: string;
  nameEn: string;
  imageUrl: string;
};
