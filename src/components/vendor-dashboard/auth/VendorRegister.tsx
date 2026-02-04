"use client";

import { useState } from "react";
import { Link } from "@/src/i18n/routing";

const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const validatePhone = (phone: string) => /^[\d\s+\-()]+$/.test(phone) && phone.replace(/\D/g, "").length >= 10;
const validatePassword = (password: string) => password.length >= 8 && /[a-zA-Z]/.test(password) && /\d/.test(password);

export function VendorRegister() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const setError = (field: string, message: string) => setErrors((e) => ({ ...e, [field]: message }));
  const clearError = (field: string) => setErrors((e) => ({ ...e, [field]: "" }));

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const vendorName = (fd.get("vendor-name") as string)?.trim();
    const email = (fd.get("email") as string)?.trim();
    const phone = (fd.get("phone") as string)?.trim();
    const country = fd.get("country") as string;
    const businessName = (fd.get("business-name") as string)?.trim();
    const businessType = fd.get("business-type") as string;
    const taxId = (fd.get("tax-id") as string)?.trim();
    const businessAddress = (fd.get("business-address") as string)?.trim();
    const password = fd.get("password") as string;
    const confirmPassword = fd.get("confirm-password") as string;
    const terms = (fd.get("terms") as string) === "on";

    const newErrors: Record<string, string> = {};
    if (!vendorName) newErrors["vendor-name"] = "Vendor name is required";
    if (!email) newErrors["email"] = "Email is required";
    else if (!validateEmail(email)) newErrors["email"] = "Please enter a valid email address";
    if (!phone) newErrors["phone"] = "Phone number is required";
    else if (!validatePhone(phone)) newErrors["phone"] = "Please enter a valid phone number";
    if (!country) newErrors["country"] = "Please select a country";
    if (!businessName) newErrors["business-name"] = "Business name is required";
    if (!businessType) newErrors["business-type"] = "Please select business type";
    if (!taxId) newErrors["tax-id"] = "Tax ID is required";
    if (!businessAddress) newErrors["business-address"] = "Business address is required";
    if (!password) newErrors["password"] = "Password is required";
    else if (!validatePassword(password)) newErrors["password"] = "Password must be at least 8 characters with letters and numbers";
    if (!confirmPassword) newErrors["confirm-password"] = "Please confirm your password";
    else if (confirmPassword !== password) newErrors["confirm-password"] = "Passwords do not match";
    if (!terms) newErrors["terms"] = "You must agree to the terms and conditions";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      window.location.href = "/vendor/account-verification";
    }, 2000);
  };

  return (
    <>
      <div id="main-content" className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div id="registration-container" className="max-w-4xl mx-auto">
          <div id="registration-header" className="text-center mb-8">
            <div className="mx-auto h-16 w-16 bg-primary rounded-full flex items-center justify-center mb-6">
              <i className="fa-solid fa-store text-white text-2xl" aria-hidden />
            </div>
            <h2 className="text-3xl font-bold text-foreground">Vendor Registration</h2>
            <p className="mt-2 text-gray-600">Create your vendor account to start selling on Basit</p>
          </div>

          <div id="registration-form-container" className="bg-white rounded-lg shadow-lg p-8">
            <form id="registration-form" className="space-y-8" onSubmit={handleSubmit}>
              <div id="vendor-info-section" className="space-y-6">
                <div className="border-b border-gray-200 pb-4">
                  <h3 className="text-lg font-semibold text-foreground flex items-center">
                    <i className="fa-solid fa-user-circle text-primary mr-2" aria-hidden />
                    Vendor Information
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <label htmlFor="vendor-name" className="block text-sm font-medium text-foreground">
                      Vendor Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="vendor-name"
                      name="vendor-name"
                      type="text"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                      placeholder="Enter your full name"
                    />
                    {errors["vendor-name"] && (
                      <div className="text-red-500 text-sm mt-1">
                        <i className="fa-solid fa-exclamation-circle mr-1" aria-hidden />
                        {errors["vendor-name"]}
                      </div>
                    )}
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="email" className="block text-sm font-medium text-foreground">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                      placeholder="vendor@example.com"
                    />
                    {errors["email"] && (
                      <div className="text-red-500 text-sm mt-1">
                        <i className="fa-solid fa-exclamation-circle mr-1" aria-hidden />
                        {errors["email"]}
                      </div>
                    )}
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="phone" className="block text-sm font-medium text-foreground">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                      placeholder="+1 (555) 000-0000"
                    />
                    {errors["phone"] && (
                      <div className="text-red-500 text-sm mt-1">
                        <i className="fa-solid fa-exclamation-circle mr-1" aria-hidden />
                        {errors["phone"]}
                      </div>
                    )}
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="country" className="block text-sm font-medium text-foreground">
                      Country <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="country"
                      name="country"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                    >
                      <option value="">Select country</option>
                      <option value="us">United States</option>
                      <option value="uk">United Kingdom</option>
                      <option value="ca">Canada</option>
                      <option value="au">Australia</option>
                      <option value="de">Germany</option>
                      <option value="fr">France</option>
                      <option value="other">Other</option>
                    </select>
                    {errors["country"] && (
                      <div className="text-red-500 text-sm mt-1">
                        <i className="fa-solid fa-exclamation-circle mr-1" aria-hidden />
                        {errors["country"]}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div id="business-info-section" className="space-y-6">
                <div className="border-b border-gray-200 pb-4">
                  <h3 className="text-lg font-semibold text-foreground flex items-center">
                    <i className="fa-solid fa-building text-primary mr-2" aria-hidden />
                    Business Information
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <label htmlFor="business-name" className="block text-sm font-medium text-foreground">
                      Business Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="business-name"
                      name="business-name"
                      type="text"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                      placeholder="Your Business LLC"
                    />
                    {errors["business-name"] && (
                      <div className="text-red-500 text-sm mt-1">
                        <i className="fa-solid fa-exclamation-circle mr-1" aria-hidden />
                        {errors["business-name"]}
                      </div>
                    )}
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="business-type" className="block text-sm font-medium text-foreground">
                      Business Type <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="business-type"
                      name="business-type"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                    >
                      <option value="">Select business type</option>
                      <option value="sole-proprietor">Sole Proprietorship</option>
                      <option value="llc">Limited Liability Company (LLC)</option>
                      <option value="corporation">Corporation</option>
                      <option value="partnership">Partnership</option>
                      <option value="other">Other</option>
                    </select>
                    {errors["business-type"] && (
                      <div className="text-red-500 text-sm mt-1">
                        <i className="fa-solid fa-exclamation-circle mr-1" aria-hidden />
                        {errors["business-type"]}
                      </div>
                    )}
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="tax-id" className="block text-sm font-medium text-foreground">
                      Tax ID / EIN <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="tax-id"
                      name="tax-id"
                      type="text"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                      placeholder="XX-XXXXXXX"
                    />
                    {errors["tax-id"] && (
                      <div className="text-red-500 text-sm mt-1">
                        <i className="fa-solid fa-exclamation-circle mr-1" aria-hidden />
                        {errors["tax-id"]}
                      </div>
                    )}
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="registration-number" className="block text-sm font-medium text-foreground">
                      Business Registration Number
                    </label>
                    <input
                      id="registration-number"
                      name="registration-number"
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                      placeholder="Optional"
                    />
                  </div>
                </div>
                <div id="business-address-field" className="space-y-1">
                  <label htmlFor="business-address" className="block text-sm font-medium text-foreground">
                    Business Address <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="business-address"
                    name="business-address"
                    rows={3}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                    placeholder="Street address, city, state, postal code"
                  />
                  {errors["business-address"] && (
                    <div className="text-red-500 text-sm mt-1">
                      <i className="fa-solid fa-exclamation-circle mr-1" aria-hidden />
                      {errors["business-address"]}
                    </div>
                  )}
                </div>
              </div>

              <div id="security-section" className="space-y-6">
                <div className="border-b border-gray-200 pb-4">
                  <h3 className="text-lg font-semibold text-foreground flex items-center">
                    <i className="fa-solid fa-lock text-primary mr-2" aria-hidden />
                    Security
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <label htmlFor="password" className="block text-sm font-medium text-foreground">
                      Password <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors pr-12"
                        placeholder="Create a strong password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        <i className={showPassword ? "fa-regular fa-eye-slash" : "fa-regular fa-eye"} aria-hidden />
                      </button>
                    </div>
                    {errors["password"] && (
                      <div className="text-red-500 text-sm mt-1">
                        <i className="fa-solid fa-exclamation-circle mr-1" aria-hidden />
                        {errors["password"]}
                      </div>
                    )}
                    <p className="text-xs text-gray-500 mt-1">Minimum 8 characters with letters and numbers</p>
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="confirm-password" className="block text-sm font-medium text-foreground">
                      Confirm Password <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        id="confirm-password"
                        name="confirm-password"
                        type={showConfirmPassword ? "text" : "password"}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors pr-12"
                        placeholder="Re-enter your password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
                        aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                      >
                        <i className={showConfirmPassword ? "fa-regular fa-eye-slash" : "fa-regular fa-eye"} aria-hidden />
                      </button>
                    </div>
                    {errors["confirm-password"] && (
                      <div className="text-red-500 text-sm mt-1">
                        <i className="fa-solid fa-exclamation-circle mr-1" aria-hidden />
                        {errors["confirm-password"]}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div id="terms-section" className="space-y-4">
                <div className="border-b border-gray-200 pb-4">
                  <h3 className="text-lg font-semibold text-foreground flex items-center">
                    <i className="fa-solid fa-file-contract text-primary mr-2" aria-hidden />
                    Terms & Consent
                  </h3>
                </div>
                <div className="flex items-start">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    required
                    className="h-5 w-5 text-primary focus:ring-primary border-gray-300 rounded mt-0.5"
                  />
                  <label htmlFor="terms" className="ml-3 text-sm text-gray-700">
                    I agree to the <a href="#" className="text-primary hover:text-primary/80 font-medium">Terms of Service</a> and{" "}
                    <a href="#" className="text-primary hover:text-primary/80 font-medium">Privacy Policy</a> <span className="text-red-500">*</span>
                  </label>
                </div>
                {errors["terms"] && (
                  <div className="text-red-500 text-sm">
                    <i className="fa-solid fa-exclamation-circle mr-1" aria-hidden />
                    {errors["terms"]}
                  </div>
                )}
                <div className="flex items-start">
                  <input
                    id="marketing"
                    name="marketing"
                    type="checkbox"
                    className="h-5 w-5 text-primary focus:ring-primary border-gray-300 rounded mt-0.5"
                  />
                  <label htmlFor="marketing" className="ml-3 text-sm text-gray-700">
                    I want to receive updates, promotions, and vendor tips via email
                  </label>
                </div>
              </div>

              <div id="form-actions" className="flex items-center justify-between pt-6 border-t border-gray-200">
                <Link href="/vendor/login" className="text-sm text-gray-600 hover:text-gray-800">
                  <i className="fa-solid fa-arrow-left mr-2" aria-hidden />
                  Back to Login
                </Link>
                <button
                  type="submit"
                  id="register-btn"
                  disabled={isSubmitting}
                  className="bg-primary text-white py-3 px-8 rounded-lg font-medium hover:bg-primary/90 focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors"
                >
                  <span id="register-btn-text">{isSubmitting ? "Creating Account..." : "Create Account"}</span>
                  {isSubmitting && <i className="fa-solid fa-spinner fa-spin ml-2" aria-hidden />}
                </button>
              </div>
            </form>
          </div>

          <div id="help-section" className="text-center mt-6">
            <p className="text-gray-500 text-sm">
              Need help? <a href="#" className="text-primary hover:text-primary/80 transition-colors">Contact Support</a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
