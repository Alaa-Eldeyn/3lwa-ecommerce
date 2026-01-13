"use client";
import { CreditCard, Wallet, Banknote } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import { customAxios } from "@/src/utils/customAxios";

type PaymentMethodType = {
  id: string;
  titleEn: string;
  titleAr: string;
  methodType: number;
  isActive: boolean;
  providerDetails: string;
};

interface PaymentMethodProps {
  selectedMethod: string | null;
  onChange: (methodId: string) => void;
}

const PaymentMethod = ({ selectedMethod, onChange }: PaymentMethodProps) => {
  const locale = useLocale();
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethodType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPaymentMethods = async () => {
      try {
        setLoading(true);
        const response = await customAxios.get<{
          success: boolean;
          statusCode: number;
          data: PaymentMethodType[];
          message: string;
          errorCode: null;
          errors: any[];
        }>("/PaymentMethod");

        if (response.data.success && response.data.data) {
          const activeMethods = response.data.data.filter((method) => method.isActive);
          setPaymentMethods(activeMethods);
          // Auto-select first method if none selected
          if (!selectedMethod && activeMethods.length > 0) {
            onChange(activeMethods[0].id);
          }
        }
      } catch (error) {
        console.error("Error fetching payment methods:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentMethods();
  }, []);

  const getMethodIcon = (methodType: number) => {
    switch (methodType) {
      case 1: // Card
        return <CreditCard size={24} className="text-primary" />;
      case 2: // Bank Transfer
        return <Banknote size={24} className="text-blue-600 dark:text-blue-400" />;
      case 3: // Digital Wallet (PayPal, STC Pay, Apple Pay)
        return <Wallet size={24} className="text-purple-600 dark:text-purple-400" />;
      case 4: // Cash on Delivery
        return <Banknote size={24} className="text-green-600 dark:text-green-400" />;
      case 5: // BNPL (Tabby, Tamara)
        return <CreditCard size={24} className="text-orange-600 dark:text-orange-400" />;
      default:
        return <CreditCard size={24} className="text-primary" />;
    }
  };

  const getMethodColor = (methodType: number) => {
    switch (methodType) {
      case 1:
        return "bg-primary/10";
      case 2:
        return "bg-blue-100 dark:bg-blue-900/30";
      case 3:
        return "bg-purple-100 dark:bg-purple-900/30";
      case 4:
        return "bg-green-100 dark:bg-green-900/30";
      case 5:
        return "bg-orange-100 dark:bg-orange-900/30";
      default:
        return "bg-primary/10";
    }
  };

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <CreditCard size={24} className="text-primary" />
          Payment Method
        </h2>
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">Loading...</div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
        <CreditCard size={24} className="text-primary" />
        Payment Method
      </h2>

      <div className="space-y-3">
        {paymentMethods.map((method) => {
          const title = locale === "ar" ? method.titleAr : method.titleEn;
          const isSelected = selectedMethod === method.id;

          return (
            <label
              key={method.id}
              className={`flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer transition-all ${
                isSelected
                  ? "border-primary bg-primary/5"
                  : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
              }`}>
              <input
                type="radio"
                name="payment"
                value={method.id}
                checked={isSelected}
                onChange={() => onChange(method.id)}
                className="w-5 h-5 text-primary focus:ring-primary"
              />
              <div className="flex items-center gap-3 flex-1">
                <div
                  className={`w-12 h-12 rounded-full ${getMethodColor(method.methodType)} flex items-center justify-center`}>
                  {getMethodIcon(method.methodType)}
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">{title}</p>
                  {method.providerDetails && (
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {(() => {
                        try {
                          const details = JSON.parse(method.providerDetails);
                          if (details.provider) return details.provider;
                          if (details.type) return details.type;
                          if (details.network) return details.network;
                          return "";
                        } catch {
                          return "";
                        }
                      })()}
                    </p>
                  )}
                </div>
              </div>
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default PaymentMethod;
