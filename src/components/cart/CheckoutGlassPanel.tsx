import { motion, AnimatePresence } from "framer-motion";
import { products } from "../../data/products";
import { useCartStore } from "../../store/useCartStore";
import { useCurrencyStore } from "../../store/useCurrencyStore";
import { formatPrice } from "../../data/currencies";
import CartItemRow from "./CartItemRow";
import DeliveryForm from "./DeliveryForm";

export default function CheckoutGlassPanel() {
  const { items } = useCartStore();
  const { currency } = useCurrencyStore();

  const subtotal = items.reduce((sum, item) => {
    const product = products.find((p) => p.id === item.productId);
    return sum + (product?.price || 0) * item.quantity;
  }, 0);

  const tax = subtotal * 0.08;
  const shipping = subtotal > 100000 ? 0 : 2500;
  const total = subtotal + tax + shipping;

  const summaryItems = [
    { label: "Subtotal", value: formatPrice(subtotal, currency) },
    { label: "Global Tax (8%)", value: formatPrice(tax, currency) },
    { label: "International Shipping", value: shipping === 0 ? "Complimentary" : formatPrice(shipping, currency) },
    { label: "Insurance", value: "Included" },
  ];

  return (
    <div className="glass-panel p-8 lg:p-10">
      {items.length === 0 ? (
        <div className="text-center py-16">
          <span className="text-[10px] tracking-[0.3em] text-havok-platinum/25 uppercase block mb-4">
            Your Cart is Empty
          </span>
          <p className="text-sm text-havok-platinum/30">
            Discover exceptional pieces from our curated collections.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left: Items */}
          <div className="lg:col-span-2">
            <h3 className="text-[10px] tracking-[0.3em] text-havok-platinum/30 uppercase mb-6">
              Your Selection
            </h3>
            <div className="space-y-3">
              <AnimatePresence>
                {items.map((item) => (
                  <CartItemRow key={item.productId} item={item} />
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Right: Summary */}
          <div>
            <h3 className="text-[10px] tracking-[0.3em] text-havok-platinum/30 uppercase mb-6">
              Order Summary
            </h3>
            <div className="glass-panel-light p-6 space-y-4">
              {summaryItems.map((item, i) => (
                <div key={i} className="flex justify-between items-center">
                  <span className="text-xs text-havok-platinum/50 tracking-wider">{item.label}</span>
                  <span className={`text-xs tracking-wider font-mono ${i === 3 ? "text-havok-accent/60" : "text-havok-platinum"}`}>
                    {item.value}
                  </span>
                </div>
              ))}
              <div className="metal-divider" />
              <div className="flex justify-between items-center">
                <span className="text-sm tracking-[0.15em] text-havok-gold uppercase">Total</span>
                <motion.span
                  className="font-mono text-xl text-havok-gold"
                  key={total}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  {formatPrice(total, currency)}
                </motion.span>
              </div>
              <span className="text-[9px] text-havok-platinum/25 tracking-wider block text-right">
                {currency} · Duties & taxes calculated at checkout
              </span>
            </div>

            {/* Delivery Form */}
            <div className="mt-6">
              <DeliveryForm />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}