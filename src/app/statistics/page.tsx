import { validateRequest } from "@/lib/utils.server";
import { getUserBooks } from "@/services/books.service";
import { redirect } from "next/navigation";
import BooksReadByYear from "./_components/books-read-by-year";
import { PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import FavoriteAuthors from "./_components/favorite-authors";

export default async function Statistics({
  searchParams,
}: {
  searchParams: { year: number | undefined };
}) {
  const { user } = await validateRequest();

  if (!user) return redirect("/login");

  const userBooks = await getUserBooks(user.id);

  const readBooks = userBooks.filter((book) => book.status === "READ");

  function isNumber(value: any): value is number {
    return typeof value === "number";
  }

  const firstYear = Math.min(
    ...readBooks.map((book) => book.dateRead?.getFullYear()).filter(isNumber)
  );

  const currentYear = new Date().getFullYear();
  const year = !searchParams.year ? currentYear : Number(searchParams.year);

  return (
    <div className="flex flex-col gap-8">
      <h2 className="text-2xl font-bold">Statistics</h2>
      <div className="flex flex-col gap-4 lg:grid lg:grid-cols-2">
        <div className="flex flex-col gap-1 bg-white p-4 rounded-lg">
          <div className="flex flex-row justify-center items-center gap-1">
            {year > firstYear ? (
              <PaginationPrevious href={`/statistics?year=${year - 1}`} />
            ) : null}

            <h3 className="font-bold text-xl text-blue-600">
              Books read in {year}
            </h3>

            {year < currentYear ? (
              <PaginationNext href={`/statistics?year=${year + 1}`} />
            ) : null}
          </div>

          <BooksReadByYear year={year} books={userBooks} />
        </div>

        <div className="flex flex-col justify-center items-center gap-1 bg-white p-4 rounded-lg">
          <h3 className="font-bold text-xl text-blue-600">Favorite authors</h3>
          <FavoriteAuthors
            authors={readBooks.map((book) => book.authors).flat()}
          />
        </div>
      </div>
    </div>
  );
}
