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

export async function getBookByIds({
  googleId,
  userId,
}: {
  googleId: string;
  userId: string;
}) {
  const book = await db.book.findFirst({ where: { googleId, userId } });
  return book;
}

export async function removeBook({
  id,
  googleId,
  userId,
}: {
  id: string;
  googleId: string;
  userId: string;
}) {
  await db.book.delete({ where: { id, googleId, userId } });
  return null;
}
