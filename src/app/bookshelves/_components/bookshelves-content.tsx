"use client";

import { Book } from "@prisma/client";
import BookStatus from "@/components/book-status";
import RemoveBookModal from "@/components/remove-book-modal";
import UserBookRating from "@/components/user-book-rating";
import Link from "next/link";
import BookDates from "@/components/book-dates";

export default function BookshelvesContent({ books }: { books: Book[] }) {
  return (
    <div className="flex flex-col gap-4 lg:grid lg:grid-cols-2 xl:grid xl:grid-cols-3 2xl:grid 2xl:grid-cols-4">
      {books.map((book) => {
        return <BookCard book={book} key={book.id} />;
      })}
    </div>
  );
}

function BookCard({ book }: { book: Book }) {
  return (
    <article className="flex flex-col justify-center items-center bg-white border-blue-500 border-solid border-[1px] gap-4 rounded-lg p-2">
      <section className="w-full flex flex-row justify-between items-center">
        <div></div>
        <div className="flex flex-col justify-center items-center text-center h-28 gap-0 overflow-x-auto overflow-y-auto p-2">
          <h2 className="font-semibold text-lg text-blue-500">{book.title}</h2>
          <p className="font-semibold">{book.authors.join(", ")}</p>
        </div>
        <div className="mb-auto">
          <RemoveBookModal googleId={book.googleId} />
        </div>
      </section>

      <section className="w-full flex flex-row justify-center items-center">
        <Link href={`books/${book.googleId}`}>
          <img
            src={
              book.imageUrl ? book.imageUrl : "./covers/unavailable-cover.jpg"
            }
            className="w-[200px] h-[250px] rounded-lg ml-auto mr-auto border-transparent border-solid border-4 hover:border-blue-500"
          />
        </Link>
      </section>

      <section className="w-full p-2 flex flex-col gap-4 h-64">
        <BookStatus book={book} />
        <BookDates book={book} />
        {book.status === "READ" ? <UserBookRating book={book} /> : null}
      </section>
    </article>
  );
}
