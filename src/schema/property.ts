import { z } from "zod";

export const buyTokenSchema = z.object({
  amount: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Amount must be a positive number in string format",
  }),
  quantity: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Quantity must be a positive number in string format",
  }),
  user: z.string(),
  property: z.string(),
});

export type BuyTokenSchema = z.infer<typeof buyTokenSchema>;
