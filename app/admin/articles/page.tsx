import prisma from "@/lib/db";
import Link from "next/link";
import { format } from "date-fns";
import { Plus, FileText, Search, Filter, MoreVertical, Edit, Trash2, Eye } from "lucide-react";

export const revalidate = 0;

export default async function AdminArticlesPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = q || "";

  const articles = await prisma.article.findMany({
    where: query ? {
      OR: [
        { title: { contains: query, mode: "insensitive" } },
        { doi: { contains: query, mode: "insensitive" } },
      ],
    } : undefined,
    include: {
      issue: { include: { volume: true } },
      authors: { include: { author: true }, orderBy: { order: "asc" }, take: 2 },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2 flex items-center gap-3">
            <FileText className="w-8 h-8 text-blue-500" />
            Articles
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400">Manage published and drafted articles.</p>
        </div>
        
        <Link 
          href="/admin/articles/new" 
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-medium transition-colors shadow-sm"
        >
          <Plus className="w-5 h-5" />
          New Article
        </Link>
      </div>

      <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden flex flex-col">
        {/* Toolbar */}
        <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row justify-between gap-4 bg-zinc-50/50 dark:bg-zinc-950/50">
          <form className="relative flex-1 max-w-md" action="/admin/articles">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input 
              type="text" 
              name="q"
              defaultValue={query}
              placeholder="Search by title or DOI..." 
              className="w-full pl-9 pr-4 py-2 bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 rounded-lg text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-500/50"
            />
          </form>
          <div className="flex gap-2">
            <button className="inline-flex items-center gap-2 px-3 py-2 bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 rounded-lg text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors">
              <Filter className="w-4 h-4" /> Filter
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-zinc-50 dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800">
                <th className="px-6 py-4 text-sm font-semibold text-zinc-600 dark:text-zinc-400">Title & Authors</th>
                <th className="px-6 py-4 text-sm font-semibold text-zinc-600 dark:text-zinc-400">Publication Details</th>
                <th className="px-6 py-4 text-sm font-semibold text-zinc-600 dark:text-zinc-400">Stats</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-zinc-600 dark:text-zinc-400">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
              {articles.length > 0 ? (
                articles.map((article) => (
                  <tr key={article.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-950/50 transition-colors">
                    <td className="px-6 py-4 w-1/2">
                      <div className="font-bold text-zinc-900 dark:text-white mb-1 leading-snug">
                        {article.title}
                      </div>
                      <div className="text-sm text-zinc-500 flex items-center gap-2">
                        <span className="truncate max-w-[300px]">
                           {article.authors.length > 0 
                             ? article.authors.map(a => a.author.name).join(", ") + (article.authors.length === 2 ? "" : " et al.")
                             : "No Authors"
                           }
                        </span>
                        {article.doi && (
                          <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700">
                            DOI: {article.doi}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex flex-col gap-1">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 w-fit">
                          {article.articleType}
                        </span>
                        {article.issue ? (
                          <span className="text-zinc-600 dark:text-zinc-400">
                            Vol. {article.issue.volume.number} ({article.issue.volume.year}) <br/>
                            Iss. {article.issue.number}
                          </span>
                        ) : (
                          <span className="text-amber-600 dark:text-amber-500 font-medium">Unassigned</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="text-zinc-600 dark:text-zinc-400 flex flex-col gap-0.5">
                        <span><strong className="text-zinc-900 dark:text-zinc-200">{article.viewCount}</strong> Views</span>
                        <span><strong className="text-zinc-900 dark:text-zinc-200">{article.downloadCount}</strong> Downloads</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                         <a 
                          href={`/article/${article.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 text-zinc-500 hover:text-blue-600 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
                          title="View on site"
                        >
                          <Eye className="w-4 h-4" />
                        </a>
                        <Link 
                          href={`/admin/articles/${article.id}`}
                          className="p-2 text-zinc-500 hover:text-blue-600 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
                          title="Edit article"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button 
                          className="p-2 text-zinc-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                          title="Delete article"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-zinc-500 dark:text-zinc-400">
                    No articles found. Add an article or clear your search query.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
