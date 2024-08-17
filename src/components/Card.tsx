import { Product } from "@/lib/types";
import Image from "next/image";
import React from "react";
import AddToCart from "./cart/AddToCart";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import Link from "next/link";

export default function ItemCard({
  product,
  itemInCart,
}: {
  product: Product;
  itemInCart?: {
    id: string;
    productId: number;
    userId: string;
    quantity: number;
  };
}) {
  return (
    <Card className="w-full sm:w-full flex sm:flex-col items-center gap-4 p-2">
      <Image
        className="sm:min-w-36 sm:min-h-36 sm:w-36 sm:h-36 min-w-32 min-h-32 w-32 h-32 fill-inherit"
        src={product.image}
        alt={product.title}
        width={200}
        height={200}
      />
      <div className="w-2/3 sm:w-full">
        <CardHeader
          className=" flex items-center justify-center text-center"
          title={product.title}
        >
          <CardTitle className="w-full whitespace-nowrap overflow-hidden overflow-ellipsis">
            {product.title}
          </CardTitle>
          <CardDescription className="text-sm text-gray-500">
            {product.category}
          </CardDescription>
        </CardHeader>
        <CardContent className=" " title={product.description}>
          <CardDescription className="h-10 overflow-hidden overflow-ellipsis">
            {product.description}
          </CardDescription>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div>$ {product.price}</div>
          {itemInCart ? (
            <Link href={"/cart"}>
              <Button variant={"outline"}>Go To Cart</Button>
            </Link>
          ) : (
            <AddToCart product={product}> Add to Cart</AddToCart>
          )}
        </CardFooter>
      </div>
    </Card>
  );
}
