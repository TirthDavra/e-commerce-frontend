import { api } from "@/services/api";

export interface OrderItem {
  product: {
    _id: string;
    name: string;
    image: string;
    price: number;
  };
  quantity: number;
  price: number;
}

export interface Order {
  _id: string;
  user: string;
  items: OrderItem[];
  totalAmount: number;
  address: string;
  paymentStatus: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export async function getOrders(): Promise<Order[]> {
  const { data } = await api.get<{ message: string; orders: Order[] }>("/orders");
  return data.orders;
}
