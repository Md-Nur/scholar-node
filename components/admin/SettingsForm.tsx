"use client";

import { Save } from "lucide-react";

interface SettingsFormProps {
  settings: Record<string, string>;
}

export default function SettingsForm({ settings }: SettingsFormProps) {
  const handleSubmit = () => {
    alert("Form submission wiring would go here!");
  };

  return (
    <form className="p-6 sm:p-8 space-y-8">
      {/* General Settings */}
      <section>
        <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-6 pb-2 border-b border-zinc-200 dark:border-zinc-800">
          General Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-bold text-zinc-700 dark:text-zinc-300">Journal Title</label>
            <input 
              type="text" 
              name="journal_title"
              defaultValue={settings.journal_title}
              className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 rounded-xl px-4 py-3 text-zinc-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" 
              data-setting-key="journal_title"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-bold text-zinc-700 dark:text-zinc-300">Abbreviation</label>
            <input 
              type="text" 
              defaultValue={settings.journal_abbreviation}
              className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 rounded-xl px-4 py-3 text-zinc-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" 
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-zinc-700 dark:text-zinc-300">ISSN</label>
            <input 
              type="text" 
              defaultValue={settings.issn}
              className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 rounded-xl px-4 py-3 text-zinc-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" 
            />
          </div>
          
           <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-bold text-zinc-700 dark:text-zinc-300">Description / Scope</label>
            <textarea 
              rows={4}
              defaultValue={settings.journal_description}
              className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 rounded-xl px-4 py-3 text-zinc-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" 
            />
          </div>
        </div>
      </section>

      {/* Contact Details */}
      <section>
        <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-6 pb-2 border-b border-zinc-200 dark:border-zinc-800">
          Publisher & Contact
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-zinc-700 dark:text-zinc-300">Publisher Name</label>
            <input 
              type="text" 
              defaultValue={settings.publisher}
              className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 rounded-xl px-4 py-3 text-zinc-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" 
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-bold text-zinc-700 dark:text-zinc-300">Contact Email</label>
            <input 
              type="email" 
              defaultValue={settings.contact_email}
              className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 rounded-xl px-4 py-3 text-zinc-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" 
            />
          </div>

           <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-bold text-zinc-700 dark:text-zinc-300">Publisher Address</label>
            <textarea 
              rows={3}
              defaultValue={settings.publisher_address}
              className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 rounded-xl px-4 py-3 text-zinc-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" 
            />
          </div>
        </div>
      </section>

      <div className="pt-6 border-t border-zinc-200 dark:border-zinc-800 flex justify-end">
        <button 
          type="button" 
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-bold transition-colors shadow-sm"
          onClick={handleSubmit}
        >
          <Save className="w-5 h-5" />
          Save Settings
        </button>
      </div>
    </form>
  );
}
