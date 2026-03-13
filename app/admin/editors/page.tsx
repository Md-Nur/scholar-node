import prisma from "@/lib/db";
import Link from "next/link";
import { Plus, Users, Edit, Trash2 } from "lucide-react";

export const revalidate = 0;

export default async function AdminEditorsPage() {
  const editors = await prisma.editor.findMany({
    orderBy: { order: "asc" },
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2 flex items-center gap-3">
            <Users className="w-8 h-8 text-blue-500" />
            Editorial Board
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400">Manage journal editors and board members.</p>
        </div>
        
        <Link 
          href="/admin/editors/new" 
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-medium transition-colors shadow-sm"
        >
          <Plus className="w-5 h-5" />
          Add Editor
        </Link>
      </div>

      <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-zinc-50 dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800">
                <th className="px-6 py-4 text-sm font-semibold text-zinc-600 dark:text-zinc-400">Name</th>
                <th className="px-6 py-4 text-sm font-semibold text-zinc-600 dark:text-zinc-400">Role</th>
                <th className="px-6 py-4 text-sm font-semibold text-zinc-600 dark:text-zinc-400">Affiliation</th>
                <th className="px-6 py-4 text-sm font-semibold text-zinc-600 dark:text-zinc-400">Order</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-zinc-600 dark:text-zinc-400">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
              {editors.length > 0 ? (
                editors.map((editor) => (
                  <tr key={editor.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-950/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center font-bold text-zinc-500 overflow-hidden">
                          {editor.imageUrl ? (
                            <img src={editor.imageUrl} alt={editor.name} className="w-full h-full object-cover" />
                          ) : (
                            editor.name.charAt(0)
                          )}
                        </div>
                        <div>
                          <div className="font-bold text-zinc-900 dark:text-white">{editor.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                        {editor.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-zinc-600 dark:text-zinc-400">
                      {editor.affiliation}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-zinc-900 dark:text-white">
                      {editor.order}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link 
                          href={`/admin/editors/${editor.id}`}
                          className="p-2 text-zinc-500 hover:text-blue-600 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button 
                          className="p-2 text-zinc-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-zinc-500 dark:text-zinc-400">
                    No editors found. Add your first editorial board member to get started.
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
