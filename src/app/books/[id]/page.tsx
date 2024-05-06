import { GoogleAPIBook } from "@/lib/interfaces";
import axios from "axios";
import DOMPurify from "isomorphic-dompurify";

export default async function BookDetails({
  params,
}: {
  params: { id: string };
}) {
  const res = await axios.get(
    `https://www.googleapis.com/books/v1/volumes/${params.id}`
  );

  if (res.status !== 200 || !res.data) {
    return <div>Book not found.</div>;
  }

  const book: GoogleAPIBook = res.data;

  const { title, authors, description } = book.volumeInfo;
  const image = book.volumeInfo.imageLinks
    ? book.volumeInfo.imageLinks.thumbnail
    : "/covers/unavailable-cover.jpg";

  return (
    <div>
      <article className="bg-white rounded-lg p-6 flex flex-col justify-center items-center gap-12">
        <section className="flex flex-row justify-center items-center gap-6">
          <img src={image} className="w-60 h-72 rounded-lg" alt={title} />
          <div>
            <h1 className="font-bold text-2xl">{title}</h1>
            <h2 className="text-xl text-slate-700">{authors?.join(", ")}</h2>
          </div>
        </section>
        <hr className="h-[2px] w-full bg-slate-300" />
        <section
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(description) }}
        />
      </article>
    </div>
  );
}
