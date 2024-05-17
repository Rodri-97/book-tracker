import { getUserBooks } from "@/services/books.service";
import BookshelvesContent from "./_components/bookshelves-content";
import { validateRequest } from "@/lib/utils.server";
import { redirect } from "next/navigation";
import SearchBookshelves from "./_components/search-bookshelves";
import FilterButton from "./_components/filter-button";

export default async function BookshelvesAll({
  searchParams,
}: {
  searchParams: {
    q: string | undefined;
    status: string | undefined;
  };
}) {
  const { user } = await validateRequest();

  if (!user) return redirect("/login");

  const { q, status } = searchParams;

  let books = await getUserBooks(user.id);

  if (
    status &&
    ["to-read", "currently-reading", "did-not-finish", "read"].includes(status)
  ) {
    books = books.filter(
      (book) => book.status.toLowerCase().split("_").join("-") === status
    );
  }

  if (q) {
    books = books.filter((book) =>
      book.title.toLowerCase().includes(q.toLowerCase())
    );
  }

  const filterButtons = [
    "All",
    "To Read",
    "Currently Reading",
    "Did Not Finish",
    "Read",
  ];

  return (
    <>
      <div className="flex flex-col gap-4 mb-12">
        <div className="flex flex-col gap-2 lg:flex-row lg:justify-between">
          <h1 className="font-semibold text-2xl">Bookshelves</h1>
          <SearchBookshelves />
        </div>

        <div className="flex flex-row flex-wrap gap-2 lg:justify-center">
          {filterButtons.map((buttonText) => {
            return <FilterButton text={buttonText} key={buttonText} />;
          })}
        </div>
      </div>
      <BookshelvesContent books={books} />
    </>
  );
}
