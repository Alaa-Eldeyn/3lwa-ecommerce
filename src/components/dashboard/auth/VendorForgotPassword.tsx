"use client";

import { useState, useRef, useEffect } from "react";
import { Link } from "@/src/i18n/routing";

const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const validatePhone = (phone: string) => /^[\d\s\-+()]+$/.test(phone) && phone.replace(/\D/g, "").length >= 10;

export function VendorForgotPassword() {
  const [method, setMethod] = useState<"email" | "phone">("email");
  const [showForm, setShowForm] = useState(true);
  const [successEmail, setSuccessEmail] = useState(true);
  const [rateLimit, setRateLimit] = useState(false);
  const [attemptCount, setAttemptCount] = useState(0);
  const [resendCountdown, setResendCountdown] = useState(0);
  const [cooldown, setCooldown] = useState(0);
  const [sending, setSending] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const resendIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const cooldownIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (resendCountdown <= 0) return;
    const id = setInterval(() => setResendCountdown((c) => c - 1), 1000);
    return () => clearInterval(id);
  }, [resendCountdown]);

  useEffect(() => {
    if (cooldown <= 0) {
      if (cooldownIntervalRef.current) {
        clearInterval(cooldownIntervalRef.current);
        setRateLimit(false);
        setAttemptCount(0);
      }
      return;
    }
    cooldownIntervalRef.current = setInterval(() => setCooldown((c) => c - 1), 1000);
    return () => {
      if (cooldownIntervalRef.current) clearInterval(cooldownIntervalRef.current);
    };
  }, [cooldown]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAttemptCount((c) => c + 1);
    if (attemptCount + 1 >= 5) {
      setRateLimit(true);
      setCooldown(300);
      return;
    }
    if (method === "email") {
      const email = (document.getElementById("email") as HTMLInputElement)?.value;
      if (!validateEmail(email || "")) {
        setEmailError(true);
        return;
      }
      setEmailError(false);
    } else {
      const phone = (document.getElementById("phone") as HTMLInputElement)?.value;
      if (!validatePhone(phone || "")) {
        setPhoneError(true);
        return;
      }
      setPhoneError(false);
    }
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setShowForm(false);
      setSuccessEmail(method === "email");
      setResendCountdown(60);
    }, 2000);
  };

  const handleBackToForm = () => {
    setShowForm(true);
    setResendCountdown(0);
  };

  const handleResend = () => {
    if (resendCountdown > 0) return;
    setResendCountdown(60);
    setTimeout(() => {
      const el = document.createElement("div");
      el.className = "fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50";
      el.innerHTML = '<i class="fa-solid fa-check mr-2" aria-hidden></i>Instructions sent again!';
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 3000);
    }, 1000);
  };

  return (
    <div id="forgot-password-container" className="min-h-[1024px] w-full flex">
      <div id="left-section" className="w-1/2 bg-gradient-to-br from-[#0a5c4f] to-primary flex items-center justify-center p-12">
        <div className="max-w-md">
          <div className="mb-8">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-6">
              <i className="fa-solid fa-store text-primary text-3xl" aria-hidden />
            </div>
            <h1 className="text-white text-5xl font-bold mb-4">Basit</h1>
            <p className="text-white/90 text-xl font-medium mb-2">Reset Your Password</p>
            <p className="text-white/70 text-base leading-relaxed">
              Enter your email or phone number and we&apos;ll send you instructions to reset your password securely.
            </p>
          </div>
          <div className="space-y-6 mt-12">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <i className="fa-solid fa-shield-halved text-white text-xl" aria-hidden />
              </div>
              <div>
                <h3 className="text-white font-semibold text-lg mb-1">Secure Process</h3>
                <p className="text-white/70 text-sm">Your account security is our priority with encrypted reset links</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <i className="fa-solid fa-clock text-white text-xl" aria-hidden />
              </div>
              <div>
                <h3 className="text-white font-semibold text-lg mb-1">Quick Recovery</h3>
                <p className="text-white/70 text-sm">Reset instructions are sent instantly to your registered contact</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <i className="fa-solid fa-key text-white text-xl" aria-hidden />
              </div>
              <div>
                <h3 className="text-white font-semibold text-lg mb-1">Easy Access</h3>
                <p className="text-white/70 text-sm">Get back to managing your store quickly and securely</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="right-section" className="w-1/2 flex items-center justify-center p-12 bg-white">
        <div className="w-full max-w-md">
          {showForm ? (
            <div id="reset-form-section">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-foreground mb-2">Reset Password</h2>
                <p className="text-gray-600">Enter your email address or phone number to receive reset instructions</p>
              </div>
              {rateLimit && (
                <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-xl">
                  <div className="flex items-start gap-3">
                    <i className="fa-solid fa-triangle-exclamation text-amber-500 text-lg mt-0.5" aria-hidden />
                    <div className="flex-1">
                      <h4 className="text-amber-800 font-semibold text-sm mb-1">Too Many Requests</h4>
                      <p className="text-amber-700 text-sm">
                        You&apos;ve reached the maximum number of reset attempts. Please wait{" "}
                        <span id="cooldown-timer">{Math.floor(cooldown / 60)}:{(cooldown % 60).toString().padStart(2, "0")}</span> before trying again.
                      </p>
                    </div>
                  </div>
                </div>
              )}
              <form id="reset-form" className="space-y-5" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-foreground mb-3">How would you like to receive reset instructions?</label>
                  <div className="space-y-3">
                    <label className="flex items-center p-4 border border-gray-200 rounded-xl cursor-pointer hover:border-primary hover:bg-gray-50 transition-all">
                      <input
                        type="radio"
                        name="reset-method"
                        value="email"
                        checked={method === "email"}
                        onChange={() => setMethod("email")}
                        className="w-4 h-4 text-primary bg-gray-100 border-gray-300 focus:ring-primary focus:ring-2"
                      />
                      <div className="ml-3 flex items-center gap-3">
                        <i className="fa-solid fa-envelope text-primary" aria-hidden />
                        <div>
                          <div className="font-semibold text-sm text-foreground">Email Address</div>
                          <div className="text-xs text-gray-500">We&apos;ll send a reset link to your email</div>
                        </div>
                      </div>
                    </label>
                    <label className="flex items-center p-4 border border-gray-200 rounded-xl cursor-pointer hover:border-primary hover:bg-gray-50 transition-all">
                      <input
                        type="radio"
                        name="reset-method"
                        value="phone"
                        checked={method === "phone"}
                        onChange={() => setMethod("phone")}
                        className="w-4 h-4 text-primary bg-gray-100 border-gray-300 focus:ring-primary focus:ring-2"
                      />
                      <div className="ml-3 flex items-center gap-3">
                        <i className="fa-solid fa-mobile-screen-button text-primary" aria-hidden />
                        <div>
                          <div className="font-semibold text-sm text-foreground">Phone Number</div>
                          <div className="text-xs text-gray-500">We&apos;ll send a verification code via SMS</div>
                        </div>
                      </div>
                    </label>
                  </div>
                </div>
                {method === "email" && (
                  <div id="email-input-section">
                    <label htmlFor="email" className="block text-sm font-semibold text-foreground mb-2">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Enter your registered email"
                      className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${emailError ? "border-red-500" : "border-gray-300"}`}
                      required={method === "email"}
                    />
                    {emailError && <p className="text-xs text-red-500 mt-1">Please enter a valid email address</p>}
                  </div>
                )}
                {method === "phone" && (
                  <div id="phone-input-section">
                    <label htmlFor="phone" className="block text-sm font-semibold text-foreground mb-2">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      placeholder="Enter your registered phone number"
                      className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${phoneError ? "border-red-500" : "border-gray-300"}`}
                      required={method === "phone"}
                    />
                    {phoneError && <p className="text-xs text-red-500 mt-1">Please enter a valid phone number</p>}
                  </div>
                )}
                <button
                  type="submit"
                  id="submit-button"
                  disabled={sending || rateLimit}
                  className="w-full bg-primary hover:bg-[#0a5c4f] text-white font-semibold py-3.5 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg disabled:opacity-70"
                >
                  {sending ? (
                    <>
                      <i className="fa-solid fa-spinner fa-spin" aria-hidden />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Reset Instructions</span>
                      <i className="fa-solid fa-paper-plane" aria-hidden />
                    </>
                  )}
                </button>
              </form>
              <div className="mt-8 text-center space-y-4">
                <p className="text-gray-600 text-sm">
                  Remember your password?{" "}
                  <Link href="/dashboard/login" className="font-semibold text-primary hover:text-[#0a5c4f] transition-colors">
                    Sign In
                  </Link>
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex-1 h-px bg-gray-200" />
                  <span className="text-xs text-gray-400 px-3">OR</span>
                  <div className="flex-1 h-px bg-gray-200" />
                </div>
                <p className="text-gray-600 text-sm">
                  Don&apos;t have an account?{" "}
                  <Link href="/dashboard/register" className="font-semibold text-primary hover:text-[#0a5c4f] transition-colors">
                    Create Account
                  </Link>
                </p>
              </div>
            </div>
          ) : (
            <div id="success-section">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <i className="fa-solid fa-check text-green-600 text-2xl" aria-hidden />
                </div>
                <h2 className="text-3xl font-bold text-foreground mb-2">Instructions Sent!</h2>
                <p className="text-gray-600">We&apos;ve sent password reset instructions to your registered contact method</p>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-6">
                <div className="flex items-start gap-3">
                  <i className="fa-solid fa-circle-info text-green-600 text-lg mt-0.5" aria-hidden />
                  <div className="flex-1">
                    <h4 className="text-green-800 font-semibold text-sm mb-2">Next Steps</h4>
                    <div className="text-green-700 text-sm space-y-2">
                      {successEmail ? (
                        <p>• Check your email inbox for reset instructions</p>
                      ) : (
                        <p>• Check your phone for the verification code</p>
                      )}
                      <p>• Click the reset link or enter the code to set a new password</p>
                      <p>• The link/code will expire in 15 minutes for security</p>
                      <p>• Check your spam folder if you don&apos;t see the email</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={resendCountdown > 0}
                  className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span>Resend Instructions</span>
                  {resendCountdown > 0 && <span className="text-sm">({resendCountdown}s)</span>}
                </button>
                <button
                  type="button"
                  onClick={handleBackToForm}
                  className="w-full border border-gray-300 hover:border-primary text-gray-700 hover:text-primary font-semibold py-3 rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <i className="fa-solid fa-arrow-left" aria-hidden />
                  <span>Try Different Contact Method</span>
                </button>
                <div className="text-center">
                  <Link href="/dashboard/login" className="text-sm text-gray-500 hover:text-primary transition-colors">
                    Back to Sign In
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
