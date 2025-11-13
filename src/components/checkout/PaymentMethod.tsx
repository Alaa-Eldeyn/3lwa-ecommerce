import { CreditCard, Wallet, Banknote } from "lucide-react";

interface PaymentMethodProps {
  selectedMethod: "card" | "cash" | "wallet";
  onChange: (method: "card" | "cash" | "wallet") => void;
}

const PaymentMethod = ({ selectedMethod, onChange }: PaymentMethodProps) => {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 border border-gray-200 dark:border-gray-700">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
        <CreditCard size={24} className="text-primary" />
        Payment Method
      </h2>

      <div className="space-y-3">
        {/* Credit Card */}
        <label
          className={`flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer transition-all ${
            selectedMethod === "card"
              ? "border-primary bg-primary/5"
              : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
          }`}
        >
          <input
            type="radio"
            name="payment"
            value="card"
            checked={selectedMethod === "card"}
            onChange={(e) => onChange(e.target.value as "card" | "cash" | "wallet")}
            className="w-5 h-5 text-primary focus:ring-primary"
          />
          <div className="flex items-center gap-3 flex-1">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <CreditCard size={24} className="text-primary" />
            </div>
            <div>
              <p className="font-semibold text-gray-900 dark:text-white">
                Credit / Debit Card
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Pay securely with your card
              </p>
            </div>
          </div>
        </label>

        {/* Digital Wallet */}
        <label
          className={`flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer transition-all ${
            selectedMethod === "wallet"
              ? "border-primary bg-primary/5"
              : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
          }`}
        >
          <input
            type="radio"
            name="payment"
            value="wallet"
            checked={selectedMethod === "wallet"}
            onChange={(e) => onChange(e.target.value as "card" | "cash" | "wallet")}
            className="w-5 h-5 text-primary focus:ring-primary"
          />
          <div className="flex items-center gap-3 flex-1">
            <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
              <Wallet size={24} className="text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="font-semibold text-gray-900 dark:text-white">
                Digital Wallet
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Apple Pay, Google Pay, PayPal
              </p>
            </div>
          </div>
        </label>

        {/* Cash on Delivery */}
        <label
          className={`flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer transition-all ${
            selectedMethod === "cash"
              ? "border-primary bg-primary/5"
              : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
          }`}
        >
          <input
            type="radio"
            name="payment"
            value="cash"
            checked={selectedMethod === "cash"}
            onChange={(e) => onChange(e.target.value as "card" | "cash" | "wallet")}
            className="w-5 h-5 text-primary focus:ring-primary"
          />
          <div className="flex items-center gap-3 flex-1">
            <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <Banknote size={24} className="text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="font-semibold text-gray-900 dark:text-white">
                Cash on Delivery
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Pay when you receive
              </p>
            </div>
          </div>
        </label>
      </div>
    </div>
  );
};

export default PaymentMethod;
