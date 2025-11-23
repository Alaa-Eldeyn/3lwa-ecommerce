"use client"

import Image from "next/image"
import Link from "next/link"
import { useTranslations } from "next-intl"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"
import "./carousel.css"

// Categories data with images
const categories = [
  {
    id: 1,
    nameKey: "lighting",
    image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=400&q=80",
    path: "/products?cat=lighting"
  },
  {
    id: 2,
    nameKey: "bedding",
    image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400&q=80",
    path: "/products?cat=bedding"
  },
  {
    id: 3,
    nameKey: "home_decor",
    image: "https://images.unsplash.com/photo-1615529328331-f8917597711f?w=400&q=80",
    path: "/products?cat=home-decor"
  },
  {
    id: 4,
    nameKey: "appliances",
    image: "https://images.unsplash.com/photo-1585659722983-3a675dabf23d?w=400&q=80",
    path: "/products?cat=appliances"
  },
  {
    id: 5,
    nameKey: "tableware",
    image: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=400&q=80",
    path: "/products?cat=tableware"
  },
  {
    id: 6,
    nameKey: "storage",
    image: "https://images.unsplash.com/photo-1600096194534-95cf5ece04cf?w=400&q=80",
    path: "/products?cat=storage"
  },
  {
    id: 7,
    nameKey: "furniture",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80",
    path: "/products?cat=furniture"
  },
  {
    id: 8,
    nameKey: "outdoor",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=400&q=80",
    path: "/products?cat=outdoor"
  },
  {
    id: 9,
    nameKey: "more",
    image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&q=80",
    path: "/products"
  },
  {
    id: 10,
    nameKey: "brands_category",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&q=80",
    path: "/brands"
  }
]

const CategoriesCarousel = () => {
  const t = useTranslations("categories")

  return (
    <section className="py-8 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="relative px-12">
          <Swiper
            modules={[Navigation]}
            spaceBetween={24}
            slidesPerView={2}
            navigation={{
              prevEl: '.categories-swiper-button-prev',
              nextEl: '.categories-swiper-button-next',
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
            className="categories-swiper"
          >
          {categories.map((category) => (
            <SwiperSlide key={category.id}>
              <Link
                href={category.path}
                className="group block"
              >
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
          <svg className="w-6 h-6 text-gray-700 dark:text-gray-300 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
        
        <button className="categories-swiper-button-prev absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white dark:bg-gray-800 shadow-lg rounded-full flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-all hover:scale-110">
         <svg className="w-6 h-6 text-gray-700 dark:text-gray-300 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg> 
        </button>
      </div>
      </div>
    </section>
  )
}

export default CategoriesCarousel
