import prisma from "@/lib/db";
import Link from "next/link";
import { format } from "date-fns";
import { Megaphone, ArrowRight } from "lucide-react";

export const revalidate = 3600;

export default async function AnnouncementsPage() {
  const announcements = await prisma.announcement.findMany({
    where: { isActive: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="bg-white dark:bg-zinc-950 py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <header className="mb-16 text-center">
          <div className="inline-flex items-center justify-center p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-2xl mb-6">
            <Megaphone className="w-8 h-8" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-6">
            Announcements
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            Stay up to date with the latest news, updates, and calls for papers from our editorial team.
          </p>
        </header>

        <div className="space-y-8">
          {announcements.length > 0 ? (
            announcements.map((announcement) => (
              <article key={announcement.id} className="bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl p-8 border border-zinc-200 dark:border-zinc-800 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-zinc-300 dark:bg-zinc-700 group-hover:bg-blue-500 transition-colors" />
                <time className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-widest block mb-3">
                  {format(new Date(announcement.createdAt), "MMMM d, yyyy")}
                </time>
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">
                  {announcement.title}
                </h2>
                <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed">
                  {announcement.content}
                </p>
              </article>
            ))
          ) : (
            <div className="text-center py-20 bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-800">
              <p className="text-lg text-zinc-500 dark:text-zinc-400">No active announcements at this time.</p>
            </div>
          )}
        </div>
        
        <div className="mt-16 text-center">
          <Link href="/submissions" className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 rounded-full font-medium transition-all shadow-lg shadow-blue-500/30">
            Submit a Manuscript <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
