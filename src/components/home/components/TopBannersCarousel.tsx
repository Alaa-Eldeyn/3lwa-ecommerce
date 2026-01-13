"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../sections/carousel.css";
import { useEffect, useState } from "react";
import axios from "axios";

interface TopBannersCarouselProps {
  variant?: "default" | "rounded";
}

const TopBannersCarousel = ({ variant = "default" }: TopBannersCarouselProps) => {
  const [banners, setBanners] = useState([
    "/images/banners/m-banner1.png",
    "/images/banners/m-banner2.png",
    "/images/banners/m-banner3.png",
  ]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/HomePageSlider/all`);
        if (response?.data?.data) {
          setBanners(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  // Default variant - Full width
  if (variant === "default") {
    return (
      <div className="w-full h-72 lg:h-[400px] banner-carousel !z-0">
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          spaceBetween={0}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          loop={true}
          className="h-full hide-nav-mobile">
          {banners.map((banner: any, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full h-full">
                <Image
                  fill
                  src={`${process.env.NEXT_PUBLIC_DOMAIN}/${banner?.imageUrl}`}
                  alt={`banner ${index + 1}`}
                  className="object-cover object-top"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    );
  }

  // Rounded variant
  else if (variant === "rounded") {
    return (
      <div className="w-full py-8 !z-0">
        <div className="container mx-auto px-4">
          <div className="relative">
            <Swiper
              modules={[Autoplay, Pagination, Navigation]}
              spaceBetween={24}
              slidesPerView={1}
              navigation={{
                prevEl: ".banner-rounded-swiper-button-prev",
                nextEl: ".banner-rounded-swiper-button-next",
              }}
              pagination={{ clickable: true }}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              loop={true}
              className="rounded-banner-carousel">
              {banners.map((banner, index) => (
                <SwiperSlide key={index}>
                  <div className="relative w-full aspect-9/2 rounded-3xl overflow-hidden shadow-xl">
                    <Image
                      fill
                      src={banner}
                      alt={`banner ${index + 1}`}
                      className="object-cover"
                      priority={index === 0}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Custom Navigation Buttons */}
            <button className="banner-rounded-swiper-button-next ml-4 absolute left-0 top-1/2 -translate-y-1/2 p-1 z-10 w-5 h-5 sm:w-8 sm:h-8 lg:w-12 lg:h-12 bg-white dark:bg-gray-800 shadow-xl rounded-full hidden md:flex items-center justify-center hover:bg-primary dark:hover:bg-primary hover:text-white transition-all hover:scale-110">
              <svg
                className="w-6 h-6 rtl:rotate-180"
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

            <button className="banner-rounded-swiper-button-prev mr-4 absolute right-0 top-1/2 -translate-y-1/2 p-1 z-10 w-5 h-5 sm:w-8 sm:h-8 lg:w-12 lg:h-12 bg-white dark:bg-gray-800 shadow-xl rounded-full hidden md:flex items-center justify-center hover:bg-primary dark:hover:bg-primary hover:text-white transition-all hover:scale-110">
              <svg
                className="w-6 h-6 rtl:rotate-180"
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
      </div>
    );
  }

  return null;
};

export default TopBannersCarousel;
