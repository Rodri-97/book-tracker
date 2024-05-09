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

export async function getUserBooks(userId: string) {
  const userBooks = await db.book.findMany({
    where: { userId },
  });

  return userBooks;
}
