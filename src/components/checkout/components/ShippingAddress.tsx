"use client";
import { MapPin, Plus } from "lucide-react";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { useState } from "react";
import AddressModal, { Address } from "@/src/components/common/AddressModal";
import AddressList from "@/src/components/common/AddressList";
import { useAddresses } from "@/src/hooks/useAddresses";
import { useEffect } from "react";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  notes?: string;
}

interface ShippingAddressProps {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
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

  const handleEdit = (address: Address) => {
    setEditingAddress(address);
    setShowModal(true);
  };

  const handleModalSuccess = () => {
    refetchAddresses();
    setShowModal(false);
    setEditingAddress(null);
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 border border-gray-200 dark:border-gray-700">
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
      <AddressList
        addresses={addresses}
        selectedAddressId={selectedAddressId}
        onSelect={handleSelectAddress}
        onEdit={handleEdit}
        selectable={true}
        showActions={true}
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

export default ShippingAddress;
