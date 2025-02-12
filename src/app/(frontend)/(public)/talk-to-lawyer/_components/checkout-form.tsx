import { bookerCheckoutAction } from "@/actions/checkouts";
import PaymentStatus from "@/components/custom/payment-status";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { states } from "@/constants/states-options";
import { useAuth } from "@/hooks/use-auth";
import { getClientSideURL } from "@/lib/getURL";
import { Payment, User } from "@/payload-types";
import { BookerCheckout, bookerCheckoutSchema } from "@/schema/checkout";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Script from "next/script";

import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type Props = {
  user:
    | (Pick<User, "id" | "email" | "mobile"> & {
        name: string;
      })
    | null;
};

export const CheckoutForm = ({ user }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const duration = searchParams.get("duration") || "30";
  const slot = searchParams.get("slot");

  const [status, setStatus] = useState<{
    success: boolean;
  } | null>(null);
  const [payment, setPayment] = useState<Payment | null>(null);
  const [isFallbackLoading, setIsFetFallbackLoading] = useState(false);

  const form = useForm<BookerCheckout>({
    resolver: zodResolver(bookerCheckoutSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      mobile: user?.mobile || "",
      ...(user
        ? {
            client: user?.id || "",
            user: user.id || null,
          }
        : {}),
      lawyer: "",
      description: "",
      duration: Number(duration),
      startTime: slot ? new Date(slot as string).toISOString() : "",
      state: "",
      city: "",
      terms: false,
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: bookerCheckoutAction,
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
          name: "Booker",
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
            console.log({ response });
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

            const params = new URLSearchParams(searchParams);
            params.set("paymentStatus", data.success ? "success" : "failed");
            router.push(`${pathname}?${params.toString()}`);
            setStatus({
              success: data.success,
            });
            setIsFetFallbackLoading(false);
          },
        });
        razorpay.open();
      }
    },
    onError: (error) => {
      console.log(error);
      console.log(error.cause);
    },
  });

  const onSubmit = useCallback(
    (data: BookerCheckout) => {
      mutate(data);
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

  useEffect(() => {
    if (status?.success) {
      form.reset();
    }
  }, [status]);

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
      <form className="space-y-4 p-6" onSubmit={form.handleSubmit(onSubmit)}>
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
        <div className="flex gap-4">
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
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>About your case</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about case you are facing"
                  className="resize-none"
                  {...field}
                  value={field.value ?? ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
                  I agree to the{" "}
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

        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? "Loading..." : "Continue"}
        </Button>
      </form>
    </Form>
  );
};
