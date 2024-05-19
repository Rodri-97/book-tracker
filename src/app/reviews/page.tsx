import { validateRequest } from "@/lib/utils.server";
import { getBookById } from "@/services/books.service";
import { getReviewsByUser } from "@/services/reviews.service";
import { Review } from "@prisma/client";
import Link from "next/link";
import { redirect } from "next/navigation";
import EditReviewModal from "@/components/edit-review-modal";
import DeleteReviewModal from "@/components/delete-review-modal";
import PaginationContainer from "@/components/pagination-container";

export default async function Reviews({
  searchParams,
}: {
  searchParams: {
    page: string | undefined;
  };
}) {
  const { user } = await validateRequest();

  if (!user) return redirect("/login");

  let reviews = await getReviewsByUser(user.id);

  if (!reviews || reviews.length === 0) {
    return <div>You have not left any reviews yet.</div>;
  }

  const { page: paramPage } = searchParams;

  const page = isNaN(Number(paramPage)) ? 1 : Number(paramPage);

  const reviewsPerPage = 5;

  const numPages = Math.ceil(reviews.length / reviewsPerPage);

  const startIdx = (page - 1) * reviewsPerPage;
  const endIdx = startIdx + reviewsPerPage;
  reviews = reviews.slice(startIdx, endIdx);

  const urlCore = "/reviews?";

  return (
    <div>
      <h1 className="text-2xl font-semibold text-left mb-6">My Reviews</h1>

      <div className="flex flex-col gap-6">
        {reviews.map((review) => {
          return <ReviewCard review={review} key={review.id} />;
        })}
      </div>

      <PaginationContainer urlCore={urlCore} numPages={numPages} page={page} />
    </div>
  );
}

async function ReviewCard({ review }: { review: Review }) {
  const book = await getBookById(review.bookId);

  if (!book) return null;

  return (
    <div className="bg-blue-50 border-blue-700 border-solid border-2 rounded-lg p-4 flex flex-col justify-center gap-4 lg:flex-row lg:justify-start">
      <div className="flex flex-row justify-center items-center lg:w-1/6">
        <Link href={`books/${book.googleId}`} className="cursor-pointer">
          <img
            className="rounded-lg h-60 w-48 border-transparent border-solid border-4 hover:border-blue-500"
            src={
              book.imageUrl ? book.imageUrl : "/covers/unavailable-cover.jpg"
            }
            alt={book.title}
          />
        </Link>
      </div>
      <div className="flex flex-col gap-6 lg:w-5/6">
        <p className="flex flex-col items-center gap-2 lg:items-start">
          <span className="text-blue-700 font-semibold">{book.title}</span>{" "}
          <span className="text-blue-700 font-light">
            {review.date.toUTCString()}
          </span>{" "}
        </p>
        <p>{review.content}</p>
        <div className="flex flex-row justify-center lg:justify-start">
          <EditReviewModal
            reviewId={review.id}
            initialContent={review.content}
          />
        </div>
      </div>
      <div className="flex flex-row justify-center gap-2">
        <DeleteReviewModal reviewId={review.id} />
      </div>
    </div>
  );
}
