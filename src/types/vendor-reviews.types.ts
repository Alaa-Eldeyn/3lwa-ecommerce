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
  customerName: string;
  reviewDate: string;
  rating: number;
  reviewText: string;
  helpfulCount: number;
  reportCount: number;
  isVerifiedPurchase: boolean;
  isEdited: boolean;
  isOwnReview: boolean;
  isMarkedHelpfulByUser: boolean;
  isReportedByUser: boolean;
  [key: string]: unknown;
}
