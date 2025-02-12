"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { SignIn, signInSchema } from "@/schema/auth";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { loginAction } from "@/actions/auth/sign-in";
import { toast } from "sonner";
import { useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export function SignInForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const router = useRouter();
  const form = useForm<SignIn>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: loginAction,
    onError: (error) => {
      toast.error(error.message ?? "Something went wrong", { id: "login" });
    },
    onSuccess: (data) => {
      toast.success("Login successful", { id: "login" });
      if (data.token) {
        router.push("/dashboard");
      }
    },
  });

  const onSubmit = useCallback(
    (data: SignIn) => {
      toast.loading("Logging in...", { id: "login" });
      mutate(data);
    },
    [mutate]
  );

  return (
    <Form {...form}>
      <form {...props} onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-6">
          <div className="grid gap-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="m@example.com" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your email address used for signing in
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex gap-2 items-center justify-between">
                    Password
                    <Link
                      href="/forgot-password"
                      className="text-sm text-primary underline underline-offset-4"
                    >
                      Forgot Password?
                    </Link>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="● ● ● ● ● ● ● ● ●" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? "Login..." : "Login"}
            </Button>
          </div>
          <div className="text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/sign-up" className="underline underline-offset-4">
              Sign up
            </Link>
          </div>
        </div>
      </form>
    </Form>
  );
}
