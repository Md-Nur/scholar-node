import prisma from "@/lib/db";
import Image from "next/image";
import { BookMarked, ExternalLink } from "lucide-react";

export const revalidate = 3600;

export default async function IndexingPage() {
  const indexings = await prisma.indexing.findMany({
    orderBy: { order: "asc" },
  });

  return (
    <div className="bg-white dark:bg-zinc-950 py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <header className="mb-16 text-center">
          <div className="inline-flex items-center justify-center p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-2xl mb-6">
            <BookMarked className="w-8 h-8" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-6">
            Abstracting & Indexing
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            Our journal is proudly abstracted and indexed in the following recognized academic databases and search engines, ensuring maximum visibility for published research.
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {indexings.map(indexing => (
            <a 
              key={indexing.id}
              href={indexing.url || "#"} 
              target={indexing.url ? "_blank" : "_self"}
              rel="noopener noreferrer"
              className="group flex flex-col items-center justify-center p-8 bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl border border-zinc-200 dark:border-zinc-800 hover:border-blue-500 hover:shadow-lg dark:hover:shadow-blue-900/20 transition-all text-center h-48"
            >
              {indexing.logoUrl ? (
                <div className="relative w-32 h-16 mb-4 filter grayscale group-hover:grayscale-0 transition-all">
                  <Image src={indexing.logoUrl} alt={indexing.name} fill className="object-contain" />
                </div>
              ) : (
                <div className="w-16 h-16 bg-zinc-200 dark:bg-zinc-800 rounded-full flex items-center justify-center mb-4 text-2xl font-bold text-zinc-500 group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
                  {indexing.name.charAt(0)}
                </div>
              )}
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 flex items-center justify-center gap-2">
                {indexing.name}
                {indexing.url && <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />}
              </h3>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
