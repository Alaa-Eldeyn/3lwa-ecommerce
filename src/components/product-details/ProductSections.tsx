"use client";

import ProductDetailsSection from "./ProductDetailsSection";
import ReviewsSection from "./ReviewsSection";
import FAQsSection from "./FAQsSection";

interface Review {
  id: string,
  reviewNumber: number,
  itemID: string,
  customerID: string,
  rating: number,
  reviewTitle: string,
  reviewText: string,
}

interface ProductSectionsProps {
  description: string;
  reviews: Review[];
  totalReviews: number;
}

const ProductSections = ({ description, reviews, totalReviews }: ProductSectionsProps) => {
  return (
    <div className="mb-16 space-y-12">
      {/* Product Details Section */}
      <ProductDetailsSection description={description} />

      {/* Rating & Reviews Section */}
      <ReviewsSection reviews={reviews} totalReviews={totalReviews} />

      {/* FAQs Section */}
      <FAQsSection />
    </div>
  );
};

export default ProductSections;
