'use client';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useTranslations } from 'next-intl';

const HeroCards = () => {
  const t = useTranslations('home.heroCards');
  const cards = [
    {
      id: 1,
      image: '/images/Hero/b.jpg',
      title: t('title1'),
      items: [
        { name: t('item1'), image: '/images/products/Frame44.png' },
        { name: t('item2'), image: '/images/products/Frame43.png' },
        { name: t('item3'), image: '/images/products/Frame41.png' },
        { name: t('item4'), image: '/images/products/Frame40.png' },
      ],
      link: '/products',
      linkText: t('link1'),
    },
    {
      id: 2,
      image: '/images/Hero/bu.jpg',
      title: t('title2'),
      description: t('description2'),
      subtitle: t('subtitle2'),
      categories: [
        { name: t('category1'), discount: t('discount1') },
        { name: t('category2'), discount: t('discount2') },
        { name: t('category3'), discount: t('discount3') },
      ],
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
    <div className="lg:-translate-y-12 z-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4 md:px-6 my-6 lg:mb-0">
      {cards.map((card) => (
        <div
          key={card.id}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col cursor-pointer"
        >
          <div className="p-4 sm:p-5 flex-1 flex flex-col">
            <h3 className="text-lg sm:text-xl font-bold mb-4 text-gray-900 dark:text-white">
              {card.title}
            </h3>

            {/* Card Type 1: Grid Items */}
            {card.items && (
              <div className="grid grid-cols-2 gap-3 mb-4 flex-1">
                {card.items.map((item, idx) => (
                  <div key={idx} className="text-center">
                    <div className="relative w-full aspect-square mb-2 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                      {item.name}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Card Type 2: Categories with Discounts */}
            {card.categories && (
              <>
                <div className="relative w-full aspect-[4/3] mb-4 rounded-lg overflow-hidden">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-cover"
                  />
                </div>
                {card.description && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    {card.description}
                  </p>
                )}
                {card.subtitle && (
                  <p className="text-sm font-semibold text-primary dark:text-blue-400 mb-3">
                    {card.subtitle}
                  </p>
                )}
                <div className="flex gap-2 mb-4 flex-wrap">
                  {card.categories.map((cat, idx) => (
                    <div
                      key={idx}
                      className="bg-primary text-white px-3 py-2 rounded text-xs sm:text-sm font-medium"
                    >
                      <div>{cat.name}</div>
                      <div className="text-xs">{cat.discount}</div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Card Type 3 & 4: Single Large Image */}
            {!card.items && !card.categories && (
              <div className="relative w-full aspect-[4/3] mb-4 rounded-lg overflow-hidden flex-1">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            {/* Link */}
            <Link
              href={card.link}
              className="text-primary hover:text-secondary text-sm font-medium transition-colors mt-auto"
            >
              {card.linkText}
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HeroCards;