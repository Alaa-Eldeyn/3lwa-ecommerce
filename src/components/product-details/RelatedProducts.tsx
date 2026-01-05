"use client";

import ProductCard from "../common/ProductCard";
import { newArrivals } from "@/src/data/data";
import { useTranslations } from "next-intl";

const RelatedProducts = () => {
  const t = useTranslations("productDetails");

  return (
    <div className="border-b border-gray-200 dark:border-gray-700 py-8">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
        {t("youMightAlsoLike", { default: "YOU MIGHT ALSO LIKE" })}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {newArrivals.slice(0, 4).map((product, index) => (
          <ProductCard key={index} {...product} />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
