import Link from "next/link";

export default function Footer({ settings }: { settings: Record<string, string> }) {
  const journalTitle = settings["journal_title"] || "Academic Journal";
  const publisher = settings["publisher"] || "Scholar Node Publishing";
  const issn = settings["issn"] || "";

  return (
    <footer className="border-t border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/50 pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-12">
          <div className="md:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <span className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                {journalTitle}
              </span>
            </Link>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed max-w-md">
              A peer-reviewed, open-access international journal dedicated to publishing high-quality research across various disciplines.
            </p>
            {issn && (
              <p className="mt-4 text-sm font-medium text-zinc-500 bg-zinc-100 dark:bg-zinc-800 dark:text-zinc-400 inline-block px-3 py-1 rounded-full">
                ISSN: {issn}
              </p>
            )}
          </div>
          
          <div>
            <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-6 uppercase tracking-wider text-xs">Explore</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/archives" className="text-sm text-zinc-600 hover:text-blue-600 transition-colors dark:text-zinc-400 dark:hover:text-blue-400">
                  Past Issues
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-zinc-600 hover:text-blue-600 transition-colors dark:text-zinc-400 dark:hover:text-blue-400">
                  About the Journal
                </Link>
              </li>
              <li>
                <Link href="/about/editorial-team" className="text-sm text-zinc-600 hover:text-blue-600 transition-colors dark:text-zinc-400 dark:hover:text-blue-400">
                  Editorial Board
                </Link>
              </li>
              <li>
                <Link href="/indexing" className="text-sm text-zinc-600 hover:text-blue-600 transition-colors dark:text-zinc-400 dark:hover:text-blue-400">
                  Abstracting & Indexing
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-6 uppercase tracking-wider text-xs">For Authors</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/submissions" className="text-sm text-zinc-600 hover:text-blue-600 transition-colors dark:text-zinc-400 dark:hover:text-blue-400">
                  Submit Manuscript
                </Link>
              </li>
              <li>
                <Link href="/page/guidelines" className="text-sm text-zinc-600 hover:text-blue-600 transition-colors dark:text-zinc-400 dark:hover:text-blue-400">
                  Author Guidelines
                </Link>
              </li>
              <li>
                <Link href="/page/ethics" className="text-sm text-zinc-600 hover:text-blue-600 transition-colors dark:text-zinc-400 dark:hover:text-blue-400">
                  Publication Ethics
                </Link>
              </li>
              <li>
                <Link href="/page/price" className="text-sm text-zinc-600 hover:text-blue-600 transition-colors dark:text-zinc-400 dark:hover:text-blue-400">
                  Article Processing Charges
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-zinc-200 dark:border-zinc-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            &copy; {new Date().getFullYear()} {publisher}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/admin" className="text-xs text-zinc-500 hover:text-zinc-900 transition-colors dark:text-zinc-400 dark:hover:text-zinc-100">
              Admin Login
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
