import prisma from "@/lib/db";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight, Calendar, User, FileText, Download, Eye, Link as LinkIcon } from "lucide-react";

export const revalidate = 3600;

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  
  const article = await prisma.article.findUnique({
    where: { slug },
    include: {
      issue: {
        include: { volume: true },
      },
      authors: {
        include: { author: true },
        orderBy: { order: "asc" },
      },
    },
  });

  if (!article) {
    notFound();
  }

  // Increment view count
  await prisma.article.update({
    where: { id: article.id },
    data: { viewCount: { increment: 1 } }
  });

  const publishedDate = article.publishedAt
    ? new Intl.DateTimeFormat("en-US", { dateStyle: "long" }).format(article.publishedAt)
    : "Unknown";

  return (
    <div className="bg-white dark:bg-zinc-950 py-12 sm:py-20 lg:py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-blue-50/50 to-transparent dark:from-blue-950/20 pointer-events-none" />
      
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        {/* Breadcrumbs */}
        <nav className="flex items-center space-x-2 text-sm text-zinc-500 dark:text-zinc-400 mb-8 sm:mb-12">
          <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Home</Link>
          <ChevronRight className="h-4 w-4" />
          <Link href="/archives" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Archives</Link>
          <ChevronRight className="h-4 w-4" />
          <Link href={`/volume/${article.issue.volume.number}/issue/${article.issue.number}`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Vol. {article.issue.volume.number} No. {article.issue.number} ({article.issue.volume.year})
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-zinc-900 dark:text-zinc-200 truncate max-w-[200px] sm:max-w-xs block border-b-2 border-transparent">
            {article.title}
          </span>
        </nav>

        {/* Article Header */}
        <header className="mb-12 sm:mb-16">
          <div className="flex flex-wrap gap-3 mb-6">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300 shadow-sm">
              {article.articleType}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight leading-[1.15] mb-8">
            {article.title}
          </h1>

          <div className="flex flex-col sm:flex-row sm:items-center gap-6 text-zinc-600 dark:text-zinc-400 border-b border-zinc-200 dark:border-zinc-800 pb-8">
            <div className="flex -space-x-3 mr-4">
              {article.authors.map((a, i) => (
                <div key={a.id} className="relative z-10 inline-flex items-center justify-center w-10 h-10 rounded-full bg-zinc-200 uppercase dark:bg-zinc-800 ring-2 ring-white dark:ring-zinc-950 text-xs font-bold text-zinc-600 dark:text-zinc-300" style={{ zIndex: 10 - i }}>
                  {a.author.name.charAt(0)}
                </div>
              ))}
            </div>
            
            <div className="flex-1">
              <div className="text-lg font-medium text-zinc-900 dark:text-zinc-200 mb-1">
                {article.authors.map((a, i) => (
                  <span key={a.id}>
                    {a.author.name}
                    {a.author.affiliation && <sup className="text-zinc-500 ml-0.5">{i+1}</sup>}
                    {i < article.authors.length - 1 ? ", " : ""}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex flex-wrap gap-6 text-sm">
             <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-900/50 px-3 py-1.5 rounded-md border border-zinc-100 dark:border-zinc-800">
              <Calendar className="h-4 w-4" />
              Published: <span className="font-medium text-zinc-700 dark:text-zinc-300">{publishedDate}</span>
            </div>
            {article.doi && (
               <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-900/50 px-3 py-1.5 rounded-md border border-zinc-100 dark:border-zinc-800">
                <LinkIcon className="h-4 w-4" />
                DOI: <a href={`https://doi.org/${article.doi}`} target="_blank" rel="noopener noreferrer" className="font-medium text-blue-600 hover:underline dark:text-blue-400">{article.doi}</a>
              </div>
            )}
            <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-900/50 px-3 py-1.5 rounded-md border border-zinc-100 dark:border-zinc-800">
               <Eye className="h-4 w-4" />
               Views: <span className="font-medium text-zinc-700 dark:text-zinc-300">{article.viewCount + 1}</span>
            </div>
            <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-900/50 px-3 py-1.5 rounded-md border border-zinc-100 dark:border-zinc-800">
               <Download className="h-4 w-4" />
               Downloads: <span className="font-medium text-zinc-700 dark:text-zinc-300">{article.downloadCount}</span>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Article Content */}
          <div className="lg:col-span-8 space-y-12">
            {article.abstract && (
              <section className="bg-zinc-50 dark:bg-zinc-900 rounded-2xl p-8 border border-zinc-200 dark:border-zinc-800 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-500" />
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-6 flex items-center gap-3">
                  <FileText className="h-6 w-6 text-blue-500" />
                  Abstract
                </h2>
                <div className="prose prose-zinc dark:prose-invert prose-lg max-w-none text-zinc-600 dark:text-zinc-300 leading-relaxed space-y-4">
                  <p>{article.abstract}</p>
                </div>
              </section>
            )}

            {article.keywords.length > 0 && (
              <section>
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4 flex items-center gap-2">
                  Keywords
                </h3>
                <div className="flex flex-wrap gap-2">
                  {article.keywords.map((keyword, index) => (
                    <span 
                      key={index}
                      className="inline-flex items-center px-3 py-1.5 rounded-lg text-sm bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors cursor-pointer border border-zinc-200 dark:border-zinc-700"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {/* Author Details section */}
            <section className="border-t border-zinc-200 dark:border-zinc-800 pt-10">
              <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-6 flex items-center gap-2">
                <User className="h-5 w-5 text-zinc-400" />
                Author Details
              </h3>
              <ul className="space-y-4">
                {article.authors.map((a, i) => (
                  <li key={a.id} className="text-zinc-700 dark:text-zinc-300 leading-relaxed bg-zinc-50 dark:bg-zinc-900/50 p-4 rounded-xl border border-zinc-100 dark:border-zinc-800">
                    <span className="font-semibold text-zinc-900 dark:text-zinc-100 text-lg block mb-1">
                      <sup className="text-blue-600 dark:text-blue-400 mr-1">{i+1}</sup>
                      {a.author.name}
                    </span>
                    {a.author.affiliation && (
                      <span className="text-zinc-600 dark:text-zinc-400 text-sm block italic">
                        {a.author.affiliation}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Sticky Sidebar */}
          <aside className="lg:col-span-4 min-w-0">
            <div className="sticky top-24 space-y-6">
              {/* Primary Action */}
              <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-blue-200 dark:border-blue-900/50 shadow-lg shadow-blue-500/5">
                <button className="w-full flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-xl font-semibold transition-all shadow-md group">
                  <Download className="h-5 w-5 group-hover:-translate-y-0.5 transition-transform" />
                  Download Full PDF
                </button>
                <div className="flex justify-between items-center mt-4 text-xs font-medium text-zinc-500 dark:text-zinc-400 px-1">
                  <span>File size: ~1.2 MB</span>
                  <span className="text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-0.5 rounded">Open Access</span>
                </div>
              </div>

              {/* How to Cite Widget */}
              <div className="bg-zinc-50 dark:bg-zinc-900 rounded-2xl p-6 border border-zinc-200 dark:border-zinc-800">
                <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider mb-4 flex items-center justify-between">
                  How to Cite
                  <button className="text-blue-600 hover:text-blue-700 dark:text-blue-400 text-xs normal-case group relative">
                    Copy format
                  </button>
                </h3>
                <div className="w-full bg-white dark:bg-zinc-950 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-serif break-all overflow-hidden">
                  {article.authors.map((a) => a.author.name.split(" ").pop() + ", " + a.author.name.split(" ")[0].charAt(0) + ".").join(" & ")} ({article.issue.volume.year}). {article.title}. <span className="italic">AJESS</span>, <span className="italic">{article.issue.volume.number}</span>({article.issue.number}), {article.pageStart}-{article.pageEnd}. {article.doi ? `https://doi.org/${article.doi}` : ""}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
