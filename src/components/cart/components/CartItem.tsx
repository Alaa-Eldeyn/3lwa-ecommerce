"use client";

import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";

interface CartItemProps {
  id: string;
  image: string;
  title: string;
  price: number;
  quantity: number;
  onQuantityChange: (id: string, newQuantity: number) => void;
  onRemove: (id: string) => void;
}

const CartItem = ({
  id,
  image,
  title,
  price,
  quantity,
  onQuantityChange,
  onRemove,
}: CartItemProps) => {
  const handleIncrement = () => {
    onQuantityChange(id, quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      onQuantityChange(id, quantity - 1);
    }
  };

  return (
    <div className="flex gap-4 p-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700">
      {/* Image */}
      <div className="w-28 h-28 bg-[#F0EEED] dark:bg-gray-800 rounded-xl overflow-hidden shrink-0">
        <Image
          src={image}
          alt={title}
          width={112}
          height={112}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Details */}
      <div className="flex-1 flex flex-col justify-between">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-1">{title}</h3>
          </div>

          {/* Remove Button */}
          <button
            onClick={() => onRemove(id)}
            className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg soft"
            aria-label="Remove item">
            <Trash2 size={20} />
          </button>
        </div>

        {/* Price and Quantity */}
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-gray-900 dark:text-white">${price}</span>

          {/* Quantity Controls */}
          <div className="flex items-center gap-3 bg-gray-50 dark:bg-gray-800 rounded-full">
            <button
              onClick={handleDecrement}
              disabled={quantity === 1}
              className="p-2 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full soft disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Decrease quantity">
              <Minus size={16} />
            </button>
            <span className="text-sm font-medium text-gray-900 dark:text-white w-8 text-center">
              {quantity}
            </span>
            <button
              onClick={handleIncrement}
              className="p-2 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full soft"
              aria-label="Increase quantity">
              <Plus size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
