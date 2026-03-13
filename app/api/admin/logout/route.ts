import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";

export async function POST() {
  const session = await getSession();
  
  if (!session) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }
  
  // Clear the cookie by setting it with maxAge 0
  const response = NextResponse.json({ message: "Logged out" }, { status: 200 });
  response.cookies.set({
    name: "scholar_admin_session",
    value: "",
    httpOnly: true,
    path: "/",
    maxAge: 0,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
  
  return response;
}
