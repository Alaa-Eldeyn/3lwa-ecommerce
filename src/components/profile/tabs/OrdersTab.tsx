import { Package } from "lucide-react";
import { useEffect, useState } from "react";
import { customAxios } from "@/src/utils/customAxios";
import { useTranslations, useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import Image from "next/image";

// API response item type
interface OrderItemResponse {
  id: string;
  orderNumber: string;
  sellerName: string;
  itemImageUrl: string;
  itemNameAr: string;
  itemNameEn: string;
  quantityItem: number;
  shipmentStatus: number;
  price: number;
  total: number;
  orderStatus: string;
  paymentStatus: string;
  createdDate: string;
}

// Grouped order type for display
interface GroupedOrder {
  id: string;
  orderNumber: string;
  total: number;
  orderStatus: string;
  paymentStatus: string;
  createdDate: string;
  items: {
    itemImageUrl: string;
    itemNameAr: string;
    itemNameEn: string;
    quantityItem: number;
    price: number;
  }[];
  totalItems: number;
}

const OrdersTab = () => {
  const t = useTranslations("profile");
  const locale = useLocale();
  const router = useRouter();
  const isArabic = locale === "ar";
  const [orders, setOrders] = useState<GroupedOrder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await customAxios.get("/Order/my-orders");
        const rawItems: OrderItemResponse[] = response.data.data || [];

        // Group items by order ID
        const ordersMap = new Map<string, GroupedOrder>();

        rawItems.forEach((item) => {
          if (ordersMap.has(item.id)) {
            const existingOrder = ordersMap.get(item.id)!;
            existingOrder.items.push({
              itemImageUrl: item.itemImageUrl,
              itemNameAr: item.itemNameAr,
              itemNameEn: item.itemNameEn,
              quantityItem: item.quantityItem,
              price: item.price,
            });
            existingOrder.totalItems += item.quantityItem;
          } else {
            ordersMap.set(item.id, {
              id: item.id,
              orderNumber: item.orderNumber,
              total: item.total,
              orderStatus: item.orderStatus,
              paymentStatus: item.paymentStatus,
              createdDate: item.createdDate,
              items: [
                {
                  itemImageUrl: item.itemImageUrl,
                  itemNameAr: item.itemNameAr,
                  itemNameEn: item.itemNameEn,
                  quantityItem: item.quantityItem,
                  price: item.price,
                },
              ],
              totalItems: item.quantityItem,
            });
          }
        });

        setOrders(Array.from(ordersMap.values()));
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

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

  const getStatusColor = (status: string) => {
    const normalizedStatus = status.toLowerCase();
    const colors: Record<string, string> = {
      pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
      processing: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
      shipped: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
      delivered: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
      cancelled: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
      paymentfailed: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
      failed: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
    };
    return colors[normalizedStatus] || colors.pending;
  };

  const getStatusLabel = (status: string) => {
    const normalizedStatus = status.toLowerCase();
    const statusMap: Record<string, string> = {
      pending: "pending",
      processing: "processing",
      shipped: "shipped",
      delivered: "delivered",
      cancelled: "cancelled",
      paymentfailed: "cancelled",
      failed: "cancelled",
    };
    return t(`orders.${statusMap[normalizedStatus] || "pending"}`);
  };

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
              className="p-6 border border-gray-200 dark:border-gray-700 rounded-xl animate-pulse">
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
            className="px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 soft">
            {t("orders.startShopping")}
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="p-6 border border-gray-200 dark:border-gray-700 rounded-xl hover:border-primary soft">
              {/* Order Header */}
              <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {t("orders.orderNumber")}: {order.orderNumber}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {t("orders.date")}: {new Date(order.createdDate).toLocaleDateString(locale)}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-lg text-sm font-medium ${getStatusColor(
                    order.orderStatus
                  )}`}>
                  {getStatusLabel(order.orderStatus)}
                </span>
              </div>

              {/* Order Items Preview */}
              <div className="flex items-center gap-4 mb-4">
                {/* Item Images - show up to 3 images */}
                <div className="flex -space-x-2 rtl:space-x-reverse">
                  {order.items.slice(0, 3).map((item, index) => (
                    <div
                      key={index}
                      className="relative w-16 h-16 rounded-lg border-2 border-white dark:border-gray-800 overflow-hidden bg-gray-100 dark:bg-gray-700">
                      {item.itemImageUrl ? (
                        <Image
                          src={getImageUrl(item.itemImageUrl)}
                          alt={isArabic ? item.itemNameAr : item.itemNameEn}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Package size={24} className="text-gray-400" />
                        </div>
                      )}
                    </div>
                  ))}
                  {order.items.length > 3 && (
                    <div className="relative w-16 h-16 rounded-lg border-2 border-white dark:border-gray-800 bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                        +{order.items.length - 3}
                      </span>
                    </div>
                  )}
                </div>

                {/* Item Details */}
                <div className="flex-1 min-w-0 space-y-2">
                  <p className="text-sm text-gray-700 dark:text-gray-300 truncate">
                    {isArabic ? order.items[0].itemNameAr : order.items[0].itemNameEn}
                    {order.items.length > 1 && (
                      <span className="text-gray-500">
                        {" "}
                        {isArabic
                          ? `و ${order.items.length - 1} منتجات أخرى`
                          : `and ${order.items.length - 1} more`}
                      </span>
                    )}
                  </p>
                  <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-600 px-2 py-1 rounded">
                    {isArabic ? "الكمية:" : "Qty:"} {order.totalItems}
                  </span>
                </div>
              </div>

              {/* Order Footer */}
              <div className="flex flex-wrap justify-between items-center gap-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                <p className="text-lg font-bold text-gray-900 dark:text-white">
                  {t("orders.total")}: ${order.total.toFixed(2)}
                </p>
                <button
                  onClick={() => router.push(`/order/${order.id}`)}
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
