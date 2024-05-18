import db from "./db";

export async function createReview({
  userId,
  bookId,
  content,
}: {
  userId: string;
  bookId: string;
  content: string;
}) {
  const newReview = await db.review.create({
    data: { userId, bookId, content },
  });
  return newReview;
}

export async function getReviewByIds({
  reviewId,
  userId,
}: {
  reviewId: string;
  userId: string;
}) {
  const review = await db.review.findFirst({
    where: { id: reviewId, userId },
  });
  return review;
}

export async function deleteReview(reviewId: string) {
  await db.review.delete({ where: { id: reviewId } });
  return null;
}
