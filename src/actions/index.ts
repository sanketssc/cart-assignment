"use server";

import { validateRequest } from "@/auth";
import { db } from "@/db";
import { Cart } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function addToCart(added: number, formData: FormData) {
   const { user } = await validateRequest();
    if (!user) {
      return redirect("/login");
    }
    const id = Number(formData.get("id")!)
    const price = formData.get("price")!.toString()
    const cartData = await db
      .select()
      .from(Cart)
      .where(eq(Cart.userId, user?.id));
    const itemInCart = cartData.find(
      (cartItem) => cartItem.productId === id
    );
    if (itemInCart) {
      await db.update(Cart).set({
        quantity: itemInCart.quantity + 1,
      }).where(eq(Cart.productId, id));
    } else {
      await db.insert(Cart).values({
        userId: user?.id,
        productId: id,
        quantity: 1,
        productPrice: price
      });
    }
    added = added + 1
    console.log(added)
    revalidatePath("/")
  return  added;
}

export async function decreaseQuantity( formData: FormData) {

  const quantity = Number(formData.get("quantity")!);
  const id = formData.get("id")!.toString();
  if (quantity > 1) {
    await db
      .update(Cart)
      .set({
        quantity: quantity - 1,
      })
      .where(eq(Cart.id, id));
  } else {
    // remove the item from the cart
    await db.delete(Cart).where(eq(Cart.id,id));
  }
  revalidatePath("/cart");
  return true;
}

export async function increaseQuantity( formData: FormData) {
  const quantity = Number(formData.get("quantity")!);
  const id = formData.get("id")!.toString();
  console.log(quantity, id);
  await db
    .update(Cart)
    .set({
      quantity: quantity + 1,
    })
    .where(eq(Cart.id, id));
  revalidatePath("/cart");
  return true;
}