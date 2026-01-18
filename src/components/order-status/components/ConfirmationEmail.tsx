"use client";

import { useLocale } from "next-intl";
import { Mail, Headphones, Bell, HeadsetIcon } from "lucide-react";

interface ConfirmationEmailProps {
  email: string;
}

const ConfirmationEmail = ({ email }: ConfirmationEmailProps) => {
  const locale = useLocale();
  const isArabic = locale === "ar";

  return (
    <section className="py-12 bg-white dark:bg-gray-950">
      <div className="max-w-[1440px] mx-auto px-8">
        <div className="bg-gradient-to-br from-primary to-headerSecondary rounded-2xl shadow-2xl p-12 text-white">
          <div className="flex items-start justify-between flex-col md:flex-row gap-8">
            <div className="flex-1">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-4">
                  <Mail className="text-white text-3xl" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold mb-2">
                    {isArabic ? "تم إرسال بريد التأكيد" : "Confirmation Email Sent"}
                  </h2>
                  <p className="text-lg opacity-90">
                    {isArabic
                      ? "تحقق من بريدك الوارد للحصول على تفاصيل الطلب"
                      : "Check your inbox for order details"}
                  </p>
                </div>
              </div>

              <div className="bg-white bg-opacity-10 rounded-xl p-6 mb-6">
                <p className="text-lg mb-4">
                  {isArabic
                    ? "لقد أرسلنا بريد تأكيد مفصل إلى:"
                    : "We've sent a detailed confirmation email to:"}
                </p>
                <p className="text-2xl font-bold mb-4">{email}</p>
                <p className="text-sm opacity-80">
                  {isArabic
                    ? "يحتوي البريد الإلكتروني على تفاصيل طلبك ومعلومات التتبع وتاريخ التسليم المتوقع."
                    : "The email contains your order details, tracking information, and estimated delivery date."}
                </p>
              </div>

              <div className="flex items-start space-x-4 flex-wrap gap-4">
                <div className="bg-white bg-opacity-10 rounded-xl p-4 flex-1 min-w-[200px]">
                  <Headphones className="text-2xl mb-2" />
                  <p className="text-sm font-semibold mb-1">
                    {isArabic ? "تنزيل تطبيقنا" : "Download Our App"}
                  </p>
                  <p className="text-xs opacity-80">
                    {isArabic ? "تتبع طلبك أثناء التنقل" : "Track your order on the go"}
                  </p>
                </div>
                <div className="bg-white bg-opacity-10 rounded-xl p-4 flex-1 min-w-[200px]">
                  <Bell className="text-2xl mb-2" />
                  <p className="text-sm font-semibold mb-1">
                    {isArabic ? "تفعيل الإشعارات" : "Enable Notifications"}
                  </p>
                  <p className="text-xs opacity-80">
                    {isArabic ? "احصل على تحديثات فورية" : "Get real-time updates"}
                  </p>
                </div>
                <div className="bg-white bg-opacity-10 rounded-xl p-4 flex-1 min-w-[200px]">
                  <HeadsetIcon className="text-2xl mb-2" />
                  <p className="text-sm font-semibold mb-1">
                    {isArabic ? "دعم على مدار الساعة" : "24/7 Support"}
                  </p>
                  <p className="text-xs opacity-80">
                    {isArabic ? "نحن هنا للمساعدة" : "We're here to help"}
                  </p>
                </div>
              </div>
            </div>

            <div className="ml-8">
              <div className="w-64 h-64 bg-white bg-opacity-10 rounded-2xl flex items-center justify-center">
                <Mail className="text-white text-6xl opacity-50" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConfirmationEmail;
