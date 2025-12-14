"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "./carousel.css";

// Categories data with images
const categories = [
  {
    id: 1,
    nameKey: "lighting",
    image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=400&q=80",
    path: "/products?cat=lighting",
  },
  {
    id: 2,
    nameKey: "bedding",
    image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400&q=80",
    path: "/products?cat=bedding",
  },
  {
    id: 3,
    nameKey: "home_decor",
    image: "https://images.unsplash.com/photo-1615529328331-f8917597711f?w=400&q=80",
    path: "/products?cat=home-decor",
  },
  {
    id: 4,
    nameKey: "appliances",
    image: "https://images.unsplash.com/photo-1585659722983-3a675dabf23d?w=400&q=80",
    path: "/products?cat=appliances",
  },
  {
    id: 5,
    nameKey: "tableware",
    image: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=400&q=80",
    path: "/products?cat=tableware",
  },
  {
    id: 6,
    nameKey: "storage",
    image: "https://images.unsplash.com/photo-1600096194534-95cf5ece04cf?w=400&q=80",
    path: "/products?cat=storage",
  },
  {
    id: 7,
    nameKey: "furniture",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80",
    path: "/products?cat=furniture",
  },
  {
    id: 8,
    nameKey: "outdoor",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=400&q=80",
    path: "/products?cat=outdoor",
  },
  {
    id: 9,
    nameKey: "more",
    image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&q=80",
    path: "/products",
  },
  {
    id: 10,
    nameKey: "brands_category",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&q=80",
    path: "/brands",
  },
];

interface CategoriesCarouselProps {
  variant?: "rounded" | "gradient" | "card";
}

const CategoriesCarousel = ({ variant = "gradient" }: CategoriesCarouselProps) => {
  const t = useTranslations("categories");

  // Circular variant
  if (variant === "rounded") {
    return (
      <section className="pb-3 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="relative px-12">
            <Swiper
              modules={[Navigation]}
              spaceBetween={24}
              slidesPerView={2}
              navigation={{
                prevEl: ".categories-swiper-button-prev",
                nextEl: ".categories-swiper-button-next",
              }}
              breakpoints={{
                480: {
                  slidesPerView: 4,
                  spaceBetween: 24,
                },
                768: {
                  slidesPerView: 5,
                  spaceBetween: 28,
                },
                1024: {
                  slidesPerView: 8,
                  spaceBetween: 28,
                },
                1280: {
                  slidesPerView: 10,
                  spaceBetween: 32,
                },
              }}
              className="categories-swiper">
              {categories.map((category) => (
                <SwiperSlide key={category.id}>
                  <Link href={category.path} className="group block">
                    <div className="flex flex-col items-center gap-2">
                      {/* Image Container */}
                      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center overflow-hidden transition-transform group-hover:scale-105">
                        <div className="relative w-full h-full">
                          <Image
                            src={category.image}
                            alt={t(category.nameKey)}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>

                      {/* Category Name */}
                      <span className="text-xs sm:text-sm text-center text-gray-800 dark:text-gray-200 font-medium group-hover:text-primary transition-colors line-clamp-2">
                        {t(category.nameKey)}
                      </span>
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Custom Navigation Buttons */}
            <button className="categories-swiper-button-next absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white dark:bg-gray-800 shadow-lg rounded-full flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-all hover:scale-110">
              <svg
                className="w-5 h-5 text-gray-700 dark:text-gray-300 rtl:rotate-180"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

            <button className="categories-swiper-button-prev absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white dark:bg-gray-800 shadow-lg rounded-full flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-all hover:scale-110">
              <svg
                className="w-5 h-5 text-gray-700 dark:text-gray-300 rtl:rotate-180"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
          </div>
        </div>
      </section>
    );
  }

  // Card variant
  if (variant === "card") {
    return (
      <section className="pb-6 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="relative lg:px-10">
            <Swiper
              modules={[Navigation]}
              spaceBetween={10}
              slidesPerView={3}
              navigation={{
                prevEl: ".categories-clean-swiper-button-prev",
                nextEl: ".categories-clean-swiper-button-next",
              }}
              breakpoints={{
                480: {
                  slidesPerView: 3,
                  spaceBetween: 10,
                },
                768: {
                  slidesPerView: 4,
                  spaceBetween: 20,
                },
                1024: {
                  slidesPerView: 6,
                  spaceBetween: 20,
                },
                1280: {
                  slidesPerView: 7,
                  spaceBetween: 20,
                },
              }}
              className="categories-clean-swiper">
              {categories.map((category) => (
                <SwiperSlide key={category.id}>
                  <Link href={category.path} className="group block">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden transition-all duration-300 border-2 border-gray-200 dark:border-gray-700 hover:border-primary dark:hover:border-primary">
                      {/* Image Container */}
                      <div className="relative w-full aspect-5/3 overflow-hidden bg-gray-100 dark:bg-gray-700">
                        <Image
                          src={category.image}
                          alt={t(category.nameKey)}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>

                      {/* Category Name Below Image */}
                      <div className="p-2 text-center">
                        <h3 className="text-gray-900 dark:text-white font-semibold text-[10px] sm:text-sm group-hover:text-primary transition-colors line-clamp-2">
                          {t(category.nameKey)}
                        </h3>
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Custom Navigation Buttons */}
            <button className="categories-clean-swiper-button-next hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white dark:bg-gray-800 shadow-lg rounded-full items-center justify-center hover:bg-primary dark:hover:bg-primary hover:text-white transition-all hover:scale-110">
              <svg
                className="w-5 h-5 rtl:rotate-180"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

            <button className="categories-clean-swiper-button-prev hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white dark:bg-gray-800 shadow-lg rounded-full items-center justify-center hover:bg-primary dark:hover:bg-primary hover:text-white transition-all hover:scale-110">
              <svg
                className="w-5 h-5 rtl:rotate-180"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
          </div>
        </div>
      </section>
    );
  }

  // Gradient variant
  if (variant === "gradient") {
    return (
      <section className="py-3 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="relative px-12">
            <Swiper
              modules={[Navigation]}
              spaceBetween={16}
              slidesPerView={2}
              navigation={{
                prevEl: ".categories-card-swiper-button-prev",
                nextEl: ".categories-card-swiper-button-next",
              }}
              breakpoints={{
                480: {
                  slidesPerView: 3,
                  spaceBetween: 16,
                },
                768: {
                  slidesPerView: 4,
                  spaceBetween: 20,
                },
                1024: {
                  slidesPerView: 6,
                  spaceBetween: 20,
                },
                1280: {
                  slidesPerView: 7,
                  spaceBetween: 20,
                },
              }}
              className="categories-card-swiper">
              {categories.map((category) => (
                <SwiperSlide key={category.id}>
                  <Link href={category.path} className="group block">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden transition-all duration-300 border border-gray-100 dark:border-gray-700">
                      {/* Image Container */}
                      <div className="relative w-full aspect-4/3 overflow-hidden">
                        <Image
                          src={category.image}
                          alt={t(category.nameKey)}
                          fill
                          className="object-cover"
                        />
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />

                        {/* Category Name on Image */}
                        <div className="absolute bottom-0 left-0 right-0 py-4 px-2">
                          <h3 className="text-white font-bold text-base sm:text-lg drop-shadow-lg text-center group-hover:-translate-y-1 transition-all duration-300">
                            {t(category.nameKey)}
                          </h3>
                        </div>
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Custom Navigation Buttons */}
            <button className="categories-card-swiper-button-next absolute left-0 top-1/2 -translate-y-1/2 z-10 p-1 w-5 h-5 sm:w-8 sm:h-8 lg:w-12 lg:h-12 bg-white dark:bg-gray-800 shadow-lg rounded-full flex items-center justify-center hover:bg-primary dark:hover:bg-primary hover:text-white transition-all hover:scale-110">
              <svg
                className="w-5 h-5 rtl:rotate-180"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

            <button className="categories-card-swiper-button-prev absolute right-0 top-1/2 -translate-y-1/2 z-10 p-1 w-5 h-5 sm:w-8 sm:h-8 lg:w-12 lg:h-12 bg-white dark:bg-gray-800 shadow-lg rounded-full flex items-center justify-center hover:bg-primary dark:hover:bg-primary hover:text-white transition-all hover:scale-110">
              <svg
                className="w-5 h-5 rtl:rotate-180"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
          </div>
        </div>
      </section>
    );
  }

  return null;
};

export default CategoriesCarousel;
