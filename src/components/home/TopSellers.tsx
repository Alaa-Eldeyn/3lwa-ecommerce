import { topSellers } from "@/src/data/data";
import ProductCard from "../common/ProductCard";

const TopSellers = () => {
  return (
    <section className="pt-16 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
      <div className="container mx-auto">

        {/* Title */}
        <h2 className="text-center text-4xl font-extrabold text-gray-900 dark:text-white mb-12">
          TOP SELLERS
        </h2>

        {/* Products Grid */}
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {topSellers.map((item, i) => (
            <ProductCard key={i} {...item} />
          ))}
        </div>

        {/* Button */}
        <div className="flex justify-center mt-12">
          <button className="px-10 py-3 border border-gray-400 rounded-full text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition">
            View All
          </button>
        </div>

      </div>
    </section>
  );
};

export default TopSellers;