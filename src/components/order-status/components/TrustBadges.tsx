"use client";

import { useLocale } from "next-intl";
import { Shield, Truck, RotateCcw, HeadsetIcon } from "lucide-react";

const TrustBadges = () => {
  const locale = useLocale();
  const isArabic = locale === "ar";

  const badges = [
    {
      icon: Shield,
      title: isArabic ? "دفع آمن" : "Secure Payment",
      description: isArabic ? "معاملات آمنة 100%" : "100% secure transactions",
    },
    {
      icon: Truck,
      title: isArabic ? "شحن سريع" : "Fast Shipping",
      description: isArabic ? "التوصيل خلال 3-5 أيام" : "Delivery within 3-5 days",
    },
    {
      icon: RotateCcw,
      title: isArabic ? "إرجاع سهل" : "Easy Returns",
      description: isArabic ? "سياسة إرجاع 30 يومًا" : "30-day return policy",
    },
    {
      icon: HeadsetIcon,
      title: isArabic ? "دعم على مدار الساعة" : "24/7 Support",
      description: isArabic ? "نحن هنا دائماً للمساعدة" : "Always here to help",
    },
  ];

  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-950">
      <div className="max-w-[1440px] mx-auto px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {badges.map((badge, index) => {
            const IconComponent = badge.icon;
            return (
              <div
                key={index}
                className="bg-white dark:bg-gray-900 rounded-xl p-6 text-center shadow-md">
                <IconComponent className="text-5xl text-primary mx-auto mb-4" />
                <h3 className="font-bold text-foreground dark:text-white mb-2">
                  {badge.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {badge.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;
