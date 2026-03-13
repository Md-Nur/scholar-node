import React from "react";
import prisma from "@/lib/db";
import ArticleForm from "@/components/admin/ArticleForm";

export const revalidate = 0;

export default async function NewArticlePage() {
  // Fetch available issues for the dropdown
  const issues = await prisma.issue.findMany({
    orderBy: [{ volume: { year: "desc" } }, { number: "desc" }],
    include: { volume: true }
  });

  return <ArticleForm issues={issues} />;
}
