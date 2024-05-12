import { validateRequest } from "@/lib/utils.server";
import { getUserBooks } from "@/services/books.service";
import { Book } from "@prisma/client";
import { redirect } from "next/navigation";

export default async function Bookshelves() {
  const { user } = await validateRequest();

  if (!user) return redirect("/login");

  const books = await getUserBooks(user.id);

  return (
    <div>
      {books.map((book) => (
        <BookCard book={book} key={book.id} />
      ))}
    </div>
  );
}

function BookCard({ book }: { book: Book }) {
  return <div>{book.title}</div>;
}
