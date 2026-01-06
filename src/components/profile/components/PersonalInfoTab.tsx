"use client";

import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail } from "lucide-react";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { profileSchema } from "@/src/schemas/schemas";
import { ProfileFormData } from "@/src/types/types";

interface PersonalInfoTabProps {
  userData: ProfileFormData;
  isLoading: boolean;
  onSubmit: (data: ProfileFormData) => void;
  t: (key: string) => string;
  tAuth: (key: string) => string;
}

const PersonalInfoTab = ({ userData, isLoading, onSubmit, t, tAuth }: PersonalInfoTabProps) => {
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
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10"
            />
            <input
              type="email"
              {...register("email")}
              className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary soft"
              placeholder={tAuth("emailPlaceholder")}
            />
          </div>
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>

        {/* Phone */}
        <div dir="ltr">
          <label className="block text-right text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t("personalInfo.phone")}
          </label>
          <Controller
            name="phone"
            control={control}
            render={({ field: { onChange, value } }) => (
              <PhoneInput
                defaultCountry="us"
                value={value || ""}
                onChange={onChange}
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
            )}
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full md:w-auto px-8 py-3 bg-primary hover:bg-primary/90 text-white font-medium rounded-xl soft focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50">
          {isLoading ? t("personalInfo.saving") : t("personalInfo.saveChanges")}
        </button>
      </form>
    </div>
  );
};

export default PersonalInfoTab;
