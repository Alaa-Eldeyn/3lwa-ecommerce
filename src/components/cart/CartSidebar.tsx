"use client";

import { useState } from "react";
import { X, ShoppingBag, Trash2 } from "lucide-react";
import { useHeaderStore } from "@/src/store/headerStore";
import Link from "next/link";
import Image from "next/image";

interface CartItemType {
    id: string;
    image: string;
    title: string;
    size: string;
    color: string;
    price: number;
    quantity: number;
}

// Mock cart data - replace with real data from state management
const initialCartItems: CartItemType[] = [
    {
        id: "1",
        image: "/images/products/Frame 32.png",
        title: "Gradient Graphic T-shirt",
        size: "Large",
        color: "White",
        price: 145,
        quantity: 1,
    },
    {
        id: "2",
        image: "/images/products/Frame 33.png",
        title: "Checkered Shirt",
        size: "Medium",
        color: "Red",
        price: 180,
        quantity: 1,
    },
];

const CartSidebar = () => {
    const { isCartOpen, closeCart } = useHeaderStore();
    const [cartItems, setCartItems] = useState<CartItemType[]>(initialCartItems);

    const handleQuantityChange = (id: string, delta: number) => {
        setCartItems((items) =>
            items.map((item) => {
                if (item.id === id) {
                    const newQuantity = Math.max(1, item.quantity + delta);
                    return { ...item, quantity: newQuantity };
                }
                return item;
            })
        );
    };

    const handleRemoveItem = (id: string) => {
        setCartItems((items) => items.filter((item) => item.id !== id));
    };

    const subtotal = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

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
                            السلة ({cartItems.length})
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
                    {cartItems.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-center">
                            <ShoppingBag size={64} className="text-gray-300 dark:text-gray-700 mb-4" />
                            <p className="text-gray-500 dark:text-gray-400 text-lg">
                                السلة فارغة
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {cartItems.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                                >
                                    {/* Image */}
                                    <div className="relative w-20 h-20 shrink-0 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
                                        <Image
                                            src={item.image}
                                            alt={item.title}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>

                                    {/* Details */}
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-semibold text-sm text-gray-900 dark:text-white truncate">
                                            {item.title}
                                        </h3>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                            {item.size} • {item.color}
                                        </p>

                                        {/* Quantity Controls */}
                                        <div className="flex items-center justify-between mt-2">
                                            <div className="flex items-center gap-2 bg-white dark:bg-gray-700 rounded-lg px-2 py-1">
                                                <button
                                                    onClick={() => handleQuantityChange(item.id, -1)}
                                                    className="text-gray-600 dark:text-gray-400 hover:text-primary w-6 h-6 flex items-center justify-center"
                                                >
                                                    -
                                                </button>
                                                <span className="text-sm text-secondary font-medium w-6 text-center">
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    onClick={() => handleQuantityChange(item.id, 1)}
                                                    className="text-gray-600 dark:text-gray-400 hover:text-primary w-6 h-6 flex items-center justify-center"
                                                >
                                                    +
                                                </button>
                                            </div>

                                            <div className="flex items-center gap-2">
                                                <span className="font-bold text-gray-900 dark:text-white">
                                                    ${item.price * item.quantity}
                                                </span>
                                                <button
                                                    onClick={() => handleRemoveItem(item.id)}
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
                {cartItems.length > 0 && (
                    <div className="border-t dark:border-gray-700 p-4 space-y-3">
                        {/* Subtotal */}
                        <div className="flex items-center justify-between text-lg">
                            <span className="text-gray-600 dark:text-gray-400">المجموع:</span>
                            <span className="font-bold text-gray-900 dark:text-white">
                                ${subtotal}
                            </span>
                        </div>

                        {/* Buttons */}
                        <div className="space-y-2">
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
