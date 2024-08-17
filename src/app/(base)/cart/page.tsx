import { validateRequest } from "@/auth";
import CartCard from "@/components/CartCard";
import { Button } from "@/components/ui/button";
import { db } from "@/db";
import { Cart } from "@/db/schema";
import { eq } from "drizzle-orm";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

export default async function CartPage() {
  const { user } = await validateRequest();
  if (!user) {
    return redirect("/login");
  }

  const cartData = await db
    .select()
    .from(Cart)
    .where(eq(Cart.userId, user.id))
    .orderBy(Cart.productId);

  let total = 0;
  let totalItems = 0;
  cartData.forEach((item) => {
    total += item.quantity * +item.productPrice;
    totalItems += item.quantity;
  });

  return (
    <div className="flex flex-col items-center gap-2 ">
      <h1 className="text-2xl font-bold">Cart - {totalItems}</h1>
      <div className="w-full sm:w-4/5 p-2 sm:p-10 flex flex-col gap-2 ">
        {cartData.map((cartItem) => {
          return <CartCard key={cartItem.id} cartItem={cartItem} />;
        })}
      </div>
      <div className="w-full sm:w-4/5 flex justify-around">
        <div>Total: ${total.toFixed(3)}</div>
        <div>
          <Link href={"/checkout"}>
            <Button variant={"secondary"}>Checkout</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
