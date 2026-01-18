"use client";

import { useLocale } from "next-intl";
import { Phone, MessageCircle, Mail } from "lucide-react";

const CustomerSupport = () => {
  const locale = useLocale();
  const isArabic = locale === "ar";

  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-950">
      <div className="max-w-[1440px] mx-auto px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground dark:text-white mb-4">
            {isArabic ? "تحتاج مساعدة في طلبك؟" : "Need Help With Your Order?"}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            {isArabic
              ? "فريق دعم العملاء لدينا هنا لمساعدتك"
              : "Our customer support team is here to assist you"}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow duration-200">
            <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
              <Phone className="text-white text-3xl" />
            </div>
            <h3 className="text-2xl font-bold text-foreground dark:text-white mb-3">
              {isArabic ? "اتصل بنا" : "Call Us"}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {isArabic
                ? "تحدث مباشرة مع فريق الدعم لدينا"
                : "Speak directly with our support team"}
            </p>
            <p className="text-2xl font-bold text-primary mb-2">1-800-BASIT-24</p>
            <p className="text-sm text-gray-500 dark:text-gray-500">
              {isArabic ? "متاح على مدار الساعة" : "Available 24/7"}
            </p>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow duration-200">
            <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6">
              <MessageCircle className="text-white text-3xl" />
            </div>
            <h3 className="text-2xl font-bold text-foreground dark:text-white mb-3">
              {isArabic ? "الدردشة المباشرة" : "Live Chat"}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {isArabic
                ? "تحدث مع وكلاء الدعم لدينا على الفور"
                : "Chat with our support agents instantly"}
            </p>
            <button className="bg-secondary text-white px-8 py-3 rounded-xl font-semibold hover:bg-primary transition-colors duration-200">
              {isArabic ? "بدء المحادثة" : "Start Chat"}
            </button>
            <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
              {isArabic
                ? "متوسط وقت الاستجابة: دقيقتان"
                : "Average response: 2 minutes"}
            </p>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow duration-200">
            <div className="w-20 h-20 bg-headerPrimary rounded-full flex items-center justify-center mx-auto mb-6">
              <Mail className="text-white text-3xl" />
            </div>
            <h3 className="text-2xl font-bold text-foreground dark:text-white mb-3">
              {isArabic ? "دعم البريد الإلكتروني" : "Email Support"}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {isArabic
                ? "أرسل لنا أسئلتك في أي وقت"
                : "Send us your questions anytime"}
            </p>
            <p className="text-xl font-bold text-headerPrimary mb-2">support@basit.com</p>
            <p className="text-sm text-gray-500 dark:text-gray-500">
              {isArabic ? "الرد خلال 24 ساعة" : "Response within 24 hours"}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomerSupport;
