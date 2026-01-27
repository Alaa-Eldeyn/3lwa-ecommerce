"use client";
import { useUserStore } from "@/src/store/userStore";
import { Link } from "@/src/i18n/routing";
import { useTranslations } from "next-intl";
import React from "react";

const SignInPrompt = () => {
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);
  const t = useTranslations("home.signInPrompt");

  if (!isAuthenticated()) {
    return null;
  }

  return (
    <div className="border-t border-b border-gray-300 dark:border-gray-700 py-8 my-8 flex flex-col items-center justify-center bg-white dark:bg-gray-800 rounded shadow-sm">
      <div className="mb-2 text-sm text-gray-900 dark:text-gray-200">
        {t("personalizedRecommendations")}
      </div>
      <Link
        href="/login"
        className="bg-gradient-to-b from-[#ffefd6] to-[#f7dfb5] dark:from-[#ffefd6]/80 dark:to-[#f7dfb5]/80 border border-[#d6b06e] dark:border-[#d6b06e]/80 hover:bg-gradient-to-b hover:from-[#f7dfb5] hover:to-[#f0c14b] dark:hover:from-[#f7dfb5] dark:hover:to-[#f0c14b] text-black dark:text-gray-900 font-bold py-1.5 px-24 rounded-md text-sm shadow-sm mb-2">
        {t("signIn")}
      </Link>
      <div className="text-xs text-gray-700 dark:text-gray-300">
        {t("newCustomer")}{" "}
        <Link
          href="/register"
          className="text-primary dark:text-primary hover:text-red-700 dark:hover:text-red-400 hover:underline">
          {t("startHere")}
        </Link>
      </div>
    </div>
  );
};

export default SignInPrompt;
