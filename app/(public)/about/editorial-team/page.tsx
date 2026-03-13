import prisma from "@/lib/db";
import { Users } from "lucide-react";
import { getJournalSettings } from "@/lib/settings";

export const revalidate = 3600;

export default async function EditorialTeamPage() {
  const settings = await getJournalSettings();
  
  const editors = await prisma.editor.findMany({
    orderBy: { order: "asc" },
  });

  // Group by role
  const roles = editors.reduce((acc, editor) => {
    if (!acc[editor.role]) acc[editor.role] = [];
    acc[editor.role].push(editor);
    return acc;
  }, {} as Record<string, typeof editors>);

  // Sort groups (Chief Editor first, then others)
  const sortedRoles = Object.keys(roles).sort((a, b) => {
    if (a.toLowerCase().includes('chief')) return -1;
    if (b.toLowerCase().includes('chief')) return 1;
    return a.localeCompare(b);
  });

  return (
    <div className="py-0">
      <header className="mb-8">
        <div className="inline-flex items-center justify-center p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-2xl mb-4">
          <Users className="w-8 h-8" />
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-4">
          Editorial Team
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-3xl leading-relaxed">
          Our distinguished editorial board brings together leading experts to ensure the high quality and integrity of research published in {settings.journal_abbreviation || "the journal"}.
        </p>
      </header>

      <div className="space-y-16">
        {sortedRoles.map(role => (
          <section key={role}>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-8 pb-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center gap-3">
              <div className="w-1.5 h-6 bg-blue-600 rounded-full"></div>
              {role}s
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
              {roles[role].map(editor => (
                <div key={editor.id} className="bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl p-6 border border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row gap-6 items-start hover:border-blue-500/50 hover:bg-white dark:hover:bg-zinc-900 transition-all group">
                  <div className="w-24 h-24 rounded-full bg-zinc-200 dark:bg-zinc-800 flex-shrink-0 flex items-center justify-center overflow-hidden border-4 border-white dark:border-zinc-900 shadow-sm transition-transform group-hover:scale-105">
                    {editor.imageUrl ? (
                      <img src={editor.imageUrl} alt={editor.name} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-2xl font-bold text-zinc-400 dark:text-zinc-600">
                        {editor.name.charAt(0)}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-bold text-zinc-900 dark:text-white truncate mb-1">
                      {editor.name}
                    </h3>
                    {editor.affiliation && (
                      <p className="text-sm text-blue-600 dark:text-blue-400 font-semibold mb-3 leading-tight">
                        {editor.affiliation}
                      </p>
                    )}
                    {editor.bio && (
                      <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-3 italic leading-relaxed">
                        {editor.bio}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
