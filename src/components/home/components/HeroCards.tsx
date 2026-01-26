"use client";
import Image from "next/image";
import { Link } from "@/src/i18n/routing";
import React from "react";
import { useTranslations } from "next-intl";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const HeroCards = () => {
  const t = useTranslations("home.heroCards");
  const cards = [
    {
      id: 23,
      image: "/images/Hero/bu.jpg",
      title: t("title2"),
      description: t("description2"),
      link: "/products?sale=true",
      linkText: t("link2"),
    },
    {
      id: 34,
      image: "/images/Hero/bue.jpg",
      title: t("title3"),
      link: "/flash-deals",
      linkText: t("link3"),
    },
    {
      id: 45,
      image: "/images/Hero/bue2.jpg",
      title: t("title4"),
      link: "/installment",
      linkText: t("link4"),
    },

    {
      id: 39,
      image: "/images/Hero/bue.jpg",
      title: t("title3"),
      link: "/flash-deals",
      linkText: t("link3"),
    },
    {
      id: 4,
      image: "/images/Hero/bue2.jpg",
      title: t("title4"),
      link: "/installment",
      linkText: t("link4"),
    },
    {
      id: 2,
      image: "/images/Hero/bu.jpg",
      title: t("title2"),
      description: t("description2"),
      link: "/products?sale=true",
      linkText: t("link2"),
    },
  ];

  return (
    <div className="">
      {/* Mobile Slider */}
      <div className="block lg:hidden px-4 md:px-6">
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={12}
          slidesPerView={3}
          breakpoints={{
            480: {
              slidesPerView: 4,
            },
          }}
          pagination={{ clickable: true }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          loop={true}
          className="hero-cards-swiper">
          {cards.map((card) => (
            <SwiperSlide key={card.id}>
              <div className="bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700 transition-all duration-300 overflow-hidden flex flex-col cursor-pointer transform hover:-translate-y-1">
                <div className="p-0 flex-1 flex flex-col">
                  <div className="relative w-full aspect-3/4 overflow-hidden flex-1">
                    <Image src={card.image} alt={card.title} fill className="object-cover" />
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Desktop Grid - 6 Cards */}
      <div className="hidden lg:grid grid-cols-3 gap-4 px-4 md:px-6">
        {cards.map((card) => (
          <div
            key={card.id}
            className="bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700 transition-all duration-300 overflow-hidden flex flex-col cursor-pointer transform hover:-translate-y-1">
            <div className="p-4 flex-1 flex flex-col">
              <h3 className="text-base font-bold mb-3 text-gray-900 dark:text-white line-clamp-2">
                {card.title}
              </h3>

              <div className="relative w-full aspect-4/3 mb-3 rounded overflow-hidden flex-1">
                <Image src={card.image} alt={card.title} fill className="object-cover" />
              </div>

              {/* Link */}
              <Link
                href={card.link}
                className="text-primary hover:text-secondary text-sm font-medium transition-colors mt-auto">
                {card.linkText}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroCards;
