import Image from "next/image";
import React from "react";

export default function TopSellersBanner() {
  return (
   <div className="py-5 bg-white dark:bg-gray-900 border-t border-gray-300 dark:border-gray-700">
        <div className="container mx-auto bg-gray-300 max-h-96 aspect-12/2 w-full center relative overflow-hidden rounded-xl">
          <Image
            fill
            src="/images/banners/banner5.jpg"
            alt="top banner"
            className="object-cover w-full h-full"
          />
        </div>
   </div>
  );
}
