import { GoogleAPIBook } from "@/lib/interfaces";
import { validateRequest } from "@/lib/utils.server";
import { addBookSchema } from "@/schemas/books.schema";
import { addBook } from "@/services/books.service";
import axios from "axios";
import { z } from "zod";

export async function POST(request: Request) {
  try {
    const { user } = await validateRequest();

    if (!user) return new Response("Unauthorized", { status: 401 });

    const body = await request.json();
    const { googleId } = addBookSchema.parse(body);

    const res = await axios
      .get(`https://www.googleapis.com/books/v1/volumes/${googleId}`)
      .catch(() => null);

    const book: GoogleAPIBook | null = res?.data;

    if (!book) {
      return new Response("That book does not exist.", { status: 500 });
    }

    await addBook({ googleId, userId: user.id, book });

    return new Response("Book added successfully.", { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 });
    }

    return new Response("Something went wrong.", {
      status: 500,
    });
  }
}
