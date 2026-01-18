import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { customAxios } from "@/src/utils/customAxios";
import toast from "react-hot-toast";
import { Address, AddressFormData } from "@/src/components/profile/components/AddressModal";

export const useAddresses = () => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string>("");

  // Fetch addresses
  const { refetch: refetchAddresses, isLoading } = useQuery({
    queryKey: ["myAddresses"],
    queryFn: async () => {
      const res = await customAxios.get(`/CustomerAddress`);
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

  // Add address mutation
  const addAddressMutation = useMutation({
    mutationFn: async (data: AddressFormData) => {
      return await customAxios.post(`/CustomerAddress`, data);
    },
    onSuccess: () => {
      toast.success("تم إضافة العنوان بنجاح");
      refetchAddresses();
    },
    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.message || error?.response?.data?.errors?.[0] || "فشل إضافة العنوان";
      toast.error(errorMessage);
    },
  });

  // Update address mutation
  const updateAddressMutation = useMutation({
    mutationFn: async ({ addressId, data }: { addressId: string; data: AddressFormData }) => {
      return await customAxios.put(`/CustomerAddress/${addressId}`, data);
    },
    onSuccess: () => {
      toast.success("تم تحديث العنوان بنجاح");
      refetchAddresses();
    },
    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.message || error?.response?.data?.errors?.[0] || "فشل تحديث العنوان";
      toast.error(errorMessage);
    },
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
    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.message || error?.response?.data?.errors?.[0] || "فشل حذف العنوان";
      toast.error(errorMessage);
    },
  });

  // Set default address mutation
  const setDefaultAddressMutation = useMutation({
    mutationFn: async (addressId: string) => {
      return await customAxios.put(`/CustomerAddress/${addressId}/default`);
    },
    onSuccess: () => {
      toast.success("تم تعيين العنوان كافتراضي");
      refetchAddresses();
    },
    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.message ||
        error?.response?.data?.errors?.[0] ||
        "فشل تعيين العنوان كافتراضي";
      toast.error(errorMessage);
    },
  });

  const handleSelectAddress = (addressId: string) => {
    setSelectedAddressId(addressId);
  };

  const handleDeleteAddress = (addressId: string) => {
    deleteAddressMutation.mutate(addressId);
  };

  const handleSetDefault = (addressId: string) => {
    setDefaultAddressMutation.mutate(addressId);
  };

  const handleAddAddress = (data: AddressFormData) => {
    addAddressMutation.mutate(data);
  };

  const handleUpdateAddress = (addressId: string, data: AddressFormData) => {
    updateAddressMutation.mutate({ addressId, data });
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
    handleAddAddress,
    handleUpdateAddress,
    getSelectedAddress,
    refetchAddresses,
    addAddressMutation,
    updateAddressMutation,
    deleteAddressMutation,
    setDefaultAddressMutation,
  };
};
