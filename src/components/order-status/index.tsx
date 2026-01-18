"use client";

import { OrderStatusData } from "./types";
import { defaultOrderData } from "./data";
import SuccessHero from "./components/SuccessHero";
import OrderDetails from "./components/OrderDetails";
import OrderItems from "./components/OrderItems";
import OrderSummary from "./components/OrderSummary";
import ShippingDetails from "./components/ShippingDetails";
import OrderTrackingTimeline from "./components/OrderTrackingTimeline";
import ConfirmationEmail from "./components/ConfirmationEmail";
import CustomerSupport from "./components/CustomerSupport";
import TrustBadges from "./components/TrustBadges";

interface OrderStatusProps {
  id: string;
  orderData?: OrderStatusData;
}

// Main OrderStatus Component
const OrderStatus = ({ id }: OrderStatusProps) => {
  // Use provided orderData or default data
  const data = defaultOrderData;

  return (
    <div className="min-h-screen bg-background dark:bg-gray-950">
      <SuccessHero />

      <section className="py-12 bg-gray-50 dark:bg-gray-950">
        <div className="max-w-[1440px] mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <OrderDetails orderData={data} />
              <OrderItems items={data.items} />
            </div>

            <div className="lg:col-span-1">
              <OrderSummary orderData={data} />
            </div>
          </div>
        </div>
      </section>

      <ShippingDetails
        shippingAddress={data.shippingAddress}
        billingAddress={data.billingAddress}
      />

      <OrderTrackingTimeline timeline={data.trackingTimeline} />

      <ConfirmationEmail email={data.confirmationEmail} />

      <CustomerSupport />

      <TrustBadges />
    </div>
  );
};

export default OrderStatus;
export type { OrderStatusData, OrderStatusItem } from "./types";
