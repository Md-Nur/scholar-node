import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import prisma from "./db";

const SESSION_COOKIE = "scholar_admin_session";

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

export async function createSession(userId: string) {
  const token = Buffer.from(`${userId}:${Date.now()}`).toString("base64");
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  });
  return token;
}

export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  
  try {
    const userId = Buffer.from(token, "base64").toString().split(":")[0];
    const user = await prisma.user.findUnique({ where: { id: userId } });
    return user;
  } catch {
    return null;
  }
}

export async function destroySession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}

export async function login(email: string, password: string): Promise<boolean> {
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return false;
    
    const isValid = await verifyPassword(password, user.password);
    if (!isValid) return false;
    
    await createSession(user.id);
    return true;
  } catch (error) {
    console.error("Auth login error:", error);
    return false;
  }
}
