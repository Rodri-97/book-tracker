import { validateRequest } from "@/lib/utils.server";
import { getBookByIds, removeBook } from "@/services/books.service";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { user } = await validateRequest();

    if (!user) return new Response("Unauthorized", { status: 401 });

    const googleId = params.id;
    const userId = user.id;

    const book = await getBookByIds({ googleId, userId });

    if (!book) return new Response("Book not found.", { status: 404 });

    await removeBook({ id: book.id, googleId, userId });

    return new Response("Book successfully removed from bookshelves.", {
      status: 200,
    });
  } catch {
    return new Response("Something went wrong.", { status: 500 });
  }
}
