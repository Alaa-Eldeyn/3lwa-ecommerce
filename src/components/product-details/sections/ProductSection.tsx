"use client";

import React, { useState } from "react";
import ImageGallery from "../components/ImageGallery";
import ProductInfo from "../components/ProductInfo";
import BuyBox from "../components/BuyBox";
import VendorsSidebar from "../components/VendorsSidebar";
import { ProductDetails } from "@/src/types/product-details.types";
import { useLocale } from "next-intl";

const ProductSection = ({
  productDetails,
  title,
  setProductDetails,
}: {
  productDetails: ProductDetails;
  title: string;
  setProductDetails: (productDetails: ProductDetails) => void;
}) => {
  const locale = useLocale();
  const [selectedAttributes, setSelectedAttributes] = useState<
    Record<string, { value: string; combinationValueId: string }>
  >({});
  const [isVendorsSidebarOpen, setIsVendorsSidebarOpen] = useState(false);

  // Calculate discount percentage
  const bestOffer = productDetails.pricing?.bestOffer;
  const price = bestOffer?.salesPrice || bestOffer?.price || productDetails.pricing?.minPrice || 0;
  const maxPrice = bestOffer?.price || productDetails.pricing?.maxPrice;
  const discountPercentage =
    bestOffer?.discountPercentage ||
    (maxPrice && price ? Math.round(((maxPrice - price) / maxPrice) * 100) : 0);

  return (
    <>
      <div className="grid grid-cols-12 gap-8 mb-12">
        {/* Left Column: Gallery */}
        <div className="col-span-12 lg:col-span-5">
          <ImageGallery
            images={
              productDetails.generalImages && productDetails.generalImages.length > 0
                ? productDetails.generalImages.map((img) => img.path)
                : productDetails.thumbnailImage
                ? [productDetails.thumbnailImage]
                : []
            }
            productTitle={title}
            discountPercentage={discountPercentage}
          />
        </div>

        {/* Middle Column: Product Info */}
        <div className="col-span-12 lg:col-span-4">
          <ProductInfo
            product={productDetails}
            onProductUpdate={setProductDetails}
            onSelectedAttributesChange={setSelectedAttributes}
          />
        </div>

        {/* Right Column: Buy Box */}
        <div className="col-span-12 lg:col-span-3">
          <BuyBox
            product={productDetails}
            selectedAttributes={selectedAttributes}
            onOpenVendorsSidebar={() => setIsVendorsSidebarOpen(true)}
          />
        </div>
      </div>

      {/* Vendors Sidebar */}
      <VendorsSidebar
        isOpen={isVendorsSidebarOpen}
        onClose={() => setIsVendorsSidebarOpen(false)}
        itemCombinationId={productDetails.currentCombination?.combinationId || productDetails.id}
        productName={title}
      />
    </>
  );
};

export default ProductSection;
