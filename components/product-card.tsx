import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingCart } from "lucide-react";
import { useCartStore, type Product } from "@/store/cart.store";
import { toast } from "sonner";
import { Badge } from "./ui/badge";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem(product);
    toast.success(`${product.name} added to cart`);
  };

  const isOutOfStock = product.stock === 0;

  return (
    <Card className="group overflow-hidden transition-all hover:shadow-lg">
      <div className="aspect-square relative overflow-hidden bg-gray-50">
        <Image
          src={product.image || "/placeholder-product.jpg"}
          alt={product.name}
          fill
          className="object-cover transition-transform group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {isOutOfStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <Badge variant="destructive" className="text-sm">
              Out of Stock
            </Badge>
          </div>
        )}
      </div>

      <CardContent className="p-4">
        <div className="space-y-2">
          <h3 className="font-semibold text-lg line-clamp-2">{product.name}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {product.description}
          </p>

          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold">${product.price.toFixed(2)}</span>
            <span className="text-sm text-muted-foreground">
              {product.stock} in stock
            </span>
          </div>
        </div>

        <Button
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          className="w-full mt-4"
          size="sm"
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          {isOutOfStock ? "Out of Stock" : "Add to Cart"}
        </Button>
      </CardContent>
    </Card>
  );
}
