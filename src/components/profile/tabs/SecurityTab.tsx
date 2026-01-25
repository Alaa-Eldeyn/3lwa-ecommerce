import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocale } from "next-intl";
import { Lock, Eye, EyeOff, Trash2 } from "lucide-react";
import { createPortal } from "react-dom";
import { passwordUpdateSchema } from "@/src/schemas/schemas";
import { PasswordUpdateFormData } from "@/src/types/types";
import { customAxios } from "@/src/auth/customAxios";
import toast from "react-hot-toast";
import axios from "axios";
import { useUserStore } from "@/src/store/userStore";

interface SecurityTabProps {
  isLoading: boolean;
  onSubmit: (data: PasswordUpdateFormData) => void;
  t: (key: string) => string;
}

const SecurityTab = ({ isLoading, onSubmit, t }: SecurityTabProps) => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Delete account states
  const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false);
  const [isDeletingAccount, setIsDeletingAccount] = useState(false);

  const logout = useUserStore((state) => state.logout);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PasswordUpdateFormData>({
    resolver: zodResolver(passwordUpdateSchema),
  });

  const handleFormSubmit = async (data: PasswordUpdateFormData) => {
    await onSubmit(data);
    reset();
  };

  // Delete account
  const handleDeleteAccount = async () => {
    setIsDeletingAccount(true);
    try {
      const response = await customAxios.get("/UserAuthentication/delete-account");

      if (response?.data?.success) {
        toast.success(
          response.data.message || t("security.accountDeleted") || "Account deleted successfully"
        );
        // Logout and redirect to login
        logout();
      } else {
        toast.error(
          response.data.message || t("security.failedToDeleteAccount") || "Failed to delete account"
        );
      }
    } catch (error) {
      console.error("Delete account error:", error);
      let errorMessage = t("security.failedToDeleteAccount") || "Failed to delete account";
      if (axios.isAxiosError(error)) {
        errorMessage =
          error.response?.data?.message || error.response?.data?.errors?.[0] || errorMessage;
      }
      toast.error(errorMessage);
    } finally {
      setIsDeletingAccount(false);
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {t("security.title")}
        </h2>
        <p className="text-gray-600 dark:text-gray-400">{t("security.description")}</p>
      </div>

      {/* Password Update Section */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          {t("security.updatePassword")}
        </h3>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
          {/* Current Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t("security.currentPassword")} *
            </label>
            <div className="relative">
              <Lock size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type={showCurrentPassword ? "text" : "password"}
                {...register("currentPassword")}
                className="w-full pl-10 pr-12 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary soft"
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 soft">
                {showCurrentPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.currentPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.currentPassword.message}</p>
            )}
          </div>

          {/* New Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t("security.newPassword")} *
            </label>
            <div className="relative">
              <Lock size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type={showNewPassword ? "text" : "password"}
                {...register("newPassword")}
                className="w-full pl-10 pr-12 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary soft"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 soft">
                {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.newPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.newPassword.message}</p>
            )}
          </div>

          {/* Confirm New Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t("security.confirmNewPassword")} *
            </label>
            <div className="relative">
              <Lock size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                {...register("confirmNewPassword")}
                className="w-full pl-10 pr-12 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary soft"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 soft">
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.confirmNewPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.confirmNewPassword.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full md:w-auto px-8 py-3 bg-primary hover:bg-primary/90 text-white font-medium rounded-xl soft focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50">
            {isLoading ? t("security.updating") : t("security.updatePassword")}
          </button>
        </form>
      </div>

      {/* Delete Account Section */}
      <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {t("security.deleteAccount")}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {t("security.deleteAccountDescription")}
          </p>
        </div>
        <button
          type="button"
          onClick={() => setShowDeleteAccountModal(true)}
          className="px-6 py-3 bg-error hover:bg-error-hover text-white font-medium rounded-xl transition-colors flex items-center gap-2">
          <Trash2 size={18} />
          {t("security.deleteAccountButton")}
        </button>
      </div>

      {/* Delete Account Confirmation Modal */}
      {showDeleteAccountModal &&
        typeof window !== "undefined" &&
        createPortal(
          <DeleteAccountModal
            isOpen={showDeleteAccountModal}
            onClose={() => setShowDeleteAccountModal(false)}
            onConfirm={handleDeleteAccount}
            isLoading={isDeletingAccount}
            t={t}
          />,
          document.body
        )}
    </div>
  );
};

// Delete Account Confirmation Modal Component
interface DeleteAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading: boolean;
  t: (key: string) => string;
}

const DeleteAccountModal = ({
  isOpen,
  onClose,
  onConfirm,
  isLoading,
  t,
}: DeleteAccountModalProps) => {
  const locale = useLocale();
  const isRTL = locale === "ar";

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
      dir={isRTL ? "rtl" : "ltr"}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full shadow-2xl">
        <div className="mb-6">
          <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-4 mx-auto">
            <Trash2 className="text-red-600 dark:text-red-400" size={24} />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 text-center">
            {t("security.deleteAccountConfirm")}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
            {t("security.deleteAccountWarning")}
          </p>
        </div>

        <div className={`flex gap-4 ${isRTL ? "flex-row-reverse" : ""}`}>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className="flex-1 py-3 bg-error hover:bg-error-hover text-white rounded-xl transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed">
            {isLoading ? t("security.deleting") : t("security.confirmDelete")}
          </button>
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="flex-1 py-3 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed">
            {t("security.cancel")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SecurityTab;
