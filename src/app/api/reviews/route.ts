import { validateRequest } from "@/lib/utils.server";
import { createReviewSchema } from "@/schemas/reviews.schema";
import { getBookByIds } from "@/services/books.service";
import { createReview } from "@/services/reviews.service";
import { z } from "zod";

export async function POST(request: Request) {
  try {
    const { user } = await validateRequest();

    if (!user) return new Response("Unauthorized", { status: 401 });

    const body = await request.json();

    const { googleId, content } = createReviewSchema.parse(body);

    const book = await getBookByIds({ googleId, userId: user.id });

    if (!book) return new Response("Book not found.", { status: 404 });

    await createReview({ userId: user.id, bookId: book.id, content });

    return new Response("Review added successfully.", { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 });
    }

    return new Response("Something went wrong.", {
      status: 500,
    });
  }
}
