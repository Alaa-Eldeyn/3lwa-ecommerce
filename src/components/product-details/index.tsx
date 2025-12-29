"use client";

import Breadcrumb from "../common/Breadcrumb";
import ProductCard from "../common/ProductCard";
import { newArrivals } from "@/src/data/data";
import ImageGallery from "./ImageGallery";
import ProductInfo from "./ProductInfo";
import ProductTabsContent from "./ProductTabsContent";
import ProductDetailsSection from "./ProductDetailsSection";
import ReviewsSection from "./ReviewsSection";
import FAQsSection from "./FAQsSection";
import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "next/navigation";
import { useLocale } from "next-intl";
import type { ProductDetails } from "@/src/types/types";

const reviews = [
  {
    id: 1,
    name: "Samantha D.",
    rating: 4.5,
    verified: true,
    date: "August 14, 2023",
    review:
      "I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It's become my favorite go-to shirt.",
  },
  {
    id: 2,
    name: "Alex M.",
    rating: 4,
    verified: true,
    date: "August 15, 2023",
    review:
      "The t-shirt exceeded my expectations! The colors are vibrant and the print quality is top-notch. Being a UI/UX designer myself, I'm quite picky about aesthetics, and this t-shirt definitely gets a thumbs up from me.",
  },
  {
    id: 3,
    name: "Ethan R.",
    rating: 3.5,
    verified: true,
    date: "August 16, 2023",
    review:
      "This t-shirt is a must-have for anyone who appreciates good design. The minimalistic yet stylish pattern caught my eye, and the fit is perfect. I can see the designer's touch in every aspect of this shirt.",
  },
  {
    id: 4,
    name: "Olivia P.",
    rating: 4,
    verified: true,
    date: "August 17, 2023",
    review:
      "As a UI/UX enthusiast, I value simplicity and functionality. This t-shirt not only represents those principles but also feels great to wear. It's evident that the designer poured their creativity into making this t-shirt stand out.",
  },
  {
    id: 5,
    name: "Liam K.",
    rating: 4,
    verified: true,
    date: "August 18, 2023",
    review:
      "This t-shirt is a fusion of comfort and creativity. The fabric is soft, and the design speaks volumes about the designer's skill. It's like wearing a piece of art that reflects my passion for both design and fashion.",
  },
  {
    id: 6,
    name: "Ava H.",
    rating: 5,
    verified: true,
    date: "August 19, 2023",
    review:
      "I'm not just wearing a t-shirt; I'm wearing a piece of design philosophy. The intricate details and thoughtful layout of the design make this shirt a conversation starter.",
  },
];

const ProductDetails = ({ variant }: { variant?: string }) => {
  const { id } = useParams();
  const { data: product, isLoading, error } = useQuery({
    queryKey: ["product", id],
    queryFn: () => axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/ItemDetails/${id}`),
    enabled: !!id,
    refetchOnWindowFocus: false,
  });
  
  // Try different response paths - API might return data in different structures
  const initialProductDetails: ProductDetails | undefined = 
    product?.data?.data || 
    product?.data?.result ||
    (product?.data && typeof product.data === 'object' && 'id' in product.data ? product.data : undefined) ||
    undefined;
  
  // State to hold updated product details (when attributes change)
  const [productDetails, setProductDetails] = useState<ProductDetails | undefined>(initialProductDetails);
  
  // Update productDetails when initial data changes
  if (initialProductDetails && (!productDetails || productDetails.id !== initialProductDetails.id)) {
    setProductDetails(initialProductDetails);
  }
  
  // Debug logging
  useEffect(() => {
    if (product) {
      console.log("Full API Response:", product);
      console.log("Response Data:", product?.data);
      console.log("Product Details:", productDetails);
    }
    if (error) {
      console.error("API Error:", error);
    }
  }, [product, productDetails, error]);

  const locale = useLocale();
  const isArabic = locale === "ar";
  const title = isArabic
    ? productDetails?.titleAr || ""
    : productDetails?.titleEn || "";

  // Extract images from generalImages and currentCombination
  const productImages = useMemo(() => {
    if (!productDetails) return [];
    
    // Combine generalImages and currentCombination images
    const generalImages = productDetails.generalImages?.map(img => img.path) || [];
    const combinationImages = productDetails.currentCombination?.images?.map(img => img.path) || [];
    
    // Remove duplicates and combine
    const allImages = [...generalImages, ...combinationImages];
    const uniqueImages = Array.from(new Set(allImages));
    
    // If no images, use thumbnail
    return uniqueImages.length > 0 ? uniqueImages : [productDetails.thumbnailImage];
  }, [productDetails]);

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

  if (error) {
    return (
      <div className="container py-16 text-center">
        <p className="text-red-600 dark:text-red-400">Error loading product: {error instanceof Error ? error.message : "Unknown error"}</p>
      </div>
    );
  }

  if (!productDetails || !productDetails.id) {
    return (
      <div className="container py-16 text-center">
        <p className="text-gray-600 dark:text-gray-400">Product not found</p>
        {product && (
          <div className="mt-4 text-sm text-gray-500">
            <p>Debug: Response received but product details not found</p>
            <pre className="mt-2 text-left bg-gray-100 dark:bg-gray-800 p-4 rounded overflow-auto max-h-96">
              {JSON.stringify(product?.data, null, 2)}
            </pre>
          </div>
        )}
      </div>
    );
  }

  return (
    <section className="">
      <Breadcrumb className="my-4" />

      <div className="container">
        {/* Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Images Gallery */}
          <ImageGallery
            images={productImages}
            productTitle={title}
          />

          {/* Product Info */}
          <ProductInfo
            product={productDetails}
            onProductUpdate={setProductDetails}
          />
        </div>

        {/* Tabs Section */}
        {variant === "tabs" ? (
          <ProductTabsContent
            description={
              isArabic
                ? productDetails.descriptionAr || productDetails.shortDescriptionAr || ""
                : productDetails.descriptionEn || productDetails.shortDescriptionEn || ""
            }
            reviews={reviews}
            totalReviews={0}
          />
        ) : (
          <>
            <ProductDetailsSection
              description={
                isArabic
                  ? productDetails.descriptionAr || productDetails.shortDescriptionAr || ""
                  : productDetails.descriptionEn || productDetails.shortDescriptionEn || ""
              }
            />
            <ReviewsSection
              reviews={reviews}
              totalReviews={productDetails.averageRating || 0}
            />
            <FAQsSection />
          </>
        )}

        {/* You Might Also Like */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            YOU MIGHT ALSO LIKE
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {newArrivals.slice(0, 4).map((product, index) => (
              <ProductCard key={index} {...product} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
