"use client";
import { flashDeals } from "@/src/data/data";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Link from "next/link";
import { useTranslations } from "next-intl";
import ProductCard from "@/src/components/common/ProductCard";
import DummyProductCard from "@/src/components/common/DummyProductCard";

interface FlashDealsProps {
  cardVariant?: "default" | "bordered" | "minimal" | "homz" | "nike" | "clean" | "gradient";
}

const FlashDeals = ({ cardVariant }: FlashDealsProps) => {
  const t = useTranslations("home.flashDeals");
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59,
  });

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="pb-5 bg-white dark:bg-gray-900">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between mb-3">
          <div>
            <h2 className="text-center md:text-left text-4xl font-extrabold text-gray-900 dark:text-white mb-2">
              <span className="text-red-600">{t("titleHighlight")}</span> {t("title")}
            </h2>
          </div>

          <div className="flex gap-3 mt-4 md:mt-0">
            <div className="relative">
              <div className="bg-red-600 rounded-xl p-3 min-w-[60px] shadow-lg">
                <span className="block text-2xl font-bold text-white text-center leading-none">
                  {String(timeLeft.hours).padStart(2, "0")}
                </span>
              </div>
              <span className="block text-xs text-gray-600 dark:text-gray-400 mt-1 text-center font-medium">
                {t("hours")}
              </span>
            </div>
            <div className="flex items-center pb-6">
              <span className="text-2xl font-bold text-red-600">:</span>
            </div>
            <div className="relative">
              <div className="bg-red-600 rounded-xl p-3 min-w-[60px] shadow-lg">
                <span className="block text-2xl font-bold text-white text-center leading-none">
                  {String(timeLeft.minutes).padStart(2, "0")}
                </span>
              </div>
              <span className="block text-xs text-gray-600 dark:text-gray-400 mt-1 text-center font-medium">
                {t("minutes")}
              </span>
            </div>
            <div className="flex items-center pb-6">
              <span className="text-2xl font-bold text-red-600">:</span>
            </div>
            <div className="relative">
              <div className="bg-red-600 rounded-xl p-3 min-w-[60px] shadow-lg">
                <span className="block text-2xl font-bold text-white text-center leading-none">
                  {String(timeLeft.seconds).padStart(2, "0")}
                </span>
              </div>
              <span className="block text-xs text-gray-600 dark:text-gray-400 mt-1 text-center font-medium">
                {t("seconds")}
              </span>
            </div>
          </div>
        </div>

        <div className="flash-deals-carousel">
          {loading ? (
            <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {[...Array(4)].map((_, i) => (
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
              }}>
              {flashDeals.map((item, i) => (
                <SwiperSlide key={i} className="py-2">
                  <DummyProductCard {...item} variant={cardVariant} />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>

        {/* Button */}
        <Link href="/products" className="flex justify-center mt-3">
          <button className="px-10 py-2 border border-gray-400 rounded-xl text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition">
            {t("viewAll")}
          </button>
        </Link>
      </div>
    </section>
  );
};

export default FlashDeals;
