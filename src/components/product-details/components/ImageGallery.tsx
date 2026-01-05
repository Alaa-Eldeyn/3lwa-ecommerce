"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Heart, Share2 } from "lucide-react";

interface ImageGalleryProps {
  images: string[];
  productTitle: string;
  discountPercentage?: number;
}

const ImageGallery = ({ images, productTitle, discountPercentage }: ImageGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const handlePrevious = () => {
    setSelectedImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setSelectedImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const openFullScreen = () => {
    setIsFullScreen(true);
  };

  const closeFullScreen = () => {
    setIsFullScreen(false);
  };

  return (
    <>
      <div className="sticky top-4">
        {/* Main Image */}
        <div className="w-full h-[500px] bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden relative group mb-4 flex items-center justify-center">
          {discountPercentage && discountPercentage > 0 && (
            <span dir="ltr" className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full z-10">
              -{discountPercentage}% OFF
            </span>
          )}
          <div className="absolute top-4 right-4 z-10 space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className="w-10 h-10 bg-white dark:bg-gray-800 rounded-full shadow-md flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
              <Heart size={18} className={isFavorite ? "fill-red-500 text-red-500" : ""} />
            </button>
            <button className="w-10 h-10 bg-white dark:bg-gray-800 rounded-full shadow-md flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
              <Share2 size={18} />
            </button>
          </div>
          <Image
            src={`${process.env.NEXT_PUBLIC_DOMAIN}/${images[selectedImage]}`}
            alt={productTitle}
            fill
            className="object-contain p-8 transform group-hover:scale-105 transition-transform duration-500"
            priority
            onClick={openFullScreen}
          />
        </div>

        {/* Thumbnails */}
        <div className="flex gap-4 overflow-x-auto pb-2">
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden cursor-pointer p-1 bg-white dark:bg-gray-800 transition-colors ${
                selectedImage === index
                  ? "border-2 border-primary dark:border-primary"
                  : "border border-gray-200 dark:border-gray-700 hover:border-primary dark:hover:border-primary"
              }`}>
              <Image
                src={`${process.env.NEXT_PUBLIC_DOMAIN}/${img}`}
                alt={`${productTitle} ${index + 1}`}
                width={96}
                height={96}
                className="w-full h-full object-contain"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Fullscreen Modal */}
      {isFullScreen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
          {/* Close Button */}
          <button
            onClick={closeFullScreen}
            className="absolute top-4 right-4 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full center soft text-white z-10">
            <X size={24} />
          </button>

          {/* Image Counter */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-white/10 px-4 py-2 rounded-full text-white text-sm font-medium">
            {selectedImage + 1} / {images.length}
          </div>

          {/* Previous Button */}
          <button
            onClick={handlePrevious}
            className="absolute left-4 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full center soft text-white">
            <ChevronLeft size={24} />
          </button>

          {/* Main Image */}
          <div className="relative w-[70vw] h-[70vh] max-w-6xl">
            <Image
              src={`${process.env.NEXT_PUBLIC_DOMAIN}/${images[selectedImage]}`}
              alt={`${productTitle} ${selectedImage + 1}`}
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* Next Button */}
          <button
            onClick={handleNext}
            className="absolute right-4 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full center soft text-white">
            <ChevronRight size={24} />
          </button>

          {/* Thumbnails Navigation */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 overflow-x-auto max-w-[90vw] px-4">
            {images.map((img, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`w-16 h-16 shrink-0 rounded-lg overflow-hidden border-2 soft ${
                  selectedImage === index ? "border-white" : "border-white/30"
                }`}>
                <Image
                  src={`${process.env.NEXT_PUBLIC_DOMAIN}/${img}`}
                  alt={`Thumbnail ${index + 1}`}
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ImageGallery;
