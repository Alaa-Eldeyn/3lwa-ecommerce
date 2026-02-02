/** Vendor Review Stats */
export interface VendorReviewStats {
  vendorId: string;
  averageRating: number;
  reviewCount: number;
  fiveStarCount: number;
  fourStarCount: number;
  threeStarCount: number;
  twoStarCount: number;
  oneStarCount: number;
  fiveStarPercentage: number;
  fourStarPercentage: number;
  threeStarPercentage: number;
  twoStarPercentage: number;
  oneStarPercentage: number;
}

/** Vendor Review Submit Payload */
export interface VendorReviewSubmitPayload {
  vendorId: string;
  rating: number;
  reviewText: string;
}

/** Vendor Review Update Payload */
export interface VendorReviewUpdatePayload {
  id: string;
  rating: number;
  reviewText: string;
}

/** Vendor Review */
export interface VendorReview {
  id: string;
  customerId?: string;
  vendorId: string;
  rating: number;
  reviewText?: string;
  customerName?: string;
  isVerifiedPurchase?: boolean;
  createdDateUtc?: string;
  orderDate?: string;
  [key: string]: unknown;
}
