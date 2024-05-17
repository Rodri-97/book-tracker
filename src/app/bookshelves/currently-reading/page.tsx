import { validateRequest } from "@/lib/utils.server";
import { getUserBooks } from "@/services/books.service";
import { redirect } from "next/navigation";
import BookshelvesContent from "../_components/bookshelves-content";

export default async function CurrentlyReading({
  searchParams,
}: {
  searchParams: { q: string | undefined };
}) {
  const { user } = await validateRequest();

  if (!user) return redirect("/login");

  const { q } = searchParams;

  let books = await getUserBooks(user.id);

  books = books.filter((book) => book.status === "CURRENTLY_READING");

  if (q) {
    books = books.filter((book) =>
      book.title.toLowerCase().includes(q.toLowerCase())
    );
  }

  return (
    <>
      <BookshelvesContent books={books} />
    </>
  );
}
