import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { customAxios } from "@/src/utils/customAxios";
import toast from "react-hot-toast";
import { Address } from "@/src/components/common/AddressModal";

export const useAddresses = () => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string>("");

  // Fetch addresses
  const { refetch: refetchAddresses, isLoading } = useQuery({
    queryKey: ["myAddresses"],
    queryFn: async () => {
      const res = await customAxios(`/CustomerAddress`);
      const data = res.data.data as Address[];
      setAddresses(data);
      
      // Auto-select default or first address
      const defaultAddress = data.find((addr) => addr.isDefault);
      const firstAddress = data[0];
      setSelectedAddressId(defaultAddress?.id || firstAddress?.id || "");
      
      return data;
    },
    refetchOnWindowFocus: false,
  });

  // Delete address mutation
  const deleteAddressMutation = useMutation({
    mutationFn: async (addressId: string) => {
      return await customAxios.delete(`/CustomerAddress/${addressId}`);
    },
    onSuccess: () => {
      toast.success("تم حذف العنوان بنجاح");
      refetchAddresses();
    },
    onError: () => {
      toast.error("فشل حذف العنوان");
    },
  });

  // Set default address mutation
  const setDefaultAddressMutation = useMutation({
    mutationFn: async (addressId: string) => {
      const address = addresses.find(a => a.id === addressId);
      if (!address) return;
      
      return await customAxios.put(`/CustomerAddress/${addressId}`, {
        ...address,
        setAsDefault: true,
      });
    },
    onSuccess: () => {
      toast.success("تم تعيين العنوان كافتراضي");
      refetchAddresses();
    },
    onError: () => {
      toast.error("فشل تعيين العنوان كافتراضي");
    },
  });

  const handleSelectAddress = (addressId: string) => {
    setSelectedAddressId(addressId);
  };

  const handleDeleteAddress = (addressId: string) => {
    if (confirm("هل أنت متأكد من حذف هذا العنوان؟")) {
      deleteAddressMutation.mutate(addressId);
    }
  };

  const handleSetDefault = (addressId: string) => {
    setDefaultAddressMutation.mutate(addressId);
  };

  const getSelectedAddress = () => {
    return addresses.find((addr) => addr.id === selectedAddressId) || null;
  };

  return {
    addresses,
    selectedAddressId,
    isLoading,
    handleSelectAddress,
    handleDeleteAddress,
    handleSetDefault,
    getSelectedAddress,
    refetchAddresses,
  };
};
