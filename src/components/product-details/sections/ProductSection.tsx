import React from "react";
import ImageGallery from "../components/ImageGallery";
import ProductInfo from "../components/ProductInfo";
import { ProductDetails } from "@/src/types/types";

const ProductSection = ({ productDetails, title, setProductDetails }: { productDetails: ProductDetails, title: string, setProductDetails: (productDetails: ProductDetails) => void }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
      {/* Images Gallery */}
      <ImageGallery
        images={
          productDetails.generalImages && productDetails.generalImages.length > 0
            ? productDetails.generalImages.map((img) => img.path)
            : productDetails.thumbnailImage
            ? [productDetails.thumbnailImage]
            : []
        }
        productTitle={title}
      />

      {/* Product Info */}
      <ProductInfo product={productDetails} onProductUpdate={setProductDetails} />
    </div>
  );
};

export default ProductSection;
