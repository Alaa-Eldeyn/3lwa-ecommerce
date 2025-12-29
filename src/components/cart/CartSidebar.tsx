"use client";

import { X, ShoppingBag, Trash2 } from "lucide-react";
import { useHeaderStore } from "@/src/store/headerStore";
import { useCartStore } from "@/src/store/cartStore";
import Link from "next/link";
import Image from "next/image";
import QuantityController from "../common/QuantityController";

const CartSidebar = () => {
    const { isCartOpen, closeCart } = useHeaderStore();
    const { items, updateQuantity, removeItem, clearCart, getTotalPrice } = useCartStore();

    const handleIncrement = (id: string) => (e: React.MouseEvent) => {
        e.stopPropagation();
        const item = items.find(i => i.id === id);
        if (item) {
            updateQuantity(id, item.quantity + 1);
        }
    };

    const handleDecrement = (id: string) => (e: React.MouseEvent) => {
        e.stopPropagation();
        const item = items.find(i => i.id === id);
        if (item) {
            if (item.quantity === 1) {
                removeItem(id);
            } else {
                updateQuantity(id, item.quantity - 1);
            }
        }
    };

    const handleClearCart = async () => {
        if (confirm("هل تريد مسح جميع المنتجات من السلة؟")) {
            try {
                await clearCart(true);
            } catch (error) {
                console.error("Failed to clear cart:", error);
            }
        }
    };

    return (
        <>
            {/* Overlay */}
            <div
                className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 ${isCartOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                    }`}
                onClick={closeCart}
            />

            {/* Sidebar */}
            <div
                className={`fixed top-0 right-0 rtl:right-auto rtl:left-0 h-full w-[85vw] sm:w-96 bg-white dark:bg-gray-900 shadow-2xl z-50 flex flex-col transition-transform duration-300 ${isCartOpen
                        ? "translate-x-0"
                        : "translate-x-full rtl:-translate-x-full"
                    }`}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
                    <div className="flex items-center gap-2">
                        <ShoppingBag size={24} className="text-primary" />
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                            السلة ({items.length})
                        </h2>
                    </div>
                    <button
                        onClick={closeCart}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition"
                    >
                        <X size={24} className="text-gray-600 dark:text-gray-400" />
                    </button>
                </div>

                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto p-4">
                    {items.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-center">
                            <ShoppingBag size={64} className="text-gray-300 dark:text-gray-700 mb-4" />
                            <p className="text-gray-500 dark:text-gray-400 text-lg">
                                السلة فارغة
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {items.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                                >
                                    {/* Image */}
                                    <div className="relative w-20 h-20 shrink-0 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>

                                    {/* Details */}
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-semibold text-sm text-gray-900 dark:text-white truncate">
                                            {item.name}
                                        </h3>
                                        {(item.size || item.color) && (
                                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                {item.size && item.size}{item.size && item.color && " • "}{item.color && item.color}
                                            </p>
                                        )}

                                        {/* Quantity Controls */}
                                        <div className="flex items-center justify-between mt-2">
                                            <QuantityController
                                                quantity={item.quantity}
                                                onIncrement={handleIncrement(item.id)}
                                                onDecrement={handleDecrement(item.id)}
                                                variant="default"
                                                className="bg-white! dark:bg-gray-700! text-gray-900! "
                                                showDeleteIcon={false}
                                            />

                                            <div className="flex items-center gap-2">
                                                <span className="font-bold text-gray-900 dark:text-white">
                                                    ${item.price * item.quantity}
                                                </span>
                                                <button
                                                    onClick={() => removeItem(item.id)}
                                                    className="text-red-500 hover:text-red-600 p-1"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                {items.length > 0 && (
                    <div className="border-t dark:border-gray-700 p-4 space-y-3">
                        {/* Subtotal */}
                        <div className="flex items-center justify-between text-lg">
                            <span className="text-gray-600 dark:text-gray-400">المجموع:</span>
                            <span className="font-bold text-gray-900 dark:text-white">
                                ${getTotalPrice().toFixed(2)}
                            </span>
                        </div>

                        {/* Buttons */}
                        <div className="space-y-2">
                            <button
                                onClick={handleClearCart}
                                className="w-full flex items-center justify-center gap-2 bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition"
                            >
                                <Trash2 size={18} />
                                مسح السلة
                            </button>
                            <Link
                                href="/cart"
                                onClick={closeCart}
                                className="block w-full text-center bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white py-3 rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-700 transition"
                            >
                                عرض السلة
                            </Link>
                            <Link
                                href="/checkout"
                                onClick={closeCart}
                                className="block w-full text-center bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary/90 transition"
                            >
                                إتمام الشراء
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default CartSidebar;
