import React from "react";
import prisma from "@/lib/db";
import ArticleForm from "@/components/admin/ArticleForm";
import { notFound } from "next/navigation";

export const revalidate = 0;

export default async function EditArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  
  const [article, issues] = await Promise.all([
    prisma.article.findUnique({ where: { id } }),
    prisma.issue.findMany({
      orderBy: [{ volume: { year: "desc" } }, { number: "desc" }],
      include: { volume: true }
    })
  ]);

  if (!article) notFound();

  return <ArticleForm article={article} issues={issues} />;
}
