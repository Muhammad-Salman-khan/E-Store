import { z } from "zod"

export const ShippingSchema = z.object({
  fullName: z.string().min(2, "Full name required"),
  email: z.string().email("Valid email required"),
  phone: z.string().min(7, "Phone required"),
  address: z.string().min(5, "Address required"),
  city: z.string().min(2, "City required"),
  postalCode: z.string().min(3, "Postal code required"),
  country: z.string().min(2, "Country required"),
})

export const PaymentSchema = z.object({
  cardNumber: z.string().regex(/^\d{16}$/, "16 digits required"),
  expiry: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "MM/YY required"),
  cvc: z.string().regex(/^\d{3,4}$/, "CVC required"),
  nameOnCard: z.string().min(2, "Name on card required"),
})

export type ShippingForm = z.infer<typeof ShippingSchema>
export type PaymentForm = z.infer<typeof PaymentSchema>
