import z from "zod";
import {
  loginSchema,
  registerSchema,
  profileSchema,
  passwordUpdateSchema,
} from "../schemas/schemas";
import { QuantityTier } from "./product-details.types";

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type ProfileFormData = z.infer<typeof profileSchema>;
export type PasswordUpdateFormData = z.infer<typeof passwordUpdateSchema>;

export interface Address {
  id: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault: boolean;
  type: "shipping" | "billing";
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  items: OrderItem[];
}

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  image: string;
}

export interface User {
  id: string | null;
  firstName: string;
  lastName: string;
  email: string;
  profileImagePath: string;
  token: string;
  refreshToken: string;
  role: string;
  phoneNumber?: string;
  phoneCode?: string;
}

export interface AuthResponse {
  success: boolean;
  statusCode: number;
  data: User;
  message: string;
  errorCode: string | null;
  errors: string[];
}

export interface Testimonial {
  id: string;
  customerName: string;
  customerTitle: string;
  base64Image: string | null;
  customerImagePath: string;
  testimonialText: string;
  displayOrder: number;
  createdDateUtc: string;
  updatedDateUtc: string;
  // Fallback for old data structure
  name?: string;
  rating?: number;
  review?: string;
  verified?: boolean;
}

interface Badge {
  textAr: string;
  textEn: string;
  type: string;
  variant: string;
}
export interface Product {
  itemId: string;
  itemCombinationId: string;
  titleAr: string;
  titleEn: string;
  title: string;
  shortDescriptionAr: string;
  shortDescriptionEn: string;
  descriptionAr: string;
  descriptionEn: string;
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
  thumbnailImage: string;
  barcode: string | null;
  sku: string | null;
  basePrice: number | null;
  minimumPrice: number | null;
  maximumPrice: number | null;
  visibilityScope: number;
  createdDateUtc: string;
  images: string[];
  itemAttributes: any[];
  seoTitle: string;
  seoDescription: string;
  seoMetaTags: string;
  price?: number;
  salesPrice?: number;
  itemRating?: number;
  badges?: Badge[];
  brandNameAr?: string;
  brandNameEn?: string;
  stockStatus?: string;
  availableQuantity?: number;
  isFreeShipping?: boolean;
  offerCombinationPricingId?: string;
}

export interface ProductsResponse {
  success: boolean;
  statusCode: number;
  data: Product[];
  message: string;
  errorCode: string | null;
  errors: string[];
}

/** Empty GUID used as parentId for root/main categories in the tree API */
export const ROOT_CATEGORY_PARENT_ID = "00000000-0000-0000-0000-000000000000";

export interface Category {
  id: string;
  titleAr: string;
  titleEn: string;
  parentId: string;
  children?: Category[];
  isFinal: boolean;
  isHomeCategory: boolean;
  isFeaturedCategory?: boolean;
  priceRequired: boolean;
  pricingSystemId: string;
  displayOrder: number;
  treeViewSerial: string;
  imageUrl: string | null;
  icon?: string | null;
  createdDateUtc: string;
  categoryAttributes: any[];
  pricingSystemType: number;
}

// Wishlist Types
export interface WishlistItem {
  wishlistItemId: string;
  wishlistId: string;
  itemCombinationId: string;
  dateAdded: string;
  itemId: string;
  itemTitleAr: string;
  itemTitleEn: string;
  itemShortDescriptionAr: string;
  itemShortDescriptionEn: string;
  thumbnailImage: string;
  offerPricingId: string;
  price: number;
  salesPrice: number;
}

export interface WishlistResponse {
  items: WishlistItem[];
  totalRecords: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

// Combination API Types
export interface SelectedValueId {
  combinationAttributeValueId: string;
  isLastSelected: boolean;
}

export interface CombinationOffer {
  offerId: string;
  offerPricingId: string;
  vendorId: string;
  vendorName: string;
  vendorNameAr?: string;
  vendorRating: number;
  vendorLogoUrl?: string;
  price: number;
  salesPrice: number;
  discountPercentage: number;
  availableQuantity: number;
  stockStatus: number;
  isFreeShipping: boolean;
  shippingCost?: number;
  estimatedDeliveryDays: number;
  isBuyBoxWinner: boolean;
  hasWarranty?: boolean;
  conditionNameAr?: string;
  conditionNameEn?: string;
  warrantyTypeAr?: string;
  warrantyTypeEn?: string;
  warrantyPeriodMonths?: number;
  minOrderQuantity: number;
  maxOrderQuantity: number;
  quantityTiers: QuantityTier[];
  offerRank?: number;
}

export interface CombinationSummary {
  totalVendors: number;
  isMultiVendor: boolean;
  minPrice: number;
  maxPrice: number;
  avgPrice: number;
  totalStock: number;
}

export interface MissingAttribute {
  attributeId: string;
  nameAr: string;
  nameEn: string;
  status: string;
}
