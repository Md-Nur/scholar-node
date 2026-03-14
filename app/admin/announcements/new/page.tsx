import Link from "next/link";
import { ArrowLeft, Megaphone, Save } from "lucide-react";
import { createAnnouncement } from "../actions";

export default function NewAnnouncementPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-12">
      <div className="flex items-center gap-4">
        <Link 
          href="/admin/announcements" 
          className="p-2 text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 rounded-xl transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-white flex items-center gap-3">
            <Megaphone className="w-8 h-8 text-purple-500" />
            New Announcement
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400">Create a new journal announcement or update.</p>
        </div>
      </div>

      <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden">
        <form action={createAnnouncement} className="p-8 space-y-6">
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              required
              placeholder="e.g., Call for Papers: Special Issue on AI"
              className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 focus:ring-2 focus:ring-purple-500 outline-none transition-shadow"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="content" className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
              Content
            </label>
            <textarea
              id="content"
              name="content"
              required
              rows={6}
              placeholder="Write your announcement content here..."
              className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 focus:ring-2 focus:ring-purple-500 outline-none transition-shadow resize-none"
            ></textarea>
          </div>

          <div className="flex items-center gap-3 p-4 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800">
            <input
              type="checkbox"
              id="isActive"
              name="isActive"
              defaultChecked
              className="w-4 h-4 rounded text-purple-600 focus:ring-purple-500"
            />
            <label htmlFor="isActive" className="text-sm font-medium text-zinc-700 dark:text-zinc-300 cursor-pointer">
              Active (Visible on public pages)
            </label>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-100 dark:border-zinc-800">
            <Link
              href="/admin/announcements"
              className="px-6 py-2.5 rounded-xl text-sm font-medium text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50 transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2.5 rounded-xl text-sm font-medium transition-colors shadow-sm"
            >
              <Save className="w-4 h-4" />
              Save Announcement
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
