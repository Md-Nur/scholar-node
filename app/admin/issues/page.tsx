import prisma from "@/lib/db";
import Link from "next/link";
import { format } from "date-fns";
import { Plus, FolderOpen, Edit, Trash2 } from "lucide-react";

export const revalidate = 0;

export default async function AdminIssuesPage() {
  const issues = await prisma.issue.findMany({
    include: {
      volume: true,
      _count: {
        select: { articles: true }
      }
    },
    orderBy: [
      { volume: { year: "desc" } },
      { number: "desc" }
    ],
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2 flex items-center gap-3">
            <FolderOpen className="w-8 h-8 text-emerald-500" />
            Volumes & Issues
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400">Manage journal publication schedules and structures.</p>
        </div>
        
        <div className="flex gap-3">
          <button className="inline-flex items-center gap-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 px-5 py-2.5 rounded-xl font-medium transition-colors shadow-sm">
            <Plus className="w-5 h-5" />
            New Volume
          </button>
          <button className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl font-medium transition-colors shadow-sm">
            <Plus className="w-5 h-5" />
            New Issue
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-zinc-50 dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800">
                <th className="px-6 py-4 text-sm font-semibold text-zinc-600 dark:text-zinc-400">Issue Details</th>
                <th className="px-6 py-4 text-sm font-semibold text-zinc-600 dark:text-zinc-400">Status</th>
                <th className="px-6 py-4 text-sm font-semibold text-zinc-600 dark:text-zinc-400">Articles</th>
                <th className="px-6 py-4 text-sm font-semibold text-zinc-600 dark:text-zinc-400">Created</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-zinc-600 dark:text-zinc-400">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
              {issues.length > 0 ? (
                issues.map((issue) => (
                  <tr key={issue.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-950/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-bold text-zinc-900 dark:text-white text-lg">
                        Volume {issue.volume.number}, Issue {issue.number}
                      </div>
                      <div className="text-sm text-zinc-500">
                        Published Year: {issue.volume.year}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {issue.isCurrent ? (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/50">
                          Current Issue
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700">
                          Archived
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-zinc-700 dark:text-zinc-300">
                        {issue._count.articles} Articles
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-zinc-500">
                      {format(new Date(issue.createdAt), 'MMM d, yyyy')}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 text-zinc-500 hover:text-blue-600 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-zinc-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-zinc-500 dark:text-zinc-400">
                    No issues found. Create a volume and an issue to get started.
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
