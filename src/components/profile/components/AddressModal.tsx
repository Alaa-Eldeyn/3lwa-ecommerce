"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { createPortal } from "react-dom";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { parsePhoneNumber } from "libphonenumber-js";
import { useMutation, useQuery } from "@tanstack/react-query";
import { customAxios } from "@/src/utils/customAxios";
import { useEffect } from "react";

interface City {
  titleAr: string;
  titleEn: string;
  stateId: string;
  id: string;
}

export interface Address {
  id: string;
  cityId: string;
  phoneCode: string;
  phoneNumber: string;
  recipientName: string;
  setAsDefault: boolean;
  isDefault?: boolean;
  city?: City;
  address?: string;
  cityName?: string;
  stateName?: string;
  countryName?: string;
  createdDate?: string;
}

interface AddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingAddress?: Address | null;
  onSuccess?: () => void;
  isFirstAddress?: boolean;
}

// Validation Schema
const addressSchema = z.object({
  recipientName: z.string().min(2, "اسم المستلم يجب أن يكون حرفين على الأقل"),
  cityId: z.string().min(1, "يرجى اختيار المدينة"),
  phone: z.string().min(10, "رقم الهاتف غير صحيح"),
  setAsDefault: z.boolean(),
});

type AddressFormSchema = z.infer<typeof addressSchema>;

export interface AddressFormData {
  cityId: string;
  phoneCode: string;
  phoneNumber: string;
  recipientName: string;
  setAsDefault: boolean;
}

const AddressModal = ({
  isOpen,
  onClose,
  editingAddress,
  onSuccess,
  isFirstAddress = false,
}: AddressModalProps) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors: formErrors },
  } = useForm<AddressFormSchema>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      recipientName: "",
      cityId: "",
      phone: "+20",
      setAsDefault: isFirstAddress,
    },
  });

  // Fetch cities
  const { data: citiesData } = useQuery({
    queryKey: ["cities"],
    queryFn: async () => {
      const res = await customAxios(`/City`);
      return res.data.data as City[];
    },
    refetchOnWindowFocus: false,
  });

  const cities = citiesData || [];

  // Save address mutation
  const saveAddressMutation = useMutation({
    mutationFn: async (data: AddressFormData) => {
      if (editingAddress) {
        return await customAxios.put(`/CustomerAddress/${editingAddress.id}`, data);
      }
      return await customAxios.post(`/CustomerAddress`, data);
    },
    onSuccess: () => {
      onSuccess?.();
      onClose();
      reset();
    },
  });

  // Update form when editing address changes
  useEffect(() => {
    if (editingAddress) {
      const fullPhone = `+${editingAddress.phoneCode}${editingAddress.phoneNumber}`;
      reset({
        recipientName: editingAddress.recipientName,
        cityId: editingAddress.cityId,
        phone: fullPhone,
        setAsDefault: editingAddress.setAsDefault,
      });
    } else {
      reset({
        recipientName: "",
        cityId: "",
        phone: "+20",
        setAsDefault: isFirstAddress,
      });
    }
  }, [editingAddress, isFirstAddress, reset]);

  const onSubmitForm = (formData: AddressFormSchema, e?: React.BaseSyntheticEvent) => {
    e?.preventDefault();
    e?.stopPropagation();

    let phoneCode = "20";
    let phoneNumber = "";

    if (formData.phone) {
      try {
        const parsed = parsePhoneNumber(formData.phone);
        if (parsed) {
          phoneCode = parsed.countryCallingCode;
          phoneNumber = parsed.nationalNumber;
        }
      } catch (error) {
        console.error("Phone parsing error:", error);
      }
    }

    const dataToSend: AddressFormData = {
      cityId: formData.cityId,
      phoneCode,
      phoneNumber,
      recipientName: formData.recipientName,
      setAsDefault: formData.setAsDefault,
    };

    saveAddressMutation.mutate(dataToSend);
  };

  if (!isOpen || typeof window === "undefined") return null;

  return createPortal(
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-gray-900 rounded-3xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
          {editingAddress ? "تعديل العنوان" : "إضافة عنوان جديد"}
        </h3>

        <form
          onSubmit={(e) => {
            e.stopPropagation();
            handleSubmit(onSubmitForm)(e);
          }}
          className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              اسم المستلم *
            </label>
            <Controller
              name="recipientName"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="أحمد محمد"
                />
              )}
            />
            {formErrors.recipientName && (
              <p className="text-red-500 text-sm mt-1">{formErrors.recipientName.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              المدينة *
            </label>
            <Controller
              name="cityId"
              control={control}
              render={({ field }) => (
                <select
                  {...field}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary">
                  <option value="">اختر المدينة</option>
                  {cities.map((city) => (
                    <option key={city.id} value={city.id}>
                      {city.titleAr}
                    </option>
                  ))}
                </select>
              )}
            />
            {formErrors.cityId && (
              <p className="text-red-500 text-sm mt-1">{formErrors.cityId.message}</p>
            )}
          </div>

          <div dir="ltr">
            <label className="block text-right text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              رقم الهاتف *
            </label>
            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <PhoneInput
                  international
                  defaultCountry="EG"
                  value={field.value || ""}
                  onChange={field.onChange}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                />
              )}
            />
            {formErrors.phone && (
              <p dir="rtl" className="text-red-500 text-sm mt-1">
                {formErrors.phone.message}
              </p>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Controller
              name="setAsDefault"
              control={control}
              render={({ field }) => (
                <input
                  type="checkbox"
                  id="setAsDefault"
                  checked={field.value}
                  onChange={field.onChange}
                  className="w-4 h-4 text-primary bg-gray-50 border-gray-300 rounded focus:ring-primary focus:ring-2"
                />
              )}
            />
            <label
              htmlFor="setAsDefault"
              className="text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer">
              تعيين كعنوان افتراضي
            </label>
          </div>

          <div className="flex gap-4 mt-6">
            <button
              type="submit"
              disabled={saveAddressMutation.isPending}
              className="flex-1 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed">
              {saveAddressMutation.isPending
                ? "جاري الحفظ..."
                : editingAddress
                ? "حفظ التعديلات"
                : "إضافة العنوان"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors font-medium">
              إلغاء
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
};

export default AddressModal;
