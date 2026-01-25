// Types
export interface OrderData {
  orderId: string;
  orderNumber: string;
  orderDate: string;
  deliveryDate: string | null;
  orderStatus: number;
  paymentStatus: number;
  subTotal: number;
  shippingAmount: number;
  taxAmount: number;
  discountAmount: number;
  totalAmount: number;
  deliveryAddress: {
    address: string;
    cityNameAr: string;
    cityNameEn: string;
    stateNameAr: string;
    stateNameEn: string;
    phoneCode: string;
    phoneNumber: string;
    recipientName: string;
  };
  paymentInfo: {
    status: number;
    paymentMethod: string;
    transactionId: string;
    paymentDate: string | null;
    amount: number;
  };
  items: OrderDetailItem[];
  shipments: Array<{
    shipmentId: string;
    shipmentNumber: string;
    status: number;
    trackingNumber: string | null;
    estimatedDeliveryDate: string | null;
    actualDeliveryDate: string | null;
    itemIds: string[];
  }>;
  canCancel: boolean;
  canRequestRefund: boolean;
  isWithinRefundPeriod: boolean;
}

export interface OrderDetailItem {
  orderDetailId: string;
  itemId: string;
  itemName: string;
  itemImage: string;
  vendorName: string;
  quantity: number;
  unitPrice: number;
  subTotal: number;
  discountAmount: number;
  taxAmount: number;
  shipmentStatus: number;
}
