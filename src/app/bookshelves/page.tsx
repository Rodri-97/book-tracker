import { validateRequest } from "@/lib/utils.server";
import { getUserBooks } from "@/services/books.service";
import { redirect } from "next/navigation";
import BookshelvesContent from "./_components/bookshelves-content";

export default async function Bookshelves() {
  const { user } = await validateRequest();

  if (!user) return redirect("/login");

  const books = await getUserBooks(user.id);

  return (
    <>
      <BookshelvesContent books={books} />
    </>
  );
}
