import { CartItem, Product } from "@/lib/types";
import { Card } from "./ui/card";
import Image from "next/image";
import { Button } from "./ui/button";
import { db } from "@/db";
import { Cart } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import QuantityAdjust from "./cart/QuantityAdjust";
import { Delete, Trash2 } from "lucide-react";

export default async function CartCard({ cartItem }: { cartItem: CartItem }) {
  const Item = await fetch(
    `https://fakestoreapi.com/products/${cartItem.productId}`,
    {
      cache: "force-cache",
    }
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
        <div>
          <form>
            <Button
              variant={"destructive"}
              formAction={async (formData) => {
                "use server";
                await db.delete(Cart).where(eq(Cart.id, cartItem.id));
                revalidatePath("/cart");
              }}
            >
              <Trash2 />
            </Button>
          </form>
        </div>
        <div className="flex flex-col items-center">
          <QuantityAdjust cartItem={cartItem} itemData={itemData} />
        </div>
      </div>
    </Card>
  );
}
