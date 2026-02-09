import RefundRequest from "@/src/components/order/RefundRequest";

const RefundPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ orderDetailId?: string }>;
}) => {
  const { id } = await params;
  const { orderDetailId } = await searchParams;
  return <RefundRequest orderId={id} orderDetailId={orderDetailId ?? null} />;
};

export default RefundPage;
