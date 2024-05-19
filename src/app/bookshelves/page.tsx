import { getUserBooks } from "@/services/books.service";
import BookshelvesContent from "./_components/bookshelves-content";
import { validateRequest } from "@/lib/utils.server";
import { redirect } from "next/navigation";
import SearchBookshelves from "./_components/search-bookshelves";
import FilterButton from "./_components/filter-button";
import PaginationContainer from "@/components/pagination-container";

export default async function Bookshelves({
  searchParams,
}: {
  searchParams: {
    q: string | undefined;
    status: string | undefined;
    page: string | undefined;
  };
}) {
  const { user } = await validateRequest();

  if (!user) return redirect("/login");

  const { q, status, page: paramPage } = searchParams;

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

  const page = isNaN(Number(paramPage)) ? 1 : Number(paramPage);

  const booksPerPage = 8;

  const numPages = Math.ceil(books.length / booksPerPage);

  const startIdx = (page - 1) * booksPerPage;
  const endIdx = startIdx + booksPerPage;
  books = books.slice(startIdx, endIdx);

  const filterButtons = [
    "All",
    "To Read",
    "Currently Reading",
    "Did Not Finish",
    "Read",
  ];

  const urlCore = `/bookshelves?${status ? `status=${status}&` : ""}${
    q ? `q=${q}&` : ""
  }`;

  return (
    <>
      <div className="flex flex-col gap-8 mb-12">
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

      {books.length === 0 ? (
        <div>No books found.</div>
      ) : (
        <BookshelvesContent books={books} />
      )}

      <PaginationContainer urlCore={urlCore} numPages={numPages} page={page} />
    </>
  );
}
