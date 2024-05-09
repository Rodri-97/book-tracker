import { z } from "zod";

const errorMessage = "Google id should be 12 characters long.";

export const addBookSchema = z.object({
  googleId: z.string().min(12, errorMessage).max(12, errorMessage),
});

export type AddBookRequest = z.infer<typeof addBookSchema>;
