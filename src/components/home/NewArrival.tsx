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

const NewArrivals = () => {
  const [products, setProducts] = useState(newArrivals);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);
        const response = await axios.get("");
        if (response?.data?.data) {
          setProducts(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  return (
    <section className="py-10 lg:py-16 bg-white dark:bg-gray-800 border-t border-gray-300 dark:border-gray-700">
      <div className="container mx-auto">

        {/* Title */}
        <h2 className="text-center text-4xl font-extrabold text-gray-900 dark:text-white mb-12">
          NEW ARRIVALS
        </h2>

        {/* Products Grid */}
        {/* <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((item, i) => (
            <ProductCard key={i} {...item} />
          ))}
        </div> */}

        <Swiper
          modules={[Autoplay]}
          spaceBetween={20}
            slidesPerView={1}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
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
          {products.map((item, i) => (
            <SwiperSlide key={i} className="py-2">
              <ProductCard {...item} />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Button */}
        <Link href="/products" className="flex justify-center mt-8 lg:mt-12">
          <button className="px-10 py-3 border border-gray-400 rounded-full text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition">
            View All
          </button>
        </Link>

      </div>
    </section>
  );
};

export default NewArrivals;