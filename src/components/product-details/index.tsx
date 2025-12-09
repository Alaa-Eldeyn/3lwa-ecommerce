"use client";

import Breadcrumb from "../common/Breadcrumb";
import ProductCard from "../common/ProductCard";
import { newArrivals } from "@/src/data/data";
import ImageGallery from "./ImageGallery";
import ProductInfo from "./ProductInfo";
import ProductTabsContent from "./ProductTabsContent";
import ProductSections from "./ProductSections";
import ProductDetailsSection from "./ProductDetailsSection";
import ReviewsSection from "./ReviewsSection";
import FAQsSection from "./FAQsSection";
import { useEffect } from "react";

// Mock product data - replace with actual product data from props/API
const productData = {
  id: "1",
  title: "ONE LIFE GRAPHIC T-SHIRT",
  rating: 4.5,
  totalReviews: 451,
  price: 260,
  oldPrice: 300,
  discount: 40,
  description:
    "This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.",
  images: [
    "/images/products/Frame 32.png",
    "/images/products/Frame 33.png",
    "/images/products/Frame 34.png",
  ],
  colors: [
    { id: "1", name: "Olive Green", hex: "#4F4631" },
    { id: "2", name: "Dark Green", hex: "#314F4A" },
    { id: "3", name: "Navy Blue", hex: "#31344F" },
  ],
  sizes: ["Small", "Medium", "Large", "X-Large"],
};

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


const ProductDetails = ({ variant }:{variant?: string}) => {

  useEffect(()=>{
    window.scrollTo(0, 0);
  },[])
  return (
    <section className="">
      <Breadcrumb className="my-4" />

      <div className="container">
        {/* Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Images Gallery */}
          <ImageGallery images={productData.images} productTitle={productData.title} />

          {/* Product Info */}
          <ProductInfo
            title={productData.title}
            rating={productData.rating}
            price={productData.price}
            oldPrice={productData.oldPrice}
            discount={productData.discount}
            description={productData.description}
            colors={productData.colors}
            sizes={productData.sizes}
          />
        </div>

        {/* Tabs Section */}
        {varient === "taps" ?
        
        (<ProductTabsContent
          description={productData.description}
          reviews={reviews}
          totalReviews={productData.totalReviews}
        />) :(<>
        
        <ProductDetailsSection description={productData.description} />
        <ReviewsSection reviews={reviews} totalReviews={productData.totalReviews} />
        <FAQsSection />
        </>)
      }

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