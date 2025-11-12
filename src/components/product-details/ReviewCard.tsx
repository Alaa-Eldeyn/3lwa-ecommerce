"use client";

import { StarIcon, Check } from "lucide-react";

interface ReviewCardProps {
  name: string;
  rating: number;
  verified?: boolean;
  date: string;
  review: string;
}

const ReviewCard = ({ name, rating, verified, date, review }: ReviewCardProps) => {
  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-2xl p-6">
      {/* Rating */}
      <div className="flex items-center gap-1 mb-3">
        {[...Array(5)].map((_, i) => (
          <StarIcon
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

      {/* Name and Verified */}
      <div className="flex items-center gap-2 mb-3">
        <h4 className="font-bold text-gray-900 dark:text-white">{name}</h4>
        {verified && (
          <span className="flex items-center gap-1 text-green-600 dark:text-green-400">
            <Check size={16} />
          </span>
        )}
      </div>

      {/* Review Text */}
      <p className="text-gray-600 dark:text-gray-400 mb-3 leading-relaxed">
        {review}
      </p>

      {/* Date */}
      <p className="text-sm text-gray-500">Posted on {date}</p>
    </div>
  );
};

export default ReviewCard;
