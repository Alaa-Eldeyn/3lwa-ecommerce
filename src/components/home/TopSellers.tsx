"use client";
import { topSellers } from "@/src/data/data";
import ProductCard from "../common/ProductCard";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";

const TopSellers = () => {
  const [products, setProducts] = useState({
    items: topSellers,
    totalRecords: topSellers.length
  });
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/Item/best-sellers`);
        // console.log("Best Sellers Response:", response);
        if (response?.data?.data) {
          // setProducts(response?.data?.data);
        }
      } catch (error) {
        console.error("Error fetching items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  if (products?.totalRecords == 0) return null;

  return (
    <section className="py-10 lg:pb-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
      <div className="container mx-auto">
                <div className=" bg-gray-300 max-h-96 aspect-12/2 w-full center relative overflow-hidden rounded-xl">
                        <Image fill src="/images/banners/banner5.jpg" alt="top banner" className="object-cover w-full h-full" />
                    </div>

        {/* Title */}
        <h2 className="text-center text-4xl font-extrabold text-gray-900 dark:text-white my-6">
          TOP SELLERS
        </h2>

        {/* Products Grid */}
        {loading ? (
          <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 py-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 dark:bg-gray-700 aspect-square rounded-lg mb-3"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 py-2">
            {products?.items?.map((item: any, i: number) => (
              <ProductCard key={i} {...item} />
            ))}
          </div>
        )}

        {/* Button */}
        <Link href="/products" className="flex justify-center mt-5">
          <button className="px-10 py-3 border border-gray-400 rounded-full text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition">
            View All
          </button>
        </Link>

      </div>
    </section>
  );
};

export default TopSellers;