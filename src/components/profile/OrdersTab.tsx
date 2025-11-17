import { Package } from "lucide-react";
import { Order } from "@/src/types/types";

interface OrdersTabProps {
  orders: Order[];
  t: (key: string) => string;
  onViewDetails?: (orderId: string) => void;
  onStartShopping?: () => void;
}

const OrdersTab = ({ orders, t, onViewDetails, onStartShopping }: OrdersTabProps) => {
  const getStatusColor = (status: Order["status"]) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
      processing: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
      shipped: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
      delivered: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
      cancelled: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
    };
    return colors[status];
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {t("orders.title")}
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          {t("orders.description")}
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-12">
          <Package size={48} className="mx-auto mb-4 text-gray-400" />
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {t("orders.noOrders")}
          </p>
          <button 
            onClick={onStartShopping}
            className="px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 soft"
          >
            {t("orders.startShopping")}
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="p-6 border border-gray-200 dark:border-gray-700 rounded-xl hover:border-primary soft"
            >
              <div className="flex flex-wrap justify-between items-start gap-4 mb-3">
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {t("orders.orderNumber")}
                    {order.orderNumber}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {t("orders.date")}: {new Date(order.date).toLocaleDateString()}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-lg text-sm font-medium ${getStatusColor(order.status)}`}>
                  {t(`orders.${order.status}`)}
                </span>
              </div>
              <div className="flex flex-wrap justify-between items-center gap-4">
                <p className="text-lg font-bold text-gray-900 dark:text-white">
                  {t("orders.total")}: ${order.total.toFixed(2)}
                </p>
                <button 
                  onClick={() => onViewDetails?.(order.id)}
                  className="px-4 py-2 text-primary border border-primary rounded-xl hover:bg-primary hover:text-white soft"
                >
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
