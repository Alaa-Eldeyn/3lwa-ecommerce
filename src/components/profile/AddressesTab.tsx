import { MapPin, Edit, Trash2, Plus } from "lucide-react";
import { Address } from "@/src/types/types";

interface AddressesTabProps {
  addresses: Address[];
  t: (key: string) => string;
  onAddAddress?: () => void;
  onEditAddress?: (id: string) => void;
  onDeleteAddress?: (id: string) => void;
}

const AddressesTab = ({ addresses, t, onAddAddress, onEditAddress, onDeleteAddress }: AddressesTabProps) => {
  return (
    <div>
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {t("addresses.title")}
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            {t("addresses.description")}
          </p>
        </div>
        <button 
          onClick={onAddAddress}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl hover:bg-primary/90 soft"
        >
          <Plus size={20} />
          {t("addresses.addNew")}
        </button>
      </div>

      {addresses.length === 0 ? (
        <div className="text-center py-12">
          <MapPin size={48} className="mx-auto mb-4 text-gray-400" />
          <p className="text-gray-600 dark:text-gray-400">
            {t("addresses.noAddresses")}
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {addresses.map((address) => (
            <div
              key={address.id}
              className="p-6 border border-gray-200 dark:border-gray-700 rounded-xl hover:border-primary soft"
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2">
                  <MapPin size={20} className="text-primary" />
                  <span className="font-medium text-gray-900 dark:text-white">
                    {t(`addresses.${address.type}`)}
                  </span>
                </div>
                {address.isDefault && (
                  <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-lg">
                    {t("addresses.default")}
                  </span>
                )}
              </div>
              <div className="text-gray-600 dark:text-gray-400 text-sm space-y-1 mb-4">
                <p>{address.addressLine1}</p>
                {address.addressLine2 && <p>{address.addressLine2}</p>}
                <p>
                  {address.city}, {address.state} {address.zipCode}
                </p>
                <p>{address.country}</p>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => onEditAddress?.(address.id)}
                  className="flex items-center gap-1 px-3 py-2 text-sm text-primary hover:bg-primary/10 rounded-lg soft"
                >
                  <Edit size={16} />
                  {t("addresses.edit")}
                </button>
                <button 
                  onClick={() => onDeleteAddress?.(address.id)}
                  className="flex items-center gap-1 px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg soft"
                >
                  <Trash2 size={16} />
                  {t("addresses.delete")}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AddressesTab;
