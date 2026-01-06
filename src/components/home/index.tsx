import React from "react";
import BrandsMarquee from "./sections/BrandsMarquee";
import CategoriesBentoGrid from "./sections/CategoriesBentoGrid";
import CategoriesCarousel from "./sections/CategoriesCarousel";
import FlashDeals from "./sections/FlashDeals";
import Hero from "./sections/Hero";
import NewArrivals from "./sections/NewArrival";
import Testimonials from "./sections/Testimonials";
import TopBanner from "./sections/TopBanner";
import TopBannersCarousel from "./sections/TopBannersCarousel";
import TopSellers from "./sections/TopSellers";
import NewArrivalBanner from "./sections/NewArrivalBanner";
import TopSellersBanner from "./sections/TopSellersBanner";
import HeroCards from "./sections/HeroCards";

interface HomeProps {
  variant?: "default" | "no-banners" | "alt-hero" | "simple" | "custom";
}

export default function Home({ variant = "simple" }: HomeProps) {
  // Default
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

  // No Banners variant
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

  // Alt Hero variant (Homzmart)
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

  // Simple variant
  else if (variant === "simple") {
    return (
      <main>
        {/* Hero Section with Overlapping Cards - Amazon Style */}
        <section className="relative mb-8">
          <TopBannersCarousel variant="default" />
          <div className="relative -mt-24 lg:-mt-32 z-10">
            <HeroCards />
          </div>
        </section>

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

  // Custom variant
  else if (variant === "custom") {
    return (
      <main>
        <FlashDeals cardVariant="nike" />
        <NewArrivals cardVariant="clean" />
        <TopSellers cardVariant="gradient" />
      </main>
    );
  }
  return null;
}
