import React from "react";
import DetailsSection from "./sections/DetailsSection";
import ReviewsSection from "./sections/ReviewsSection";

const SectionsVariation = ({ description, reviews, totalReviews }: { description: string, reviews: any[], totalReviews: number }) => {
  return (
    <div className="mb-16 space-y-12">
      <DetailsSection description={description} />
      <ReviewsSection reviews={reviews} totalReviews={totalReviews} />
    </div>
  );
};

export default SectionsVariation;
