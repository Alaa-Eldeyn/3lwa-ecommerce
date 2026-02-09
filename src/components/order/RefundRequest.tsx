"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/src/i18n/routing";
import Image from "next/image";
import { customAxios } from "@/src/auth/customAxios";
import { ArrowLeft, ArrowRight, Loader2, Package, XCircle } from "lucide-react";
import { OrderData, OrderDetailItem } from "@/src/types/order-details.types";
import ShippingAddress from "@/src/components/checkout/components/ShippingAddress";
import type { Address } from "@/src/components/profile/components/AddressModal";
import toast from "react-hot-toast";

interface RefundRequestProps {
  orderId: string;
  orderDetailId: string | null;
}

export default function RefundRequest({ orderId, orderDetailId }: RefundRequestProps) {
  const locale = useLocale();
  const isArabic = locale === "ar";
  const t = useTranslations("refund");
  const tOrder = useTranslations("order");

  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [item, setItem] = useState<OrderDetailItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [requestedItemsCount, setRequestedItemsCount] = useState(1);
  const [reason, setReason] = useState<number | "">("");
  const [reasonDetails, setReasonDetails] = useState("");
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      if (!orderId || !orderDetailId) {
        setError("Missing order or item.");
        setIsLoading(false);
        return;
      }
      try {
        setIsLoading(true);
        setError(null);
        const response = await customAxios.get(`/customer/orders/${orderId}`);
        if (response.data?.success && response.data?.data) {
          const data = response.data.data as OrderData;
          setOrderData(data);
          if (!data.isWithinRefundPeriod) {
            setError(
              t("errors.notWithinRefundPeriod") || "Refund is not available for this order."
            );
            setIsLoading(false);
            return;
          }
          const found = data.items?.find((i) => i.orderDetailId === orderDetailId);
          if (!found) {
            setError("Item not found in this order.");
            setIsLoading(false);
            return;
          }
          setItem(found);
          setRequestedItemsCount(1);
        } else {
          setError(tOrder("error"));
        }
      } catch (err) {
        console.error("Failed to fetch order:", err);
        setError(tOrder("error"));
      } finally {
        setIsLoading(false);
      }
    };
    fetchOrder();
  }, [orderId, orderDetailId, tOrder, t]);

  const validate = (): boolean => {
    const err: Record<string, string> = {};
    if (requestedItemsCount < 1 || (item && requestedItemsCount > item.quantity)) {
      err.requestedItemsCount = t("errors.requestedCountRequired");
    }
    if (reason === "" || reason === undefined) err.reason = t("errors.reasonRequired");
    if (!reasonDetails.trim()) err.reasonDetails = t("errors.reasonDetailsRequired");
    setValidationErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!item || !orderDetailId || !selectedAddress) return;
    if (!validate()) return;

    setIsSubmitting(true);
    setValidationErrors({});
    try {
      await customAxios.post("/refunds/create", {
        orderDetailId,
        deliveryAddressId: selectedAddress.id,
        requestedItemsCount: Number(requestedItemsCount),
        reason: Number(reason),
        reasonDetails: reasonDetails.trim(),
      });
      toast.success(t("success"));
      window.location.href = `/${locale}/order/${orderId}`;
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.errors?.[0] ||
        "Failed to submit refund request.";
      setValidationErrors({ submit: msg });
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-lg text-gray-600 dark:text-gray-400">{tOrder("loading")}</p>
        </div>
      </div>
    );
  }

  if (error || !item) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <XCircle className="w-16 h-16 text-red-500 dark:text-red-400 mx-auto mb-4" />
          <p className="text-lg text-red-600 dark:text-red-400 mb-4">
            {error ?? "Item not found."}
          </p>
          <Link
            href={`/order/${orderId}`}
            className="inline-flex items-center gap-2 text-primary hover:opacity-80 font-medium">
            {isArabic ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
            {t("backToOrder")}
          </Link>
        </div>
      </div>
    );
  }

  const imageSrc = item.itemImage?.startsWith("http")
    ? item.itemImage
    : `${process.env.NEXT_PUBLIC_DOMAIN}/${item.itemImage}`;

  return (
    <main className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 py-2">
        <div className="container mx-auto flex items-center min-h-10 md:min-h-[44px]">
          <Link
            href={`/order/${orderId}`}
            className="flex items-center text-primary hover:opacity-80 transition-colors font-medium">
            {isArabic ? (
              <ArrowRight className="w-4 h-4 ms-2" />
            ) : (
              <ArrowLeft className="w-4 h-4 me-2" />
            )}
            {t("backToOrder")}
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-6 md:py-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{t("title")}</h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Product summary */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                {t("productInfo")}
              </h2>
              <div className="flex gap-4">
                <div className="w-24 h-24 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700 shrink-0 relative">
                  {item.itemImage ? (
                    <Image
                      src={imageSrc}
                      alt={item.itemName}
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Package className="w-10 h-10 text-gray-400 dark:text-gray-500" />
                    </div>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-2">
                    {item.itemName}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {t("quantity")}: {item.quantity}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {t("unitPrice")}: ${item.unitPrice.toFixed(2)}
                  </p>
                  <p className="font-semibold text-gray-900 dark:text-white mt-1">
                    {t("subTotal")}: ${item.subTotal.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  {t("requestedCountLabel")} <span className="text-red-500">*</span>
                </label>
                <select
                  value={requestedItemsCount}
                  onChange={(e) => {
                    setRequestedItemsCount(Number(e.target.value));
                    if (validationErrors.requestedItemsCount)
                      setValidationErrors((p) => ({ ...p, requestedItemsCount: "" }));
                  }}
                  disabled={isSubmitting}
                  className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary">
                  {Array.from({ length: item.quantity }, (_, i) => i + 1).map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
                {validationErrors.requestedItemsCount && (
                  <p className="text-sm text-red-600 dark:text-red-400 mt-1">
                    {validationErrors.requestedItemsCount}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  {t("reasonLabel")} <span className="text-red-500">*</span>
                </label>
                <select
                  value={reason === "" ? "" : String(reason)}
                  onChange={(e) => {
                    const v = e.target.value;
                    setReason(v === "" ? "" : Number(v));
                    if (validationErrors.reason) setValidationErrors((p) => ({ ...p, reason: "" }));
                  }}
                  disabled={isSubmitting}
                  className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary">
                  <option value="">{t("reasonPlaceholder")}</option>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 99].map((n) => (
                    <option key={n} value={n}>
                      {t(`reasonOptions.${n}`)}
                    </option>
                  ))}
                </select>
                {validationErrors.reason && (
                  <p className="text-sm text-red-600 dark:text-red-400 mt-1">
                    {validationErrors.reason}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  {t("reasonDetailsLabel")} <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={reasonDetails}
                  onChange={(e) => {
                    setReasonDetails(e.target.value);
                    if (validationErrors.reasonDetails)
                      setValidationErrors((p) => ({ ...p, reasonDetails: "" }));
                  }}
                  placeholder={t("reasonDetailsPlaceholder")}
                  disabled={isSubmitting}
                  rows={4}
                  className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                />
                {validationErrors.reasonDetails && (
                  <p className="text-sm text-red-600 dark:text-red-400 mt-1">
                    {validationErrors.reasonDetails}
                  </p>
                )}
              </div>
            </div>

            <ShippingAddress purpose="refund" onAddressChange={setSelectedAddress} />
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 sticky top-40">
              {validationErrors.submit && (
                <p className="text-sm text-red-600 dark:text-red-400 mb-4">
                  {validationErrors.submit}
                </p>
              )}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-4 bg-primary text-white rounded-xl font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    {t("submitting")}
                  </>
                ) : (
                  t("submit")
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}
