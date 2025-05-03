// src/app/providers.js
"use client";

import { SessionProvider } from "next-auth/react";
import { CartProvider } from "@/context/CartContext"; // Import CartProvider

export function Providers({ children }) {
  return (
    <SessionProvider>
      <CartProvider>{children}</CartProvider> {/* Wrap children with CartProvider */}
    </SessionProvider>
  );
}

