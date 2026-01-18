import OrderStatus from "@/src/components/order-status";

const OrderStatusPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  return <OrderStatus id={id} />;
};

export default OrderStatusPage;
