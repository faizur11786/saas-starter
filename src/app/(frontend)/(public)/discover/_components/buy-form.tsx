"use client";
import { buyPropertyToken } from "@/actions/property/buy";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/use-auth";
import { cn, formatCurrencySuffixes } from "@/lib/utils";
import { Property } from "@/payload-types";
import { buyTokenSchema, BuyTokenSchema } from "@/schema/property";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Coins } from "lucide-react";
import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const QUANTITY_OPTIONS = [
  { value: "5", label: "5" },
  { value: "10", label: "10" },
  { value: "15", label: "15" },
  { value: "20", label: "20" },
  { value: "custom", label: "Custom" },
];

type Props = Pick<
  Property,
  "pricePerToken" | "currency" | "area" | "id" | "soldQuantity"
> & {
  setIsSuccess: Dispatch<SetStateAction<boolean>>;
};

const BuyForm = ({
  pricePerToken,
  currency,
  area,
  id,
  setIsSuccess,
  soldQuantity,
}: Props) => {
  const availableTokens = Number(area) - Number(soldQuantity);
  const [quantitySelected, setQuantitySelected] = useState(
    QUANTITY_OPTIONS[0].value
  );

  const { data } = useAuth();

  const form = useForm<BuyTokenSchema>({
    mode: "onBlur",
    resolver: zodResolver(buyTokenSchema),
    defaultValues: {
      amount: "",
      property: id ?? "",
      quantity: quantitySelected === "custom" ? "" : quantitySelected,
      user: data?.user?.id ?? "",
    },
  });

  const { quantity } = form.watch();

  useEffect(() => {
    if (quantitySelected !== "custom") {
      form.setValue("quantity", quantitySelected);
    }
  }, [quantitySelected]);

  useEffect(() => {
    if (Number(quantity) > Number(availableTokens)) {
      form.setError("quantity", {
        type: "custom",
        message: "Quantity cannot be greater than token supply",
      });
    } else {
      form.clearErrors("quantity");
      const totalAmount = (Number(pricePerToken) * Number(quantity)).toString();
      form.setValue("amount", totalAmount);
    }
  }, [quantity]);

  const { mutate, isPending } = useMutation({
    mutationFn: buyPropertyToken,
    onSuccess: (_data) => {
      toast.success("Purchase completed successfully!", { id: "buy-token" });
      setIsSuccess(true);
    },
    onError: (error) => {
      toast.error(
        error.message ?? "Failed to complete the purchase. Please try again.",
        {
          id: "buy-token",
        }
      );
    },
  });

  const onSubmit = useCallback(
    (data: BuyTokenSchema) => {
      toast.loading("Processing your purchase...", { id: "buy-token" });
      mutate(data);
    },
    [mutate]
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <div className="space-y-2">
            <p className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Select Token Quantity
            </p>
            <div className="grid grid-cols-5 rounded-md border bg-card p-1 gap-1 ">
              {QUANTITY_OPTIONS.map((item, idx) => (
                <Button
                  type="button"
                  onClick={() => setQuantitySelected(item.value)}
                  key={idx}
                  className={cn("h-auto p-1.5", {
                    "shadow-md": item.value === quantitySelected,
                  })}
                  variant={
                    item.value === quantitySelected ? "default" : "ghost"
                  }
                >
                  {item.label}
                </Button>
              ))}
            </div>
          </div>
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem hidden={quantitySelected !== "custom" ? true : false}>
                <FormLabel>Specify Token Quantity</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>
                  Specify the quantity of tokens you want to purchase.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="space-y-2">
            <p className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Investment summary
            </p>
            <div className="border bg-card rounded-md grid grid-cols-2 gap-2 ">
              <div className="p-2 flex items-center gap-2">
                <div className="rounded-md w-14 h-14 bg-primary/15 flex justify-center items-center">
                  <Coins className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Price</p>
                  <p className="text-primary font-semibold">
                    {formatCurrencySuffixes(
                      Number(pricePerToken) * Number(quantity),
                      { currency: currency ?? "AED" }
                    )}
                  </p>
                </div>
              </div>
              <div className="flex justify-center items-center">
                <Button type="submit" disabled={isPending}>
                  {isPending ? "Buying..." : "Buy Now"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default BuyForm;
