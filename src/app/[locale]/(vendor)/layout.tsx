import { VendorHeader } from "@/src/components/vendor-dashboard/VendorHeader";

export default function VendorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <VendorHeader />
      <main className="flex-1">{children}</main>
    </div>
  );
}
