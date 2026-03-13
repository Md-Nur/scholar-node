"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Info, 
  Users, 
  Target, 
  RefreshCcw, 
  BookOpen, 
  Database, 
  ShieldCheck, 
  FileText,
  Mail,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const menuItems = [
    { name: "About the Journal", href: "/about", icon: Info },
    { name: "Editorial Team", href: "/about/editorial-team", icon: Users },
    { name: "Focus and Scope", href: "/about/focus-and-scope", icon: Target },
    { name: "Peer Review Process", href: "/about/peer-review", icon: RefreshCcw },
    { name: "Publication Frequency", href: "/about/publication-frequency", icon: BookOpen },
    { name: "Open Access Policy", href: "/about/open-access", icon: ShieldCheck },
    { name: "Archiving", href: "/about/archiving", icon: Database },
    { name: "Publication Ethics", href: "/about/publication-ethics", icon: FileText },
    { name: "Author Guidelines", href: "/about/author-guidelines", icon: BookOpen },
    { name: "Contact", href: "/about/contact", icon: Mail },
  ];

  return (
    <div className="bg-white dark:bg-zinc-950 min-h-screen">
      {/* Page Header */}
      <div className="bg-zinc-50 dark:bg-zinc-900/50 border-b border-zinc-200 dark:border-zinc-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-7xl">
           <nav className="flex items-center gap-2 text-sm font-medium text-zinc-500 uppercase tracking-widest mb-4">
              <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-zinc-900 dark:text-zinc-100">About the Journal</span>
           </nav>
           <h1 className="text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">Asian Journal of Education and Social Studies</h1>
        </div>
      </div>

      <div className="container mx-auto px-0 sm:px-6 lg:px-8 py-6 lg:py-10 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
          
          {/* Sidebar Navigation */}
          <aside className="lg:col-span-3 lg:sticky lg:top-28">
            <nav className="space-y-1.5">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-semibold transition-all group border shadow-sm",
                      isActive 
                        ? "bg-blue-600 border-blue-600 text-white shadow-blue-500/20" 
                        : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:border-blue-500/50 hover:bg-zinc-50 dark:hover:bg-zinc-800/80"
                    )}
                  >
                    <Icon className={cn("w-4 h-4 transition-colors", isActive ? "text-white" : "text-zinc-400 group-hover:text-blue-600")} />
                    <span className="flex-1">{item.name}</span>
                    {isActive && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </Link>
                );
              })}
            </nav>
          </aside>
          {/* Main Content Area */}
          <main className="lg:col-span-9">
            <div className="bg-white dark:bg-zinc-900/40 rounded-none sm:rounded-3xl border-y sm:border border-zinc-200 dark:border-zinc-800 p-5 sm:p-8 lg:p-12 shadow-sm relative overflow-hidden">
               <div className="relative z-10 w-full">
                  {children}
               </div>
            </div>
            
            <footer className="mt-8 text-center text-xs text-zinc-400 dark:text-zinc-600">
               &copy; {new Date().getFullYear()} Asian Journal of Education and Social Studies. International Peer-Reviewed Journal.
            </footer>
          </main>
        </div>
      </div>
    </div>
  );
}
