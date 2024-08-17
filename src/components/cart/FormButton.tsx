"use client";
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";

export function FormButton({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { pending } = useFormStatus();

  if (pending) {
    return (
      <Button variant={"outline"} disabled={true}>
        Adding
      </Button>
    );
  }
  return (
    <Button variant={"outline"} size={"default"}>
      {children}
    </Button>
  );
}
