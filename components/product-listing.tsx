"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProducts, type Product } from "@/api/products/products.api";
import { ProductCard } from "@/components/product-card";
import { ProductFilters } from "@/components/product-filters";
import { CartSidebar } from "@/components/cart-sidebar";
import { CartButton } from "@/components/cart-button";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/auth.store";

interface ProductListingProps {
  initialProducts: Product[];
}

export function ProductListing({ initialProducts }: ProductListingProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const hasActiveFilters = searchQuery || minPrice || maxPrice;

  console.log("Current filter state:", { searchQuery, minPrice, maxPrice, hasActiveFilters });

  const { data: products, isLoading, error } = useQuery({
    queryKey: ["products", searchQuery, minPrice, maxPrice],
    queryFn: () => {
      console.log("Fetching products with params:", { q: searchQuery || undefined, minPrice: minPrice ? Number(minPrice) : undefined, maxPrice: maxPrice ? Number(maxPrice) : undefined });
      return getProducts({
        q: searchQuery || undefined,
        minPrice: minPrice ? Number(minPrice) : undefined,
        maxPrice: maxPrice ? Number(maxPrice) : undefined,
      });
    },
    initialData: hasActiveFilters ? undefined : initialProducts,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const clearFilters = () => {
    setSearchQuery("");
    setMinPrice("");
    setMaxPrice("");
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-2">Something went wrong</h2>
          <p className="text-muted-foreground">
            Failed to load products. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <CartSidebar />

      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-2xl font-bold text-gray-900">Shop</h1>

            <div className="flex items-center gap-3">
              {user ? (
                <Button variant="outline" onClick={logout} size="sm">
                  Logout
                </Button>
              ) : null}
              <CartButton />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProductFilters
          searchQuery={searchQuery}
          minPrice={minPrice}
          maxPrice={maxPrice}
          onSearchChange={setSearchQuery}
          onMinPriceChange={setMinPrice}
          onMaxPriceChange={setMaxPrice}
          onClearFilters={clearFilters}
          isLoading={isLoading}
        />

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-white rounded-lg p-4 animate-pulse">
                <div className="aspect-square bg-gray-200 rounded-lg mb-4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : products && products.length > 0 ? (
          <>
            <div className="mb-4">
              <p className="text-sm text-muted-foreground">
                Showing {products.length} product{products.length !== 1 ? "s" : ""}
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-lg font-semibold mb-2">No products found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search or filter criteria.
            </p>
            <Button onClick={clearFilters} variant="outline">
              Clear Filters
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}
