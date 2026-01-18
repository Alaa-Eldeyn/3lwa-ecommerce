"use client";

import { useLocale } from "next-intl";
import { MapPin, FileText, Phone, Mail } from "lucide-react";
import { OrderStatusData } from "../types";

interface ShippingDetailsProps {
  shippingAddress: OrderStatusData["shippingAddress"];
  billingAddress: OrderStatusData["billingAddress"];
}

const ShippingDetails = ({
  shippingAddress,
  billingAddress,
}: ShippingDetailsProps) => {
  const locale = useLocale();
  const isArabic = locale === "ar";

  return (
    <section className="py-12 bg-white dark:bg-gray-950">
      <div className="max-w-[1440px] mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Shipping Address */}
          <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 rounded-2xl shadow-lg p-8 border-2 border-gray-100 dark:border-gray-700">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mr-4">
                <MapPin className="text-white text-xl" />
              </div>
              <h2 className="text-2xl font-bold text-foreground dark:text-white">
                {isArabic ? "عنوان الشحن" : "Shipping Address"}
              </h2>
            </div>
            <div className="space-y-3 ml-16">
              <p className="text-lg font-semibold text-foreground dark:text-white">
                {shippingAddress.name}
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                {shippingAddress.addressLine1}
              </p>
              {shippingAddress.addressLine2 && (
                <p className="text-gray-600 dark:text-gray-400">
                  {shippingAddress.addressLine2}
                </p>
              )}
              <p className="text-gray-600 dark:text-gray-400">
                {shippingAddress.city}, {shippingAddress.state} {shippingAddress.zipCode}
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                {shippingAddress.country}
              </p>
              <div className="flex items-center mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <Phone className="text-primary mr-3" size={18} />
                <p className="text-gray-700 dark:text-gray-300 font-medium">
                  {shippingAddress.phone}
                </p>
              </div>
              <div className="flex items-center">
                <Mail className="text-primary mr-3" size={18} />
                <p className="text-gray-700 dark:text-gray-300 font-medium">
                  {shippingAddress.email}
                </p>
              </div>
            </div>
          </div>

          {/* Billing Address */}
          <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 rounded-2xl shadow-lg p-8 border-2 border-gray-100 dark:border-gray-700">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center mr-4">
                <FileText className="text-white text-xl" />
              </div>
              <h2 className="text-2xl font-bold text-foreground dark:text-white">
                {isArabic ? "عنوان الفوترة" : "Billing Address"}
              </h2>
            </div>
            <div className="space-y-3 ml-16">
              <p className="text-lg font-semibold text-foreground dark:text-white">
                {billingAddress.name}
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                {billingAddress.addressLine1}
              </p>
              {billingAddress.addressLine2 && (
                <p className="text-gray-600 dark:text-gray-400">
                  {billingAddress.addressLine2}
                </p>
              )}
              <p className="text-gray-600 dark:text-gray-400">
                {billingAddress.city}, {billingAddress.state} {billingAddress.zipCode}
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                {billingAddress.country}
              </p>
              <div className="flex items-center mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <Phone className="text-secondary mr-3" size={18} />
                <p className="text-gray-700 dark:text-gray-300 font-medium">
                  {billingAddress.phone}
                </p>
              </div>
              <div className="flex items-center">
                <Mail className="text-secondary mr-3" size={18} />
                <p className="text-gray-700 dark:text-gray-300 font-medium">
                  {billingAddress.email}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShippingDetails;
