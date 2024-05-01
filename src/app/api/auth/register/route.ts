import { registerSchema } from "@/schemas/register.schema";
import { z } from "zod";
import { createUser, findUserByUsername } from "@/services/auth.service";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password } = registerSchema.parse(body);

    const user = await findUserByUsername(username);

    if (user) {
      return new Response("Invalid username or password", { status: 500 });
    }

    await createUser(username, password);

    return new Response("User created successfully!", { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 });
    }

    return new Response("Invalid username or password.", {
      status: 500,
    });
  }
}
