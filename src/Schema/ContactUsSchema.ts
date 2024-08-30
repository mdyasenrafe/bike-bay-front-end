import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name is too long"),
  email: z.string().email("Invalid email address"),
  subject: z
    .string()
    .min(1, "Subject is required")
    .max(100, "Subject is too long"),
  body: z.string().min(1, "Body is required").max(500, "Body is too long"),
});
