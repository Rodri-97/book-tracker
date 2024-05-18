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
