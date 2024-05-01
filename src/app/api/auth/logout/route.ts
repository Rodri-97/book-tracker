import { validateRequest } from "@/lib/utils.server";
import { deleteSession } from "@/services/auth.service";
import { lucia } from "@/services/lucia";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const { session } = await validateRequest();

  if (!session) return new Response("Unauthorized", { status: 401 });

  await deleteSession(session.id);

  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );

  return new Response("Logged out successfully!", { status: 200 });
}
