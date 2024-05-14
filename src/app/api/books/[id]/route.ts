import { validateRequest } from "@/lib/utils.server";
import { editBookSchema } from "@/schemas/books.schema";
import { getBookByIds, removeBook, updateBook } from "@/services/books.service";
import { z } from "zod";

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

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { user } = await validateRequest();

    if (!user) return new Response("Unauthorized", { status: 401 });

    const book = await getBookByIds({ googleId: params.id, userId: user.id });

    if (!book) return new Response("Book not found.", { status: 404 });

    const body = await request.json();

    const { status: newStatus, rating: newRating } = editBookSchema.parse(body);

    await updateBook({ book, newStatus, newRating });

    return new Response("Book updated successfully!", { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 });
    }

    return new Response("Couldn't edit book. Please try later.", {
      status: 500,
    });
  }
}
