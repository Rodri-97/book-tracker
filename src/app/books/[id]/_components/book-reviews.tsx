import CreateReviewModal from "@/components/create-review-modal";
import DeleteReviewModal from "@/components/delete-review-modal";
import EditReviewModal from "@/components/edit-review-modal";
import {
  getAuthorOfReview,
  getReviewsForBook,
} from "@/services/reviews.service";
import { Book, Review } from "@prisma/client";

export default async function BookReviews({
  bookGoogleId,
  userId,
  userBook,
}: {
  bookGoogleId: string;
  userId: string | undefined;
  userBook: Book | null;
}) {
  const bookReviews = await getReviewsForBook(bookGoogleId);

  const bookReviewByUser = bookReviews.filter(
    (review) => review.userId === userId
  );

  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-row justify-between">
        <h2 className="font-semibold text-lg">Reviews</h2>
        {userId &&
        userBook &&
        userBook.status === "READ" &&
        bookReviewByUser.length === 0 ? (
          <CreateReviewModal bookGoogleId={bookGoogleId} />
        ) : null}
      </div>

      {bookReviews.length === 0 ? (
        <div>This book does not have any reviews yet.</div>
      ) : (
        <>
          {bookReviews.map((review) => (
            <ReviewCard review={review} authedUserId={userId} key={review.id} />
          ))}
        </>
      )}
    </section>
  );
}

async function ReviewCard({
  review,
  authedUserId,
}: {
  review: Review;
  authedUserId: string | undefined;
}) {
  const reviewUser = await getAuthorOfReview(review.id);

  if (!reviewUser) return null;

  return (
    <div className="border-blue-700 border-solid border-2 bg-blue-50 flex flex-col gap-4 p-4 rounded-lg">
      <div className="flex flex-row justify-between">
        <p>
          by{" "}
          <span className="text-blue-700 font-semibold">
            {reviewUser.user.username}
          </span>
          <span className="text-blue-700 font-light">
            {" "}
            - {review.date.toUTCString()}
          </span>
        </p>

        {reviewUser.user.id === authedUserId ? (
          <DeleteReviewModal reviewId={review.id} />
        ) : null}
      </div>
      <p className="break-words">{review.content}</p>
      {reviewUser.user.id === authedUserId ? (
        <div className="flex flex-row justify-center lg:justify-start">
          <EditReviewModal
            reviewId={review.id}
            initialContent={review.content}
          />
        </div>
      ) : null}
    </div>
  );
}
