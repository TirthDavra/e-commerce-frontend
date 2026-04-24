"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/auth.store";
import { useCartStore } from "@/store/cart.store";
import { api } from "@/services/api";

export default function OrderSuccessPage() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const { items, clearCart } = useCartStore();
  const queryClient = useQueryClient();
  const [hydrated, setHydrated] = useState(() => useAuthStore.persist.hasHydrated());
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const orderProcessed = useRef(false);

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    const createOrder = async () => {
      if (!user) {
        return; // wait for user to hydrate
      }

      if (orderProcessed.current) {
        return;
      }

      if (items.length === 0) {
        setError("No items to order. Returning to home...");
        setTimeout(() => router.push("/"), 3000);
        return;
      }

      orderProcessed.current = true;

      try {
        const address = sessionStorage.getItem("checkout_address") || "Not provided";

        await api.post("/orders", {
          items: items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
          })),
          address,
          paymentCompleted: true,
        });

        clearCart();
        sessionStorage.removeItem("checkout_address");
        setIsLoading(false);
        queryClient.invalidateQueries({ queryKey: ["products"] });
      } catch (err: any) {
        console.error("Failed to create order:", err);
        setError(
          err.response?.data?.message || "Failed to create order. Please contact support."
        );
        setIsLoading(false);
      }
    };

    createOrder();
  }, [hydrated, user, items, router, clearCart]);

  useEffect(() => {
    if (useAuthStore.persist.hasHydrated()) {
      setHydrated(true);
      return;
    }

    const unsub = useAuthStore.persist.onFinishHydration(() => setHydrated(true));
    return unsub;
  }, []);

  if (!hydrated) {
    return (
      <div className="min-h-screen bg-linear-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your order details...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-linear-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Authentication Required</h1>
          <p className="text-muted-foreground mb-6">You need to be logged in to view this page.</p>
          <Button onClick={() => router.push("/login?from=/order-success")} className="w-full">
            Log In
          </Button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-muted-foreground">Processing your order...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-linear-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md text-center">
          <div className="text-4xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-red-600 mb-4">Order Error</h1>
          <p className="text-muted-foreground mb-6">{error}</p>
          <div className="space-y-2">
            <Link href="/">
              <Button className="w-full">Back to Home</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md text-center">
        <div className="text-6xl mb-4">✅</div>
        <h1 className="text-3xl font-bold text-green-600 mb-2">Order Confirmed!</h1>
        <p className="text-muted-foreground mb-2">Your payment was successful.</p>
        <p className="text-muted-foreground mb-6">
          We&apos;ve received your order and will ship it soon.
        </p>
        
        <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
          <p className="text-sm font-semibold text-gray-700 mb-2">Order Details</p>
          <p className="text-sm text-muted-foreground mb-1">
            <strong>Customer:</strong> {user.name}
          </p>
          <p className="text-sm text-muted-foreground">
            <strong>Email:</strong> {user.email}
          </p>
        </div>

        <div className="space-y-3">
          <Link href="/orders" className="w-full">
            <Button variant="default" className="w-full">
              View My Orders
            </Button>
          </Link>
          <Link href="/" className="w-full">
            <Button variant="outline" className="w-full">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
