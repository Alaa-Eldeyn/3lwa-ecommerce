import React from "react";
import BrandsMarquee from "./sections/BrandsMarquee";
import CategoriesBentoGrid from "./sections/CategoriesBentoGrid";
import CategoriesCarousel from "./sections/CategoriesCarousel";
import FlashDeals from "./sections/FlashDeals";
import Hero from "./sections/Hero";
import NewArrivals from "./sections/NewArrival";
import Testimonials from "./sections/Testimonials";
import TopBanner from "./sections/TopBanner";
import TopBannersCarousel from "./components/TopBannersCarousel";
import TopSellers from "./sections/TopSellers";
import NewArrivalBanner from "./sections/NewArrivalBanner";
import TopSellersBanner from "./sections/TopSellersBanner";
import HomeBlocks from "./components/HomeBlocks";
import SignInPrompt from "./components/SignInPrompt";

interface HomeProps {
  variant?: "default" | "no-banners" | "alt-hero" | "simple" | "custom" | "amazon";
}

export default function Home({ variant = "amazon" }: HomeProps) {
  // Default (Home-1)
  if (variant === "default") {
    return (
      <main>
        {/* <Hero /> */}
        <TopBannersCarousel variant="default" />
        <BrandsMarquee />
        <CategoriesCarousel variant="gradient" />
        <TopBanner />
        <FlashDeals cardVariant="minimal" />
        <NewArrivalBanner />
        <NewArrivals cardVariant="minimal" />
        <TopSellersBanner />
        <TopSellers cardVariant="minimal" />
        <CategoriesBentoGrid />
        {/* <Testimonials /> */}
      </main>
    );
  }

  // No Banners variant (Home-2)
  else if (variant === "no-banners") {
    return (
      <main>
        <TopBannersCarousel variant="default" />
        <BrandsMarquee />
        <CategoriesCarousel variant="card" />
        <FlashDeals cardVariant="bordered" />
        <NewArrivals cardVariant="bordered" />
        <TopSellers cardVariant="bordered" />
        <CategoriesBentoGrid />
      </main>
    );
  }

  // Alt Hero variant (Homzmart) (Home-3)
  else if (variant === "alt-hero") {
    return (
      <main>
        <TopBannersCarousel variant="rounded" />
        <CategoriesCarousel variant="rounded" />
        <FlashDeals cardVariant="homz" />
        <NewArrivals cardVariant="homz" />
        <TopSellers cardVariant="homz" />
        <CategoriesBentoGrid />
      </main>
    );
  }

  // Simple variant (Home-4)
  else if (variant === "simple") {
    return (
      <main>
        <TopBanner />
        <CategoriesCarousel variant="card" />
        <FlashDeals cardVariant="bordered" />
        <NewArrivalBanner />
        <NewArrivals cardVariant="bordered" />
        <TopSellersBanner />
        <TopSellers cardVariant="bordered" />
        <CategoriesBentoGrid variant="row" />
      </main>
    );
  }

  // Custom variant (Home-5)
  else if (variant === "custom") {
    return (
      <main>
        <FlashDeals cardVariant="nike" />
        <NewArrivals cardVariant="clean" />
        <TopSellers cardVariant="gradient" />
      </main>
    );
  }

  // Amazon variant (Default)
  else if (variant === "amazon") {
    return (
      <main className="bg-page-bg dark:bg-gray-900 min-h-screen relative pb-10">
        {/* Hero Carousel */}
        <TopBannersCarousel variant="default" />

        {/* Main Content Container */}
        <div className="container mx-auto px-4 -mt-30 relative z-10">

          {/* Categories Carousel */}
          {/* <CategoriesCarousel variant="card" /> */}

          {/* Home Blocks */}
          <HomeBlocks />

          {/* Sign In Prompt */}
          <SignInPrompt />
        </div>
      </main>
    );
  }
  return null;
}
