import BrandsMarquee from "@/src/components/home/BrandsMarquee";
import CategoriesBentoGrid from "@/src/components/home/CategoriesBentoGrid";
import FlashDeals from "@/src/components/home/FlashDeals";
import Hero from "@/src/components/home/Hero";
import NewArrivals from "@/src/components/home/NewArrival";
import Testimonials from "@/src/components/home/Testimonials";
import TopBannersCarousel from "@/src/components/home/TopBannersCarousel";
import TopSellers from "@/src/components/home/TopSellers";

export default function Home() {
  return (
      <main className="pt-20">
        {/* <Hero /> */}
        <TopBannersCarousel />
        <BrandsMarquee />
        <FlashDeals />
        <NewArrivals />
        <TopSellers />
        <CategoriesBentoGrid />
        <Testimonials />
      </main>
  );
}
