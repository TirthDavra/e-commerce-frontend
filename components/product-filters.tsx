"use client";

import React, { useState } from "react";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { useDebounce } from "@/hooks/use-debounce";

interface ProductFiltersProps {
  searchQuery: string;
  minPrice: string;
  maxPrice: string;
  onSearchChange: (query: string) => void;
  onMinPriceChange: (price: string) => void;
  onMaxPriceChange: (price: string) => void;
  onClearFilters: () => void;
  isLoading?: boolean;
}

export function ProductFilters({
  searchQuery,
  minPrice,
  maxPrice,
  onSearchChange,
  onMinPriceChange,
  onMaxPriceChange,
  onClearFilters,
  isLoading = false,
}: ProductFiltersProps) {
  const [localSearch, setLocalSearch] = useState(searchQuery);
  const [localMinPrice, setLocalMinPrice] = useState(minPrice);
  const [localMaxPrice, setLocalMaxPrice] = useState(maxPrice);
  const debouncedSearch = useDebounce(localSearch, 300);

  // Update parent when debounced search changes
  React.useEffect(() => {
    console.log("Search query changed:", debouncedSearch);
    onSearchChange(debouncedSearch);
  }, [debouncedSearch, onSearchChange]);

  // Update local state when props change
  React.useEffect(() => {
    setLocalMinPrice(minPrice);
  }, [minPrice]);

  React.useEffect(() => {
    setLocalMaxPrice(maxPrice);
  }, [maxPrice]);

  const handleApplyPriceFilters = () => {
    console.log("Applying price filters:", { minPrice: localMinPrice, maxPrice: localMaxPrice });
    onMinPriceChange(localMinPrice);
    onMaxPriceChange(localMaxPrice);
  };

  const hasActiveFilters = searchQuery || minPrice || maxPrice;

  return (
    <div className="flex flex-col gap-4 mb-6">
      {/* Search Bar */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          placeholder="Search products..."
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <span>Active filters:</span>
          {searchQuery && <span className="bg-muted px-2 py-1 rounded">Search: "{searchQuery}"</span>}
          {minPrice && <span className="bg-muted px-2 py-1 rounded">Min: ${minPrice}</span>}
          {maxPrice && <span className="bg-muted px-2 py-1 rounded">Max: ${maxPrice}</span>}
          {(localMinPrice !== minPrice || localMaxPrice !== maxPrice) && (
            <span className="text-orange-600 bg-orange-50 px-2 py-1 rounded">
              Price filters pending - click Apply
            </span>
          )}
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-4">

      {/* Mobile Filter Button */}
      <div className="sm:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filters
              {hasActiveFilters && (
                <span className="ml-2 bg-primary text-primary-foreground rounded-full w-2 h-2" />
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-80">
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
            </SheetHeader>
            <div className="space-y-4 mt-6">
              <div className="space-y-2">
                <Label htmlFor="min-price-mobile">Min Price</Label>
                <Input
                  id="min-price-mobile"
                  type="number"
                  placeholder="0"
                  value={localMinPrice}
                  onChange={(e) => setLocalMinPrice(e.target.value)}
                  min="0"
                  step="0.01"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="max-price-mobile">Max Price</Label>
                <Input
                  id="max-price-mobile"
                  type="number"
                  placeholder="1000"
                  value={localMaxPrice}
                  onChange={(e) => setLocalMaxPrice(e.target.value)}
                  min="0"
                  step="0.01"
                />
              </div>
              <Button
                onClick={handleApplyPriceFilters}
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? "Applying..." : "Apply Filters"}
              </Button>
              {hasActiveFilters && (
                <Button
                  onClick={onClearFilters}
                  variant="outline"
                  className="w-full"
                >
                  Clear Filters
                </Button>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Filters */}
      <div className="hidden sm:flex items-center gap-2">
        <div className="flex items-center gap-2">
          <Label htmlFor="min-price" className="text-sm whitespace-nowrap">
            Min Price:
          </Label>
          <Input
            id="min-price"
            type="number"
            placeholder="0"
            value={localMinPrice}
            onChange={(e) => setLocalMinPrice(e.target.value)}
            className="w-24"
            min="0"
            step="0.01"
          />
        </div>

        <div className="flex items-center gap-2">
          <Label htmlFor="max-price" className="text-sm whitespace-nowrap">
            Max Price:
          </Label>
          <Input
            id="max-price"
            type="number"
            placeholder="1000"
            value={localMaxPrice}
            onChange={(e) => setLocalMaxPrice(e.target.value)}
            className="w-24"
            min="0"
            step="0.01"
          />
        </div>

        <Button
          onClick={handleApplyPriceFilters}
          size="sm"
          disabled={isLoading}
        >
          {isLoading ? "..." : "Apply"}
        </Button>

        {hasActiveFilters && (
          <Button
            onClick={onClearFilters}
            variant="outline"
            size="sm"
          >
            Clear
          </Button>
        )}
      </div>
      </div>
    </div>
  );
}
