import React from 'react';

const CheckoutPage = () => {
  return (
    <section className="pt-24 pb-12 bg-white dark:bg-gray-900 min-h-screen">
      <div className="container">
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-8">
          إتمام الطلب
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                معلومات الشحن
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                صفحة إتمام الطلب قيد التطوير...
              </p>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 sticky top-24">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                ملخص الطلب
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                تفاصيل الطلب...
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CheckoutPage;
