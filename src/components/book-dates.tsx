"use client";

import { Book } from "@prisma/client";

export default function BookDates({ book }: { book: Book }) {
  return (
    <>
      <div>
        <span>Dated Added:</span>{" "}
        <span className="text-blue-500">{book.dateAdded.toUTCString()}</span>
      </div>
      {book.status === "READ" ? (
        <div>
          <span>Dated Read:</span>{" "}
          <span className="text-blue-500">{book.dateRead?.toUTCString()}</span>
        </div>
      ) : null}
    </>
  );
}
