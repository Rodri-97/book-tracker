import { z } from "zod";

export const registerSchema = z
  .object({
    username: z.string().min(1, "Username is required").max(128, {
      message: "Username must be less than 128 characters long",
    }),
    password: z
      .string()
      .min(8, "Password is too short - should be 8 chars minimum"),
    passwordConfirmation: z.string({
      required_error: "Password Confirmation is required",
    }),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords do not match",
    path: ["passwordConfirmation"],
  });

export type RegisterRequest = z.infer<typeof registerSchema>;
