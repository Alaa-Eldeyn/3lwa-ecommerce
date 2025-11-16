"use client";
import { topSellers } from "@/src/data/data";
import ProductCard from "../common/ProductCard";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

const TopSellers = () => {
    const [products, setProducts] = useState(topSellers);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);
        const response = await axios.get("");
        if (response?.data?.data) {
          setProducts(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);
  return (
    <section className="py-10 lg:py-16 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
      <div className="container mx-auto">

        {/* Title */}
        <h2 className="text-center text-4xl font-extrabold text-gray-900 dark:text-white mb-8 lg:mb-12">
          TOP SELLERS
        </h2>

        {/* Products Grid */}
        <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 py-2">
          {products.map((item, i) => (
            <ProductCard key={i} {...item} />
          ))}
        </div>

        {/* Button */}
        <Link href="/products" className="flex justify-center mt-8 lg:mt-12">
          <button className="px-10 py-3 border border-gray-400 rounded-full text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition">
            View All
          </button>
        </Link>

      </div>
    </section>
  );
};

export default TopSellers;