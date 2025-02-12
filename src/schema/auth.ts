import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(6, "Your password must be at least 6 characters."),
});

export const signUpSchema = z.object({
  name: z.string().min(1, "Please provide your name."),
  email: z.string().trim().email(),
  password: z.string().min(6, "Your password must be at least 6 characters."),
});

export const resetSchema = z
  .object({
    token: z.string(),
    password: z.string().min(6, "Your password must be at least 6 characters."),
    confirmPassword: z.string().min(1, "Please confirm your password."),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match.",
        path: ["confirmPassword"],
      });
    }
  });

export const forgotSchema = z.object({
  email: z.string().trim().email(),
});

export type SignIn = z.infer<typeof signInSchema>;
export type SignUp = z.infer<typeof signUpSchema>;
export type ForgotPassword = z.infer<typeof forgotSchema>;
export type ResetPassword = z.infer<typeof resetSchema>;
