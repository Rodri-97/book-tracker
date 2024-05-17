import { getUserBooks } from "@/services/books.service";
import BookshelvesContent from "./_components/bookshelves-content";
import { validateRequest } from "@/lib/utils.server";
import { redirect } from "next/navigation";

export default async function BookshelvesAll({
  searchParams,
}: {
  searchParams: { q: string | undefined };
}) {
  const { user } = await validateRequest();

  if (!user) return redirect("/login");

  const { q } = searchParams;

  let books = await getUserBooks(user.id);

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
