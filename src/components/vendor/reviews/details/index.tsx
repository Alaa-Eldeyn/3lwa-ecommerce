"use client";

import { useState } from "react";
import Link from "next/link";
import VendorLayout from "../../components/VendorLayout";
import { Star, Check, ThumbsUp, Flag, Mail, EyeOff } from "lucide-react";

const ReviewDetails = () => {
  const [replyText, setReplyText] = useState("");

  const review = {
    id: "1",
    type: "product",
    product: {
      name: "Wireless Earbuds Pro Max",
      sku: "WEP-001",
      image: "https://picsum.photos/seed/reviewprod/100/100",
    },
    customer: {
      name: "Sarah Ahmed",
      email: "sarah@example.com",
      avatar: null,
    },
    orderId: "ORD-7829",
    rating: 5,
    title: "Excellent Product!",
    comment:
      "Excellent sound quality and comfortable fit. Battery life is impressive! I've been using these earbuds for a week now and they haven't disappointed. The active noise cancellation works great in noisy environments. Highly recommend!",
    date: "Jan 19, 2026",
    verified: true,
    helpful: 12,
    images: [
      "https://picsum.photos/seed/revimg1/200/200",
      "https://picsum.photos/seed/revimg2/200/200",
    ],
    reply: {
      text: "Thank you so much for your kind review, Sarah! We're thrilled to hear that you're enjoying the sound quality and battery life of the Wireless Earbuds Pro Max. Your satisfaction is our top priority. If you ever have any questions or need assistance, please don't hesitate to reach out. Happy listening!",
      date: "Jan 19, 2026",
    },
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-5 h-5 ${
              star <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <VendorLayout
      title="Review Details"
      showBackButton
      breadcrumbs={[
        { label: "Reviews", href: "/reviews/items" },
        { label: `Review #${review.id}` },
      ]}
    >
      <div className="grid grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="col-span-2 space-y-6">
          {/* Review Card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start space-x-4">
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-primary font-bold text-lg">
                    {review.customer.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <p className="font-semibold text-gray-800">
                      {review.customer.name}
                    </p>
                    {review.verified && (
                      <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs font-medium flex items-center">
                        <Check className="w-3 h-3 mr-1" />
                        Verified Purchase
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-3 mt-1">
                    {renderStars(review.rating)}
                    <span className="text-sm text-gray-500">{review.date}</span>
                  </div>
                </div>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {review.title}
            </h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              {review.comment}
            </p>

            {review.images && review.images.length > 0 && (
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-2">
                  Customer Photos
                </p>
                <div className="flex space-x-3">
                  {review.images.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt={`Review photo ${index + 1}`}
                      className="w-24 h-24 object-cover rounded-lg border border-gray-200"
                    />
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center space-x-4 pt-4 border-t border-gray-200">
              <button className="flex items-center space-x-1 text-gray-500 hover:text-gray-700">
                <ThumbsUp className="w-4 h-4" />
                <span className="text-sm">Helpful ({review.helpful})</span>
              </button>
              <button className="flex items-center space-x-1 text-gray-500 hover:text-gray-700">
                <Flag className="w-4 h-4" />
                <span className="text-sm">Report</span>
              </button>
            </div>
          </div>

          {/* Existing Reply */}
          {review.reply && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">AS</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <p className="font-semibold text-gray-800">Ahmed Store</p>
                    <span className="px-2 py-0.5 bg-primary/10 text-primary rounded-full text-xs font-medium">
                      Vendor
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-0.5">
                    {review.reply.date}
                  </p>
                  <p className="text-gray-600 mt-2">{review.reply.text}</p>
                  <button className="text-primary text-sm font-medium mt-3 hover:underline">
                    Edit Reply
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Reply Form */}
          {!review.reply && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Reply to Review
              </h3>
              <textarea
                rows={4}
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Write your response to this review..."
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-primary resize-none"
              ></textarea>
              <div className="flex items-center justify-between mt-4">
                <p className="text-sm text-gray-500">
                  Your response will be publicly visible
                </p>
                <button className="px-6 py-2.5 bg-primary text-white rounded-lg hover:bg-primary/90 font-medium">
                  Post Reply
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Product Info */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Product Reviewed
            </h3>
            <div className="flex items-center space-x-4">
              <img
                src={review.product.image}
                alt={review.product.name}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div>
                <p className="font-medium text-gray-800">
                  {review.product.name}
                </p>
                <p className="text-sm text-gray-500">SKU: {review.product.sku}</p>
              </div>
            </div>
            <Link
              href="/items/1"
              className="mt-4 w-full px-4 py-2 border border-primary text-primary rounded-lg hover:bg-primary/5 font-medium text-sm flex items-center justify-center"
            >
              View Product
            </Link>
          </div>

          {/* Order Info */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Order Information
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Order ID</span>
                <Link
                  href={`/orders/${review.orderId}`}
                  className="text-sm font-medium text-primary hover:underline"
                >
                  #{review.orderId}
                </Link>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Order Date</span>
                <span className="text-sm font-medium text-gray-800">
                  Jan 15, 2026
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Delivery Date</span>
                <span className="text-sm font-medium text-gray-800">
                  Jan 17, 2026
                </span>
              </div>
            </div>
            <Link
              href={`/orders/${review.orderId}`}
              className="mt-4 w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium text-sm flex items-center justify-center"
            >
              View Order
            </Link>
          </div>

          {/* Customer Info */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Customer
            </h3>
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-primary font-bold">
                  {review.customer.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
              </div>
              <div>
                <p className="font-medium text-gray-800">
                  {review.customer.name}
                </p>
                <p className="text-sm text-gray-500">{review.customer.email}</p>
              </div>
            </div>
            <button className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium text-sm flex items-center justify-center">
              <Mail className="w-4 h-4 mr-2" />
              Contact Customer
            </button>
          </div>

          {/* Actions */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Actions</h3>
            <div className="space-y-2">
              <button className="w-full px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium text-sm text-left flex items-center">
                <Flag className="w-4 h-4 mr-2 text-gray-500" />
                Report Review
              </button>
              <button className="w-full px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium text-sm text-left flex items-center">
                <EyeOff className="w-4 h-4 mr-2 text-gray-500" />
                Hide Review
              </button>
            </div>
          </div>
        </div>
      </div>
    </VendorLayout>
  );
};

export default ReviewDetails;
