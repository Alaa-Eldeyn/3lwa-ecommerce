"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { User, Package, Shield, MapPin } from "lucide-react";
import { ProfileFormData, PasswordUpdateFormData } from "@/src/types/types";
import { useUserStore } from "@/src/store/userStore";
import { customAxios } from "@/src/utils/customAxios";
import { getUserFromCookie } from "@/src/utils/auth";
import axios from "axios";
import toast from "react-hot-toast";
import ProfileSidebar from "./components/ProfileSidebar";
import PersonalInfoTab from "./components/PersonalInfoTab";
import OrdersTab from "./components/OrdersTab";
import SecurityTab from "./components/SecurityTab";
import AddressesTab from "./components/AddressesTab";

type TabType = "personalInfo" | "orders" | "security" | "address";

const validTabs: TabType[] = ["personalInfo", "orders", "security", "address"];

const Profile = () => {
  const t = useTranslations("profile");
  const tAuth = useTranslations("auth");
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab") as TabType | null;

  // التحقق من صحة tab parameter وإلا استخدام personalInfo كافتراضي
  const initialTab = tabParam && validTabs.includes(tabParam) ? tabParam : "personalInfo";

  const [activeTab, setActiveTab] = useState<TabType>(initialTab);

  useEffect(() => {
    if (tabParam && validTabs.includes(tabParam)) {
      setActiveTab(tabParam);
    } else if (!tabParam) {
      setActiveTab("personalInfo");
    }
  }, [tabParam]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingProfile, setIsFetchingProfile] = useState(true);
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [profileData, setProfileData] = useState<{
    phone?: string;
    phoneCode?: string;
  }>({});
  const { user, initUser, updateUser } = useUserStore();

  useEffect(() => {
    initUser();
  }, [initUser]);

  // Fetch user profile from API on mount
  useEffect(() => {
    const loadUserProfile = async () => {
      setIsFetchingProfile(true);
      try {
        // Fetch profile data from API - single call
        const response = await customAxios.get("/UserProfile/profile");
        if (response?.data?.success && response.data.data) {
          const apiData = response.data.data;
          const currentUser = user || getUserFromCookie();

          // Update user store with user data (preserving tokens)
          updateUser({
            id: apiData.userId || currentUser?.id || null,
            firstName: apiData.firstName || "",
            lastName: apiData.lastName || "",
            email: apiData.email || "",
            profileImagePath: apiData.profileImagePath || "",
          });

          // Store additional profile fields that aren't in User type
          setProfileData({
            phone: apiData.phone || "",
            phoneCode: apiData.phoneCode || "",
          });
        }
      } catch (error) {
        console.error("Error loading user profile:", error);
      } finally {
        setIsFetchingProfile(false);
      }
    };

    const currentUser = user || getUserFromCookie();
    if (currentUser?.token) {
      loadUserProfile();
    } else {
      setIsFetchingProfile(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run once on mount

  // User data for forms - combines store data with API profile data
  // Combine phoneCode and phone for PhoneInput component
  const fullPhone =
    profileData.phoneCode && profileData.phone
      ? `${profileData.phoneCode}${profileData.phone}`
      : profileData.phone || "";

  const userData = {
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phone: fullPhone,
  };

  const onSubmitProfile = async (data: ProfileFormData) => {
    setIsLoading(true);
    try {
      // Convert image file to base64 string if available
      let profileImageString = "";
      if (profileImageFile) {
        profileImageString = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            const base64String = reader.result as string;
            // Remove data:image/...;base64, prefix to get only the base64 string
            const base64Only = base64String.includes(",")
              ? base64String.split(",")[1]
              : base64String;
            resolve(base64Only);
          };
          reader.onerror = reject;
          reader.readAsDataURL(profileImageFile);
        });
      }

      // Prepare request payload
      const payload: {
        firstName: string;
        lastName: string;
        profileImage?: string;
      } = {
        firstName: data.firstName,
        lastName: data.lastName,
      };

      // Only include profileImage if a new image was selected
      if (profileImageString) {
        payload.profileImage = profileImageString;
      }

      // Send to API
      const response = await customAxios.post("/UserProfile/profile", payload);

      if (response?.data?.success) {
        // Update user store with new data
        if (response.data.data) {
          const apiData = response.data.data;
          updateUser({
            firstName: apiData.firstName || data.firstName,
            lastName: apiData.lastName || data.lastName,
            profileImagePath: apiData.profileImagePath || user?.profileImagePath || "",
          });
        }

        // Clear the image file state after successful upload
        setProfileImageFile(null);

        toast.success(response.data.message || "Profile updated successfully!");

        // Reload profile data to get latest from server
        const profileResponse = await customAxios.get("/UserProfile/profile");
        if (profileResponse?.data?.success && profileResponse.data.data) {
          const apiData = profileResponse.data.data;
          updateUser({
            id: apiData.userId || user?.id || null,
            firstName: apiData.firstName || "",
            lastName: apiData.lastName || "",
            email: apiData.email || "",
            profileImagePath: apiData.profileImagePath || "",
          });
        }
      } else {
        toast.error(response.data.message || "Failed to update profile");
      }
    } catch (error) {
      console.error("Profile update error:", error);
      let errorMessage = "Failed to update profile";
      if (axios.isAxiosError(error)) {
        errorMessage =
          error.response?.data?.message || error.response?.data?.errors?.[0] || errorMessage;
      }
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmitPassword = async (data: PasswordUpdateFormData) => {
    setIsLoading(true);
    try {
      const response = await customAxios.put("/Password/change-password", {
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
        passwordConfirmation: data.confirmNewPassword,
      });

      if (response?.data?.success) {
        toast.success(response.data.message || "Password updated successfully!");
      } else {
        toast.error(response.data.message || "Failed to update password");
      }
    } catch (error) {
      console.error("Password update error:", error);

      let errorMessage = "Failed to update password";
      if (axios.isAxiosError(error)) {
        errorMessage =
          error.response?.data?.message || error.response?.data?.errors?.[0] || errorMessage;
      }

      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const tabs = [
    { id: "personalInfo" as TabType, label: t("tabs.personalInfo"), icon: User },
    { id: "orders" as TabType, label: t("tabs.orders"), icon: Package },
    { id: "security" as TabType, label: t("tabs.security"), icon: Shield },
    { id: "address" as TabType, label: t("tabs.addresses"), icon: MapPin },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-8">
      <div className="container">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{t("title")}</h1>
          <p className="text-gray-600 dark:text-gray-400">{t("subtitle")}</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <ProfileSidebar
              userData={userData}
              profileImagePath={user?.profileImagePath}
              activeTab={activeTab}
              tabs={tabs}
              onTabChange={(tabId: string) => setActiveTab(tabId as TabType)}
              onImageChange={(file: File) => {
                setProfileImageFile(file);
              }}
              t={t}
            />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 bg-white dark:bg-gray-800 rounded-xl p-8 border border-gray-200 dark:border-gray-700">
            {/* Personal Info */}
            {activeTab === "personalInfo" && (
              <PersonalInfoTab
                userData={userData}
                isLoading={isLoading}
                onSubmit={onSubmitProfile}
                t={t}
                tAuth={tAuth}
              />
            )}

            {/* Orders */}
            {activeTab === "orders" && <OrdersTab />}

            {/* Security */}
            {activeTab === "security" && (
              <SecurityTab isLoading={isLoading} onSubmit={onSubmitPassword} t={t} />
            )}

            {/* Addresses */}
            {activeTab === "address" && <AddressesTab t={t} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
