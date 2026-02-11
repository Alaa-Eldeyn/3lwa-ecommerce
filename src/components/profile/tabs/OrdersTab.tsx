import { Package } from "lucide-react";
import { useEffect, useState } from "react";
import { customAxios } from "@/src/auth/customAxios";
import { useTranslations, useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { getOrderStatusInfo } from "@/src/utils/orderStatus";

// Order item summary type
interface OrderItemSummary {
  itemName: string;
  thumbnailImage: string;
  quantity: number;
}

// Order type from API
interface Order {
  orderId: string;
  orderNumber: string;
  orderDate: string;
  totalAmount: number;
  orderStatus: number;
  paymentStatus: number;
  shipmentStatus: number;
  totalItems: number;
  itemsSummary: OrderItemSummary[];
  canCancel: boolean;
  isWithinRefundPeriod: boolean;
}

const OrdersTab = () => {
  const t = useTranslations("profile");
  const locale = useLocale();
  const router = useRouter();
  const isArabic = locale === "ar";
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await customAxios.get("/customer/orders");
        const ordersData: Order[] = response.data?.data?.items || [];

        setOrders(ordersData);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div>
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t("orders.title")}</h2>
          <p className="text-gray-600 dark:text-gray-400">{t("orders.description")}</p>
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg animate-pulse">
              <div className="flex gap-4">
                <div className="w-20 h-20 bg-gray-200 dark:bg-gray-700 rounded-lg" />
                <div className="flex-1 space-y-3">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3" />
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/4" />
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t("orders.title")}</h2>
        <p className="text-gray-600 dark:text-gray-400">{t("orders.description")}</p>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-12">
          <Package size={48} className="mx-auto mb-4 text-gray-400" />
          <p className="text-gray-600 dark:text-gray-400 mb-4">{t("orders.noOrders")}</p>
          <button
            onClick={() => router.push("/products")}
            className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-secondary soft">
            {t("orders.startShopping")}
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.orderId}
              className="p-4 md:p-6 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-primary soft">
              {/* Order Header */}
              <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white text-xs md:text-base">
                    {t("orders.orderNumber")}
                    {order.orderNumber}
                  </p>
                  <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
                    {t("orders.date")}:{" "}
                    {new Date(order.orderDate).toLocaleDateString(isArabic ? "ar-EG" : "en-UK")}
                  </p>
                </div>
                {(() => {
                  const statusInfo = getOrderStatusInfo(order.orderStatus);
                  return (
                    <span
                      className={`px-2 md:px-3 py-1 rounded-lg text-xs md:text-sm font-medium ${statusInfo.bgColor}`}>
                      {isArabic ? statusInfo.labelAr : statusInfo.label}
                    </span>
                  );
                })()}
              </div>

              {/* Order Items Preview */}
              <div className="flex items-center gap-4 mb-4">
                {/* Item Images - show up to 3 images */}
                <div className="flex -space-x-2 rtl:space-x-reverse">
                  {order.itemsSummary.slice(0, 3).map((item, index) => {
                    const imageSrc = item.thumbnailImage?.startsWith("http")
                      ? item.thumbnailImage
                      : `${process.env.NEXT_PUBLIC_DOMAIN}/${item.thumbnailImage}`;
                    return (
                      <div
                        key={index}
                        className="relative w-16 h-16 rounded-lg border-2 border-white dark:border-gray-800 overflow-hidden bg-gray-100 dark:bg-gray-700">
                        {item.thumbnailImage ? (
                          <Image src={imageSrc} alt={item.itemName} fill className="object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Package size={24} className="text-gray-400" />
                          </div>
                        )}
                      </div>
                    );
                  })}
                  {order.itemsSummary.length > 3 && (
                    <div className="relative w-16 h-16 rounded-lg border-2 border-white dark:border-gray-800 bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                        +{order.itemsSummary.length - 3}
                      </span>
                    </div>
                  )}
                </div>

                {/* Item Details */}
                <div className="flex-1 min-w-0 space-y-2">
                  <p className="text-sm text-gray-700 dark:text-gray-300 truncate">
                    {order.itemsSummary[0]?.itemName || ""}
                    {order.itemsSummary.length > 1 && (
                      <span className="text-gray-500">
                        {" "}
                        {t("orders.andMore", { count: order.itemsSummary.length - 1 })}
                      </span>
                    )}
                  </p>
                  <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-600 px-2 py-1 rounded">
                    {t("orders.qty")} {order.totalItems}
                  </span>
                </div>
              </div>

              {/* Order Footer */}
              <div className="flex flex-wrap justify-between items-center gap-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                <p className="text-base md:text-lg font-bold text-gray-900 dark:text-white">
                  {t("orders.total")}: ${order.totalAmount.toFixed(2)}
                </p>
                <button
                  onClick={() => router.push(`order/${order.orderId}`)}
                  className="px-4 py-2 text-primary border border-primary rounded-lg hover:bg-primary hover:text-white">
                  {t("orders.viewDetails")}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersTab;
