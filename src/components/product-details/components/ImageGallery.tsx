"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface ImageGalleryProps {
  images: string[];
  productTitle: string;
}

const ImageGallery = ({ images, productTitle }: ImageGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
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
      <div className="flex flex-col-reverse lg:flex-row gap-4">
        {/* Thumbnails */}
        <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-y-auto">
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`w-20 h-20 lg:w-24 lg:h-24 shrink-0 rounded-2xl overflow-hidden border-2 soft ${
                selectedImage === index
                  ? "border-primary dark:border-white"
                  : "border-gray-200 dark:border-gray-700"
              }`}
            >
              <Image
                src={`${process.env.NEXT_PUBLIC_DOMAIN}/${img}`}
                alt={`${productTitle} ${index + 1}`}
                width={100}
                height={100}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>

        {/* Main Image */}
        <div
          onClick={openFullScreen}
          className="flex-1 relative aspect-square bg-[#F0EEED] dark:bg-gray-800 rounded-3xl overflow-hidden cursor-zoom-in group"
        >
          <Image
            src={`${process.env.NEXT_PUBLIC_DOMAIN}/${images[selectedImage]}`}
            alt={productTitle}
            fill
            className="object-cover group-hover:scale-105 soft"
            priority
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 soft center">
            <span className="opacity-0 group-hover:opacity-100 soft bg-white/90 dark:bg-gray-800/90 px-4 py-2 rounded-full text-sm font-medium text-gray-900 dark:text-white">
              Click to view full size
            </span>
          </div>
        </div>
      </div>

      {/* Fullscreen Modal */}
      {isFullScreen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
          {/* Close Button */}
          <button
            onClick={closeFullScreen}
            className="absolute top-4 right-4 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full center soft text-white z-10"
          >
            <X size={24} />
          </button>

          {/* Image Counter */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-white/10 px-4 py-2 rounded-full text-white text-sm font-medium">
            {selectedImage + 1} / {images.length}
          </div>

          {/* Previous Button */}
          <button
            onClick={handlePrevious}
            className="absolute left-4 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full center soft text-white"
          >
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
            className="absolute right-4 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full center soft text-white"
          >
            <ChevronRight size={24} />
          </button>

          {/* Thumbnails Navigation */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 overflow-x-auto max-w-[90vw] px-4">
            {images.map((img, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`w-16 h-16 shrink-0 rounded-lg overflow-hidden border-2 soft ${
                  selectedImage === index
                    ? "border-white"
                    : "border-white/30"
                }`}
              >
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
