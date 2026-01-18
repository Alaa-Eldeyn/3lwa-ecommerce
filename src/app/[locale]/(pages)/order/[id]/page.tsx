import Order from "@/src/components/order";

const OrderPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  return <Order id={id} />;
};

export default OrderPage;
