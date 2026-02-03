"use client";

import VendorLayout from "../components/VendorLayout";
import StatsCards from "./components/StatsCards";
import RevenueChart from "./components/RevenueChart";
import RecentOrders from "./components/RecentOrders";
import TopProducts from "./components/TopProducts";
import QuickActions from "./components/QuickActions";
import PerformanceMetrics from "./components/PerformanceMetrics";

const VendorDashboard = () => {
  return (
    <VendorLayout title="Dashboard Overview">
      <StatsCards />

      <div className="grid grid-cols-3 gap-6 mt-6">
        <div className="col-span-2">
          <RevenueChart />
        </div>
        <div>
          <QuickActions />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 mt-6">
        <div className="col-span-2">
          <RecentOrders />
        </div>
        <div>
          <TopProducts />
        </div>
      </div>

      <div className="mt-6">
        <PerformanceMetrics />
      </div>
    </VendorLayout>
  );
};

export default VendorDashboard;
