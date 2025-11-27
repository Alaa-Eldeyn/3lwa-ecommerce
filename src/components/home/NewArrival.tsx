"use client"
import { newArrivals } from "@/src/data/data";
import ProductCard from "../common/ProductCard";
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay } from "swiper/modules"
import "swiper/css"
import "./carousel.css"
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

interface NewArrivalsProps {
  cardVariant?: "default" | "bordered" | "minimal" | "homz" | "nike" | "clean" | "gradient";
}

const NewArrivals = ({ cardVariant }: NewArrivalsProps) => {
  const [products, setProducts] = useState<any>({
    items: newArrivals,
    totalRecords: newArrivals.length
  });
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/Item/new-arrivals`);
        // console.log("New Arrivals Response:", response);
        if (response?.data?.data) {
          // setProducts(response?.data?.data);
        }
      } catch (error) {
        console.error("Error fetching items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  if (products?.totalRecords == 0) return null;

  return (
    <section className="pb-10 bg-white dark:bg-gray-800">
      <div className="container mx-auto">
        {/* Title */}
        <h2 className="text-center text-4xl font-extrabold text-gray-900 dark:text-white mb-6">
          NEW ARRIVALS
        </h2>

        {/* Products Carousel */}
        {loading ? (
          <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 dark:bg-gray-700 aspect-square rounded-lg mb-3"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        ) : (
          <Swiper
            modules={[Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            autoplay={{
              delay: 3000,
              disableOnInteraction: true,
              pauseOnMouseEnter: true,
            }}
            breakpoints={{
              320: {
                slidesPerView: 2,
                spaceBetween: 10,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 20,
              },
              1200: {
                slidesPerView: 5,
                spaceBetween: 20,
              },
            }}
          >
            {products?.items?.map((item:any, i:number) => (
              <SwiperSlide key={i} className="py-2">
                <ProductCard {...item} variant={cardVariant} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}

        {/* Button */}
        <Link href="/products" className="flex justify-center mt-5">
          <button className="px-10 py-3 border border-gray-400 rounded-full text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition">
            View All
          </button>
        </Link>

      </div>
    </section>
  );
};

export default NewArrivals;