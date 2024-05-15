"use client";

import { Book } from "@prisma/client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import BookStatus from "@/components/book-status";
import RemoveBookModal from "@/components/remove-book-modal";
import UserBookRating from "@/components/user-book-rating";

export default function BookshelvesContent({ books }: { books: Book[] }) {
  const [search, setSearch] = useState("");
  const [selectedFilterButton, setSelectedFilterButton] = useState("All");

  function changeCurrentButton(newButton: string) {
    return setSelectedFilterButton(newButton);
  }

  const filterButtons = [
    "All",
    "To Read",
    "Currently Reading",
    "Did Not Finish",
    "Read",
  ];

  return (
    <>
      <div className="flex flex-col gap-4 mb-4">
        <h1 className="font-semibold text-2xl">Bookshelves</h1>

        <Input
          className="bg-white w-72"
          placeholder="Search..."
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          value={search}
        />

        <div className="flex flex-wrap gap-2">
          {filterButtons.map((buttonText) => {
            return (
              <FilterButton
                text={buttonText}
                selectedFilterButton={selectedFilterButton}
                changeCurrentButton={changeCurrentButton}
                key={buttonText}
              />
            );
          })}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {books.map((book) => {
          const includesFilterStatus =
            selectedFilterButton === "All" ||
            selectedFilterButton.toUpperCase().split(" ").join("_") ===
              book.status;

          const includesSearchQuery = book.title
            .toLowerCase()
            .includes(search.toLowerCase());

          if (includesFilterStatus && includesSearchQuery) {
            return <BookCard book={book} key={book.id} />;
          }
        })}
      </div>
    </>
  );
}

function FilterButton({
  text,
  selectedFilterButton,
  changeCurrentButton,
}: {
  text: string;
  selectedFilterButton: string;
  changeCurrentButton: (text: string) => void;
}) {
  return (
    <Button
      className={`bg-white text-blue-500 p-2 rounded-lg ${
        selectedFilterButton === text ? "border-blue-500" : "border-transparent"
      } border-2 border-solid hover:text-white`}
      onClick={() => changeCurrentButton(text)}
    >
      {text}
    </Button>
  );
}

function BookCard({ book }: { book: Book }) {
  return (
    <article className="flex flex-col justify-center items-center bg-white border-blue-500 border-solid border-[1px] gap-4 rounded-lg p-2">
      <section className="w-full flex flex-row">
        <img
          src={book.imageUrl ? book.imageUrl : ""}
          className="w-[200px] h-[250px] rounded-lg ml-auto mr-auto"
        />
        <div className="mb-auto ml-auto">
          <RemoveBookModal googleId={book.googleId} />
        </div>
      </section>

      <section className="w-full p-2 flex flex-col gap-4">
        <div className="flex flex-col gap-0">
          <h2 className="font-semibold text-lg text-blue-500">{book.title}</h2>
          <p className="font-semibold">{book.authors.join(", ")}</p>
        </div>
        {book.status === "READ" ? <UserBookRating book={book} /> : null}
        <BookStatus book={book} />
      </section>
    </article>
  );
}
