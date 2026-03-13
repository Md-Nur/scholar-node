import prisma from "@/lib/db";
import { Settings } from "lucide-react";
import SettingsForm from "@/components/admin/SettingsForm";

export const revalidate = 0;

export default async function AdminSettingsPage() {
  const settingsRecords = await prisma.journalSetting.findMany();
  
  // Convert array to key-value object
  const settings = settingsRecords.reduce((acc, current) => {
    acc[current.key] = current.value;
    return acc;
  }, {} as Record<string, string>);

  return (
    <div className="space-y-8 max-w-4xl max-w-4xl">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2 flex items-center gap-3">
            <Settings className="w-8 h-8 text-blue-500" />
            Journal Settings
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400">Manage global configuration for the journal website.</p>
        </div>
      </div>

      <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden">
        <SettingsForm settings={settings} />
      </div>
    </div>
  );
}
