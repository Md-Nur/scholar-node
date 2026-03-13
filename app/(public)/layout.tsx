import { getJournalSettings } from "@/lib/settings";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getJournalSettings();
  
  return {
    title: {
      template: `%s | ${settings.journal_abbreviation || "Journal"}`,
      default: settings.journal_title || "Academic Journal",
    },
    description: settings.journal_description?.substring(0, 160) || "An academic journal",
  };
}

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getJournalSettings();

  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-zinc-950 selection:bg-blue-100 dark:selection:bg-blue-900/30 selection:text-blue-900 dark:selection:text-blue-100">
      <Header settings={settings} />
      <main className="flex-1">{children}</main>
      <Footer settings={settings} />
    </div>
  );
}
