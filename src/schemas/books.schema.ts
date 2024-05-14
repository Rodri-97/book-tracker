import { z } from "zod";

const errorMessage = "Google id should be 12 characters long.";

export const addBookSchema = z.object({
  googleId: z.string().min(12, errorMessage).max(12, errorMessage),
});

export const editBookSchema = z
  .object({
    status: z
      .enum(["TO_READ", "CURRENTLY_READING", "DID_NOT_FINISH", "READ"])
      .optional(),
    rating: z.number().min(1).max(5).optional(),
  })
  .refine(
    (obj) => {
      for (const val of Object.values(obj)) {
        if (val !== undefined) return true;
      }
      return false;
    },
    {
      message: "Either a status or a rating must be defined.",
    }
  );

export type AddBookRequest = z.infer<typeof addBookSchema>;
export type EditBookRequest = z.infer<typeof editBookSchema>;
