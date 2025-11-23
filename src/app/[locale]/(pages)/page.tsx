import BrandsMarquee from "@/src/components/home/BrandsMarquee";
import CategoriesBentoGrid from "@/src/components/home/CategoriesBentoGrid";
import CategoriesCarousel from "@/src/components/home/CategoriesCarousel";
import FlashDeals from "@/src/components/home/FlashDeals";
import Hero from "@/src/components/home/Hero";
import NewArrivals from "@/src/components/home/NewArrival";
import Testimonials from "@/src/components/home/Testimonials";
import TopBanner from "@/src/components/home/TopBanner";
import TopBannersCarousel from "@/src/components/home/TopBannersCarousel";
import TopSellers from "@/src/components/home/TopSellers";

export default function Home() {
  return (
      <main className="">
        {/* <Hero /> */}
        <TopBannersCarousel />
        <BrandsMarquee />
        <CategoriesCarousel />
        <TopBanner />
        <FlashDeals />
        <NewArrivals />
        <TopSellers />
        <CategoriesBentoGrid />
        {/* <Testimonials /> */}
      </main>
  );
}
