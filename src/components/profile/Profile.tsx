"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { User, MapPin, Package, Shield } from "lucide-react";
import { ProfileFormData, PasswordUpdateFormData, Address, Order } from "@/src/types/types";
import toast from "react-hot-toast";
import ProfileSidebar from "./ProfileSidebar";
import PersonalInfoTab from "./PersonalInfoTab";
import OrdersTab from "./OrdersTab";
import SecurityTab from "./SecurityTab";

type TabType = "personalInfo" | "orders" | "security";

const Profile = () => {
  const t = useTranslations("profile");
  const tAuth = useTranslations("auth");
  const [activeTab, setActiveTab] = useState<TabType>("personalInfo");
  const [isLoading, setIsLoading] = useState(false);

  // Mock user data - replace with actual data from API
  const [userData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    dateOfBirth: "1990-01-15",
    gender: "male" as const,
  });


  // Mock orders data
  const [orders] = useState<Order[]>([
    {
      id: "1",
      orderNumber: "ORD-2024-001",
      date: "2024-11-15",
      total: 299.99,
      status: "delivered",
      items: [],
    },
    {
      id: "2",
      orderNumber: "ORD-2024-002",
      date: "2024-11-10",
      total: 149.99,
      status: "shipped",
      items: [],
    },
  ]);

  const onSubmitProfile = async (data: ProfileFormData) => {
    setIsLoading(true);
    try {
      // API call would go here
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Profile updated successfully!");
      console.log("Profile data:", data);
    } catch (error) {
      toast.error("Failed to update profile");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmitPassword = async (data: PasswordUpdateFormData) => {
    setIsLoading(true);
    try {
      // API call would go here
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Password updated successfully!");
      console.log("Password data:", data);
    } catch (error) {
      toast.error("Failed to update password");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const tabs = [
    { id: "personalInfo" as TabType, label: t("tabs.personalInfo"), icon: User },
    { id: "orders" as TabType, label: t("tabs.orders"), icon: Package },
    { id: "security" as TabType, label: t("tabs.security"), icon: Shield },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24">
      <div className="container">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            {t("title")}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">{t("subtitle")}</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <ProfileSidebar
              userData={userData}
              activeTab={activeTab}
              tabs={tabs}
              onTabChange={(tabId) => setActiveTab(tabId as TabType)}
              onImageChange={(file) => {
                console.log("Image file:", file);
                toast.success("Profile image updated!");
              }}
              t={t}
            />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
              {activeTab === "personalInfo" && (
                <PersonalInfoTab
                  userData={userData}
                  isLoading={isLoading}
                  onSubmit={onSubmitProfile}
                  t={t}
                  tAuth={tAuth}
                />
              )}

              {activeTab === "orders" && (
                <OrdersTab
                  orders={orders}
                  t={t}
                />
              )}

              {activeTab === "security" && (
                <SecurityTab
                  isLoading={isLoading}
                  onSubmit={onSubmitPassword}
                  t={t}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;