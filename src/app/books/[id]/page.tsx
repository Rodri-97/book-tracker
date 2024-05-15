import { GoogleAPIBook } from "@/lib/interfaces";
import axios from "axios";
import DOMPurify from "isomorphic-dompurify";
import RemoveBookModal from "@/components/remove-book-modal";
import { validateRequest } from "@/lib/utils.server";
import { getBookByIds } from "@/services/books.service";
import { Book } from "@prisma/client";
import UserBookRating from "@/components/user-book-rating";
import BookStatus from "@/components/book-status";
import AddBookButton from "./_components/add-book-button";
import { generateArrayInRange } from "@/lib/helpers";
import { getRatings } from "@/services/books.service";
import BookDates from "@/components/book-dates";

export default async function BookDetails({
  params,
}: {
  params: { id: string };
}) {
  const res = await axios
    .get(`https://www.googleapis.com/books/v1/volumes/${params.id}`)
    .catch(() => null);

  const bookGoogleData: GoogleAPIBook | null = res?.data;

  if (!bookGoogleData) return <div>Book not found.</div>;

  const { title, authors, description } = bookGoogleData.volumeInfo;
  const image = bookGoogleData.volumeInfo.imageLinks
    ? bookGoogleData.volumeInfo.imageLinks.thumbnail
    : "/covers/unavailable-cover.jpg";

  const { user } = await validateRequest();

  let book: Book | null = null;

  if (user) {
    book = await getBookByIds({ googleId: bookGoogleData.id, userId: user.id });
  }

  return (
    <div>
      <article className="bg-white rounded-lg p-6 flex flex-col justify-center items-center gap-12">
        {user && book ? (
          <div className="ml-auto mb-auto">
            <RemoveBookModal googleId={bookGoogleData.id} />
          </div>
        ) : null}

        <div className="flex flex-col justify-center items-center text-center">
          <h1 className="font-bold text-2xl">{title}</h1>
          <h2 className="text-xl text-slate-700 mb-4">{authors?.join(", ")}</h2>
        </div>

        <section className="flex flex-col justify-center items-center gap-6 lg:flex-row">
          <div className="flex flex-col justify-center items-center gap-[1px]">
            <img src={image} className="w-60 h-72 rounded-lg" alt={title} />
          </div>
          <div className="flex flex-col gap-4">
            <AverageRating googleId={bookGoogleData.id} />
            {user ? (
              book ? (
                <>
                  {book.status === "READ" ? (
                    <UserBookRating book={book} />
                  ) : null}
                  <BookStatus book={book} />
                  <BookDates book={book} />
                </>
              ) : (
                <AddBookButton googleId={bookGoogleData.id} />
              )
            ) : null}
          </div>
        </section>

        <hr className="h-[2px] w-full bg-slate-300" />
        <section
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(description) }}
        />
      </article>
    </div>
  );
}

async function AverageRating({ googleId }: { googleId: string }) {
  const ratings = await getRatings(googleId);

  if (!ratings) return null;

  const { averageRating, totalRatings } = ratings;

  return (
    <div className="flex flex-row items-center gap-2">
      Average Rating:
      <span className="flex flex-row justify-center items-center gap-1">
        {averageRating
          ? generateArrayInRange(1, 5).map((idx) => (
              <span
                key={idx}
                className={`text-blue-700 cursor-pointer text-2xl ${
                  averageRating >= idx ? "text-gold" : "text-gray-300"
                }`}
              >
                {" "}
                &#9733; {/* Unicode character for a solid star */}
              </span>
            ))
          : null}
      </span>
      <span>({totalRatings})</span>
    </div>
  );
}
