"use client";

import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocale } from "next-intl";
import { Mail, Edit2, Phone } from "lucide-react";
import { PhoneInput } from "react-international-phone";
import { removeDialCode } from "react-international-phone";
import { createPortal } from "react-dom";
import "react-international-phone/style.css";
import { profileSchema } from "@/src/schemas/schemas";
import { ProfileFormData } from "@/src/types/types";
import { customAxiosEmail, customAxios } from "@/src/utils/customAxios";
import toast from "react-hot-toast";
import axios from "axios";

interface PersonalInfoTabProps {
  userData: ProfileFormData;
  isLoading: boolean;
  onSubmit: (data: ProfileFormData) => void;
  t: (key: string) => string;
  tAuth: (key: string) => string;
  onEmailUpdate?: (newEmail: string) => void;
  onPhoneUpdate?: (phoneCode: string, phoneNumber: string) => void;
}

const PersonalInfoTab = ({
  userData,
  isLoading,
  onSubmit,
  t,
  tAuth,
  onEmailUpdate,
  onPhoneUpdate,
}: PersonalInfoTabProps) => {
  // Email change states
  const [showChangeEmailModal, setShowChangeEmailModal] = useState(false);
  const [showVerifyEmailModal, setShowVerifyEmailModal] = useState(false);
  const [isSendingCode, setIsSendingCode] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [newEmail, setNewEmail] = useState("");

  // Phone change states
  const [showChangePhoneModal, setShowChangePhoneModal] = useState(false);
  const [showVerifyPhoneModal, setShowVerifyPhoneModal] = useState(false);
  const [isSendingPhoneCode, setIsSendingPhoneCode] = useState(false);
  const [isVerifyingPhone, setIsVerifyingPhone] = useState(false);
  const [newPhone, setNewPhone] = useState("");
  const [newPhoneCode, setNewPhoneCode] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState("");

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: userData,
  });

  // Update form values when userData changes (e.g., when API data loads)
  useEffect(() => {
    reset(userData);
  }, [userData, reset]);

  // Check if there's a pending email change in session storage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const pendingEmail = sessionStorage.getItem("pendingEmailChange");
      if (pendingEmail) {
        setNewEmail(pendingEmail);
        setShowVerifyEmailModal(true);
      }

      // Check if there's a pending phone change in session storage
      const pendingPhone = sessionStorage.getItem("pendingPhoneChange");
      const pendingPhoneCode = sessionStorage.getItem("pendingPhoneCode");
      if (pendingPhone && pendingPhoneCode) {
        setNewPhone(pendingPhone);
        setNewPhoneCode(pendingPhoneCode);
        setNewPhoneNumber(pendingPhone.replace(pendingPhoneCode, ""));
        setShowVerifyPhoneModal(true);
      }
    }
  }, []);

  // Send verification code to the new email
  const handleSendCode = async (email: string) => {
    setIsSendingCode(true);
    try {
      const response = await customAxiosEmail.post("/Email/change-email", {
        newEmail: email,
      });

      if (response?.data?.success) {
        // Store email in session storage
        if (typeof window !== "undefined") {
          sessionStorage.setItem("pendingEmailChange", email);
        }
        setNewEmail(email);
        setShowChangeEmailModal(false);
        setShowVerifyEmailModal(true);
        toast.success(response.data.message || "Verification code sent to your new email");
      } else {
        toast.error(response.data.message || "Failed to send verification code");
      }
    } catch (error) {
      console.error("Send code error:", error);
      let errorMessage = "Failed to send verification code";
      if (axios.isAxiosError(error)) {
        errorMessage =
          error.response?.data?.message || error.response?.data?.errors?.[0] || errorMessage;
      }
      toast.error(errorMessage);
    } finally {
      setIsSendingCode(false);
    }
  };

  // Verify the new email
  const handleVerifyEmail = async (code: string) => {
    setIsVerifying(true);
    try {
      const response = await customAxiosEmail.post("/Email/verify-new-email", {
        newEmail: newEmail,
        code: code,
      });

      if (response?.data?.success) {
        // Clear session storage
        if (typeof window !== "undefined") {
          sessionStorage.removeItem("pendingEmailChange");
        }
        setShowVerifyEmailModal(false);
        setNewEmail("");
        toast.success(response.data.message || "Email updated successfully!");

        // Update parent component with new email
        if (onEmailUpdate) {
          onEmailUpdate(newEmail);
        }
      } else {
        toast.error(response.data.message || "Failed to verify email");
      }
    } catch (error) {
      console.error("Verify email error:", error);
      let errorMessage = "Failed to verify email";
      if (axios.isAxiosError(error)) {
        errorMessage =
          error.response?.data?.message || error.response?.data?.errors?.[0] || errorMessage;
      }
      toast.error(errorMessage);
    } finally {
      setIsVerifying(false);
    }
  };

  // Resend the verification code to the new email
  const handleResendCode = async () => {
    await handleSendCode(newEmail);
  };

  // Send verification code to the new phone
  const handleSendPhoneCode = async (phoneCode: string, phoneNumber: string) => {
    setIsSendingPhoneCode(true);
    try {
      if (!phoneCode || !phoneNumber) {
        toast.error(t("personalInfo.invalidPhone"));
        setIsSendingPhoneCode(false);
        return;
      }

      const response = await customAxios.post("/UserActivation/change-phone-send-code", {
        phoneCode: phoneCode,
        phoneNumber: phoneNumber,
      });

      if (response?.data?.success) {
        // Store phone in session storage
        const fullPhone = `${phoneCode}${phoneNumber}`;
        if (typeof window !== "undefined") {
          sessionStorage.setItem("pendingPhoneChange", fullPhone);
          sessionStorage.setItem("pendingPhoneCode", phoneCode);
        }
        setNewPhone(fullPhone);
        setNewPhoneCode(phoneCode);
        setNewPhoneNumber(phoneNumber);
        setShowChangePhoneModal(false);
        setShowVerifyPhoneModal(true);
        toast.success(
          response.data.message ||
            t("personalInfo.phoneCodeSent") ||
            "Verification code sent to your new phone"
        );
      } else {
        toast.error(
          response.data.message ||
            t("personalInfo.failedToSendPhoneCode") ||
            "Failed to send verification code"
        );
      }
    } catch (error) {
      console.error("Send phone code error:", error);
      let errorMessage =
        t("personalInfo.failedToSendPhoneCode") || "Failed to send verification code";
      if (axios.isAxiosError(error)) {
        errorMessage =
          error.response?.data?.message || error.response?.data?.errors?.[0] || errorMessage;
      }
      toast.error(errorMessage);
    } finally {
      setIsSendingPhoneCode(false);
    }
  };

  // Verify the new phone
  const handleVerifyPhone = async (code: string) => {
    setIsVerifyingPhone(true);
    try {
      const response = await customAxios.post("/UserActivation/change-phone-verify-code", {
        phoneCode: newPhoneCode,
        phoneNumber: newPhoneNumber,
        code: code,
      });

      if (response?.data?.success) {
        // Clear session storage
        if (typeof window !== "undefined") {
          sessionStorage.removeItem("pendingPhoneChange");
          sessionStorage.removeItem("pendingPhoneCode");
        }
        setShowVerifyPhoneModal(false);
        setNewPhone("");
        setNewPhoneCode("");
        setNewPhoneNumber("");
        toast.success(
          response.data.message || t("personalInfo.phoneUpdated") || "Phone updated successfully!"
        );

        // Update parent component with new phone
        if (onPhoneUpdate) {
          onPhoneUpdate(newPhoneCode, newPhoneNumber);
        }
      } else {
        toast.error(
          response.data.message || t("personalInfo.failedToVerifyPhone") || "Failed to verify phone"
        );
      }
    } catch (error) {
      console.error("Verify phone error:", error);
      let errorMessage = t("personalInfo.failedToVerifyPhone") || "Failed to verify phone";
      if (axios.isAxiosError(error)) {
        errorMessage =
          error.response?.data?.message || error.response?.data?.errors?.[0] || errorMessage;
      }
      toast.error(errorMessage);
    } finally {
      setIsVerifyingPhone(false);
    }
  };

  // Resend the verification code to the new phone
  const handleResendPhoneCode = async () => {
    await handleSendPhoneCode(newPhoneCode, newPhoneNumber);
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {t("personalInfo.title")}
        </h2>
        <p className="text-gray-600 dark:text-gray-400">{t("personalInfo.description")}</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          {/* First Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {tAuth("firstName")} *
            </label>
            <input
              type="text"
              {...register("firstName")}
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary soft"
              placeholder={tAuth("firstNamePlaceholder")}
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
            )}
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {tAuth("lastName")} *
            </label>
            <input
              type="text"
              {...register("lastName")}
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary soft"
              placeholder={tAuth("lastNamePlaceholder")}
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
            )}
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {tAuth("email")} *
          </label>
          <div className="relative">
            <Mail
              size={20}
              className="absolute left-3 rtl:right-3 top-1/2 -translate-y-1/2 text-gray-400 z-10"
            />
            <input
              type="email"
              {...register("email")}
              readOnly
              className="w-full px-10 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:outline-none cursor-not-allowed"
              placeholder={tAuth("emailPlaceholder")}
            />
            <button
              type="button"
              onClick={() => setShowChangeEmailModal(true)}
              className="absolute right-3 rtl:right-auto rtl:left-3 top-1/2 -translate-y-1/2 text-primary hover:text-primary/80 soft flex items-center gap-1">
              <Edit2 size={16} />
              <span className="text-sm font-medium">{t("personalInfo.change")}</span>
            </button>
          </div>
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 text-right rtl:text-right ltr:text-left">
            {t("personalInfo.phone")}
          </label>
          <div className="relative">
            <Phone
              size={20}
              className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 text-gray-400 z-10"
            />
            <input
              type="tel"
              value={userData.phone || ""}
              readOnly
              className="w-full px-10 rtl:text-right py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:outline-none cursor-not-allowed"
              placeholder={tAuth("phonePlaceholder")}
              dir="ltr"
            />
            <button
              type="button"
              onClick={() => setShowChangePhoneModal(true)}
              className="absolute right-3 rtl:right-auto rtl:left-3 top-1/2 -translate-y-1/2 text-primary hover:text-primary/80 soft flex items-center gap-1 z-10">
              <Edit2 size={16} />
              <span className="text-sm font-medium">{t("personalInfo.change")}</span>
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full md:w-auto px-8 py-3 bg-primary hover:bg-primary/90 text-white font-medium rounded-xl soft focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50">
          {isLoading ? t("personalInfo.saving") : t("personalInfo.saveChanges")}
        </button>
      </form>

      {/* Change Email Modal */}
      {showChangeEmailModal &&
        typeof window !== "undefined" &&
        createPortal(
          <ChangeEmailModal
            currentEmail={userData.email}
            isOpen={showChangeEmailModal}
            onClose={() => setShowChangeEmailModal(false)}
            onSendCode={handleSendCode}
            isLoading={isSendingCode}
            t={t}
            tAuth={tAuth}
          />,
          document.body
        )}

      {/* Verify Email Modal */}
      {showVerifyEmailModal &&
        typeof window !== "undefined" &&
        createPortal(
          <VerifyEmailModal
            newEmail={newEmail}
            isOpen={showVerifyEmailModal}
            onClose={() => {
              setShowVerifyEmailModal(false);
              if (typeof window !== "undefined") {
                sessionStorage.removeItem("pendingEmailChange");
              }
              setNewEmail("");
            }}
            onVerify={handleVerifyEmail}
            onResend={handleResendCode}
            isLoading={isVerifying}
            isResending={isSendingCode}
            t={t}
          />,
          document.body
        )}

      {/* Change Phone Modal */}
      {showChangePhoneModal &&
        typeof window !== "undefined" &&
        createPortal(
          <ChangePhoneModal
            currentPhone={userData.phone || ""}
            isOpen={showChangePhoneModal}
            onClose={() => setShowChangePhoneModal(false)}
            onSendCode={handleSendPhoneCode}
            isLoading={isSendingPhoneCode}
            t={t}
            tAuth={tAuth}
          />,
          document.body
        )}

      {/* Verify Phone Modal */}
      {showVerifyPhoneModal &&
        typeof window !== "undefined" &&
        createPortal(
          <VerifyPhoneModal
            newPhone={newPhone}
            isOpen={showVerifyPhoneModal}
            onClose={() => {
              setShowVerifyPhoneModal(false);
              if (typeof window !== "undefined") {
                sessionStorage.removeItem("pendingPhoneChange");
                sessionStorage.removeItem("pendingPhoneCode");
              }
              setNewPhone("");
              setNewPhoneCode("");
              setNewPhoneNumber("");
            }}
            onVerify={handleVerifyPhone}
            onResend={handleResendPhoneCode}
            isLoading={isVerifyingPhone}
            isResending={isSendingPhoneCode}
            t={t}
          />,
          document.body
        )}
    </div>
  );
};

// Change Email Modal Component
interface ChangeEmailModalProps {
  currentEmail: string;
  isOpen: boolean;
  onClose: () => void;
  onSendCode: (email: string) => void;
  isLoading: boolean;
  t: (key: string) => string;
  tAuth: (key: string) => string;
}

const ChangeEmailModal = ({
  currentEmail,
  isOpen,
  onClose,
  onSendCode,
  isLoading,
  t,
  tAuth,
}: ChangeEmailModalProps) => {
  const [email, setEmail] = useState("");
  const locale = useLocale();
  const isRTL = locale === "ar";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email !== currentEmail) {
      onSendCode(email);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
      dir={isRTL ? "rtl" : "ltr"}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full shadow-2xl">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 text-right rtl:text-right ltr:text-left">
          {t("personalInfo.changeEmail")}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 text-right rtl:text-right ltr:text-left">
          {t("personalInfo.changeEmailDescription")}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 text-right rtl:text-right ltr:text-left">
              {tAuth("email")} *
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary text-right rtl:text-right ltr:text-left"
              placeholder={tAuth("emailPlaceholder")}
              required
            />
          </div>

          <div className={`flex gap-4 mt-6 ${isRTL ? "flex-row-reverse" : ""}`}>
            <button
              type="submit"
              disabled={isLoading || !email || email === currentEmail}
              className="flex-1 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed">
              {isLoading ? t("personalInfo.sending") : t("personalInfo.sendCode")}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors font-medium">
              {t("personalInfo.cancel")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Verify Email Modal Component
interface VerifyEmailModalProps {
  newEmail: string;
  isOpen: boolean;
  onClose: () => void;
  onVerify: (code: string) => void;
  onResend: () => void;
  isLoading: boolean;
  isResending: boolean;
  t: (key: string) => string;
}

const VerifyEmailModal = ({
  newEmail,
  isOpen,
  onClose,
  onVerify,
  onResend,
  isLoading,
  isResending,
  t,
}: VerifyEmailModalProps) => {
  const [code, setCode] = useState("");
  const locale = useLocale();
  const isRTL = locale === "ar";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.length === 6) {
      onVerify(code);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
      dir={isRTL ? "rtl" : "ltr"}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full shadow-2xl">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 text-right rtl:text-right ltr:text-left">
          {t("personalInfo.verifyEmail")}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 text-right rtl:text-right ltr:text-left">
          {t("personalInfo.verifyEmailDescription")}
        </p>
        <p className="text-sm font-medium text-primary mb-6 text-right rtl:text-right ltr:text-left break-all">
          {newEmail}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 text-right rtl:text-right ltr:text-left">
              {t("personalInfo.verificationCode")} *
            </label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary text-center text-2xl tracking-widest"
              placeholder="000000"
              maxLength={6}
              required
            />
          </div>

          <div className={`flex gap-4 mt-6 ${isRTL ? "flex-row-reverse" : ""}`}>
            <button
              type="submit"
              disabled={isLoading || code.length !== 6}
              className="flex-1 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed">
              {isLoading ? t("personalInfo.verifying") : t("personalInfo.verifyUpdate")}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors font-medium">
              {t("personalInfo.cancel")}
            </button>
          </div>

          <div className="text-center mt-4">
            <button
              type="button"
              onClick={onResend}
              disabled={isResending}
              className="text-sm text-primary hover:text-primary/80 disabled:opacity-50 disabled:cursor-not-allowed">
              {isResending ? t("personalInfo.resending") : t("personalInfo.resendCode")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Change Phone Modal Component
interface ChangePhoneModalProps {
  currentPhone: string;
  isOpen: boolean;
  onClose: () => void;
  onSendCode: (phoneCode: string, phoneNumber: string) => void;
  isLoading: boolean;
  t: (key: string) => string;
  tAuth: (key: string) => string;
}

const ChangePhoneModal = ({
  currentPhone,
  isOpen,
  onClose,
  onSendCode,
  isLoading,
  t,
  tAuth,
}: ChangePhoneModalProps) => {
  const [phone, setPhone] = useState("");
  const [phoneCode, setPhoneCode] = useState("");
  const locale = useLocale();
  const isRTL = locale === "ar";

  const handlePhoneChange = (
    phoneValue: string,
    meta: { country: { dialCode: string }; inputValue: string }
  ) => {
    setPhone(phoneValue);
    if (meta?.country?.dialCode) {
      setPhoneCode(`+${meta.country.dialCode}`);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone && phone !== currentPhone && phoneCode) {
      const phoneNumber = removeDialCode({
        phone: phone,
        dialCode: phoneCode.replace("+", ""),
        prefix: "+",
      });
      onSendCode(phoneCode, phoneNumber);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
      dir={isRTL ? "rtl" : "ltr"}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full shadow-2xl">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 text-right rtl:text-right ltr:text-left">
          {t("personalInfo.changePhone")}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 text-right rtl:text-right ltr:text-left">
          {t("personalInfo.changePhoneDescription")}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div dir="ltr">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 text-right rtl:text-right ltr:text-left">
              {tAuth("phone")} *
            </label>
            <PhoneInput
              defaultCountry="eg"
              value={phone}
              onChange={handlePhoneChange}
              inputClassName="!w-full !px-4 !py-3 !bg-gray-50 dark:!bg-gray-900 !rounded-r-xl !text-gray-900 dark:!text-white focus:!outline-none"
              countrySelectorStyleProps={{
                buttonClassName:
                  "!bg-gray-50 !px-2 dark:!bg-gray-900 !border !border-gray-200 dark:!border-gray-700 !rounded-l-xl",
                dropdownStyleProps: {
                  className:
                    "!bg-white dark:!bg-gray-800 !border !border-gray-200 dark:!border-gray-700 !rounded-xl !shadow-lg",
                },
              }}
            />
          </div>

          <div className={`flex gap-4 mt-6 ${isRTL ? "flex-row-reverse" : ""}`}>
            <button
              type="submit"
              disabled={isLoading || !phone || !phoneCode || phone === currentPhone}
              className="flex-1 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed">
              {isLoading ? t("personalInfo.sending") : t("personalInfo.sendCode")}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors font-medium">
              {t("personalInfo.cancel")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Verify Phone Modal Component
interface VerifyPhoneModalProps {
  newPhone: string;
  isOpen: boolean;
  onClose: () => void;
  onVerify: (code: string) => void;
  onResend: () => void;
  isLoading: boolean;
  isResending: boolean;
  t: (key: string) => string;
}

const VerifyPhoneModal = ({
  newPhone,
  isOpen,
  onClose,
  onVerify,
  onResend,
  isLoading,
  isResending,
  t,
}: VerifyPhoneModalProps) => {
  const [code, setCode] = useState("");
  const locale = useLocale();
  const isRTL = locale === "ar";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.length === 6) {
      onVerify(code);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
      dir={isRTL ? "rtl" : "ltr"}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full shadow-2xl">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 text-right rtl:text-right ltr:text-left">
          {t("personalInfo.verifyPhone")}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 text-right rtl:text-right ltr:text-left">
          {t("personalInfo.verifyPhoneDescription")}
        </p>
        <p
          dir="ltr"
          className="text-sm font-medium text-primary mb-6 text-right rtl:text-right ltr:text-left break-all">
          {newPhone}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 text-right rtl:text-right ltr:text-left">
              {t("personalInfo.verificationCode")} *
            </label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary text-center text-2xl tracking-widest"
              placeholder="000000"
              maxLength={6}
              required
            />
          </div>

          <div className={`flex gap-4 mt-6 ${isRTL ? "flex-row-reverse" : ""}`}>
            <button
              type="submit"
              disabled={isLoading || code.length !== 6}
              className="flex-1 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed">
              {isLoading ? t("personalInfo.verifying") : t("personalInfo.verifyUpdate")}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors font-medium">
              {t("personalInfo.cancel")}
            </button>
          </div>

          <div className="text-center mt-4">
            <button
              type="button"
              onClick={onResend}
              disabled={isResending}
              className="text-sm text-primary hover:text-primary/80 disabled:opacity-50 disabled:cursor-not-allowed">
              {isResending ? t("personalInfo.resending") : t("personalInfo.resendCode")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PersonalInfoTab;
