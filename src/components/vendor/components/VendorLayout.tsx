"use client";

import { ReactNode } from "react";
import VendorSidebar from "./VendorSidebar";
import VendorSidebarGradient from "./VendorSidebarGradient";
import VendorHeader from "./VendorHeader";

interface VendorLayoutProps {
  children: ReactNode;
  title: string;
  showBackButton?: boolean;
  breadcrumbs?: { label: string; href?: string }[];
  sidebarVariant?: "default" | "gradient";
  vendorName?: string;
  vendorStatus?: string;
  vendorAvatar?: string;
}

const VendorLayout = ({
  children,
  title,
  showBackButton = false,
  breadcrumbs,
  sidebarVariant = "gradient",
  vendorName,
  vendorStatus,
  vendorAvatar,
}: VendorLayoutProps) => {
  const useGradient = sidebarVariant === "gradient";

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 font-cairo">
      {useGradient ? (
        <VendorSidebarGradient
          vendorName={vendorName}
          vendorStatus={vendorStatus}
          vendorAvatar={vendorAvatar}
        />
      ) : (
        <VendorSidebar />
      )}
      <div className="flex-1 flex flex-col overflow-hidden">
        <VendorHeader
          title={title}
          showBackButton={showBackButton}
          breadcrumbs={breadcrumbs}
          variant={"default"}
        />
        <main className="flex-1 overflow-y-auto bg-gray-50 p-8">{children}</main>
      </div>
    </div>
  );
};

export default VendorLayout;
