import { GoogleAPIBook } from "@/lib/interfaces";
import db from "./db";
import { Book, BookStatus } from "@prisma/client";

export async function addBook({
  userId,
  googleData,
}: {
  userId: string;
  googleData: GoogleAPIBook;
}) {
  const { id: googleId, volumeInfo } = googleData;

  const { title, authors, imageLinks } = volumeInfo;

  const formattedAuthors = authors ? authors : [];

  const imageUrl = imageLinks?.thumbnail ? imageLinks.thumbnail : null;

  const newBook = await db.book.create({
    data: {
      userId,
      googleId,
      title: title ? title : "",
      authors: formattedAuthors,
      imageUrl,
    },
  });

  return newBook;
}

export async function getUserBooks(userId: string) {
  const userBooks = await db.book.findMany({
    where: { userId },
    orderBy: { dateAdded: "desc" },
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

export async function updateBook({
  book,
  newStatus,
  newRating,
}: {
  book: Book;
  newStatus: BookStatus | undefined;
  newRating: number | undefined;
}) {
  let updatedBook;

  if (newStatus) {
    if (newStatus === "READ") {
      updatedBook = await db.book.update({
        where: { id: book.id },
        data: { status: newStatus, dateRead: new Date() },
      });
    } else {
      updatedBook = await db.book.update({
        where: { id: book.id },
        data: { status: newStatus, dateRead: null, rating: null },
      });
    }
  }

  if (newRating && book.status === "READ") {
    updatedBook = await db.book.update({
      where: { id: book.id },
      data: { rating: newRating },
    });
  }

  return updatedBook;
}

export async function getRatings(googleId: string) {
  const books = await db.book.findMany({ where: { googleId } });
  const ratings = books
    .map((book) => book.rating)
    .filter((rating) => rating !== null) as number[];

  if (ratings.length === 0) {
    return null;
  }

  const totalRatings = ratings.length;
  const averageRating = Math.round(
    ratings.reduce((a, b) => a + b, 0) / totalRatings
  );

  return { averageRating, totalRatings };
}

export async function getBookById(bookId: string) {
  const book = await db.book.findFirst({ where: { id: bookId } });
  return book;
}
