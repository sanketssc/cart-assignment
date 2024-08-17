"use client";
import { toast } from "sonner";
import { Product } from "@/lib/types";
import { useRouter } from "next/navigation";
import { addToCart } from "@/actions";
import { FormButton } from "./FormButton";

export default function AddToCart({
  product,
  children,
}: Readonly<{ children: React.ReactNode; product: Product }>) {
  const router = useRouter();

  return (
    <form
      action={async (formData: FormData) => {
        const res = await addToCart(0, formData);
        console.log({ res });
        toast("Added to cart", {
          description: product.title,
          duration: 5000,
          action: {
            label: "View cart",
            onClick: () => {
              router.push("/cart");
            },
          },
        });
      }}
    >
      <input type="hidden" name="price" value={product.price} />
      <input type="hidden" name="id" value={product.id} />

      <FormButton> {children} </FormButton>
    </form>
  );
}
