import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import CheckoutGlassPanel from "../components/cart/CheckoutGlassPanel";

export default function CartPage() {
  return (
    <main className="bg-tracks min-h-screen pt-24 lg:pt-28 pb-16">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* Page Header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] tracking-[0.4em] text-havok-accent/60 uppercase block mb-3">
                Shopping Cart
              </span>
              <h1 className="font-display text-display-md text-havok-gold leading-tight flex items-center gap-3">
                <ShoppingBag className="w-8 h-8 text-havok-platinum/30" />
                Your Selection
              </h1>
            </div>
            <Link to="/shop" className="btn-havok-ghost hidden lg:inline-flex">
              Continue Shopping
            </Link>
          </div>
        </motion.div>

        <CheckoutGlassPanel />

        <div className="text-center mt-8 lg:hidden">
          <Link to="/shop" className="btn-havok-ghost">
            Continue Shopping
          </Link>
        </div>
      </div>
    </main>
  );
}