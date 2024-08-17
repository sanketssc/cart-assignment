"use client";
import { CartItem, Product } from "@/lib/types";
import React, { useActionState, useEffect } from "react";
import { Button } from "../ui/button";
import { decreaseQuantity, increaseQuantity } from "@/actions";

export default function QuantityAdjust({
  cartItem,
  itemData,
}: {
  cartItem: CartItem;
  itemData: Product;
}) {
  const [quantity, setQuantity] = React.useState(cartItem.quantity);
  const [decrementState, decrementAction, decrementPending] = useActionState(
    decreaseQuantity,
    false
  );
  const [incrementState, incrementAction, incrementPending] = useActionState(
    increaseQuantity,
    false
  );

  useEffect(() => {
    setQuantity(cartItem.quantity);
  });
  return (
    <form className="flex items-center gap-1">
      <input type={"hidden"} name={"id"} value={cartItem.id} />
      <input type={"hidden"} name={"quantity"} value={quantity} />
      <Button
        formAction={decrementAction}
        disabled={decrementPending || incrementPending}
      >
        -
      </Button>
      <div className="px-3">{quantity}</div>
      <Button
        formAction={incrementAction}
        disabled={decrementPending || incrementPending}
      >
        +
      </Button>
    </form>
  );
}
