"use client";

import { FC, useCallback, useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";
import { states } from "@/constants/states-options";
import { Payment, User } from "@/payload-types";
import { useMutation } from "@tanstack/react-query";
import { serviceCheckoutAction } from "@/actions/checkouts";
import { toast } from "sonner";
import Script from "next/script";
import { getClientSideURL } from "@/lib/getURL";
import PaymentStatus from "@/components/custom/payment-status";
import { checkoutSchema, CheckoutSchema } from "@/schema/checkout";
import { siteConfig } from "@/config/site";

type Props = {
  id: string;
  user:
    | (Pick<User, "id" | "email" | "mobile"> & {
        name: string;
      })
    | null;
};

export const CheckoutForm: FC<Props> = ({ id, user }) => {
  const [status, setStatus] = useState<{
    success: boolean;
  } | null>(null);

  const [payment, setPayment] = useState<Payment | null>(null);
  const [isFallbackLoading, setIsFetFallbackLoading] = useState(false);

  const form = useForm<CheckoutSchema>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      serviceId: id,
      name: user?.name || "",
      mobile: user?.mobile || "",
      email: user?.email || "",
      state: "",
      city: "",
      terms: false,
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: serviceCheckoutAction,
    onError: (error) => {
      toast.error("Something went wrong", { id: "service-checkout" });
      console.log(error);
    },
    onSuccess: (data) => {
      setIsFetFallbackLoading(true);
      setPayment(data);
      const { orderId } = data;
      if (!data.order) {
        toast.error("Something went wrong");
      }
      // @ts-ignore
      const { amount, currency } = data.order || {};

      if (amount && currency) {
        const razorpay = new (window as any).Razorpay({
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
          amount: amount,
          currency: currency,
          name: siteConfig.name,
          description: "Legal Service Payment",
          order_id: orderId,
          prefill: {
            name: user?.name || "",
            email: data.email,
            contact: data.mobile,
          },
          theme: {
            color: "#000000",
          },
          handler: async function (response: any) {
            const res = await fetch(
              `${getClientSideURL()}/api/payments/verify`,
              {
                method: "POST",
                body: JSON.stringify({
                  orderId: response.razorpay_order_id,
                  razorpayPaymentId: response.razorpay_payment_id,
                  razorpaySignature: response.razorpay_signature,
                }),
              }
            );
            const data = await res.json();
            setStatus({
              success: data.success,
            });
            setIsFetFallbackLoading(false);
            toast.success("Payment successful", { id: "service-checkout" });
          },
        });
        razorpay.open();
      }
    },
  });

  useEffect(() => {
    if (status?.success) {
      form.reset();
    }
  }, [status]);

  const onSubmit = useCallback(
    (data: CheckoutSchema) => {
      toast.loading("Processing your service request...", {
        id: "service-checkout",
      });
      mutate({
        args: data,
        type: "service",
      });
    },
    [mutate]
  );

  const FIELDS = [
    {
      name: "name" as const,
      type: "text",
      label: "Name",
      placeholder: "Enter your name",
      hidden: user?.name ? true : false,
    },
    {
      name: "mobile" as const,
      type: "text",
      label: "Mobile Number",
      placeholder: "Enter your mobile",
      hidden: user?.mobile ? true : false,
    },
    {
      name: "email" as const,
      type: "email",
      label: "Email",
      placeholder: "Enter your email",
      hidden: user?.email ? true : false,
    },
  ];

  if (status && payment) {
    return (
      <PaymentStatus
        {...payment}
        isSuccess={status.success}
        title={status.success ? "Payment Successful" : "Payment Failed"}
        description={
          status.success
            ? "Your transaction has been processed successfully."
            : "We were unable to process your transaction."
        }
      />
    );
  }

  return (
    <Form {...form}>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" type="" />
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {FIELDS.map((item, idx) => (
          <FormField
            control={form.control}
            name={item.name}
            key={idx}
            render={({ field }) => (
              <FormItem hidden={item.hidden}>
                <FormLabel className="text-sm">{item.label}</FormLabel>
                <FormControl>
                  <Input placeholder={item.placeholder} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <div className="flex gap-4 mb-3">
          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel className="text-sm">Select your state</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your state" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {states.map((state) => (
                      <SelectItem key={state} value={state}>
                        {state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel className="text-sm">City</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your city" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="terms"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  className="mt-[1px]"
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel className="text-sm font-medium leading-none">
                  I agree to{" "}
                  <Link
                    href="/terms-condition"
                    className="text-primary hover:underline"
                  >
                    terms of use
                  </Link>
                </FormLabel>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full"
          disabled={isPending || isFallbackLoading}
        >
          {isPending || isFallbackLoading ? "Submitting..." : "Submit"}
        </Button>
        {isFallbackLoading && (
          <p className="text-muted-foreground text-xs">
            Please wait while we process your transaction. Do not refresh or
            close this page.
          </p>
        )}
      </form>
    </Form>
  );
};
