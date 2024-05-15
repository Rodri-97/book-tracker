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

        <section className="flex flex-col justify-center items-center gap-6 lg:flex-row">
          <div className="flex flex-col justify-center items-center gap-[1px]">
            <h1 className="font-bold text-2xl">{title}</h1>
            <h2 className="text-xl text-slate-700 mb-4">
              {authors?.join(", ")}
            </h2>
            <img src={image} className="w-60 h-72 rounded-lg" alt={title} />
          </div>
          {user ? (
            book ? (
              <div className="flex flex-col gap-4">
                {book.status === "READ" ? <UserBookRating book={book} /> : null}
                <BookStatus book={book} />
              </div>
            ) : (
              <AddBookButton googleId={bookGoogleData.id} />
            )
          ) : null}
        </section>

        <hr className="h-[2px] w-full bg-slate-300" />
        <section
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(description) }}
        />
      </article>
    </div>
  );
}
