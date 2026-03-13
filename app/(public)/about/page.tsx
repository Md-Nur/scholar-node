import { getJournalSettings } from "@/lib/settings";

export const revalidate = 3600;

export default async function AboutPage() {
  const settings = await getJournalSettings();

  return (
    <div className="prose prose-zinc dark:prose-invert max-w-none">
      <header className="mb-8 not-prose">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-zinc-900 dark:text-white tracking-tight mb-6">
          About the Journal
        </h1>
        <p className="text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed">
          The Asian Journal of Education and Social Studies (AJESS) is a premier international venue for scholarly research.
        </p>
      </header>

      <div className="space-y-12">
        <section>
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">Aims and Scope</h2>
          <div className="text-zinc-600 dark:text-zinc-400 space-y-4">
            <p>
              Asian Journal of Education and Social Studies (ISSN: 2581-6268) aims to publish high-quality papers 
              in all areas of Education and Social Sciences. The journal facilitates research by not excluding 
              papers based on novelty. It aims to publish any paper that is technically correct and scientifically 
              motivated, including reports of negative results.
            </p>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose">
          <div className="bg-zinc-50 dark:bg-zinc-800/50 p-6 rounded-2xl border border-zinc-100 dark:border-zinc-800">
            <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-widest mb-1">ISSN</h3>
            <p className="text-lg font-bold text-zinc-900 dark:text-white">2581-6268</p>
          </div>
          <div className="bg-zinc-50 dark:bg-zinc-800/50 p-6 rounded-2xl border border-zinc-100 dark:border-zinc-800">
            <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-widest mb-1">Journal DOI</h3>
            <p className="text-lg font-bold text-blue-600 dark:text-blue-400 underline decoration-2 underline-offset-4">
              10.9734/ajess
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">Open Access Policy</h2>
          <p className="text-zinc-600 dark:text-zinc-400">
            This journal provides immediate open access to its content on the principle that making research freely available to the public supports a greater global exchange of knowledge.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">Archiving</h2>
          <p className="text-zinc-600 dark:text-zinc-400">
            This journal utilizes the LOCKSS system to create a distributed archiving system among participating libraries and permits those libraries to create permanent archives of the journal for purposes of preservation and restoration.
          </p>
        </section>
      </div>
    </div>
  );
}
