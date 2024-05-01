import { User } from "@prisma/client";
import db from "./db";
import bcrypt from "bcrypt";
import { generateId } from "lucia";
import { lucia } from "./lucia";

export async function createUser(username: string, password: string) {
  const userId = generateId(15);
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await db.user.create({
    data: { id: userId, username, hashedPassword },
  });

  return newUser;
}

export async function findUserByUsername(username: string) {
  return db.user.findUnique({
    where: {
      username,
    },
  });
}

export async function verifyPassword(user: User, password: string) {
  const passwordIsValid = await bcrypt.compare(password, user.hashedPassword);
  return passwordIsValid;
}

export async function createSession(userId: string) {
  const session = await lucia.createSession(userId, {});
  return lucia.createSessionCookie(session.id);
}

export async function deleteSession(sessionId: string) {
  await lucia.invalidateSession(sessionId);
  return null;
}
