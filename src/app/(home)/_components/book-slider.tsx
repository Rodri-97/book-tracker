"use client";

import Link from "next/link";
import { useState } from "react";

type Book = {
  id: string;
  title: string;
  author: string;
  image: string;
};

export default function BookSlider({ books }: { books: Book[] }) {
  const [currentFirstIndex, setCurrentFirstIndex] = useState(0);
  const [currentLastIndex, setCurrentLastIndex] = useState(5);
  const [currentSmallScreenIndex, setCurrentSmallScreenIndex] = useState(0);

  function decrementSlider() {
    currentFirstIndex > 0 ? setCurrentFirstIndex(currentFirstIndex - 1) : null;
    currentLastIndex > 5 ? setCurrentLastIndex(currentLastIndex - 1) : null;
    currentSmallScreenIndex > 0
      ? setCurrentSmallScreenIndex(currentSmallScreenIndex - 1)
      : null;
  }

  function incrementSlider() {
    currentFirstIndex < 5 ? setCurrentFirstIndex(currentFirstIndex + 1) : null;
    currentLastIndex < 10 ? setCurrentLastIndex(currentLastIndex + 1) : null;
    currentSmallScreenIndex < 9
      ? setCurrentSmallScreenIndex(currentSmallScreenIndex + 1)
      : null;
  }

  return (
    <div className="flex items-center gap-4">
      <div
        className="flex justify-center items-center p-2 cursor-pointer hover:opacity-50"
        onClick={() => decrementSlider()}
      >
        <span className="border-solid border-gray-900 border-t-4 border-l-4 h-4 w-4 inline-block transform -rotate-45"></span>
      </div>
      <div className="flex flex-wrap justify-center items-center gap-8 2xl:hidden">
        {books
          .slice(currentSmallScreenIndex, currentSmallScreenIndex + 1)
          .map((book) => {
            return <BookCard book={book} key={book.id} />;
          })}
      </div>
      <div className="hidden flex-wrap justify-center items-center gap-8 2xl:flex">
        {books.slice(currentFirstIndex, currentLastIndex).map((book) => {
          return <BookCard book={book} key={book.id} />;
        })}
      </div>

      <div
        className="flex justify-center items-center p-2 cursor-pointer hover:opacity-50"
        onClick={() => incrementSlider()}
      >
        <span className="border-solid border-gray-900 border-t-4 border-r-4 h-4 w-4 inline-block transform rotate-45"></span>
      </div>
    </div>
  );
}

function BookCard({ book }: { book: Book }) {
  return (
    <Link href={`books/${book.id}`} className="flex flex-col gap-2">
      <img
        className="h-60 w-48 cursor-pointer rounded-lg hover:opacity-50"
        src={book.image}
        alt={`${book.title} by ${book.author}`}
      />
      <div className="flex flex-col justify-center items-center">
        <h1 className="font-bold text-base text-center">{book.title}</h1>
        <h2 className="text-sm">{book.author}</h2>
      </div>
    </Link>
  );
}
