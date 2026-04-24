import { api } from "@/services/api";

export interface CheckoutCartItem {
  productId: string;
  quantity: number;
}

export interface CreateCheckoutSessionParams {
  items: CheckoutCartItem[];
  address?: string;
}

export interface CreateCheckoutSessionResponse {
  url: string;
}

export async function createCheckoutSession(body: CreateCheckoutSessionParams): Promise<CreateCheckoutSessionResponse> {
  const { data } = await api.post<CreateCheckoutSessionResponse>("/checkout", body);
  return data;
}
