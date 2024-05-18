import { z } from "zod";

const googleIdErrorMessage = "Google id should be 12 characters long.";

const contentConstraints = {
  content: z
    .string()
    .min(50, "Review should be at least 50 characters long.")
    .max(1000, "Review should be at most 1000 characters long."),
};

export const createReviewSchema = z.object({
  googleId: z
    .string()
    .min(12, googleIdErrorMessage)
    .max(12, googleIdErrorMessage),
  ...contentConstraints,
});

export const editReviewSchema = z.object({
  ...contentConstraints,
});

export type CreateReviewRequest = z.infer<typeof createReviewSchema>;
export type EditReviewRequest = z.infer<typeof editReviewSchema>;
