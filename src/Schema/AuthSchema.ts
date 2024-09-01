import { z } from "zod";

export const signupSchema = z.object({
  fullName: z.string().min(1, { message: "Please enter your full name." }),
  email: z.string().email({
    message:
      "The email address provided is not valid. Please enter a valid email address.",
  }),
  password: z
    .string()
    .min(6, { message: "Your password must be at least 6 characters long." }),
  phone: z
    .string()
    .min(10, { message: "Your phone number must be at least 10 digits long." }),
  address: z.string().min(1, { message: "Please provide your address." }),
});
