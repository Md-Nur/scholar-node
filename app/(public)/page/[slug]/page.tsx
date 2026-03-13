import prisma from "@/lib/db";
import { notFound } from "next/navigation";
import { format } from "date-fns";

export const revalidate = 3600;

export default async function StaticPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  
  const page = await prisma.page.findUnique({
    where: { slug },
  });

  if (!page) {
    notFound();
  }

  return (
    <div className="py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <header className="mb-12 border-b border-zinc-200 pb-8 dark:border-zinc-800">
          <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-4">
            {page.title}
          </h1>
          <div className="text-sm text-zinc-500 dark:text-zinc-400 font-medium">
            Last updated: {format(new Date(page.updatedAt), "MMMM d, yyyy")}
          </div>
        </header>

        <div 
          className="prose prose-zinc dark:prose-invert prose-lg max-w-none 
          prose-headings:font-bold prose-headings:tracking-tight
          prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:border-b prose-h2:border-zinc-100 dark:prose-h2:border-zinc-800 prose-h2:pb-4
          prose-h3:text-xl prose-h3:mt-8
          prose-p:leading-relaxed prose-p:text-zinc-600 dark:prose-p:text-zinc-300
          prose-li:text-zinc-600 dark:prose-li:text-zinc-300 prose-li:my-1
          prose-ul:my-6 prose-ul:ml-2 prose-ul:list-outside prose-ul:list-disc
          prose-table:border-collapse prose-table:w-full prose-table:my-8
          prose-th:bg-zinc-100 dark:prose-th:bg-zinc-800 prose-th:p-4 prose-th:text-left prose-th:font-semibold
          prose-td:border-t prose-td:border-zinc-200 dark:prose-td:border-zinc-800 prose-td:p-4"
          dangerouslySetInnerHTML={{ __html: page.content }}
        />
      </div>
    </div>
  );
}
