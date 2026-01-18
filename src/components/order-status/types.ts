export interface OrderStatusItem {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  color?: string;
  sku?: string;
  description?: string;
}

export interface OrderStatusData {
  orderNumber: string;
  orderDate: string;
  orderStatus: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  estimatedDelivery: string;
  paymentMethod: string;
  paymentStatus: "pending" | "paid" | "failed";
  paymentStatusMessage?: string;
  items: OrderStatusItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  discount: number;
  total: number;
  shippingAddress: {
    name: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    phone: string;
    email: string;
  };
  billingAddress: {
    name: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    phone: string;
    email: string;
  };
  trackingTimeline: {
    status: string;
    date: string;
    description: string;
    completed: boolean;
    icon: string;
  }[];
  confirmationEmail: string;
}
