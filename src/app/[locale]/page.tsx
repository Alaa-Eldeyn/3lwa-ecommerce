import BrandsMarquee from "@/src/components/home/BrandsMarquee";
import Hero from "@/src/components/home/Hero";
import NewArrivals from "@/src/components/home/NewArrival";
import TopSellers from "@/src/components/home/TopSellers";

export default function Home() {
  return (
    <main>
      <Hero />
      <BrandsMarquee />
      <NewArrivals />
      <TopSellers />
    </main>
  );
}
