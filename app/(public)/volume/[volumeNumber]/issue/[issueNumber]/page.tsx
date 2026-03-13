import prisma from "@/lib/db";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight, FileText, UserCheck, Download, Archive } from "lucide-react";

export const revalidate = 3600;

export default async function IssuePage({
  params,
}: {
  params: Promise<{ volumeNumber: string; issueNumber: string }>;
}) {
  const { volumeNumber, issueNumber } = await params;
  const volNum = parseInt(volumeNumber);
  const issNum = parseInt(issueNumber);
  
  if (isNaN(volNum) || isNaN(issNum)) notFound();

  const issue = await prisma.issue.findUnique({
    where: {
      number_volumeId: {
        number: issNum,
        volumeId: (await prisma.volume.findUnique({ where: { number_year: { number: volNum, year: 0 } } }) || await prisma.volume.findFirst({ where: { number: volNum } }))?.id || ""
      }
    },
    include: {
      volume: true,
      articles: {
        include: {
          authors: {
            include: { author: true },
            orderBy: { order: "asc" },
          },
        },
        orderBy: { pageStart: "asc" },
      },
    },
  });

  if (!issue) notFound();

  return (
    <div className="bg-white dark:bg-zinc-950 py-16 sm:py-24 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        {/* Breadcrumbs */}
        <nav className="flex items-center space-x-2 text-sm text-zinc-500 dark:text-zinc-400 mb-8 sm:mb-12">
          <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Home</Link>
          <ChevronRight className="h-4 w-4" />
          <Link href="/archives" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Archives</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-zinc-900 dark:text-zinc-200">
            Vol. {issue.volume.number} No. {issue.number}
          </span>
        </nav>

        <header className="mb-16">
          <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="inline-flex items-center justify-center p-2.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-xl">
                  <Archive className="w-6 h-6" />
                </span>
                {issue.isCurrent && (
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 text-xs font-bold rounded-full uppercase tracking-wider">
                    Current Issue
                  </span>
                )}
              </div>
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-2">
                Volume {issue.volume.number}, Issue {issue.number}
              </h1>
              <p className="text-xl text-zinc-500 dark:text-zinc-400 font-medium">
                Published: {issue.volume.year}
              </p>
            </div>
            
            <div className="hidden sm:flex flex-col items-end text-zinc-500 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-900/50 p-4 rounded-2xl border border-zinc-100 dark:border-zinc-800">
               <span className="text-3xl font-bold text-zinc-900 dark:text-white mb-1">{issue.articles.length}</span>
               <span className="text-sm font-medium uppercase tracking-widest text-zinc-500">Articles</span>
            </div>
          </div>
        </header>

        <div className="space-y-8">
          {issue.articles.length > 0 ? (
            issue.articles.map((article) => (
              <article key={article.id} className="group relative bg-white dark:bg-zinc-900 rounded-2xl p-6 sm:p-8 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition-all">
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                    {article.articleType}
                  </span>
                  {article.doi && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                      DOI: {article.doi}
                    </span>
                  )}
                </div>
                
                <h3 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-3 leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  <Link href={`/article/${article.slug}`}>
                    <span className="absolute inset-0" aria-hidden="true" />
                    {article.title}
                  </Link>
                </h3>
                
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4 line-clamp-3 leading-relaxed">
                  {article.abstract}
                </p>
                
                <div className="flex items-center gap-2 flex-wrap mb-6">
                  <UserCheck className="h-4 w-4 text-zinc-400" />
                  <div className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    {article.authors.map((a, i) => (
                      <span key={a.id}>
                        {a.author.name}
                        {i < article.authors.length - 1 ? ", " : ""}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-zinc-100 dark:border-zinc-800">
                  <div className="text-sm text-zinc-500 dark:text-zinc-500">
                    Pages: {article.pageStart}-{article.pageEnd}
                  </div>
                  
                  <div className="flex gap-3">
                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 relative z-10 cursor-pointer">
                      <FileText className="h-4 w-4" /> PDF
                    </span>
                  </div>
                </div>
              </article>
            ))
          ) : (
            <div className="text-center py-16 bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-800">
              <p className="text-zinc-500 dark:text-zinc-400">No articles available in this issue.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
