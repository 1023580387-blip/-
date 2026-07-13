"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import Preloader from "./Preloader";
import InvisibleNav from "./InvisibleNav";
import ParticleBackground from "./ParticleBackground";

export default function ClientShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  const variant: "home" | "products" | "compute" | "about" =
    pathname === "/products"
      ? "products"
      : pathname === "/compute"
      ? "compute"
      : pathname === "/about"
      ? "about"
      : "home";

  return (
    <>
      <AnimatePresence mode="wait">
        {!loaded && <Preloader key="preloader" />}
      </AnimatePresence>
      <ParticleBackground variant={variant} />
      <InvisibleNav />
      <main className="relative z-0 min-h-screen w-full">{children}</main>
    </>
  );
}
