"use client";

import { cn } from "@/lib/utils";
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
} from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUp, signUpSchema } from "@/schema/auth";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { signupAction } from "@/actions/auth/sign-up";
import { useCallback } from "react";
import { useRouter } from "next/navigation";

export function SignUpForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const router = useRouter();
  const form = useForm<SignUp>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: signupAction,
    onError: (error) => {
      console.log({ error });
      toast.error(error.message || "An error occurred during signup", {
        id: "signup",
      });
      console.log({ error });
    },
    onSuccess: (data) => {
      toast.success("Sign up successful", { id: "signup" });
      if (data.token) {
        router.push("/dashboard");
      }
    },
  });

  const onSubmit = useCallback(
    (data: SignUp) => {
      toast.loading("Signing up...", { id: "signup" });
      console.log(data);
      mutate(data);
    },
    [mutate]
  );

  return (
    <Form {...form}>
      <form
        className={cn(className)}
        {...props}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="grid gap-6">
          <div className="grid gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Max" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="m@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="● ● ● ● ● ● ● ● ●" {...field} />
                  </FormControl>
                  <FormDescription>
                    Must be at least 8 characters long
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? "Signing up..." : "Sign up"}
            </Button>
          </div>
          <div className="text-center text-sm">
            Have an account?{" "}
            <a href="/sign-in" className="underline underline-offset-4">
              Sign in
            </a>
          </div>
        </div>
      </form>
    </Form>
  );
}
