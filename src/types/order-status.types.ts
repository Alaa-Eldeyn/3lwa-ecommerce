export interface OrderStatusData {
  trackingTimeline: Array<{
    status: string;
    date: string;
    description: string;
    icon: string;
    completed: boolean;
  }>;
}
