"use client";

import { useLocale } from "next-intl";
import { CheckCircle2 } from "lucide-react";

const SuccessHero = () => {
  const locale = useLocale();
  const isArabic = locale === "ar";

  return (
    <section className="bg-gradient-to-b from-accent to-white dark:from-accent/20 dark:to-gray-950 py-16">
      <div className="max-w-[1440px] mx-auto px-8">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-32 h-32 bg-primary rounded-full mb-6 shadow-2xl">
            <CheckCircle2 className="text-white w-16 h-16" />
          </div>
          <h1 className="text-5xl font-bold text-foreground dark:text-white mb-4">
            {isArabic ? "تم إتمام الطلب بنجاح!" : "Order Placed Successfully!"}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-2">
            {isArabic ? "شكراً لتسوقك مع باسط" : "Thank you for shopping with Basit"}
          </p>
          <p className="text-lg text-gray-500 dark:text-gray-500">
            {isArabic
              ? "تم استلام طلبك وهو قيد المعالجة"
              : "Your order has been received and is being processed"}
          </p>
        </div>
      </div>
    </section>
  );
};

export default SuccessHero;
