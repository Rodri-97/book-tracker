import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().min(1, "Username is required").max(128, {
    message: "Username must be less than 128 characters long",
  }),
  password: z
    .string()
    .min(8, "Password is too short - should be 8 chars minimum"),
});
