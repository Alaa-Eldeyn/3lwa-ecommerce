"use client";

import {
  MapPin,
  Star,
  Edit2,
  Trash2,
  Phone,
  MapPinned,
  Building2,
  Map,
  Flag,
  Clock,
} from "lucide-react";
import { Address } from "@/src/components/profile/components/AddressModal";

interface AddressListProps {
  addresses: Address[];
  selectedAddressId?: string;
  onSelect?: (addressId: string) => void;
  onEdit?: (address: Address) => void;
  onDelete?: (addressId: string) => void;
  onSetDefault?: (addressId: string) => void;
  selectable?: boolean;
  showActions?: boolean;
  t?: (key: string) => string;
}

const AddressList = ({
  addresses,
  onSelect,
  onEdit,
  onDelete,
  onSetDefault,
  selectable = false,
  showActions = true,
  t,
}: AddressListProps) => {
  // Format date helper
  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("ar-EG", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return "";
    }
  };

  // Empty state
  if (!addresses || addresses.length === 0) {
    return (
      <div className="bg-accent/30 border-2 border-dashed border-primary rounded-xl p-16 text-center">
        <div className="flex flex-col items-center gap-6">
          <div className="bg-primary/10 rounded-full w-24 h-24 flex items-center justify-center">
            <MapPin className="text-primary text-5xl" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              {t?.("addresses.noAddresses") || "No Addresses Found"}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-lg mb-6">
              {t?.("addresses.emptyDescription") ||
                "You haven't added any delivery addresses yet. Add your first address to get started."}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {addresses.map((address) => {
        const isDefault = address.isDefault || false;
        const formattedDate = formatDate(address.createdDate);

        return (
          <div
            key={address.id}
            onClick={() => selectable && onSelect?.(address.id)}
            className={`bg-white dark:bg-gray-800 rounded-lg p-4 transition-all duration-300 relative ${
              isDefault
                ? "border-2 border-primary"
                : "border border-gray-200 dark:border-gray-700 hover:border-primary"
            } ${selectable ? "cursor-pointer" : ""}`}>
            {/* Header Section */}
            <div className={`flex items-start justify-between mb-3`}>
              <div className="flex items-center gap-3">
                <div
                  className={`rounded-full w-10 h-10 flex items-center justify-center ${
                    isDefault ? "bg-primary" : "bg-gray-100 dark:bg-gray-700"
                  }`}>
                  <MapPin
                    className={`text-lg ${isDefault ? "text-white" : "text-primary"}`}
                    size={18}
                  />
                </div>
                <div>
                  <h3 className="text-base font-bold text-gray-900 dark:text-white mb-0.5">
                    {address.recipientName}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 flex items-center gap-1.5 text-xs">
                    <Phone className="text-primary" size={10} />
                    <span dir="ltr" className="font-medium">
                      +{address.phoneCode} {address.phoneNumber}
                    </span>
                  </p>
                </div>
              </div>

              {/* Default Badge */}
              {isDefault && (
                <div className="bg-primary text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5">
                  <Star size={10} className="fill-current" />
                  {t?.("addresses.default") || "Default"}
                </div>
              )}

              {/* Set Default Button */}
              {!isDefault && onSetDefault && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSetDefault(address.id);
                  }}
                  className="text-gray-400 hover:text-primary transition-colors duration-300">
                  <Star size={18} className="stroke-current fill-none" />
                </button>
              )}
            </div>

            {/* Address Details */}
            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-3 gap-2 mb-3">
              {/* Address */}
              {address.address && (
                <div className="flex items-center gap-2">
                  <MapPinned
                    className={`text-sm mt-0.5 ${isDefault ? "text-primary" : "text-secondary"}`}
                    size={14}
                  />
                  <p className="text-gray-900 dark:text-white font-medium text-sm leading-relaxed mb-2">
                    {address.address}
                  </p>
                </div>
              )}

              {/* City, State, Country */}
              <div className="flex items-center gap-4 text-xs flex-wrap">
                {/* City */}
                {address.cityName && (
                  <div className="flex items-center gap-1.5">
                    <Building2 className="text-secondary" size={10} />
                    <span className="text-gray-700 dark:text-gray-300 font-medium">
                      {address.cityName}
                    </span>
                  </div>
                )}

                {/* State */}
                {address.stateName && (
                  <div className="flex items-center gap-1.5">
                    <Map className="text-secondary" size={10} />
                    <span className="text-gray-700 dark:text-gray-300 font-medium">
                      {address.stateName}
                    </span>
                  </div>
                )}

                {/* Country */}
                {address.countryName && (
                  <div className="flex items-center gap-1.5">
                    <Flag className="text-secondary" size={10} />
                    <span className="text-gray-700 dark:text-gray-300 font-medium">
                      {address.countryName}
                    </span>
                  </div>
                )}

                 {/* City not specified */}
                 {!address.cityName && !address.stateName && !address.countryName && (
                   <div className="flex items-center gap-1.5">
                     <Building2 className="text-secondary" size={10} />
                     <span className="text-gray-700 dark:text-gray-300 font-medium">
                       {address.city?.titleAr || address.city?.titleEn || t?.("addresses.cityNotSpecified") || "City not specified"}
                     </span>
                   </div>
                 )}
              </div>
            </div>

            {/* Footer Actions */}
            {showActions && (
              <div className="flex items-center justify-between gap-2">
                {/* Date */}
                {formattedDate && (
                  <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                    <Clock size={10} />
                    <span>
                      {t?.("addresses.addedOn") || "Added on"} {formattedDate}
                    </span>
                  </div>
                )}

                {/* Edit and Delete Buttons */}
                <div className="flex items-center gap-2">
                  {onEdit && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onEdit(address);
                      }}
                      className="bg-secondary hover:bg-header dark:bg-secondary dark:hover:bg-header text-white px-3 py-1.5 rounded-lg transition-all duration-300 flex items-center gap-1.5 font-medium text-xs">
                      <Edit2 size={10} />
                      {t?.("addresses.edit") || "Edit"}
                    </button>
                  )}
                  {onDelete && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete(address.id);
                      }}
                      className="bg-gray-200 dark:bg-gray-700 hover:bg-red-100 dark:hover:bg-red-900/30 text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 px-3 py-1.5 rounded-lg transition-all duration-300 flex items-center gap-1.5 font-medium text-xs">
                      <Trash2 size={10} />
                      {t?.("addresses.delete") || "Delete"}
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default AddressList;
