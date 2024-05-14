"use client";

import { Book } from "@prisma/client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
    <article className="flex flex-row">
      <section className="w-[45%]">
        <img src={book.imageUrl ? book.imageUrl : ""} className="w-full" />
      </section>
      <section className="w-[55%] p-2 flex flex-col gap-2">
        <h2 className="font-semibold">{book.title}</h2>
        <p>{book.authors.join(", ")}</p>
      </section>
    </article>
  );
}
