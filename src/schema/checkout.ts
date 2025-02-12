import { z } from "zod";

export const checkoutSchema = z.object({
  // serviceId should be a valid mongoDB id
  serviceId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid service ID"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  mobile: z
    .string()
    .regex(/^[0-9]{10}$/, "Please enter a valid 10-digit mobile number"),
  email: z.string().email("Please enter a valid email address"),
  state: z.string().min(1, "Please select your state"),
  city: z.string().min(1, "Please enter your city"),
  terms: z
    .boolean()
    .refine((val) => val === true, "You must agree to the terms"),
  user: z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/, "Invalid user ID")
    .optional(),
});

export const bookerCheckoutSchema = z.object({
  client: z.string().nullable().optional(),
  lawyer: z.string().nullable().optional(),
  description: z.string().min(2, "Description must be at least 2 characters"),
  duration: z
    .number()
    .min(15)
    .max(60)
    .refine((val) => val % 15 === 0, "Duration must be in steps of 15 minutes"),
  startTime: z.string().refine((value) => {
    const date = new Date(value);
    return !isNaN(date.getTime());
  }, "Please enter a valid date and time"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  mobile: z
    .string()
    .regex(/^[0-9]{10}$/, "Please enter a valid 10-digit mobile number"),
  email: z.string().email("Please enter a valid email address").optional(),
  state: z.string().min(1, "Please select your state"),
  city: z.string().min(1, "Please enter your city"),
  terms: z
    .boolean()
    .refine((val) => val === true, "You must agree to the terms"),
  user: z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/, "Invalid user ID")
    .nullable()
    .optional(),
});

export type BookerCheckout = z.infer<typeof bookerCheckoutSchema>;
export type CheckoutSchema = z.infer<typeof checkoutSchema>;
