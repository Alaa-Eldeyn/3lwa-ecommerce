interface ProductDetailsSectionProps {
  description: string;
}

const ProductDetailsSection = ({ description }: ProductDetailsSectionProps) => {
  return (
    <div className="border-b border-gray-200 dark:border-gray-700 pb-8">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Product Details
      </h2>
      <div className="text-gray-600 dark:text-gray-400 leading-relaxed">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Product Information
        </h3>
        <p className="mb-4">{description}</p>
        <ul className="list-disc list-inside space-y-2">
          <li>100% Premium Cotton</li>
          <li>Machine washable</li>
          <li>Comfortable fit</li>
          <li>Durable and long-lasting</li>
          <li>Available in multiple colors and sizes</li>
        </ul>
      </div>
    </div>
  );
};

export default ProductDetailsSection;
