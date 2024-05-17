import FilterButton from "./_components/filter-button";
import SearchBookshelves from "./_components/search-bookshelves";

export default function BookshelvesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const filterButtons = [
    "All",
    "To Read",
    "Currently Reading",
    "Did Not Finish",
    "Read",
  ];

  return (
    <div>
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
      {children}
    </div>
  );
}
