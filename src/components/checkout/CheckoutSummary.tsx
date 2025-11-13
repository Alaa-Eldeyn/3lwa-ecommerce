import { ChevronRight } from "lucide-react";

interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface CheckoutSummaryProps {
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
}

const CheckoutSummary = ({
  items,
  subtotal,
  shipping,
  tax,
  total,
}: CheckoutSummaryProps) => {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 border border-gray-200 dark:border-gray-700 sticky top-24">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
        Order Summary
      </h2>

      {/* Order Items */}
      <div className="space-y-4 mb-6">
        {items.map((item) => (
          <div key={item.id} className="flex justify-between items-center">
            <div>
              <p className="font-medium text-gray-900 dark:text-white">
                {item.name}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Qty: {item.quantity}
              </p>
            </div>
            <p className="font-semibold text-gray-900 dark:text-white">
              ${item.price * item.quantity}
            </p>
          </div>
        ))}
      </div>

      <div className="h-px bg-gray-200 dark:bg-gray-700 mb-6" />

      {/* Price Breakdown */}
      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-gray-600 dark:text-gray-400">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-600 dark:text-gray-400">
          <span>Shipping</span>
          <span>${shipping.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-600 dark:text-gray-400">
          <span>Tax</span>
          <span>${tax.toFixed(2)}</span>
        </div>
      </div>

      <div className="h-px bg-gray-200 dark:bg-gray-700 mb-6" />

      {/* Total */}
      <div className="flex justify-between items-center mb-6">
        <span className="text-lg font-semibold text-gray-900 dark:text-white">
          Total
        </span>
        <span className="text-2xl font-bold text-primary">
          ${total.toFixed(2)}
        </span>
      </div>

      {/* Place Order Button */}
      <button
        type="submit"
        className="w-full bg-primary hover:bg-secondary text-white font-semibold py-4 rounded-full transition-colors flex items-center justify-center gap-2 group"
      >
        Place Order
        <ChevronRight
          size={20}
          className="group-hover:translate-x-1 transition-transform"
        />
      </button>

      {/* Security Note */}
      <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-4">
        🔒 Your payment information is secure and encrypted
      </p>
    </div>
  );
};

export default CheckoutSummary;
