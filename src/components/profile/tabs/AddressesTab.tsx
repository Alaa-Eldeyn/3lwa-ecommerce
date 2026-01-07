"use client";

import { Plus } from "lucide-react";
import { useState } from "react";
import AddressModal, { Address } from "@/src/components/profile/components/AddressModal";
import AddressList from "@/src/components/profile/components/AddressList";
import { useAddresses } from "@/src/hooks/useAddresses";

interface AddressesTabProps {
  t: (key: string) => string;
}

const AddressesTab = ({ t }: AddressesTabProps) => {
  const [showModal, setShowModal] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);

  const { addresses, handleDeleteAddress, handleSetDefault, refetchAddresses } = useAddresses();

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
    <div>
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {t("addresses.title")}
          </h2>
          <p className="text-gray-600 dark:text-gray-400">{t("addresses.description")}</p>
        </div>
        <button
          onClick={handleAddNew}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl hover:bg-primary/90 soft text-sm">
          <Plus size={20} />
          {t("addresses.addNew")}
        </button>
      </div>

      <AddressList
        addresses={addresses}
        onEdit={handleEdit}
        onDelete={handleDeleteAddress}
        onSetDefault={handleSetDefault}
        selectable={false}
        showActions={true}
        t={t}
      />

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

export default AddressesTab;
