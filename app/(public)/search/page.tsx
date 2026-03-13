import prisma from "@/lib/db";
import Link from "next/link";
import { SearchIcon, FileText, UserCheck, ChevronRight } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = q || "";

  let results: any[] = [];
  
  if (query.trim()) {
    results = await prisma.article.findMany({
      where: {
        OR: [
          { title: { contains: query, mode: "insensitive" } },
          { abstract: { contains: query, mode: "insensitive" } },
          { keywords: { hasSome: [query] } },
        ],
      },
      include: {
        issue: { include: { volume: true } },
        authors: { include: { author: true }, orderBy: { order: "asc" } },
      },
      orderBy: { publishedAt: "desc" },
    });
  }

  return (
    <div className="bg-white dark:bg-zinc-950 min-h-[calc(100vh-200px)] py-12 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <header className="mb-12">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-6">
            Search Articles
          </h1>
          
          <form className="relative max-w-2xl" action="/search">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <SearchIcon className="h-6 w-6 text-zinc-400" />
              </div>
              <input
                type="text"
                name="q"
                defaultValue={query}
                placeholder="Search across titles, abstracts, and keywords..."
                className="block w-full pl-12 pr-4 py-4 sm:text-lg border-2 border-zinc-200 dark:border-zinc-800 rounded-2xl bg-zinc-50 dark:bg-zinc-900 focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 dark:focus:border-blue-500 transition-all text-zinc-900 dark:text-white placeholder-zinc-400"
                autoFocus
              />
              <button
                type="submit"
                className="absolute inset-y-2 right-2 px-6 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors shadow-sm"
              >
                Search
              </button>
            </div>
          </form>
        </header>

        {query && (
          <div className="mb-8 flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-4">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
              {results.length} {results.length === 1 ? 'Result' : 'Results'} for <span className="text-blue-600 dark:text-blue-400">"{query}"</span>
            </h2>
          </div>
        )}

        {query && results.length > 0 ? (
          <div className="space-y-6">
            {results.map((article) => (
              <article key={article.id} className="group relative bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-md hover:border-blue-300 dark:hover:border-blue-800 transition-all">
                <div className="flex items-center gap-3 text-sm text-zinc-500 dark:text-zinc-400 mb-3 font-medium">
                  <span className="bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider">
                    {article.articleType}
                  </span>
                  {article.issue && (
                    <span className="flex items-center gap-1.5">
                      Vol. {article.issue.volume.number} No. {article.issue.number} ({article.issue.volume.year})
                    </span>
                  )}
                </div>
                
                <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-2 leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  <Link href={`/article/${article.slug}`}>
                    <span className="absolute inset-0" aria-hidden="true" />
                    {article.title}
                  </Link>
                </h3>
                
                {article.authors?.length > 0 && (
                  <div className="flex items-center gap-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-4 truncate">
                    <UserCheck className="h-4 w-4 shrink-0" />
                    <span className="truncate">
                      {article.authors.map((a: any, i: number) => (
                        <span key={a.id}>
                          {a.author.name}
                          {i < article.authors.length - 1 ? ", " : ""}
                        </span>
                      ))}
                    </span>
                  </div>
                )}
                
                {article.abstract && (
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                    {article.abstract}
                  </p>
                )}
              </article>
            ))}
          </div>
        ) : query ? (
          <div className="text-center py-20 bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-800">
            <SearchIcon className="w-12 h-12 text-zinc-300 dark:text-zinc-700 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-zinc-900 dark:text-white mb-2">No matching articles found</h3>
            <p className="text-zinc-500 dark:text-zinc-400">
              Try adjusting your search terms, using different keywords, or ensuring there are no typos.
            </p>
          </div>
        ) : (
          <div className="text-center py-20 bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-800">
            <SearchIcon className="w-12 h-12 text-zinc-300 dark:text-zinc-700 mx-auto mb-4" />
            <p className="text-zinc-500 dark:text-zinc-400">
              Enter keywords, title words, or author names to search the journal database.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
