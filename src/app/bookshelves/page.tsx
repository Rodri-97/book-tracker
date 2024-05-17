import { getUserBooks } from "@/services/books.service";
import BookshelvesContent from "./_components/bookshelves-content";
import { validateRequest } from "@/lib/utils.server";
import { redirect } from "next/navigation";
import SearchBookshelves from "./_components/search-bookshelves";
import FilterButton from "./_components/filter-button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

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
      {books.length === 0 ? (
        <div>No books found.</div>
      ) : (
        <BookshelvesContent books={books} />
      )}

      <PaginationContainer
        numPages={numPages}
        page={page}
        status={status}
        q={q}
      />
    </>
  );
}

function PaginationContainer({
  numPages,
  page,
  status,
  q,
}: {
  numPages: number;
  page: number;
  status: string | undefined;
  q: string | undefined;
}) {
  const urlCore = `bookshelves?${status ? `status=${status}&` : ""}${
    q ? `q=${q}&` : ""
  }page=`;

  return (
    <Pagination className="mt-12">
      <PaginationContent>
        {page > 1 ? (
          <PaginationItem>
            <PaginationPrevious href={`${urlCore}${page - 1}`} />
          </PaginationItem>
        ) : null}

        <PaginationItem>
          <PaginationLink href={`${urlCore}${1}`} isActive={1 === page}>
            1
          </PaginationLink>
        </PaginationItem>

        {[2, 3].includes(numPages) ? (
          <PaginationItem>
            <PaginationLink href={`${urlCore}${2}`} isActive={2 === page}>
              2
            </PaginationLink>
          </PaginationItem>
        ) : null}

        {numPages > 3 ? (
          <>
            {page !== 1 && page !== numPages ? (
              <>
                {page === 2 ? null : (
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                )}

                <PaginationItem>
                  <PaginationLink href="#" isActive={true}>
                    {page}
                  </PaginationLink>
                </PaginationItem>
              </>
            ) : null}

            {numPages - 1 === page ? null : (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
          </>
        ) : null}

        {numPages > 2 ? (
          <PaginationItem>
            <PaginationLink
              href={`${urlCore}${numPages}`}
              isActive={numPages === page}
            >
              {numPages}
            </PaginationLink>
          </PaginationItem>
        ) : null}

        {page < numPages ? (
          <PaginationItem>
            <PaginationNext href={`${urlCore}${page + 1}`} />
          </PaginationItem>
        ) : null}
      </PaginationContent>
    </Pagination>
  );
}
