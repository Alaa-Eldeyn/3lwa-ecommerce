"use client";

import { Check, Edit2, MapPin, Trash2 } from "lucide-react";
import { Address } from "@/src/components/common/AddressModal";

interface AddressListProps {
  addresses: Address[];
  selectedAddressId?: string;
  onSelect?: (addressId: string) => void;
  onEdit?: (address: Address) => void;
  onDelete?: (addressId: string) => void;
  onSetDefault?: (addressId: string) => void;
  selectable?: boolean;
  showActions?: boolean;
}

const AddressList = ({
  addresses,
  selectedAddressId,
  onSelect,
  onEdit,
  onDelete,
  onSetDefault,
  selectable = false,
  showActions = true,
}: AddressListProps) => {
  if (!addresses || addresses.length === 0) {
    return (
      <div className="text-center py-12">
        <MapPin size={48} className="mx-auto mb-4 text-gray-400" />
        <p className="text-gray-600 dark:text-gray-400">
          لا توجد عناوين محفوظة بعد
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {addresses.map((address) => (
        <div
          key={address.id}
          onClick={() => selectable && onSelect?.(address.id)}
          className={`p-4 border-2 rounded-xl transition-all ${
            selectable ? "cursor-pointer" : ""
          } ${
            selectable && selectedAddressId === address.id
              ? "border-primary bg-primary/5 dark:bg-primary/10"
              : "border-gray-200 dark:border-gray-700 hover:border-primary/50"
          }`}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3 flex-1">
              {selectable && (
                <div
                  className={`mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                    selectedAddressId === address.id
                      ? "border-primary bg-primary"
                      : "border-gray-300 dark:border-gray-600"
                  }`}
                >
                  {selectedAddressId === address.id && (
                    <Check size={14} className="text-white" />
                  )}
                </div>
              )}
              
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-gray-900 dark:text-white">
                    {address.recipientName}
                  </h3>
                  {address.isDefault && (
                    <span className="px-2 py-0.5 text-xs bg-primary/10 text-primary rounded-full">
                      افتراضي
                    </span>
                  )}
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">
                  {address.city?.titleAr || "لم يتم تحديد المدينة"}
                </p>
                <p
                  dir="ltr"
                  className="text-gray-600 dark:text-gray-400 text-sm mt-1 text-right"
                >
                  +{address.phoneCode} {address.phoneNumber} 📱
                </p>
              </div>
            </div>

            {showActions && (
              <div className="flex gap-2">
                {!address.isDefault && onSetDefault && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSetDefault(address.id);
                    }}
                    className="text-gray-400 hover:text-primary transition-colors p-2"
                    title="تعيين كافتراضي"
                  >
                    <Check size={18} />
                  </button>
                )}
                
                {onEdit && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit(address);
                    }}
                    className="text-gray-400 hover:text-primary transition-colors p-2"
                    title="تعديل"
                  >
                    <Edit2 size={18} />
                  </button>
                )}

                {onDelete && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(address.id);
                    }}
                    className="text-gray-400 hover:text-red-600 transition-colors p-2"
                    title="حذف"
                  >
                    <Trash2 size={18} />
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AddressList;
