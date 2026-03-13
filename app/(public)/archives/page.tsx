import prisma from "@/lib/db";
import Link from "next/link";
import { Folder, ChevronRight, File, Archive, ArrowRight } from "lucide-react";
import { getJournalSettings } from "@/lib/settings";

export const revalidate = 3600;

export default async function ArchivesPage() {
  const settings = await getJournalSettings();
  
  const volumes = await prisma.volume.findMany({
    orderBy: { year: 'desc' },
    include: {
      issues: {
        orderBy: { number: 'desc' },
        include: {
          _count: {
            select: { articles: true }
          }
        }
      }
    }
  });

  return (
    <div className="bg-white dark:bg-zinc-950 py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <header className="mb-16 text-center">
          <div className="inline-flex items-center justify-center p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-2xl mb-6">
            <Archive className="w-8 h-8" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-6">
            Past Issues & Archives
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            Browse our complete collection of previously published volumes and issues dating back to {settings.started_year || "our inception"}.
          </p>
        </header>

        <div className="space-y-16">
          {volumes.length > 0 ? (
            volumes.map((volume) => (
              <section key={volume.id} className="scroll-mt-24">
                <div className="flex items-center gap-4 mb-8 pb-4 border-b border-zinc-200 dark:border-zinc-800">
                  <div className="bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 px-4 py-2 rounded-lg font-bold text-lg">
                    {volume.year}
                  </div>
                  <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
                    Volume {volume.number}
                  </h2>
                </div>

                {volume.issues.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {volume.issues.map((issue) => (
                      <Link 
                        key={issue.id}
                        href={`/volume/${volume.number}/issue/${issue.number}`}
                        className="group flex flex-col bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl p-6 border border-zinc-200 dark:border-zinc-800 hover:border-blue-500 hover:shadow-lg dark:hover:shadow-blue-900/20 transition-all duration-300"
                      >
                        <div className="flex items-start justify-between mb-6">
                          <div className="p-2.5 bg-white dark:bg-zinc-800 rounded-xl shadow-sm text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                            <Folder className="w-6 h-6" />
                          </div>
                          {issue.isCurrent && (
                            <span className="px-3 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 text-xs font-bold rounded-full uppercase tracking-wider">
                              Current
                            </span>
                          )}
                        </div>
                        
                        <div className="mt-auto">
                          <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            Issue {issue.number}
                          </h3>
                          <div className="flex items-center justify-between text-sm text-zinc-500 dark:text-zinc-400">
                            <span className="flex items-center gap-1.5">
                              <File className="w-4 h-4" />
                              {issue._count.articles} {issue._count.articles === 1 ? 'Article' : 'Articles'}
                            </span>
                            <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-blue-600 dark:text-blue-400" />
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl p-8 border border-dashed border-zinc-200 dark:border-zinc-800 text-center text-zinc-500 dark:text-zinc-400">
                    No issues published in this volume yet.
                  </div>
                )}
              </section>
            ))
          ) : (
            <div className="text-center py-24 bg-zinc-50 dark:bg-zinc-900/50 rounded-3xl border border-dashed border-zinc-200 dark:border-zinc-800">
              <Archive className="w-12 h-12 mx-auto text-zinc-300 dark:text-zinc-700 mb-4" />
              <h3 className="text-lg font-medium text-zinc-900 dark:text-white mb-2">No Archives Available</h3>
              <p className="text-zinc-500 dark:text-zinc-400">Past volumes and issues will appear here once published.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
