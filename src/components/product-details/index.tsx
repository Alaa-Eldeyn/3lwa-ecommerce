"use client";

import Breadcrumb from "../common/Breadcrumb";
import ProductSection from "./sections/ProductSection";
import TabsVariation from "./TabsVariation";
import SectionsVariation from "./SectionsVariation";
import FAQsSection from "./sections/FAQsSection";
import RelatedSection from "./sections/RelatedSection";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "next/navigation";
import { useLocale } from "next-intl";
import type { ProductDetails } from "@/src/types/product-details.types";

interface ProductDetailsProps {
  variant?: "tabs" | "sections";
}

const ProductDetails = ({ variant = "tabs" }: ProductDetailsProps) => {
  const { id } = useParams();

  // Product Details              '
  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/ItemDetails/${id}`),
    enabled: !!id,
    refetchOnWindowFocus: false,
  });

  // Reviews
  const {
    data: reviews,
    isLoading: reviewsLoading,
    error: reviewsError,
  } = useQuery({
    queryKey: ["reviews", id],
    queryFn: () =>
      axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/ItemReview/reviews-by-Item/${id}`),
    enabled: !!id,
    refetchOnWindowFocus: false,
  });
  // console.log("Reviews:", reviews);

  // State to hold updated product details (when attributes change)
  const [productDetails, setProductDetails] = useState<ProductDetails | undefined>();

  // Update productDetails when API response changes
  useEffect(() => {
    if (product?.data) {
      const productData = product.data;
      setProductDetails(productData as ProductDetails);
    }
  }, [product]);

  const locale = useLocale();
  const isArabic = locale === "ar";
  const title = isArabic ? productDetails?.titleAr || "" : productDetails?.titleEn || "";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-white dark:bg-gray-800 z-50">
        <div className="w-16 h-16 border-4 border-primary dark:border-secondary border-t-transparent! rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!productDetails) {
    return (
      <div className="container py-16 text-center">
        <p className="text-gray-600 dark:text-gray-400">Product not found</p>
      </div>
    );
  }

  // if (error) {
  //   return (
  //     <div className="container py-16 text-center">
  //       <p className="text-red-600 dark:text-red-400">Error loading product: {error instanceof Error ? error.message : "Unknown error"}</p>
  //     </div>
  //   );
  // }

  // if (!productDetails || !productDetails.id) {
  //   return (
  //     <div className="container py-16 text-center">
  //       <p className="text-gray-600 dark:text-gray-400">Product not found</p>
  //       {product && (
  //         <div className="mt-4 text-sm text-gray-500">
  //           <p>Debug: Response received but product details not found</p>
  //           <pre className="mt-2 text-left bg-gray-100 dark:bg-gray-800 p-4 rounded overflow-auto max-h-96">
  //             {JSON.stringify(product?.data, null, 2)}
  //           </pre>
  //         </div>
  //       )}
  //     </div>
  //   );
  // }

  return (
    <section className="">
      <Breadcrumb />

      <div className="container">
        {/* Product Section */}
        <ProductSection
          productDetails={productDetails}
          title={title}
          setProductDetails={setProductDetails}
        />

        {/* Tabs Variation */}
        {variant === "tabs" && (
          <TabsVariation
            description={
              isArabic
                ? productDetails.descriptionAr || productDetails.shortDescriptionAr || ""
                : productDetails.descriptionEn || productDetails.shortDescriptionEn || ""
            }
            reviews={reviews?.data?.data || []}
            totalReviews={reviews?.data?.data?.length || 0}
            product={productDetails}
          />
        )}

        {/* Sections Variation */}
        {variant === "sections" && (
          <SectionsVariation
            description={
              isArabic
                ? productDetails.descriptionAr || productDetails.shortDescriptionAr || ""
                : productDetails.descriptionEn || productDetails.shortDescriptionEn || ""
            }
            reviews={reviews?.data?.data || []}
            totalReviews={productDetails.averageRating || 0}
          />
        )}

        {/* Related Section */}
        {/* <RelatedSection /> */}

        {/* FAQs Section */}
        <FAQsSection />
      </div>
    </section>
  );
};

export default ProductDetails;
