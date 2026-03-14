import Image from "next/image";
import Link from "next/link";
import { Search, Menu } from "lucide-react";

export default function Header({ settings }: { settings: Record<string, string> }) {
  const journalTitle = "Scholar Node";
  const abbreviation = settings["journal_abbreviation"] || "SN";
  const issn = settings["issn"] || "";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-white shadow-sm transition-all dark:border-zinc-800 dark:bg-zinc-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 sm:h-20 items-center justify-between">
          <div className="flex flex-1 items-center justify-start">
            <Link href="/" className="flex items-center gap-3 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg group">
              <div className="relative h-10 w-10 sm:h-12 sm:w-12 overflow-hidden rounded-lg">
                <Image
                  src="/logo.png"
                  alt="Scholar Node Logo"
                  fill
                  className="object-contain transition-transform group-hover:scale-105"
                  priority
                />
              </div>
              <div className="flex flex-col items-start translate-y-[1px]">
                <span className="text-lg sm:text-xl font-bold tracking-tight text-zinc-900 group-hover:text-blue-600 transition-colors dark:text-zinc-100 dark:group-hover:text-blue-400 leading-tight">
                  {journalTitle}
                </span>
                {issn && (
                  <span className="text-[10px] sm:text-xs font-medium text-zinc-500 dark:text-zinc-400">
                    ISSN: {issn}
                  </span>
                )}
              </div>
            </Link>
          </div>

          <div className="hidden flex-1 items-center justify-center md:flex">
            <nav className="flex items-center space-x-6">
              <Link href="/about" className="text-sm font-medium text-zinc-600 hover:text-blue-600 transition-colors dark:text-zinc-300 dark:hover:text-blue-400">
                About
              </Link>
              <Link href="/archives" className="text-sm font-medium text-zinc-600 hover:text-blue-600 transition-colors dark:text-zinc-300 dark:hover:text-blue-400">
                Archives
              </Link>
              <Link href="/announcements" className="text-sm font-medium text-zinc-600 hover:text-blue-600 transition-colors dark:text-zinc-300 dark:hover:text-blue-400">
                Announcements
              </Link>
              <Link href="/submissions" className="text-sm font-medium text-zinc-600 hover:text-blue-600 transition-colors dark:text-zinc-300 dark:hover:text-blue-400">
                Submission
              </Link>
              <Link href="/indexing" className="text-sm font-medium text-zinc-600 hover:text-blue-600 transition-colors dark:text-zinc-300 dark:hover:text-blue-400">
                Indexing
              </Link>
            </nav>
          </div>

          <div className="flex flex-1 items-center justify-end gap-4">
            <Link 
              href="/search" 
              className="p-2 text-zinc-500 hover:text-blue-600 hover:bg-zinc-100 rounded-full transition-all dark:text-zinc-400 dark:hover:text-blue-400 dark:hover:bg-zinc-800"
              aria-label="Search articles"
            >
              <Search className="h-5 w-5" />
            </Link>
            
            <button 
              className="md:hidden p-2 text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 rounded-md transition-all dark:text-zinc-400 dark:hover:text-zinc-100 dark:hover:bg-zinc-800"
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
