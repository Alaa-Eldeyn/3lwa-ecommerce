import OrderTracking from "@/src/components/order/OrderTracking";

const OrderTrackingPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  return <OrderTracking id={id} />;
};

export default OrderTrackingPage;
