import { Button } from "@/components/ui/button";
import Link from "next/link";
import { validateRequest } from "@/auth";
import { db } from "@/db";
import { Cart } from "@/db/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import React from "react";
import { revalidatePath } from "next/cache";

export default async function CheckoutPage() {
  const { user } = await validateRequest();
  if (!user) {
    return redirect("/login");
  }

  const cartData = await db
    .select()
    .from(Cart)
    .where(eq(Cart.userId, user.id))
    .orderBy(Cart.productId);

  let totalAmount = 0;
  let totalItems = 0;
  cartData.forEach((item) => {
    totalAmount += item.quantity * +item.productPrice;
    totalItems += item.quantity;
  });
  if (totalAmount === 0 && totalItems === 0) {
    redirect("/");
  }

  return (
    <div className="flex flex-col items-center gap-2 ">
      <h1 className="text-2xl font-bold">Cart</h1>
      <div className="w-full sm:w-4/5 p-2 sm:p-10 flex flex-col gap-2 ">
        Summary of Cart Items Total Items: {totalItems}
        Total Amount: ${totalAmount.toFixed(3)}
      </div>
      <div className="w-full sm:w-4/5 flex justify-around">
        <form
          action={async (e: FormData) => {
            "use server";
            await db.delete(Cart).where(eq(Cart.userId, user.id));
            revalidatePath("/checkout");
          }}
        >
          <Button type="submit" variant={"destructive"}>
            Make Payment
          </Button>
        </form>
        <Link href={"/"}>
          <Button variant={"secondary"}>Go To Home</Button>
        </Link>
      </div>
    </div>
  );
}
