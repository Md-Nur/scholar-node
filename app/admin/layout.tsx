"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  FileText, Users, FolderOpen, Settings, Home, LogOut, 
  BookMarked, Megaphone, CheckSquare, LayoutDashboard, Database
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch (e) {
      console.error("Logout failed", e);
    }
  };

  const menuItems = [
    { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { label: "Articles", href: "/admin/articles", icon: FileText },
    { label: "Volumes & Issues", href: "/admin/issues", icon: FolderOpen },
    { label: "Editorial Board", href: "/admin/editors", icon: Users },
    { label: "Pages & Content", href: "/admin/pages", icon: BookMarked },
    { label: "Announcements", href: "/admin/announcements", icon: Megaphone },
    { label: "Testimonials", href: "/admin/testimonials", icon: CheckSquare },
    { label: "Journal Settings", href: "/admin/settings", icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-zinc-100 dark:bg-zinc-950">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 flex flex-col h-full hidden md:flex">
        <div className="h-16 flex items-center px-6 border-b border-zinc-200 dark:border-zinc-800">
          <Link href="/admin/dashboard" className="flex items-center gap-2 font-bold text-xl text-zinc-900 dark:text-white">
            <Database className="w-5 h-5 text-blue-600" />
            Scholar CMS
          </Link>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
            const Icon = item.icon;
            
            return (
              <Link 
                key={item.href} 
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-colors ${
                  isActive 
                    ? "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" 
                    : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-50"
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? "" : "text-zinc-400"}`} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-zinc-200 dark:border-zinc-800">
          <Link 
            href="/" 
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800 transition-colors w-full mb-1"
            target="_blank"
          >
            <Home className="w-5 h-5 text-zinc-400" />
            View Website
          </Link>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 transition-colors w-full text-left"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile Header */}
        <header className="md:hidden h-16 flex items-center justify-between px-4 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800">
           <Link href="/admin/dashboard" className="font-bold text-lg text-zinc-900 dark:text-white">
            Scholar CMS
          </Link>
          <button className="p-2 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100">
            {/* Mobile menu toggle would go here */}
            Menu
          </button>
        </header>

        <div className="flex-1 overflow-auto bg-zinc-50 dark:bg-zinc-950 p-4 md:p-8">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
