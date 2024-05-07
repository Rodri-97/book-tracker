import Search from "./_components/search";

export default function SearchPage() {
  return (
    <article className="bg-white rounded-lg p-6">
      <h2 className="text-2xl font-semibold text-center">Search Books</h2>
      <Search />
    </article>
  );
}
