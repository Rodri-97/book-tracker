import { validateRequest } from "@/lib/utils.server";
import { deleteReview, getReviewByIds } from "@/services/reviews.service";

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
