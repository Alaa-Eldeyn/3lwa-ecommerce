import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const HeroCards = () => {
  const cards = [
    {
      id: 1,
      image: '/images/hero/b.jpg',
      title: 'عروض ليبيك من 10 جنيه',
      items: [
        { name: 'حتى 499 جنيه', image: '/images/products/Frame44.png' },
        { name: 'حتى 199 جنيه', image: '/images/products/Frame43.png' },
        { name: 'من 999 جنيه', image: '/images/products/Frame41.png' },
        { name: 'من 500 جنيه', image: '/images/products/Frame40.png' },
      ],
      link: '/products',
      linkText: 'تسوق المزيد',
    },
    {
      id: 2,
      image: '/images/hero/bu.jpg',
      title: 'ركن العروض و التوفير',
      description: 'وفر أكثر النهاردة قبل بكرة',
      subtitle: 'اشتري دلوقتى',
      categories: [
        { name: 'الموضة', discount: 'حتى 50 اكثر' },
        { name: 'الكترونيات', discount: 'حتى 25 اكثر' },
        { name: 'سوبرماركت', discount: 'حتى 10 اكثر' },
      ],
      link: '/products?sale=true',
      linkText: 'اكتشف عروض أكثر',
    },
    {
      id: 3,
      image: '/images/hero/bue.jpg',
      title: 'عــــروض فــــلاش',
      link: '/flash-deals',
      linkText: 'اكتشف العروض',
    },
    {
      id: 4,
      image: '/images/hero/bue2.jpg',
      title: 'اشتري دلوقتي و ادفع بعدين',
      link: '/installment',
      linkText: 'تعرف على خطط التقسيط',
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