import { motion } from "framer-motion";
import { X, Minus, Plus, Trash2 } from "lucide-react";
import { products } from "../../data/products";
import { useCartStore } from "../../store/useCartStore";
import { useCurrencyStore } from "../../store/useCurrencyStore";
import { formatPrice } from "../../data/currencies";
import type { CartItem } from "../../types";

interface Props {
  item: CartItem;
}

export default function CartItemRow({ item }: Props) {
  const product = products.find((p) => p.id === item.productId);
  const { currency } = useCurrencyStore();
  const { updateItem, removeItem } = useCartStore();

  if (!product) return null;

  const total = product.price * item.quantity;

  return (
    <motion.div
      className="glass-panel-light p-5 flex gap-5 items-center"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Image */}
      <div className="w-20 h-20 flex-shrink-0 border border-havok-border/20 overflow-hidden">
        <div
          className="w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${product.images[0]})` }}
        />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <span className="text-[10px] tracking-[0.2em] text-havok-platinum/40 uppercase">
          {product.brand}
        </span>
        <h3 className="font-display text-base text-havok-gold truncate">{product.name}</h3>
        <span className="font-mono text-xs text-havok-platinum/50">
          {formatPrice(product.price, currency)} {currency}
        </span>
      </div>

      {/* Quantity */}
      <div className="flex items-center border border-havok-border/20">
        <button
          onClick={() => {
            if (item.quantity > 1) {
              updateItem(item.productId, { quantity: item.quantity - 1 });
            }
          }}
          className="w-8 h-8 flex items-center justify-center text-havok-platinum/40 hover:text-havok-gold transition-colors"
        >
          <Minus className="w-3 h-3" />
        </button>
        <span className="w-10 text-center font-mono text-xs text-havok-platinum">{item.quantity}</span>
        <button
          onClick={() => updateItem(item.productId, { quantity: item.quantity + 1 })}
          className="w-8 h-8 flex items-center justify-center text-havok-platinum/40 hover:text-havok-gold transition-colors"
        >
          <Plus className="w-3 h-3" />
        </button>
      </div>

      {/* Total */}
      <div className="w-24 text-right">
        <span className="font-mono text-sm text-havok-gold">
          {formatPrice(total, currency)}
        </span>
      </div>

      {/* Remove */}
      <button
        onClick={() => removeItem(item.productId)}
        className="text-havok-platinum/20 hover:text-havok-accent/60 transition-colors"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </motion.div>
  );
}