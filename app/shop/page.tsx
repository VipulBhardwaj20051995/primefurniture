import { Suspense } from "react";
import ClientShop from "@/components/client-shop";

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="min-h-screen p-8">Loading...</div>}>
      <ClientShop />
    </Suspense>
  );
}