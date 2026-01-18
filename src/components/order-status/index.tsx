"use client";

import { useEffect, useState, useRef } from "react";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { customAxios } from "@/src/utils/customAxios";
import { OrderDetailItem } from "./types";
import { Check, ShoppingCart, User, Instagram, Twitter, Facebook } from "lucide-react";
import { Loader2 } from "lucide-react";

interface OrderStatusProps {
  id: string;
}

interface OrderItem {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  color?: string;
}

const OrderStatus = ({ id }: OrderStatusProps) => {
  const locale = useLocale();
  const router = useRouter();
  const cardRef = useRef<HTMLDivElement>(null);
  const [orderItems, setOrderItems] = useState<OrderDetailItem[]>([]);
  const [orderNumber, setOrderNumber] = useState<string>("");
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (!id) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);

        const response = await customAxios.get(`/Order/list-order-details/${id}`);

        if (response.data?.success && response.data?.data) {
          const items: OrderDetailItem[] = response.data.data;
          setOrderItems(items);

          // Calculate total
          const total = items.reduce((sum, item) => sum + item.subTotal, 0);
          setTotalAmount(total);

          // Generate order number from ID
          setOrderNumber(`ORD-${id.substring(0, 8).toUpperCase()}`);
        }
      } catch (err) {
        console.error("Failed to fetch order details:", err);
        setError("Failed to load order details");
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrderDetails();
  }, [id]);

  // Animation on load
  useEffect(() => {
    if (cardRef.current && !isLoading) {
      cardRef.current.classList.add("opacity-0", "translate-y-4");
      setTimeout(() => {
        if (cardRef.current) {
          cardRef.current.classList.remove("opacity-0", "translate-y-4");
          cardRef.current.classList.add("transition-all", "duration-700", "ease-out");
        }
      }, 100);
    }
  }, [isLoading]);

  // Helper to get image URL
  const getImageUrl = (imageUrl: string) => {
    if (!imageUrl) return "";
    if (imageUrl.startsWith("uploads/") || imageUrl.startsWith("uploads\\")) {
      return `${process.env.NEXT_PUBLIC_BASE_URL?.replace("/api/v1", "")}/${imageUrl.replace(
        /\\/g,
        "/"
      )}`;
    }
    return imageUrl;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-lg text-gray-600">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-red-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-primary text-white px-6 py-3 rounded-xl font-semibold hover:bg-primaryDark transition-colors">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="antialiased font-sans min-h-screen flex flex-col bg-gray-50 flex-grow items-center justify-center py-12 px-4">
      {/* Main Content */}
      <main
        ref={cardRef}
        className="bg-white w-full max-w-3xl rounded-xl shadow-sm border border-gray-100 p-8 md:p-12 text-center relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-secondary"></div>

        {/* Success Icon */}
        <div className="relative mb-8 flex justify-center">
          <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
              <Check className="w-8 h-8 text-green-600" />
            </div>
          </div>
        </div>

        {/* Heading & Message */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          Thank you for your purchase!
        </h1>
        <p className="text-gray-500 max-w-md mx-auto text-lg mb-4">
          We've received your order and it will ship soon.
        </p>

        {/* Order Number Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-full border border-gray-200 mb-10">
          <span className="text-gray-500 text-sm font-medium">Order Number:</span>
          <span className="text-primary font-bold tracking-wide">
            {orderNumber || "Loading..."}
          </span>
        </div>

        {/* Order Summary Section */}
        <div className="bg-gray-50/80 rounded-2xl p-6 md:p-8 max-w-xl mx-auto border border-gray-100 text-left">
          <h2 className="text-lg font-bold text-gray-800 mb-6 border-b border-gray-200 pb-4">
            Order Summary
          </h2>

          {/* Items List */}
          <div className="space-y-6">
            {orderItems.map((item) => (
              <div key={item.orderDetailId} className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-lg overflow-hidden border border-gray-200 bg-white flex-shrink-0 relative">
                  {item.itemImageUrl ? (
                    <Image
                      src={getImageUrl(item.itemImageUrl)}
                      alt={item.itemName}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100">
                      <ShoppingCart className="w-6 h-6 text-gray-400" />
                    </div>
                  )}
                </div>
                <div className="flex-grow">
                  <h3 className="font-semibold text-gray-800 text-sm md:text-base">
                    {item.itemName}
                  </h3>
                  <p className="text-gray-500 text-xs">
                    Qty: {item.quantity}
                    {item.vendorStoreName && ` | Seller: ${item.vendorStoreName}`}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-gray-500 text-xs">${item.unitPrice.toFixed(2)}</p>
                  <p className="font-bold text-gray-800">${item.subTotal.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Total Row */}
          <div className="mt-6 pt-6 border-t border-gray-200 flex justify-between items-end">
            <div>
              <p className="text-gray-500 text-sm">Total Amount</p>
              <p className="text-xs text-gray-400">Including Tax & Shipping</p>
            </div>
            <div className="text-2xl font-bold text-primary">${totalAmount.toFixed(2)}</div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href={`/${locale}`}
            className="inline-flex items-center justify-center px-8 py-3.5 border border-transparent text-base font-semibold rounded-xl text-white bg-primary hover:bg-primary/90 w-full sm:w-auto">
            Continue Shopping
          </Link>
          <Link
            href={``}
            className="inline-flex items-center justify-center px-8 py-3.5 border border-gray-200 text-base font-semibold rounded-xl text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-300 w-full sm:w-auto">
            View Order Details
          </Link>
        </div>
      </main>
    </div>
  );
};

export default OrderStatus;
