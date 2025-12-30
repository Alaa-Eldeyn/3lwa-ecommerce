"use client";

import { Star, Check } from "lucide-react";

interface ReviewCardProps {
  id: string;
  reviewNumber: number;
  itemID: string;
  customerID: string;
  rating: number;
  reviewTitle: string;
  reviewText: string;
}

const ReviewCard = ({ 
  id,
  reviewNumber,
  rating, 
  reviewTitle, 
  reviewText,
  customerID 
}: ReviewCardProps) => {
  // استخراج اسم العميل من customerID أو استخدام قيمة افتراضية
  const customerName = customerID ? `Customer ${customerID.slice(0, 8)}` : "Anonymous";
  
  // تنسيق التاريخ - يمكنك تعديله حسب الحاجة
  const formattedDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-2xl p-6">
      {/* Rating */}
      <div className="flex items-center gap-1 mb-3">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={16}
            className={`${
              i < Math.floor(rating)
                ? "fill-yellow-400 text-yellow-400"
                : i < rating
                ? "fill-yellow-400 text-yellow-400 opacity-50"
                : "fill-gray-300 text-gray-300"
            }`}
          />
        ))}
      </div>

      {/* Review Title */}
      {reviewTitle && (
        <h3 className="font-bold text-gray-900 dark:text-white mb-2">
          {reviewTitle}
        </h3>
      )}

      {/* Customer Name */}
      <div className="flex items-center gap-2 mb-3">
        <h4 className="font-semibold text-gray-700 dark:text-gray-300 text-sm">
          {customerName}
        </h4>
        <span className="flex items-center gap-1 text-green-600 dark:text-green-400">
          <Check size={14} />
        </span>
      </div>

      {/* Review Text */}
      <p className="text-gray-600 dark:text-gray-400 mb-3 leading-relaxed">
        {reviewText}
      </p>

      {/* Date and Review Number */}
      <div className="flex items-center justify-between text-sm text-gray-500">
        <span>Posted on {formattedDate}</span>
        <span className="text-xs">#{reviewNumber}</span>
      </div>
    </div>
  );
};

export default ReviewCard;