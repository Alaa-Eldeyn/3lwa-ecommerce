"use client";
import { MapPin, Plus, Star, Phone, Flag, Map, Building2, MapPinned } from "lucide-react";
import { useState } from "react";
import AddressModal, { Address } from "@/src/components/profile/components/AddressModal";
import { useAddresses } from "@/src/hooks/useAddresses";
import { useEffect } from "react";
import { useLocale } from "next-intl";

interface ShippingAddressProps {
  onAddressChange?: (address: Address | null) => void;
}

const ShippingAddress = ({ onAddressChange }: ShippingAddressProps) => {
  const [showModal, setShowModal] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);

  const { addresses, selectedAddressId, handleSelectAddress, refetchAddresses } = useAddresses();

  // Notify parent of selected address changes
  useEffect(() => {
    if (onAddressChange) {
      const selectedAddress = addresses.find((addr) => addr.id === selectedAddressId);
      onAddressChange(selectedAddress || null);
    }
  }, [selectedAddressId, addresses, onAddressChange]);

  const handleAddNew = () => {
    setEditingAddress(null);
    setShowModal(true);
  };

  const handleModalSuccess = () => {
    refetchAddresses();
    setShowModal(false);
    setEditingAddress(null);
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <MapPin size={24} className="text-primary" />
          عناوين الشحن
        </h2>
        <button
          type="button"
          onClick={handleAddNew}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors">
          <Plus size={20} />
          إضافة عنوان جديد
        </button>
      </div>

      {/* عرض العناوين الموجودة */}
      <CheckoutAddressList
        addresses={addresses}
        selectedAddressId={selectedAddressId}
        onSelect={handleSelectAddress}
      />

      {/* Modal للإضافة/التعديل */}
      <AddressModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setEditingAddress(null);
        }}
        editingAddress={editingAddress}
        onSuccess={handleModalSuccess}
        isFirstAddress={addresses.length === 0}
      />
    </div>
  );
};

// Simplified Address List Component for Checkout
interface CheckoutAddressListProps {
  addresses: Address[];
  selectedAddressId?: string;
  onSelect: (addressId: string) => void;
}

const CheckoutAddressList = ({
  addresses,
  selectedAddressId,
  onSelect,
}: CheckoutAddressListProps) => {
  const locale = useLocale();

  if (!addresses || addresses.length === 0) {
    return (
      <div className="bg-gray-50 dark:bg-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-8 text-center">
        <MapPin className="text-gray-400 mx-auto mb-2" size={32} />
        <p className="text-gray-500 dark:text-gray-400">
          {locale === "ar" ? "لا توجد عناوين" : "No addresses found"}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {addresses.map((address) => {
        const isSelected = selectedAddressId === address.id;
        const isDefault = address.isDefault || false;
        const addressInfo = [address.cityName, address.stateName, address.countryName]
          .filter(Boolean)
          .join(", ");

        return (
          <label
            key={address.id}
            className={`flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer transition-all ${
              isSelected
                ? "border-primary bg-primary/5"
                : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
            }`}>
            <input
              type="radio"
              name="shipping-address"
              value={address.id}
              checked={isSelected}
              onChange={() => onSelect(address.id)}
              className="w-5 h-5 text-primary focus:ring-primary"
            />
            <div className="flex items-center gap-3 flex-1">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-semibold text-gray-900 dark:text-white truncate">
                    {address.recipientName}
                  </p>
                  {isDefault && (
                    <span className="bg-primary text-white px-2 py-0.5 rounded-full text-xs font-medium flex items-center gap-1">
                      <Star size={10} className="fill-current" />
                      {locale === "ar" ? "افتراضي" : "Default"}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                  {address.phoneNumber && (
                    <div className="flex items-center gap-1.5">
                      <Phone size={14} />
                      <span dir="ltr">
                        +{address.phoneCode} {address.phoneNumber}
                      </span>
                    </div>
                  )}
                </div>

                {/* Address Details */}
                <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-3 gap-2 mt-2">
                  {/* Address */}
                  {address.address && (
                    <div className="flex items-start gap-2 mb-2">
                      <MapPinned
                        className={`text-sm mt-0.5 ${
                          isDefault ? "text-primary" : "text-secondary"
                        }`}
                        size={14}
                      />
                      <p className="text-gray-900 dark:text-white font-medium text-sm leading-relaxed">
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
                          {address.city?.titleAr ||
                            address.city?.titleEn ||
                            (locale === "ar" ? "المدينة غير محددة" : "City not specified")}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </label>
        );
      })}
    </div>
  );
};

export default ShippingAddress;
