import { api } from "@/services/api";
import type { Product } from "@/store/cart.store";

export type { Product };

export interface GetProductsParams {
  q?: string;
  minPrice?: number;
  maxPrice?: number;
}

// Client-side fetch function (uses API service with auth)
export async function getProducts(params?: GetProductsParams): Promise<Product[]> {
  console.log("getProducts called with params:", params);
  try {
    const { data } = await api.get<Product[]>("/products", { params });
    console.log("getProducts response:", data?.length || 0, "products");
    return data;
  } catch (error) {
    console.error("getProducts error:", error);
    throw error;
  }
}

// Server-side fetch function (no auth required for products)
export async function getProductsServerSide(params?: GetProductsParams): Promise<Product[]> {
  const baseUrl = (process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api").replace(/\/$/, "");
  const url = `${baseUrl}/products`;

  const searchParams = new URLSearchParams();
  if (params?.q) searchParams.set("q", params.q);
  if (params?.minPrice !== undefined) searchParams.set("minPrice", params.minPrice.toString());
  if (params?.maxPrice !== undefined) searchParams.set("maxPrice", params.maxPrice.toString());

  const response = await fetch(`${url}?${searchParams.toString()}`, {
    next: { revalidate: 300 }, // Revalidate every 5 minutes
  });

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return response.json();
}

export interface CreateOrderItem {
  productId: string;
  quantity: number;
}

export interface CreateOrderRequest {
  items: CreateOrderItem[];
  address?: string;
}

export interface OrderItem {
  product: string;
  name: string;
  quantity: number;
  price: number;
}

export interface Order {
  _id: string;
  user: string;
  items: OrderItem[];
  totalAmount: number;
  paymentStatus: "pending" | "paid" | "failed";
  status: "pending" | "processing" | "completed" | "cancelled";
  address: string;
  createdAt: string;
  updatedAt: string;
}

export async function createOrder(orderData: CreateOrderRequest): Promise<Order> {
  const { data } = await api.post<Order>("/orders", orderData);
  return data;
}
