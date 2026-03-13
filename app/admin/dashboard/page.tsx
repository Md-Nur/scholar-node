import prisma from "@/lib/db";
import Link from "next/link";
import { format } from "date-fns";
import { 
  FileText, Users, FolderOpen, Mail, Eye, Download, 
  TrendingUp, Clock, BookMarked, Megaphone, Settings
} from "lucide-react";

export const revalidate = 0; // Don't cache admin pages

export default async function AdminDashboard() {
  // Fetch key statistics
  const [
    articleCount,
    issueCount,
    authorCount,
    editorCount,
    recentArticles,
    totalViews,
    totalDownloads
  ] = await Promise.all([
    prisma.article.count(),
    prisma.issue.count(),
    prisma.author.count(),
    prisma.editor.count(),
    prisma.article.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: {
        issue: { include: { volume: true } },
      }
    }),
    prisma.article.aggregate({ _sum: { viewCount: true } }),
    prisma.article.aggregate({ _sum: { downloadCount: true } })
  ]);

  const stats = [
    { label: "Total Articles", value: articleCount, icon: FileText, color: "bg-blue-500" },
    { label: "Published Issues", value: issueCount, icon: FolderOpen, color: "bg-emerald-500" },
    { label: "Authors", value: authorCount, icon: Users, color: "bg-purple-500" },
    { label: "Editors", value: editorCount, icon: BookMarked, color: "bg-amber-500" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">Dashboard</h1>
        <p className="text-zinc-500 dark:text-zinc-400">Welcome to the Scholar Node admin portal.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-zinc-200 dark:border-zinc-800 shadow-sm flex items-center gap-4">
               <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-sm ${stat.color}`}>
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-zinc-900 dark:text-white">{stat.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Engagement Stats */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-zinc-200 dark:border-zinc-800 shadow-sm">
            <h2 className="text-lg font-bold text-zinc-900 dark:text-white mb-6 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-500" />
              Engagement Metrics
            </h2>
            
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400 font-medium">
                    <Eye className="w-4 h-4" /> Total Views
                  </span>
                  <span className="font-bold text-zinc-900 dark:text-white">
                    {totalViews._sum.viewCount?.toLocaleString() || 0}
                  </span>
                </div>
                <div className="w-full bg-zinc-100 dark:bg-zinc-800 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '100%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400 font-medium">
                    <Download className="w-4 h-4" /> PDF Downloads
                  </span>
                  <span className="font-bold text-zinc-900 dark:text-white">
                    {totalDownloads._sum.downloadCount?.toLocaleString() || 0}
                  </span>
                </div>
                <div className="w-full bg-zinc-100 dark:bg-zinc-800 rounded-full h-2">
                  <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-zinc-200 dark:border-zinc-800 shadow-sm">
            <h2 className="text-lg font-bold text-zinc-900 dark:text-white mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-3">
              <Link href="/admin/articles/new" className="flex flex-col items-center justify-center gap-2 p-4 bg-zinc-50 hover:bg-zinc-100 dark:bg-zinc-950 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 rounded-xl transition-colors text-sm font-medium text-zinc-700 dark:text-zinc-300">
                <FileText className="w-5 h-5 text-blue-500" />
                New Article
              </Link>
              <Link href="/admin/issues/new" className="flex flex-col items-center justify-center gap-2 p-4 bg-zinc-50 hover:bg-zinc-100 dark:bg-zinc-950 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 rounded-xl transition-colors text-sm font-medium text-zinc-700 dark:text-zinc-300">
                <FolderOpen className="w-5 h-5 text-emerald-500" />
                New Issue
              </Link>
              <Link href="/admin/announcements/new" className="flex flex-col items-center justify-center gap-2 p-4 bg-zinc-50 hover:bg-zinc-100 dark:bg-zinc-950 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 rounded-xl transition-colors text-sm font-medium text-zinc-700 dark:text-zinc-300">
                <Megaphone className="w-5 h-5 text-purple-500" />
                Announcement
              </Link>
              <Link href="/admin/settings" className="flex flex-col items-center justify-center gap-2 p-4 bg-zinc-50 hover:bg-zinc-100 dark:bg-zinc-950 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 rounded-xl transition-colors text-sm font-medium text-zinc-700 dark:text-zinc-300">
                <Settings className="w-5 h-5 text-zinc-500" />
                Settings
              </Link>
            </div>
          </div>
        </div>

        {/* Recent Articles */}
        <div className="lg:col-span-2 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
            <h2 className="text-lg font-bold text-zinc-900 dark:text-white flex items-center gap-2">
              <Clock className="w-5 h-5 text-zinc-400" />
              Recently Added Articles
            </h2>
            <Link href="/admin/articles" className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
              View All
            </Link>
          </div>
          
          <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
            {recentArticles.length > 0 ? (
              recentArticles.map((article) => (
                <div key={article.id} className="p-6 hover:bg-zinc-50 dark:hover:bg-zinc-950/50 transition-colors">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <h3 className="font-bold text-zinc-900 dark:text-white mb-1 line-clamp-1">
                        {article.title}
                      </h3>
                      <div className="text-sm text-zinc-500 dark:text-zinc-400 flex items-center gap-3">
                        <span className="font-medium bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded text-xs">
                          {article.articleType}
                        </span>
                        {article.issue && (
                          <span>
                            Vol. {article.issue.volume.number} Iss. {article.issue.number}
                          </span>
                        )}
                        <span>
                          {format(new Date(article.createdAt), 'MMM d, yyyy')}
                        </span>
                      </div>
                    </div>
                    <Link 
                      href={`/admin/articles/${article.id}`}
                      className="text-sm font-medium text-zinc-600 bg-white dark:text-zinc-300 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 px-3 py-1.5 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors shrink-0"
                    >
                      Edit
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-12 text-center text-zinc-500 dark:text-zinc-400">
                No articles found. Add your first article to see it here.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
