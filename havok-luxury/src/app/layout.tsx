import type { Metadata } from "next";
import "./globals.css";
import GlobalNav from "@/components/GlobalNav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "HAVOK | Global Luxury House",
  description:
    "HAVOK — A global house of luxury since 1790. Explore our collections of fine watches, haute couture, jewelry, automotive accessories, elite technology, and rare collectibles.",
  keywords: [
    "HAVOK",
    "luxury",
    "watches",
    "couture",
    "jewelry",
    "collectibles",
    "haute horlogerie",
    "global luxury",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-havok-carbon text-havok-text-primary antialiased min-h-screen">
        <GlobalNav />
        <main className="relative z-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}