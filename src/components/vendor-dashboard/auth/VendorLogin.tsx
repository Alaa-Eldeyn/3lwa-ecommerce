"use client";

import { useState } from "react";
import { Link } from "@/src/i18n/routing";

export function VendorLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [lockedMessage, setLockedMessage] = useState(false);
  const [errorText, setErrorText] = useState("Invalid email or password. Please try again.");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(false);
    setLockedMessage(false);
    const demoScenario = Math.floor(Math.random() * 3);
    if (demoScenario === 0) {
      setErrorText("Invalid email or password. Please try again.");
      setErrorMessage(true);
    } else if (demoScenario === 1) {
      setLockedMessage(true);
    } else {
      alert("Login successful! Redirecting to dashboard...");
    }
  };

  return (
    <div id="login-container" className="min-h-[1024px] w-full flex">
      <div id="left-section" className="w-1/2 bg-gradient-to-br from-[#0a5c4f] to-primary flex items-center justify-center p-12">
        <div className="max-w-md">
          <div className="mb-8">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-6">
              <i className="fa-solid fa-store text-primary text-3xl" aria-hidden />
            </div>
            <h1 className="text-white text-5xl font-bold mb-4">Basit</h1>
            <p className="text-white/90 text-xl font-medium mb-2">Vendor Dashboard</p>
            <p className="text-white/70 text-base leading-relaxed">
              Manage your catalog, orders, campaigns, and grow your business on our multi-vendor platform.
            </p>
          </div>
          <div className="space-y-6 mt-12">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <i className="fa-solid fa-box text-white text-xl" aria-hidden />
              </div>
              <div>
                <h3 className="text-white font-semibold text-lg mb-1">Catalog Management</h3>
                <p className="text-white/70 text-sm">Manage items, pricing, and attributes with ease</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <i className="fa-solid fa-chart-line text-white text-xl" aria-hidden />
              </div>
              <div>
                <h3 className="text-white font-semibold text-lg mb-1">Sales Analytics</h3>
                <p className="text-white/70 text-sm">Track performance and optimize your business</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <i className="fa-solid fa-wallet text-white text-xl" aria-hidden />
              </div>
              <div>
                <h3 className="text-white font-semibold text-lg mb-1">Wallet & Payouts</h3>
                <p className="text-white/70 text-sm">Secure transactions and flexible withdrawal options</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="right-section" className="w-1/2 flex items-center justify-center p-12 bg-white">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-2">Welcome Back</h2>
            <p className="text-gray-600">Sign in to access your vendor dashboard</p>
          </div>
          {errorMessage && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
              <div className="flex items-start gap-3">
                <i className="fa-solid fa-circle-exclamation text-red-500 text-lg mt-0.5" aria-hidden />
                <div className="flex-1">
                  <h4 className="text-red-800 font-semibold text-sm mb-1">Authentication Failed</h4>
                  <p className="text-red-700 text-sm">{errorText}</p>
                </div>
              </div>
            </div>
          )}
          {lockedMessage && (
            <div className="mb-6 p-4 bg-orange-50 border border-orange-200 rounded-xl">
              <div className="flex items-start gap-3">
                <i className="fa-solid fa-lock text-orange-500 text-lg mt-0.5" aria-hidden />
                <div className="flex-1">
                  <h4 className="text-orange-800 font-semibold text-sm mb-1">Account Locked</h4>
                  <p className="text-orange-700 text-sm">
                    Your account has been temporarily locked due to multiple failed login attempts. Please contact support or try again later.
                  </p>
                </div>
              </div>
            </div>
          )}
          <form id="login-form" className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-foreground mb-2">
                Email or Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <i className="fa-solid fa-envelope text-gray-400" aria-hidden />
                </div>
                <input
                  type="text"
                  id="email"
                  name="email"
                  placeholder="Enter your email or username"
                  className="w-full pl-11 pr-4 py-3.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-foreground mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <i className="fa-solid fa-lock text-gray-400" aria-hidden />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  className="w-full pl-11 pr-12 py-3.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  <i className={showPassword ? "fa-solid fa-eye-slash" : "fa-solid fa-eye"} aria-hidden />
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  id="remember-me"
                  className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary focus:ring-2 cursor-pointer"
                />
                <span className="ml-2 text-sm text-gray-700">Remember me</span>
              </label>
              <Link href="/vendor/forgot-password" className="text-sm font-semibold text-primary hover:text-header transition-colors">
                Forgot Password?
              </Link>
            </div>
            <button
              type="submit"
              className="w-full bg-primary hover:bg-[#0a5c4f] text-white font-semibold py-3.5 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
            >
              <span>Sign In</span>
              <i className="fa-solid fa-arrow-right" aria-hidden />
            </button>
          </form>
          <div className="mt-8 text-center">
            <p className="text-gray-600 text-sm">
              Don&apos;t have a vendor account?{" "}
              <Link href="/vendor/register" className="font-semibold text-primary hover:text-header transition-colors">
                Register Now
              </Link>
            </p>
          </div>
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-center text-xs text-gray-500 mb-4">Or continue with</p>
            <div className="flex gap-3">
              <button type="button" className="flex-1 border border-gray-300 hover:border-primary hover:bg-gray-50 py-3 rounded-xl transition-all flex items-center justify-center gap-2">
                <i className="fa-brands fa-google text-lg" aria-hidden />
                <span className="text-sm font-medium text-gray-700">Google</span>
              </button>
              <button type="button" className="flex-1 border border-gray-300 hover:border-primary hover:bg-gray-50 py-3 rounded-xl transition-all flex items-center justify-center gap-2">
                <i className="fa-brands fa-facebook text-lg text-blue-600" aria-hidden />
                <span className="text-sm font-medium text-gray-700">Facebook</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
