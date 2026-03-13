import prisma from "@/lib/db";
import { getJournalSettings } from "@/lib/settings";
import Link from "next/link";
import { FileText, ArrowRight, UserCheck, Search, BookOpen } from "lucide-react";

export const revalidate = 3600; // Revalidate every hour

export default async function HomePage() {
  const settings = await getJournalSettings();
  
  // Fetch current issue
  const currentIssue = await prisma.issue.findFirst({
    where: { isCurrent: true },
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

  // Fetch active testimonials
  const testimonials = await prisma.testimonial.findMany({
    where: { isActive: true },
    orderBy: { createdAt: "desc" },
    take: 3,
  });

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-zinc-950 text-white overflow-hidden py-24 sm:py-32">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-zinc-900/80 to-zinc-950/90 mix-blend-multiply" />
          {/* Subtle grid pattern */}
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.05]" />
        </div>
        
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-sm font-medium mb-8 border border-blue-500/20">
            <BookOpen className="h-4 w-4" />
            Open Access Journal
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 max-w-4xl text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-400">
            {settings.journal_title || "Academic Journal"}
          </h1>
          <p className="text-lg sm:text-xl text-zinc-300 max-w-2xl mb-10 leading-relaxed">
            {settings.journal_description || "A peer-reviewed, open-access international journal dedicated to publishing high-quality research."}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link 
              href="/submissions" 
              className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-8 py-3.5 rounded-full font-medium transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)]"
            >
              Submit Manuscript <ArrowRight className="h-4 w-4" />
            </Link>
            <Link 
              href="/archives" 
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm px-8 py-3.5 rounded-full font-medium transition-all border border-white/10 hover:border-white/30"
            >
              Browse Archives
            </Link>
          </div>
        </div>
      </section>

      {/* Stats/Info Bar */}
      <section className="bg-blue-600 text-white py-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 divide-x divide-white/20 text-center">
            <div className="px-4">
              <div className="text-sm text-blue-200 uppercase tracking-wider font-semibold mb-1">Review Time</div>
              <div className="text-2xl font-bold">4-6 Weeks</div>
            </div>
            <div className="px-4">
              <div className="text-sm text-blue-200 uppercase tracking-wider font-semibold mb-1">Indexation</div>
              <div className="text-2xl font-bold">Crossref, DOAJ</div>
            </div>
            <div className="px-4">
              <div className="text-sm text-blue-200 uppercase tracking-wider font-semibold mb-1">Acceptance Rate</div>
              <div className="text-2xl font-bold">~ 35%</div>
            </div>
            <div className="px-4">
              <div className="text-sm text-blue-200 uppercase tracking-wider font-semibold mb-1">Access</div>
              <div className="text-2xl font-bold">100% Open</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-16 sm:py-24 flex-1">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Left Column - Current Issue */}
            <div className="lg:col-span-2 space-y-10">
              <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-4">
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                  <div className="w-2 h-6 bg-blue-600 rounded-sm"></div>
                  Current Issue
                </h2>
                {currentIssue && (
                  <span className="text-sm font-medium text-zinc-500 bg-zinc-100 dark:bg-zinc-800 dark:text-zinc-400 px-3 py-1 rounded-full">
                    Volume {currentIssue.volume.number}, Issue {currentIssue.number} ({currentIssue.volume.year})
                  </span>
                )}
              </div>

              {currentIssue ? (
                <div className="space-y-8">
                  {currentIssue.articles.length > 0 ? (
                    currentIssue.articles.map((article) => (
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
                    <div className="text-center py-12 bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-800">
                      <p className="text-zinc-500 dark:text-zinc-400">No articles available in the current issue yet.</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-12 bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-800">
                  <p className="text-zinc-500 dark:text-zinc-400">No current issue defined.</p>
                </div>
              )}
              
              <div className="pt-4 flex justify-center">
                <Link 
                  href="/archives" 
                  className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full border border-zinc-200 dark:border-zinc-800 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
                >
                  View All Issues <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-8">
              {/* Quick Search Widget */}
              <div className="bg-zinc-50 dark:bg-zinc-900 rounded-2xl p-6 border border-zinc-200 dark:border-zinc-800">
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-4 flex items-center gap-2">
                  <Search className="h-5 w-5 text-zinc-400" /> Quick Search
                </h3>
                <form action="/search" className="relative">
                  <input 
                    type="text" 
                    name="q"
                    placeholder="Search articles, authors..." 
                    className="w-full bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 rounded-lg py-2.5 px-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-500/50"
                  />
                  <button type="submit" className="absolute right-3 top-2.5 text-zinc-400 hover:text-blue-600 transition-colors">
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </form>
              </div>

              {/* Information For Widgets */}
              <div className="bg-white dark:bg-zinc-950 rounded-2xl p-6 border border-zinc-200 dark:border-zinc-800 shadow-sm">
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-4">Information For</h3>
                <ul className="space-y-3">
                  <li>
                    <Link href="/page/guidelines" className="flex items-center justify-between group p-3 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors border border-transparent hover:border-zinc-200 dark:hover:border-zinc-800">
                      <span className="font-medium text-sm text-zinc-700 dark:text-zinc-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">Authors</span>
                      <ArrowRight className="h-4 w-4 text-zinc-300 dark:text-zinc-600 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                    </Link>
                  </li>
                  <li>
                    <Link href="/page/reviewers" className="flex items-center justify-between group p-3 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors border border-transparent hover:border-zinc-200 dark:hover:border-zinc-800">
                      <span className="font-medium text-sm text-zinc-700 dark:text-zinc-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">Reviewers</span>
                      <ArrowRight className="h-4 w-4 text-zinc-300 dark:text-zinc-600 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                    </Link>
                  </li>
                  <li>
                    <Link href="/page/editors" className="flex items-center justify-between group p-3 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors border border-transparent hover:border-zinc-200 dark:hover:border-zinc-800">
                      <span className="font-medium text-sm text-zinc-700 dark:text-zinc-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">Editors</span>
                      <ArrowRight className="h-4 w-4 text-zinc-300 dark:text-zinc-600 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      {testimonials.length > 0 && (
        <section className="py-16 bg-zinc-50 dark:bg-zinc-950/50 border-t border-zinc-200 dark:border-zinc-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-zinc-900 dark:text-white mb-12">
              What Our Community Says
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((t) => (
                <div key={t.id} className="bg-white dark:bg-zinc-900 rounded-2xl p-8 border border-zinc-200 dark:border-zinc-800 shadow-sm relative flex flex-col">
                  <span className="text-6xl text-blue-500/10 absolute top-4 left-4 pt-2 font-serif">"</span>
                  <p className="text-zinc-600 dark:text-zinc-400 mb-6 italic relative z-10 leading-relaxed text-sm grow">
                    "{t.content}"
                  </p>
                  <div className="flex items-center gap-4 mt-auto">
                    <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center font-bold text-blue-600 dark:text-blue-400 shrink-0">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-zinc-900 dark:text-white text-sm">{t.name}</h4>
                      {t.role && <p className="text-xs text-zinc-500 dark:text-zinc-400">{t.role}</p>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
