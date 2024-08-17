import { CartItem, Product } from "@/lib/types";
import { Card } from "./ui/card";
import Image from "next/image";
import { Button } from "./ui/button";
import { db } from "@/db";
import { Cart } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import QuantityAdjust from "./cart/QuantityAdjust";

export default async function CartCard({ cartItem }: { cartItem: CartItem }) {
  const Item = await fetch(
    `https://fakestoreapi.com/products/${cartItem.productId}`
  );
  const itemData: Product = await Item.json();

  return (
    <Card className="p-2 sm:p-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Image
            className="w-16 h-16"
            width={64}
            height={64}
            src={itemData.image}
            alt={itemData.title}
          />
          <div className="ml-2">
            <h2 className="text-lg font-bold">{itemData.title}</h2>
            <p className="text-sm text-gray-500">{itemData.category}</p>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-lg font-bold mr-2">
            $ {(itemData.price * cartItem.quantity).toFixed(2)}
          </div>
          <QuantityAdjust cartItem={cartItem} itemData={itemData} />
        </div>
      </div>
    </Card>
  );
}
