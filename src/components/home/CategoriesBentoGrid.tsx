import Image from "next/image";

const categories = [
  {
    name: "Casual",
    image: "/images/categories/image 11.png",
  },
  {
    name: "Formal",
    image: "/images/categories/image 13.png",
  },
  {
    name: "Party",
    image: "/images/categories/image 12.png",
  },
  {
    name: "Gym",
    image: "/images/categories/image 14.png",
  },
];

interface CategoriesBentoGridProps {
  variant?: "bento" | "row";
}

const CategoriesBentoGrid = ({ variant = "bento" }: CategoriesBentoGridProps) => {
  // Bento variant
  if (variant === "bento") {
    return (
      <section className="pt-16 bg-white dark:bg-gray-900">
        <div className="container">
          <div className="px-5 lg:px-10 py-10 bg-gray-100 dark:bg-gray-800 rounded-3xl">
            {/* Title */}
            <h2 className="text-center text-4xl tracking-wide font-extrabold text-gray-900 dark:text-white mb-10 uppercase">
              Browse by Dress Style
            </h2>

            {/* Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mx-auto">
              {/* Casual - Large */}
              <div className="relative bg-white dark:bg-gray-700 rounded-3xl overflow-hidden group cursor-pointer h-44 lg:h-72 transition-transform hover:scale-[1.02]">
                <div className="absolute top-8 left-8 z-10">
                  <h3 className="text-3xl font-bold text-gray-900 ">{categories[0].name}</h3>
                </div>
                <div className="relative w-full h-full">
                  <Image
                    src={categories[0].image}
                    alt={categories[0].name}
                    fill
                    className="object-cover object-top"
                  />
                </div>
              </div>

              {/* Formal - Small */}
              <div className="md:col-span-2 relative bg-white dark:bg-gray-700 rounded-3xl overflow-hidden group cursor-pointer h-44 lg:h-72 transition-transform hover:scale-[1.02]">
                <div className="absolute top-8 left-8 z-10">
                  <h3 className="text-3xl font-bold text-gray-900 ">{categories[1].name}</h3>
                </div>
                <div className="relative w-full h-full">
                  <Image
                    src={categories[1].image}
                    alt={categories[1].name}
                    fill
                    className="object-cover object-top"
                  />
                </div>
              </div>

              {/* Gym - Large */}
              <div className="md:col-span-2 relative bg-white dark:bg-gray-700 rounded-3xl overflow-hidden group cursor-pointer h-44 lg:h-72 transition-transform hover:scale-[1.02]">
                <div className="absolute top-8 left-8 z-10">
                  <h2 className="text-3xl font-bold text-gray-900 ">{categories[2].name}</h2>
                </div>
                <div className="relative w-full h-full">
                  <Image
                    src={categories[2].image}
                    alt={categories[3].name}
                    fill
                    className="object-cover object-top"
                  />
                </div>
              </div>

              {/* Party - Small */}
              <div className="relative bg-white dark:bg-gray-700 rounded-3xl overflow-hidden group cursor-pointer h-44 lg:h-72 transition-transform hover:scale-[1.02]">
                <div className="absolute top-8 left-8 z-10">
                  <h3 className="text-3xl font-bold text-gray-900 ">{categories[3].name}</h3>
                </div>
                <div className="relative w-full h-full">
                  <Image
                    src={categories[3].image}
                    alt={categories[3].name}
                    fill
                    className="object-cover object-top"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Row variant
  else if (variant === "row") {
    return (
      <section className="pt-16 bg-white dark:bg-gray-900">
        <div className="container">
          <div className="px-5 lg:px-10 py-10 bg-gray-100 dark:bg-gray-800 rounded-3xl">
            {/* Title */}
            <h2 className="text-center text-4xl tracking-wide font-extrabold text-gray-900 dark:text-white mb-10 uppercase">
              Browse by Dress Style
            </h2>

            {/* Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mx-auto">
              {/* Casual */}
              <div className="relative bg-white dark:bg-gray-700 rounded-3xl overflow-hidden group cursor-pointer h-44 lg:h-72 transition-transform hover:scale-[1.02]">
                <div className="absolute top-8 left-8 z-10">
                  <h3 className="text-3xl font-bold text-gray-900 ">{categories[0].name}</h3>
                </div>
                <div className="relative w-full h-full">
                  <Image
                    src={categories[0].image}
                    alt={categories[0].name}
                    fill
                    className="object-cover object-top"
                  />
                </div>
              </div>

              {/* Formal */}
              <div className="relative bg-white dark:bg-gray-700 rounded-3xl overflow-hidden group cursor-pointer h-44 lg:h-72 transition-transform hover:scale-[1.02]">
                <div className="absolute top-8 left-8 z-10">
                  <h3 className="text-3xl font-bold text-gray-900 ">{categories[1].name}</h3>
                </div>
                <div className="relative w-full h-full">
                  <Image
                    src={categories[1].image}
                    alt={categories[1].name}
                    fill
                    className="object-cover object-top"
                  />
                </div>
              </div>

              {/* Gym - Large */}
              <div className="relative bg-white dark:bg-gray-700 rounded-3xl overflow-hidden group cursor-pointer h-44 lg:h-72 transition-transform hover:scale-[1.02]">
                <div className="absolute top-8 left-8 z-10">
                  <h2 className="text-3xl font-bold text-gray-900 ">{categories[2].name}</h2>
                </div>
                <div className="relative w-full h-full">
                  <Image
                    src={categories[2].image}
                    alt={categories[3].name}
                    fill
                    className="object-cover object-top"
                  />
                </div>
              </div>

              {/* Party - Small */}
              <div className="relative bg-white dark:bg-gray-700 rounded-3xl overflow-hidden group cursor-pointer h-44 lg:h-72 transition-transform hover:scale-[1.02]">
                <div className="absolute top-8 left-8 z-10">
                  <h3 className="text-3xl font-bold text-gray-900 ">{categories[3].name}</h3>
                </div>
                <div className="relative w-full h-full">
                  <Image
                    src={categories[3].image}
                    alt={categories[3].name}
                    fill
                    className="object-cover object-top"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
};

export default CategoriesBentoGrid;
