"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { createCheckoutSession } from "@/api/checkout/checkout.api";
import { useAuthStore } from "@/store/auth.store";
import { useCartStore } from "@/store/cart.store";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";

export default function CheckoutPage() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const { items, getTotalItems, getTotalPrice } = useCartStore();
  const [address, setAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const totalPrice = useMemo(() => getTotalPrice(), [getTotalPrice, items.length]);
  const totalItems = useMemo(() => getTotalItems(), [getTotalItems, items.length]);

  useEffect(() => {
    if (!user) {
      return;
    }

    if (user.role === "admin") {
      setError("Admin accounts are not allowed to checkout.");
    } else {
      setError(null);
    }
  }, [user]);

  const handleCheckout = async () => {
    if (!user) {
      router.push("/login?from=/checkout");
      return;
    }

    if (user.role !== "user") {
      setError("Only customer accounts can complete checkout.");
      return;
    }

    if (items.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await createCheckoutSession({
        items: items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
        })),
        address,
      });
      
      // Store address in session storage for order creation on success page
      if (typeof window !== "undefined") {
        sessionStorage.setItem("checkout_address", address);
      }
      
      window.location.href = response.url;
    } catch (err) {
      console.error(err);
      setError("Unable to create checkout session. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-xl p-6">
          <h1 className="text-2xl font-semibold mb-4">Checkout</h1>

          {!user ? (
            <div className="space-y-4">
              <p className="text-base text-muted-foreground">
                You need to be logged in to complete checkout.
              </p>
              <Button onClick={() => router.push("/login?from=/checkout")}>Login to Continue</Button>
            </div>
          ) : user.role !== "user" ? (
            <div className="space-y-4">
              <p className="text-base text-muted-foreground">
                Admin accounts are not allowed to buy products.
              </p>
              <p className="text-sm text-muted-foreground">
                Please log in with a customer account to proceed.
              </p>
            </div>
          ) : items.length === 0 ? (
            <div className="space-y-4">
              <p className="text-base text-muted-foreground">
                Your cart is empty.
              </p>
              <Link href="/">
                <Button>Continue Shopping</Button>
              </Link>
            </div>
          ) : (
            <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
              <div className="space-y-6">
                <div className="rounded-xl border p-5">
                  <h2 className="text-lg font-semibold mb-3">Shipping Address</h2>
                  <Textarea
                    value={address}
                    onChange={(event) => setAddress(event.target.value)}
                    placeholder="Enter your shipping address"
                    className="min-h-[150px]"
                  />
                </div>

                <div className="rounded-xl border p-5">
                  <h2 className="text-lg font-semibold mb-3">Order Summary</h2>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Items</span>
                      <span>{totalItems}</span>
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Total</span>
                      <span>${totalPrice.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border p-5 space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Logged in as</p>
                  <p className="font-medium">{user.name} ({user.email})</p>
                </div>

                <Button onClick={handleCheckout} disabled={isLoading}>
                  {isLoading ? "Redirecting…" : "Pay with Stripe"}
                </Button>

                {error && (
                  <p className="text-sm text-destructive mt-2">{error}</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
