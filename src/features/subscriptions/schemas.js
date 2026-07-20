import { z } from "zod";
import { CATEGORIES, CURRENCIES, FREQUENCIES, PAYMENT_METHODS } from "@/lib/constants";

export const subscriptionSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters").max(100),
  price: z.coerce.number().min(0, "Price must be a positive number"),
  currency: z.enum(CURRENCIES),
  frequency: z.enum(FREQUENCIES),
  category: z.enum(CATEGORIES),
  paymentMethod: z.enum(PAYMENT_METHODS),
  startDate: z.string().min(1, "Start date is required"),
  renewalDate: z.string().optional().or(z.literal("")),
});
