"use client";

export function DashboardAlert() {
  return (
    <div className="px-8 py-8">
      <div id="notification-banner" className="bg-accent border-l-4 border-primary px-6 py-4 rounded-lg flex items-center justify-between">
        <div className="flex items-center">
          <i className="fa-solid fa-info-circle text-primary text-xl mr-4" aria-hidden />
          <div>
            <p className="font-medium text-gray-800">Action Required: Complete Your Profile</p>
            <p className="text-sm text-gray-600">Please upload your business verification documents to unlock full features.</p>
          </div>
        </div>
        <button type="button" className="text-gray-500 hover:text-gray-700" aria-label="Dismiss">
          <i className="fa-solid fa-times" aria-hidden />
        </button>
      </div>
    </div>
  );
}
