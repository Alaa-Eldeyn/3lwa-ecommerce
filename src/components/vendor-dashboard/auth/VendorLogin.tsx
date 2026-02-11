"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import axios from "axios";
import { Link, useRouter } from "@/src/i18n/routing";
import { loginVendor } from "@/src/auth/auth";

export function VendorLogin() {
  const t = useTranslations("vendorLogin");
  const router = useRouter();
  const locale = useLocale();
  const isArabic = locale === "ar";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [lockedMessage, setLockedMessage] = useState(false);
  const [apiErrorText, setApiErrorText] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(false);
    setLockedMessage(false);
    setApiErrorText("");
    setIsSubmitting(true);

    try {
      await loginVendor(email.trim(), password);
      router.push("/vendor/dashboard");
    } catch (error) {
      const message = axios.isAxiosError(error)
        ? (error.response?.data?.message as string | undefined)
        : error instanceof Error
        ? error.message
        : t("invalidCredentials");
      const lower = (message || "").toLowerCase();
      if (lower.includes("lock") || lower.includes("locked") || lower.includes("مقفل")) {
        setLockedMessage(true);
      } else {
        setApiErrorText(message || t("invalidCredentials"));
        setErrorMessage(true);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="login-container" className="h-screen w-full flex">
      <div id="left-section" className="w-1/2 bg-header flex items-center justify-center p-12">
        <div className="max-w-md">
          <div className="mb-8">
            <Image
              src="/images/logo/logogt.png"
              alt="Basit"
              width={200}
              height={50}
              className="object-contain mb-6"
            />
            <p className="text-white/90 text-xl font-medium mb-2">{t("vendorDashboard")}</p>
            <p className="text-white/70 text-base leading-relaxed">{t("tagline")}</p>
          </div>
          <div className="space-y-6 mt-12">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <i className="fa-solid fa-box text-white text-xl" aria-hidden />
              </div>
              <div>
                <h3 className="text-white font-semibold text-lg mb-1">{t("catalogManagement")}</h3>
                <p className="text-white/70 text-sm">{t("catalogManagementDesc")}</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <i className="fa-solid fa-chart-line text-white text-xl" aria-hidden />
              </div>
              <div>
                <h3 className="text-white font-semibold text-lg mb-1">{t("salesAnalytics")}</h3>
                <p className="text-white/70 text-sm">{t("salesAnalyticsDesc")}</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <i className="fa-solid fa-wallet text-white text-xl" aria-hidden />
              </div>
              <div>
                <h3 className="text-white font-semibold text-lg mb-1">{t("walletPayouts")}</h3>
                <p className="text-white/70 text-sm">{t("walletPayoutsDesc")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="right-section" className="w-1/2 flex items-center justify-center p-12 bg-white">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-2">{t("welcomeBack")}</h2>
            <p className="text-gray-600">{t("signInSubtitle")}</p>
          </div>
          {errorMessage && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
              <div className="flex items-start gap-3">
                <i
                  className="fa-solid fa-circle-exclamation text-red-500 text-lg mt-0.5"
                  aria-hidden
                />
                <div className="flex-1">
                  <h4 className="text-red-800 font-semibold text-sm mb-1">{t("authFailed")}</h4>
                  <p className="text-red-700 text-sm">{apiErrorText || t("invalidCredentials")}</p>
                </div>
              </div>
            </div>
          )}
          {lockedMessage && (
            <div className="mb-6 p-4 bg-orange-50 border border-orange-200 rounded-xl">
              <div className="flex items-start gap-3">
                <i className="fa-solid fa-lock text-orange-500 text-lg mt-0.5" aria-hidden />
                <div className="flex-1">
                  <h4 className="text-orange-800 font-semibold text-sm mb-1">
                    {t("accountLocked")}
                  </h4>
                  <p className="text-orange-700 text-sm">{t("accountLockedMessage")}</p>
                </div>
              </div>
            </div>
          )}
          <form id="login-form" className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-foreground mb-2">
                {t("email")}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <i className="fa-solid fa-envelope text-gray-400" aria-hidden />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("emailPlaceholder")}
                  className="w-full pl-11 pr-4 py-3.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  required
                  autoComplete="email"
                  disabled={isSubmitting}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-foreground mb-2">
                {t("password")}
              </label>
              <div className="relative mb-2">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <i className="fa-solid fa-lock text-gray-400" aria-hidden />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t("passwordPlaceholder")}
                  className="w-full pl-11 pr-12 py-3.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  required
                  autoComplete="current-password"
                  disabled={isSubmitting}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label={showPassword ? t("hidePassword") : t("showPassword")}>
                  <i
                    className={showPassword ? "fa-solid fa-eye-slash" : "fa-solid fa-eye"}
                    aria-hidden
                  />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <Link
                  href="/vendor/forgot-password"
                  className="text-sm font-semibold text-primary hover:text-header transition-colors">
                  {t("forgotPassword")}
                </Link>
              </div>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary hover:bg-secondary text-white font-semibold py-3.5 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed">
              {isSubmitting ? (
                <>
                  <i className="fa-solid fa-spinner fa-spin" aria-hidden />
                  <span>{t("signIn")}</span>
                </>
              ) : (
                <>
                  <span>{t("signIn")}</span>
                  <i
                    className={`fa-solid fa-arrow-right ${isArabic ? "fa-flip-horizontal" : ""}`}
                    aria-hidden
                  />
                </>
              )}
            </button>
          </form>
          <div className="mt-8 text-center">
            <p className="text-gray-600 text-sm">
              {t("noVendorAccount")}{" "}
              <Link
                href="/vendor/register"
                className="font-semibold text-primary hover:text-header transition-colors">
                {t("registerNow")}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
