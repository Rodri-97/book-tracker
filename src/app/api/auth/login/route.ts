import { loginSchema } from "@/schemas/login.schema";
import * as context from "next/headers";
import { z } from "zod";
import {
  createSession,
  findUserByUsername,
  verifyPassword,
} from "@/services/auth.service";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password } = loginSchema.parse(body);

    const existingUser = await findUserByUsername(username);

    if (!existingUser) {
      return new Response("Invalid username or password.", { status: 500 });
    }

    const validPassword = await verifyPassword(existingUser, password);

    if (!validPassword) {
      return new Response("Invalid username or password", { status: 500 });
    }

    const sessionCookie = await createSession(existingUser.id);

    context
      .cookies()
      .set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

    return new Response("Logged in successfully!", { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 });
    }

    return new Response("Invalid username or password.", {
      status: 500,
    });
  }
}
