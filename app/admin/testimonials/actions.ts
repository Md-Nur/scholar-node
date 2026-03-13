"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createTestimonial(formData: FormData) {
  const name = formData.get("name") as string;
  const role = formData.get("role") as string;
  const content = formData.get("content") as string;
  const isActive = formData.get("isActive") === "on";

  if (!name || !content) {
    throw new Error("Name and content are required");
  }

  await prisma.testimonial.create({
    data: {
      name,
      role,
      content,
      isActive,
    },
  });

  revalidatePath("/admin/testimonials");
  redirect("/admin/testimonials");
}
