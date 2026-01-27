"use client";

import { Plus, Minus, Trash2 } from "lucide-react";

interface QuantityControllerProps {
  quantity: number;
  onIncrement: (e: React.MouseEvent) => void;
  onDecrement: (e: React.MouseEvent) => void;
  variant?: "default" | "compact" | "large" | "homz" | "nike" | "clean" | "gradient";
  className?: string;
  showDeleteIcon?: boolean;
  iconColor?: "white" | "primary";
}

const QuantityController = ({
  quantity,
  onIncrement,
  onDecrement,
  variant = "default",
  className = "",
  showDeleteIcon = true,
  iconColor = "white",
}: QuantityControllerProps) => {
  const isLastItem = quantity === 1;
  
  // Determine icon color class based on iconColor prop
  const iconColorClass = iconColor === "primary" 
    ? "text-primary dark:text-primary" 
    : "text-white dark:text-white";

  // Variant styles
  const variants = {
    default: {
      container: "border border-primary bg-primary text-white rounded-lg flex items-center justify-between p-1.5 min-h-12",
      button: "bg-white/10 hover:bg-white/20 rounded-md p-2 transition",
      text: "font-semibold text-sm",
      iconSize: 16,
    },
    compact: {
      container: "bg-primary text-white rounded-full flex items-center justify-between px-1 py-1 gap-3",
      button: "rounded-xl hover:bg-white/20 rounded p-1 transition",
      text: "font-bold text-white min-w-5 text-center",
      iconSize: 18,
    },
    large: {
      container: "bg-secondary rounded-2xl flex items-center justify-between p-3",
      button: "hover:bg-white/20 rounded-lg px-3 py-1.5 transition text-white",
      text: "font-bold text-white",
      iconSize: 18,
    },
    homz: {
      container: "border border-gray-300 bg-primary text-white rounded-lg flex items-center justify-between p-1.5",
      button: "hover:bg-white/20 rounded-lg p-2 transition",
      text: "font-semibold text-sm",
      iconSize: 16,
    },
    nike: {
      container: "border border-primary/90 dark:border-primary/80 bg-primary text-white rounded-2xl flex items-center justify-between p-2",
      button: "rounded-xl hover:bg-white/20 rounded p-1 transition",
      text: "font-bold text-white min-w-5 text-center",
      iconSize: 18,
    },
    clean: {
      container: "border border-gray-900 bg-gray-900 text-white rounded-xl flex items-center justify-between p-2",
      button: "rounded-xl hover:bg-white/20 rounded p-1 transition",
      text: "font-bold text-white min-w-5 text-center",
      iconSize: 18,
    },
    gradient: {
      container: "border border-primary/90 dark:border-primary/80 bg-primary text-white rounded-xl flex items-center justify-between p-2",
      button: "rounded-xl hover:bg-white/20 rounded p-1 transition",
      text: "font-bold text-white min-w-5 text-center",
      iconSize: 18,
    },
  };

  const styles = variants[variant];

  return (
    <div className={`${styles.container} ${className}`}>
      <button
        onClick={onDecrement}
        className={styles.button}
        title={isLastItem ? "Remove from cart" : "Decrease quantity"}
      >
        {isLastItem && showDeleteIcon ? (
          <Trash2 size={styles.iconSize} className={iconColorClass} />
        ) : (
          <Minus size={styles.iconSize} className={iconColorClass} />
        )}
      </button>
      <span className={styles.text}>{quantity}</span>
      <button
        onClick={onIncrement}
        className={styles.button}
        title="Increase quantity"
      >
        <Plus size={styles.iconSize} className={iconColorClass} />
      </button>
    </div>
  );
};

export default QuantityController;
