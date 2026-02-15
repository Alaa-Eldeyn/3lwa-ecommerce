"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Heart } from "lucide-react";
import { useWishlistStore } from "@/src/store/wishlistStore";
import { useUserStore } from "@/src/store/userStore";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";

interface ImageGalleryProps {
  images: string[];
  productTitle: string;
  discountPercentage?: number;
  itemCombinationId?: string;
}

const ImageGallery = ({ images, productTitle, discountPercentage, itemCombinationId }: ImageGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isWishlistLoading, setIsWishlistLoading] = useState(false);
  const { items: wishlistItems, addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlistStore();
  const { user } = useUserStore();
  const t = useTranslations("product");

  // Check if product is in wishlist
  const isFavorite = useMemo(() => {
    if (!itemCombinationId) return false;
    return isInWishlist(itemCombinationId);
  }, [wishlistItems, itemCombinationId, isInWishlist]);

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

  const toggleWishlist = async (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (!itemCombinationId) {
      console.error("itemCombinationId is required");
      return;
    }

    if (!user) {
      toast.error(t("pleaseLogin"));
      return;
    }

    setIsWishlistLoading(true);
    try {
      if (isFavorite) {
        await removeFromWishlist(itemCombinationId, true);
        toast.success(t("removedFromWishlist") || "Removed from wishlist");
      } else {
        await addToWishlist(itemCombinationId, true);
        toast.success(t("addedToWishlist") || "Added to wishlist");
      }
    } catch (error) {
      console.error("Failed to update wishlist:", error);
      toast.error(t("wishlistError") || "Failed to update wishlist");
    } finally {
      setIsWishlistLoading(false);
    }
  };

  return (
    <>
      <div className="sticky top-4">
        {/* Preload full-size images */}
        <div className="absolute left-0 top-0 w-full h-[500px] overflow-hidden invisible pointer-events-none contain-strict">
          {images.map((img, index) => (
            <div key={index} className="absolute inset-0">
              <Image
                src={`${process.env.NEXT_PUBLIC_DOMAIN}/${img}`}
                alt=""
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          ))}
        </div>

        {/* Main Image */}
        <div className="w-full h-[500px] bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden relative group mb-4 flex items-center justify-center">
          {discountPercentage && discountPercentage > 0 && (
            <span dir="ltr" className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full z-10">
              -{discountPercentage}% OFF
            </span>
          )}
          <div className="absolute top-4 right-4 z-10 space-y-2 transition-opacity duration-300">
            <button
              onClick={toggleWishlist}
              disabled={isWishlistLoading}
              className="w-12 h-12 bg-white dark:bg-gray-800 rounded-full shadow-md flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
              <Heart size={20} className={isFavorite ? "fill-red-500 text-red-500" : ""} />
            </button>
          </div>
          <Image
            src={`${process.env.NEXT_PUBLIC_DOMAIN}/${images[selectedImage]}`}
            alt={productTitle}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
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
