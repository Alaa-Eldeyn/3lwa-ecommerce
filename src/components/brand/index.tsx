"use client";
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Heart, Globe, Calendar, ArrowLeft, Loader2, ShoppingCart, Star } from 'lucide-react';
import { useParams } from 'next/navigation';
import { customAxios } from '@/src/utils/customAxios';

const BrandPage = () => {
  const { id } = useParams();
  
  const { data: response, isLoading, isError, error } = useQuery({
    queryKey: ['brand', id],
    queryFn: async () => {
      const { data } = await customAxios.get(`/Brand/${id}`);
      return data;
    },
    enabled: !!id
  });

  const brandData = response?.data;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ar-EG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-slate-600 text-lg font-medium">جاري تحميل البيانات...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">❌</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">حدث خطأ</h2>
          <p className="text-slate-600 mb-4">
            {(error as any)?.response?.data?.message || 'فشل تحميل بيانات العلامة التجارية'}
          </p>
          <button 
            onClick={() => window.location.href = '/brands'}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors"
          >
            العودة للعلامات التجارية
          </button>
        </div>
      </div>
    );
  }

  if (!brandData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-600 text-lg">لا توجد بيانات للعرض</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white" dir="rtl">
      {/* Top Header */}
      <div className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 py-2">
          <button 
            onClick={() => window.history.back()}
            className="flex items-center gap-2 text-white hover:text-orange-400 transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>العودة للنتائج</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid md:grid-cols-12 gap-8">
          {/* Right Side - Brand Image */}
          <div className="md:col-span-4">
            <div className="sticky top-6">
              <div className="bg-white border border-gray-300 rounded-lg p-8 mb-4">
                <div className="aspect-square flex items-center justify-center bg-gray-50 rounded-lg overflow-hidden">
                  {brandData.logoPath ? (
                    <img 
                      src={`${process.env.NEXT_PUBLIC_DOMAIN}${brandData.logoPath}`} 
                      alt={brandData.nameAr}
                      className="w-full h-full object-contain"
                    />
                  ) : <div className="w-full h-full flex items-center justify-center text-8xl font-bold text-gray-300">
                  {brandData.nameAr?.charAt(0) || brandData.nameEn?.charAt(0)}
                </div>}
                  
                </div>
              </div>

              {/* Quick Actions */}
              <div className="space-y-3">
                <button className="w-full bg-orange-400 hover:bg-orange-500 text-white font-medium py-3 rounded-lg transition-colors flex items-center justify-center gap-2">
                  <ShoppingCart className="w-5 h-5" />
                  تصفح المنتجات
                </button>
              </div>
            </div>
          </div>

          {/* Left Side - Brand Details */}
          <div className="md:col-span-8">
            {/* Brand Title */}
            <div className="mb-4">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{brandData.nameAr}</h1>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span className="text-orange-500 font-medium">العلامة التجارية:</span>
                <span>{brandData.titleAr}</span>
              </div>
            </div>

            {/* Rating Section */}
            <div className="flex items-center gap-4 pb-4 mb-4 border-b border-gray-300">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-5 h-5 fill-orange-400 text-orange-400" />
                ))}
              </div>
              <span className="text-blue-600 hover:text-orange-600 cursor-pointer text-sm">
                4.8 من 5 نجوم
              </span>
              <span className="text-gray-600 text-sm">|</span>
              <span className="text-gray-600 text-sm">1,284 تقييم</span>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-3">نبذة عن العلامة التجارية</h2>
              <p className="text-gray-700 leading-relaxed text-base">
                {brandData.descriptionAr}
              </p>
            </div>

            {/* Key Information */}
            <div className="bg-gray-50 border border-gray-300 rounded-lg p-6 mb-6">
              <h3 className="font-bold text-gray-900 mb-4">التفاصيل</h3>
              <div className="space-y-3">
                <div className="flex">
                  <span className="text-gray-600 w-40 flex-shrink-0">الاسم بالإنجليزية</span>
                  <span className="text-gray-900 font-medium">{brandData.nameEn}</span>
                </div>
                <div className="flex">
                  <span className="text-gray-600 w-40 flex-shrink-0">العنوان</span>
                  <span className="text-gray-900 font-medium">{brandData.titleEn}</span>
                </div>
                <div className="flex">
                  <span className="text-gray-600 w-40 flex-shrink-0">الوصف</span>
                  <span className="text-gray-900 font-medium">{brandData.descriptionEn}</span>
                </div>
                {brandData.websiteUrl && (
                  <div className="flex">
                    <span className="text-gray-600 w-40 flex-shrink-0 flex items-center gap-2">
                      <Globe className="w-4 h-4" />
                      الموقع الإلكتروني
                    </span>
                    <a 
                      href={brandData.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-orange-600 hover:underline font-medium"
                    >
                      {brandData.websiteUrl}
                    </a>
                  </div>
                )}
                <div className="flex">
                  <span className="text-gray-600 w-40 flex-shrink-0 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    تاريخ الإضافة
                  </span>
                  <span className="text-gray-900 font-medium">{formatDate(brandData.createdDateUtc)}</span>
                </div>
                <div className="flex">
                  <span className="text-gray-600 w-40 flex-shrink-0">ترتيب العرض</span>
                  <span className="inline-block bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-bold">
                    #{brandData.displayOrder}
                  </span>
                </div>
              </div>
            </div>

            {/* Additional Info Section */}
            <div className="border border-gray-300 rounded-lg p-6">
              <h3 className="font-bold text-gray-900 mb-3">معلومات إضافية</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p>• منتجات عالية الجودة ومضمونة</p>
                <p>• شحن سريع ومجاني للطلبات فوق 200 جنيه</p>
                <p>• إمكانية الإرجاع خلال 30 يوم</p>
                <p>• ضمان رسمي على جميع المنتجات</p>
              </div>
            </div>

            {/* Action Bar */}
            <div className="mt-6 pt-6 border-t border-gray-300">
              <div className="flex gap-3">
                <button className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-lg transition-colors">
                  تعديل البيانات
                </button>
                <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors">
                  إدارة المنتجات
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandPage;