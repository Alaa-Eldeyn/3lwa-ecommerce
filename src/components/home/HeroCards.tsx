'use client';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useTranslations } from 'next-intl';

const HeroCards = () => {
  const t = useTranslations('home.heroCards');
  const cards = [

    {
      id: 2,
      image: '/images/Hero/bu.jpg',
      title: t('title2'),
      description: t('description2'),
      link: '/products?sale=true',
      linkText: t('link2'),
    },
    {
      id: 3,
      image: '/images/Hero/bue.jpg',
      title: t('title3'),
      link: '/flash-deals',
      linkText: t('link3'),
    },
    {
      id: 4,
      image: '/images/Hero/bue2.jpg',
      title: t('title4'),
      link: '/installment',
      linkText: t('link4'),
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-900">
    <div className="-translate-y-10 lg:-translate-y-20 container z-20 grid grid-cols-3 gap-2 lg:gap-4 px-4 md:px-6 pb-0">
      {cards.map((card) => (
        <div
          key={card.id}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col cursor-pointer"
        >
          <div className="p-0 lg:p-5 flex-1 flex flex-col">
            <h3 className="hidden lg:block text-lg sm:text-xl font-bold mb-4 text-gray-900 dark:text-white">
              {card.title}
            </h3>

          

            {/* Card Type 3 & 4: Single Large Image */}
           
              <div className="relative w-full aspect-3/4 lg:aspect-4/3 lg:mb-4 rounded-lg overflow-hidden flex-1">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover"
                />
              </div>
            

            {/* Link */}
            <Link
              href={card.link}
              className="hidden lg:block text-primary hover:text-secondary text-sm font-medium transition-colors mt-auto"
            >
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