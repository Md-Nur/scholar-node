"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createAnnouncement(formData: FormData) {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const isActive = formData.get("isActive") === "on";

  if (!title || !content) {
    throw new Error("Title and content are required");
  }

  await prisma.announcement.create({
    data: {
      title,
      content,
      isActive,
    },
  });

  revalidatePath("/admin/announcements");
  revalidatePath("/announcements");
  redirect("/admin/announcements");
}

export async function updateAnnouncement(id: string, formData: FormData) {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const isActive = formData.get("isActive") === "on";

  if (!title || !content) {
    throw new Error("Title and content are required");
  }

  await prisma.announcement.update({
    where: { id },
    data: {
      title,
      content,
      isActive,
    },
  });

  revalidatePath("/admin/announcements");
  revalidatePath("/announcements");
  redirect("/admin/announcements");
}

export async function deleteAnnouncement(id: string) {
  await prisma.announcement.delete({
    where: { id },
  });

  revalidatePath("/admin/announcements");
  revalidatePath("/announcements");
}
