"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/store/cart.store";

export function CartButton() {
  const { toggleCart, getTotalItems } = useCartStore();
  const [isHydrated, setIsHydrated] = useState(false);
  const cartItemCount = getTotalItems();

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return (
    <Button
      onClick={toggleCart}
      variant="outline"
      className="relative"
    >
      <ShoppingCart className="w-5 h-5" />
      {isHydrated && cartItemCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
          {cartItemCount}
        </span>
      )}
    </Button>
  );
}
