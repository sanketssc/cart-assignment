"use client";
import { CartItem, Product } from "@/lib/types";
import React, { useActionState, useEffect, useOptimistic } from "react";
import { Button } from "../ui/button";
import { decreaseQuantity, increaseQuantity } from "@/actions";

export default function QuantityAdjust({
  cartItem,
  itemData,
}: {
  cartItem: CartItem;
  itemData: Product;
}) {
  // const [quantity, setQuantity] = React.useState(cartItem.quantity);
  const [quantity, setQuantity] = useOptimistic(
    cartItem.quantity,
    (state, action: "add" | "sub") => {
      return action === "add" ? state + 1 : state - 1;
    }
  );
  // const [decrementState, decrementAction, decrementPending] = useActionState(
  //   decreaseQuantity,
  //   false
  // );
  // const [incrementState, incrementAction, incrementPending] = useActionState(
  //   increaseQuantity,
  //   false
  // );

  // useEffect(() => {
  //   setQuantity(cartItem.quantity);
  // });
  return (
    <>
      <div className="text-lg font-bold mr-2">
        $ {(itemData.price * quantity).toFixed(2)}
      </div>
      <form className="flex items-center gap-1">
        <input type={"hidden"} name={"id"} value={cartItem.id} />
        <input type={"hidden"} name={"quantity"} value={quantity} />
        <Button
          formAction={async (formData: FormData) => {
            setQuantity("sub");
            await decreaseQuantity(formData);
          }}
          disabled={quantity === 1}
        >
          -
        </Button>
        <div className="px-3">{quantity}</div>
        <Button
          formAction={async (formData: FormData) => {
            setQuantity("add");
            await increaseQuantity(formData);
          }}
          // disabled={decrementPending || incrementPending}
        >
          +
        </Button>
      </form>
    </>
  );
}
