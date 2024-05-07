import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { generateArrayInRange, getSearchResultsUrl } from "@/lib/helpers";
import { GoogleAPIBook } from "@/lib/interfaces";
import axios from "axios";
import Link from "next/link";

export default async function SearchResults({
  searchParams,
}: {
  searchParams: {
    title: string | undefined;
    author: string | undefined;
    page: string | undefined;
  };
}) {
  const { title, author, page: paramPage } = searchParams;
  if (!searchParams || (!title && !author)) {
    return <div>No search query provided.</div>;
  }

  const page = isNaN(Number(paramPage)) ? 1 : Number(paramPage);

  const searchedTitle = title ? `intitle:${title}` : "";
  const plusConditional = title && author ? "+" : "";
  const searchedAuthor = author ? `inauthor:${author}` : "";

  const res = await axios
    .get(
      `https://www.googleapis.com/books/v1/volumes?q=${searchedTitle}${plusConditional}${searchedAuthor}&maxResults=40&printType=books&langRestrict=en`
    )
    .catch(() => null);

  let books: GoogleAPIBook[] = res?.data.items;

  if (!books) return <div>No books found.</div>;

  if (title) {
    books = books.filter((book) =>
      book.volumeInfo.title.toLowerCase().includes(title.toLowerCase())
    );
  }

  if (author) {
    books = books.filter((book) =>
      book.volumeInfo.authors?.some((a) =>
        a.toLowerCase().includes(author.toLowerCase())
      )
    );
  }

  const numPages = Math.ceil(books.length / 9);

  const startIdx = (page - 1) * 9;
  const endIdx = startIdx + 9;
  books = books.slice(startIdx, endIdx);

  if (books.length === 0) return <div>No books found.</div>;

  const titleSpan = (
    <span>
      title "<span className="text-blue-700">{title}</span>"
    </span>
  );

  const andSpan = <span> and </span>;

  const authorSpan = (
    <span>
      author "<span className="text-blue-700">{author}</span>"
    </span>
  );

  const titleConditional = title && title.length > 0 ? titleSpan : null;

  const andConditional =
    title && author && title.length > 0 && author.length > 0 ? andSpan : null;

  const authorConditional = author && author.length > 0 ? authorSpan : null;

  return (
    <>
      <h2 className="text-2xl font-bold text-center mb-8">
        Search results for {titleConditional} {andConditional}
        {authorConditional}
      </h2>

      <div className="flex flex-col justify-center items-center gap-4 2xl:grid 2xl:grid-cols-3">
        {books.map((book: GoogleAPIBook) => {
          return <BookCard book={book} key={book.id} />;
        })}
      </div>

      <PaginationContainer
        numPages={numPages}
        title={title}
        author={author}
        page={page}
      />
    </>
  );
}

function BookCard({ book }: { book: GoogleAPIBook }) {
  return (
    <Link
      href={`books/${book.id}`}
      className="w-full gap-4 text-center flex-1 flex flex-col justify-center items-center cursor-pointer rounded-lg p-4 border-solid border-2 border-blue-700 2xl:border-transparent hover:bg-white hover:border-blue-700 2xl:items-start 2xl:flex-row 2xl:text-left"
    >
      <div>
        <img
          className="rounded-lg h-72 w-60"
          src={
            book.volumeInfo.imageLinks
              ? book.volumeInfo.imageLinks.thumbnail
              : "/covers/unavailable-cover.jpg"
          }
          alt={book.volumeInfo.title}
        />
      </div>

      <div className="w-48 flex-1 flex flex-col gap-2 px-2">
        <h1 className="font-semibold text-lg">{book.volumeInfo.title}</h1>
        <span>
          {book.volumeInfo.authors
            ? book.volumeInfo.authors
                .map((author) => {
                  return author;
                })
                .join(", ")
            : "Unknown"}
        </span>
      </div>
    </Link>
  );
}

function PaginationContainer({
  numPages,
  title,
  author,
  page,
}: {
  numPages: number;
  title: string | undefined;
  author: string | undefined;
  page: number;
}) {
  return (
    <Pagination className="mt-6">
      <PaginationContent>
        {page > 1 ? (
          <PaginationItem>
            <PaginationPrevious
              href={getSearchResultsUrl(title, author, page - 1)}
            />
          </PaginationItem>
        ) : null}
        {generateArrayInRange(1, numPages).map((n) => {
          return (
            <PaginationItem key={n}>
              {" "}
              <PaginationLink
                href={n === page ? "#" : getSearchResultsUrl(title, author, n)}
                isActive={n === page}
              >
                {n}
              </PaginationLink>{" "}
            </PaginationItem>
          );
        })}
        {page < numPages ? (
          <PaginationItem>
            <PaginationNext
              href={getSearchResultsUrl(title, author, page + 1)}
            />
          </PaginationItem>
        ) : null}
      </PaginationContent>
    </Pagination>
  );
}
