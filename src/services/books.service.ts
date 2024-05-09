import { GoogleAPIBook } from "@/lib/interfaces";
import db from "./db";

export async function addBook({
  googleId,
  userId,
  book,
}: {
  googleId: string;
  userId: string;
  book: GoogleAPIBook;
}) {
  const newBook = await db.book.create({
    data: {
      googleId,
      userId,
      title: book.volumeInfo.title,
    },
  });

  return newBook;
}
