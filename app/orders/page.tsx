
import Link from "next/link";
import { getOrders, type Order } from "@/api/orders/orders.api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default async function OrdersPage() {


  const orders = await getOrders();


  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">My Orders</h1>
          <Link href="/">
            <Button variant="outline">Continue Shopping</Button>
          </Link>
        </div>

        {orders.length === 0 ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-6 w-32" />
                  <Skeleton className="h-4 w-48 mt-2" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-10 w-24" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : orders.length === 0 ? (
          <Card>
            <CardHeader>
              <CardTitle>No Orders Yet</CardTitle>
              <CardDescription>
                You haven&apos;t placed any orders yet. Start shopping!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/">
                <Button>Start Shopping</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <Card key={order._id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">
                        Order {order._id.slice(-8).toUpperCase()}
                      </CardTitle>
                      <CardDescription>
                        {new Date(order.createdAt).toLocaleDateString()}
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold">${order.totalAmount.toFixed(2)}</p>
                      <div className="flex gap-2 mt-2">
                        <span
                          className={`px-2 py-1 rounded text-xs font-semibold ${order.status === "completed"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                            }`}
                        >
                          {order.status}
                        </span>
                        <span
                          className={`px-2 py-1 rounded text-xs font-semibold ${order.paymentStatus === "completed"
                            ? "bg-green-100 text-green-800"
                            : "bg-orange-100 text-orange-800"
                            }`}
                        >
                          {order.paymentStatus}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Items</h4>
                    <div className="space-y-2">
                      {order.items.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between text-sm border-b pb-2"
                        >
                          <div>
                            <p className="font-medium">{item.product.name}</p>
                            <p className="text-muted-foreground">
                              Qty: {item.quantity} × ${item.price.toFixed(2)}
                            </p>
                          </div>
                          <p className="font-semibold">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {order.address && (
                    <div className="p-3 bg-gray-50 rounded">
                      <h4 className="font-semibold text-sm mb-1">Shipping Address</h4>
                      <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                        {order.address}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
