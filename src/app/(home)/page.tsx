import Link from "next/link";
import BookSlider from "./_components/book-slider";
import { Button } from "@/components/ui/button";

export default function Home() {
  const books = [
    {
      id: "D4SMEAAAQBAJ",
      title: "Nicomachean Ethics",
      author: "Aristotle",
      image: "/covers/nicomachean-ethics.jpeg",
    },
    {
      id: "sos0paw_-cEC",
      title: "The Iliad",
      author: "Homer",
      image: "/covers/the-iliad.jpeg",
    },
    {
      id: "FT0UAgAAQBAJ",
      title: "The Prince",
      author: "Niccolo Machiavelli",
      image: "/covers/the-prince.jpeg",
    },
    {
      id: "0v_Xhzb1tdUC",
      title: "Hamlet",
      author: "William Shakespeare",
      image: "/covers/hamlet.jpeg",
    },
    {
      id: "ChO3AAAAIAAJ",
      title: "Wealth of Nations",
      author: "Adam Smith",
      image: "/covers/wealth-of-nations.jpeg",
    },
    {
      id: "ABg8SwjLM3EC",
      title: "Les misérables",
      author: "Victor Hugo",
      image: "/covers/les-miserables.jpeg",
    },
    {
      id: "FD7YtQEACAAJ",
      title: "The Origin of Species",
      author: "Charles Darwin",
      image: "/covers/the-origin-of-species.jpeg",
    },
    {
      id: "DhGMEAAAQBAJ",
      title: "1984",
      author: "George Orwell",
      image: "/covers/1984.jpeg",
    },
    {
      id: "kYQ3EAAAQBAJ",
      title: "Relativity",
      author: "Albert Einstein",
      image: "/covers/relativity.jpeg",
    },
    {
      id: "IwywDY4P6gsC",
      title: "Foundation",
      author: "Isaac Asimov",
      image: "/covers/foundation.jpeg",
    },
  ];

  return (
    <main className="flex flex-col justify-center items-center gap-4">
      <article className="flex flex-col gap-4">
        <h1 className="text-4xl font-semibold">
          Find Your Next Favorite Books
        </h1>
        <p className="text-gray-600 font-medium lg:pr-96">
          Thanks to the{" "}
          <Link
            className="border-b-transparent border-b-solid border-b-4 text-blue-700 hover:border-b-blue-700"
            href="https://developers.google.com/books"
            target="_blank"
          >
            Google Books API
          </Link>
          , you can access a fantastically wide variety of books, both fiction
          and non-fiction. You can rest assured that you’ll find something to
          your liking! Simply start by using the search feature.
        </p>
      </article>
      <article className="flex flex-col justify-center items-center bg-white p-10 w-full gap-8">
        <section className="flex flex-col justify-between items-center w-full gap-4 lg:gap-0 lg:flex-row">
          <h2 className="text-2xl font-semibold">Some Classics</h2>
          <Link href="/search">
            <Button>Find Books</Button>
          </Link>
        </section>
        <BookSlider books={books} />
      </article>
    </main>
  );
}
