"use client";

import { AlertTriangle } from "lucide-react";
import { useTranslations } from "next-intl";

interface ClearCartModalProps {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

const ClearCartModal = ({ isOpen, onCancel, onConfirm }: ClearCartModalProps) => {
  const t = useTranslations("cart.sidebar");

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-60 p-4"
      onClick={onCancel}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full shadow-2xl">
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-4 animate-bounce-short">
            <AlertTriangle className="text-red-600 dark:text-red-400" size={32} />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            {t("clearModal.title")}
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6">{t("clearModal.description")}</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={onCancel}
            className="w-full py-2.5 px-4 rounded-xl bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors font-medium">
            {t("clearModal.cancel")}
          </button>
          <button
            onClick={onConfirm}
            className="w-full py-2.5 px-4 rounded-xl bg-red-600 text-white font-medium hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
            {t("clearModal.confirm")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClearCartModal;
