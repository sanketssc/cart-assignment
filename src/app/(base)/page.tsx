import { Product } from "@/lib/types";
import Card from "@/components/Card";
import { Cart } from "@/db/schema";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { validateRequest } from "@/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const shoppingData = await fetch("https://fakestoreapi.com/products", {
    cache: "force-cache",
  });
  const data: Product[] = await shoppingData.json();
  const { user } = await validateRequest();
  if (!user) {
    return redirect("/login");
  }
  const cartData = await db
    .select()
    .from(Cart)
    .where(eq(Cart.userId, user?.id));

  const totalItems = cartData.reduce((acc, item) => {
    return acc + item.quantity;
  }, 0);

  return (
    <div className="w-full mx-auto">
      <h1 className="text-4xl text-center font-bold my-4">
        Shopping - {totalItems}
      </h1>
      <div className="w-full lg:max-w-screen-xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-2">
        {data.map((item) => {
          return (
            <Card
              key={item.id}
              product={item}
              itemInCart={cartData.find(
                (cartItem) => cartItem.productId === item.id
              )}
            />
          );
        })}
      </div>
    </div>
  );
}
