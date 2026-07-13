"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const routes = [
  { href: "/", label: "首页" },
  { href: "/products", label: "产品" },
  { href: "/compute", label: "算力" },
  { href: "/about", label: "品牌" },
];

export default function InvisibleNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <motion.nav
      onHoverStart={() => setOpen(true)}
      onHoverEnd={() => setOpen(false)}
      className="fixed right-0 top-1/2 z-50 -translate-y-1/2"
    >
      <div className="relative flex items-center justify-end pr-2">
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 40 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="mr-3 overflow-hidden rounded-l-2xl border-y border-l border-white/10 bg-white/5 backdrop-blur-xl"
            >
              <ul className="flex flex-col py-3">
                {routes.map((route) => {
                  const active = pathname === route.href;
                  return (
                    <li key={route.href}>
                      <Link
                        href={route.href}
                        className={`group relative flex items-center justify-end px-6 py-3 text-sm tracking-widest transition-colors ${
                          active ? "text-ice" : "text-white/60 hover:text-white"
                        }`}
                      >
                        <span className="relative z-10 font-body">
                          {route.label}
                        </span>
                        {active && (
                          <motion.span
                            layoutId="nav-dot"
                            className="ml-3 h-1 w-1 rounded-full bg-ice"
                          />
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          animate={{ opacity: open ? 1 : 0.6 }}
          className="flex h-24 w-1 flex-col items-center justify-center rounded-full bg-gradient-to-b from-white/20 via-ice/40 to-white/20 shadow-[0_0_12px_rgba(34,211,238,0.25)]"
        >
          <span className="h-8 w-[1px] bg-white/30" />
        </motion.div>
      </div>
    </motion.nav>
  );
}
