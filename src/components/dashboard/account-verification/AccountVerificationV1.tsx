"use client";

import { useState } from "react";
import { Link } from "@/src/i18n/routing";

type Status = "pending" | "verified" | "rejected";

export function AccountVerificationV1() {
  const [status, setStatus] = useState<Status>("rejected");

  return (
    <div id="verification-status-container" className="min-h-[1024px] w-full flex">
      <div id="left-section" className="w-1/2 bg-gradient-to-br from-[#0a5c4f] to-primary flex items-center justify-center p-12">
        <div className="max-w-md">
          <div className="mb-8">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-6">
              <i className="fa-solid fa-store text-primary text-3xl" aria-hidden />
            </div>
            <h1 className="text-white text-5xl font-bold mb-4">Basit</h1>
            <p className="text-white/90 text-xl font-medium mb-2">Vendor Verification</p>
            <p className="text-white/70 text-base leading-relaxed">
              Your account verification ensures marketplace security and builds customer trust in your store.
            </p>
          </div>
          <div className="space-y-6 mt-12">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <i className="fa-solid fa-shield-check text-white text-xl" aria-hidden />
              </div>
              <div>
                <h3 className="text-white font-semibold text-lg mb-1">Secure Process</h3>
                <p className="text-white/70 text-sm">All documents are encrypted and reviewed by our security team</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <i className="fa-solid fa-users-gear text-white text-xl" aria-hidden />
              </div>
              <div>
                <h3 className="text-white font-semibold text-lg mb-1">Expert Review</h3>
                <p className="text-white/70 text-sm">Our verification team carefully reviews all submissions</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <i className="fa-solid fa-badge-check text-white text-xl" aria-hidden />
              </div>
              <div>
                <h3 className="text-white font-semibold text-lg mb-1">Trusted Badge</h3>
                <p className="text-white/70 text-sm">Verified vendors get a trust badge and priority support</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="right-section" className="w-1/2 flex items-center justify-center p-12 bg-white">
        <div className="w-full max-w-md">
          <div className="mb-6 flex gap-2">
            <button type="button" onClick={() => setStatus("pending")} className="px-3 py-1 rounded text-sm bg-gray-100">Pending</button>
            <button type="button" onClick={() => setStatus("verified")} className="px-3 py-1 rounded text-sm bg-gray-100">Verified</button>
            <button type="button" onClick={() => setStatus("rejected")} className="px-3 py-1 rounded text-sm bg-gray-100">Rejected</button>
          </div>
          {status === "pending" && (
            <div id="pending-status">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <i className="fa-solid fa-clock text-amber-600 text-2xl" aria-hidden />
                </div>
                <h2 className="text-3xl font-bold text-foreground mb-2">Verification Pending</h2>
                <p className="text-gray-600">Your documents are being reviewed by our verification team</p>
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-6">
                <div className="flex items-start gap-3">
                  <i className="fa-solid fa-info-circle text-amber-600 text-lg mt-0.5" aria-hidden />
                  <div className="flex-1">
                    <h4 className="text-amber-800 font-semibold text-sm mb-2">Review in Progress</h4>
                    <div className="text-amber-700 text-sm space-y-2">
                      <p>• Estimated review time: 2-3 business days</p>
                      <p>• You&apos;ll receive an email notification once complete</p>
                      <p>• Current access: Read-only dashboard access</p>
                      <p>• Contact support if urgent verification is needed</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-6">
                <h4 className="font-semibold text-foreground mb-3">Current Restrictions</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <i className="fa-solid fa-lock text-gray-400 text-sm" aria-hidden />
                    <span className="text-sm text-gray-600">Cannot add or edit products</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <i className="fa-solid fa-lock text-gray-400 text-sm" aria-hidden />
                    <span className="text-sm text-gray-600">Cannot process orders</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <i className="fa-solid fa-lock text-gray-400 text-sm" aria-hidden />
                    <span className="text-sm text-gray-600">Cannot withdraw funds</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <i className="fa-solid fa-eye text-primary text-sm" aria-hidden />
                    <span className="text-sm text-gray-600">View-only access to dashboard</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          {status === "verified" && (
            <div id="verified-status">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <i className="fa-solid fa-check-circle text-green-600 text-2xl" aria-hidden />
                </div>
                <h2 className="text-3xl font-bold text-foreground mb-2">Account Verified!</h2>
                <p className="text-gray-600">Congratulations! Your vendor account has been successfully verified</p>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-6">
                <div className="flex items-start gap-3">
                  <i className="fa-solid fa-check-circle text-green-600 text-lg mt-0.5" aria-hidden />
                  <div className="flex-1">
                    <h4 className="text-green-800 font-semibold text-sm mb-2">Full Access Granted</h4>
                    <div className="text-green-700 text-sm space-y-2">
                      <p>• Add and manage your product catalog</p>
                      <p>• Process and fulfill customer orders</p>
                      <p>• Access financial dashboard and withdrawals</p>
                      <p>• Join promotional campaigns and offers</p>
                      <p>• Receive priority customer support</p>
                    </div>
                  </div>
                </div>
              </div>
              <Link
                href="/dashboard"
                className="w-full bg-primary hover:bg-[#0a5c4f] text-white font-semibold py-3.5 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg mb-4"
              >
                <span>Go to Dashboard</span>
                <i className="fa-solid fa-arrow-right" aria-hidden />
              </Link>
            </div>
          )}
          {status === "rejected" && (
            <div id="rejected-status">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <i className="fa-solid fa-times-circle text-red-600 text-2xl" aria-hidden />
                </div>
                <h2 className="text-3xl font-bold text-foreground mb-2">Verification Rejected</h2>
                <p className="text-gray-600">Your submitted documents require attention before approval</p>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-6">
                <div className="flex items-start gap-3">
                  <i className="fa-solid fa-exclamation-triangle text-red-600 text-lg mt-0.5" aria-hidden />
                  <div className="flex-1">
                    <h4 className="text-red-800 font-semibold text-sm mb-2">Rejection Reasons</h4>
                    <div className="text-red-700 text-sm space-y-2">
                      <p>• Business license document is unclear or expired</p>
                      <p>• Tax ID information doesn&apos;t match business registration</p>
                      <p>• Bank account verification failed</p>
                      <p>• Missing required business address documentation</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
                <div className="flex items-start gap-3">
                  <i className="fa-solid fa-lightbulb text-blue-600 text-lg mt-0.5" aria-hidden />
                  <div className="flex-1">
                    <h4 className="text-blue-800 font-semibold text-sm mb-2">Next Steps to Resubmit</h4>
                    <div className="text-blue-700 text-sm space-y-2">
                      <p>1. Ensure all documents are clear, high-quality scans or photos</p>
                      <p>2. Verify all information matches exactly across documents</p>
                      <p>3. Check document expiration dates are current</p>
                      <p>4. Include all required supporting documentation</p>
                      <p>5. Review our verification guidelines before resubmitting</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <Link href="/dashboard/account-verification-2" className="w-full bg-primary hover:bg-[#0a5c4f] text-white font-semibold py-3.5 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg">
                  <i className="fa-solid fa-upload" aria-hidden />
                  <span>Resubmit Documents</span>
                </Link>
                <button type="button" className="w-full border border-gray-300 hover:border-primary text-gray-700 hover:text-primary font-semibold py-3 rounded-xl transition-all duration-200 flex items-center justify-center gap-2">
                  <i className="fa-solid fa-file-lines" aria-hidden />
                  <span>View Verification Guidelines</span>
                </button>
              </div>
            </div>
          )}
          <div className="mt-8 text-center space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-xs text-gray-400 px-3">NEED HELP?</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>
            <div className="flex gap-4">
              <a href="#" className="flex-1 text-center py-3 px-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-all duration-200 flex items-center justify-center gap-2">
                <i className="fa-solid fa-headset text-primary text-sm" aria-hidden />
                <span className="text-sm font-medium text-gray-700">Contact Support</span>
              </a>
              <a href="#" className="flex-1 text-center py-3 px-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-all duration-200 flex items-center justify-center gap-2">
                <i className="fa-solid fa-question-circle text-primary text-sm" aria-hidden />
                <span className="text-sm font-medium text-gray-700">FAQ</span>
              </a>
            </div>
            <p className="text-gray-500 text-xs mt-4">
              Verification typically takes 2-3 business days. You&apos;ll be notified via email once your review is complete.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
