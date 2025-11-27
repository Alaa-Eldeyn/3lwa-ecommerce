const FAQsSection = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        FAQs
      </h2>
      <div className="space-y-4">
        <div className="border border-gray-200 dark:border-gray-700 rounded-2xl p-6">
          <h4 className="font-bold text-gray-900 dark:text-white mb-2">
            How do I choose the right size?
          </h4>
          <p className="text-gray-600 dark:text-gray-400">
            Please refer to our size guide for detailed measurements. We recommend
            measuring your current favorite t-shirt and comparing it with our size chart.
          </p>
        </div>
        <div className="border border-gray-200 dark:border-gray-700 rounded-2xl p-6">
          <h4 className="font-bold text-gray-900 dark:text-white mb-2">
            What is the return policy?
          </h4>
          <p className="text-gray-600 dark:text-gray-400">
            We offer a 30-day return policy. Items must be unworn, unwashed, and in their
            original condition with tags attached.
          </p>
        </div>
        <div className="border border-gray-200 dark:border-gray-700 rounded-2xl p-6">
          <h4 className="font-bold text-gray-900 dark:text-white mb-2">
            How long does shipping take?
          </h4>
          <p className="text-gray-600 dark:text-gray-400">
            Standard shipping takes 5-7 business days. Express shipping is available and
            takes 2-3 business days.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FAQsSection;
