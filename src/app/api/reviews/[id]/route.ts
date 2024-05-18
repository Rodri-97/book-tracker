import { validateRequest } from "@/lib/utils.server";
import { editReviewSchema } from "@/schemas/reviews.schema";
import {
  deleteReview,
  getReviewByIds,
  updateReview,
} from "@/services/reviews.service";
import { z } from "zod";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { user } = await validateRequest();

    if (!user) return new Response("Unauthorized", { status: 401 });

    const reviewId = params.id;

    const review = await getReviewByIds({ reviewId, userId: user.id });

    if (!review) return new Response("Review not found.", { status: 404 });

    await deleteReview(reviewId);

    return new Response("Review deleted successfully!", { status: 200 });
  } catch (error) {
    return new Response("Something went wrong.", { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { user } = await validateRequest();

    if (!user) return new Response("Unauthorized", { status: 401 });

    const reviewId = params.id;

    const review = await getReviewByIds({ reviewId, userId: user.id });

    if (!review) return new Response("Review not found.", { status: 404 });

    const body = await request.json();

    const { content } = editReviewSchema.parse(body);

    await updateReview({ reviewId, content });

    return new Response("Review updated successfully!", { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 });
    }

    return new Response("Something went wrong.", {
      status: 500,
    });
  }
}
