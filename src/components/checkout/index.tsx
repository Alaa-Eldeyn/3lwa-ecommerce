"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import ContactInformation from "./components/ContactInformation";
import ShippingAddress from "./components/ShippingAddress";
import PaymentMethod from "./components/PaymentMethod";
import CheckoutSummary from "./components/CheckoutSummary";

const checkoutSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State/Province is required"),
  zipCode: z.string().min(3, "ZIP/Postal code is required"),
  country: z.string().min(2, "Country is required"),
  notes: z.string().optional(),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

const Checkout = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
  });

  const [paymentMethod, setPaymentMethod] = useState<"card" | "cash" | "wallet">("card");
  const [selectedAddress, setSelectedAddress] = useState<any>(null);

  const onSubmit = (data: CheckoutFormData) => {
    const orderData = {
      contactInfo: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
      },
      shippingAddress: selectedAddress || {
        streetAddress: data.address,
        city: data.city,
        state: data.state,
        zipCode: data.zipCode,
        country: data.country,
      },
      paymentMethod,
      notes: data.notes,
    };
    console.log("Order submitted:", orderData);
    // Handle form submission - send to backend
  };

  // Sample order data - replace with actual cart data
  const orderItems = [
    { id: 1, name: "T-shirt", price: 25, quantity: 2 },
    { id: 2, name: "Jeans", price: 55, quantity: 1 },
  ];
  const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 15;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  return (
    <div className="bg-gray-50 dark:bg-gray-950 py-12">
      <div className="container">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Checkout</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Side - Forms */}
            <div className="lg:col-span-2 space-y-6">
              <ContactInformation register={register} errors={errors} />

              <ShippingAddress
                register={register}
                errors={errors}
                onAddressChange={setSelectedAddress}
              />

              <PaymentMethod selectedMethod={paymentMethod} onChange={setPaymentMethod} />
            </div>

            {/* Right Side - Order Summary */}
            <div className="lg:col-span-1">
              <CheckoutSummary
                items={orderItems}
                subtotal={subtotal}
                shipping={shipping}
                tax={tax}
                total={total}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
