"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Save, ArrowLeft, Loader2, MessageSquare } from "lucide-react";

export default function TestimonialForm({ action }: { action: (formData: FormData) => Promise<void> }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // We rely on standard FormData submission for simplicity, 
  // but capture the state to show loading.
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData(e.currentTarget);
      await action(formData);
    } catch (error) {
      console.error(error);
      alert("Failed to save testimonial");
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center gap-4">
        <Link 
          href="/admin/testimonials" 
          className="p-2 text-zinc-500 hover:text-zinc-900 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl transition-colors shadow-sm"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">
            Create New Testimonial
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Add feedback from an author or reviewer
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden">
          
          <div className="p-6 sm:p-8 space-y-6">
            <section className="space-y-6">
              <h2 className="text-lg font-bold text-zinc-900 dark:text-white flex items-center gap-2 border-b border-zinc-200 dark:border-zinc-800 pb-2">
                <MessageSquare className="w-5 h-5 text-orange-500" />
                Testimonial Details
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Name <span className="text-red-500">*</span></label>
                  <input 
                    type="text" 
                    name="name"
                    required
                    placeholder="Enter author's name"
                    className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 rounded-xl px-4 py-3 text-zinc-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all" 
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Role</label>
                  <input 
                    type="text" 
                    name="role"
                    placeholder="e.g. Lead Researcher, Reviewer"
                    className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 rounded-xl px-4 py-3 text-zinc-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all" 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Content <span className="text-red-500">*</span></label>
                <textarea 
                  name="content"
                  required
                  rows={4}
                  placeholder="Paste the testimonial content here..."
                  className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 rounded-xl px-4 py-3 text-zinc-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-y" 
                />
              </div>

              <div className="flex items-center gap-3 mt-4">
                <input 
                  type="checkbox" 
                  name="isActive"
                  id="isActive"
                  defaultChecked={true}
                  className="w-5 h-5 text-blue-600 rounded bg-zinc-50 border-zinc-300 focus:ring-blue-500" 
                />
                <label htmlFor="isActive" className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 border-none cursor-pointer">
                  Active (visible on the public site)
                </label>
              </div>

            </section>
          </div>

          <div className="p-6 bg-zinc-50 dark:bg-zinc-950/50 border-t border-zinc-200 dark:border-zinc-800 flex justify-end gap-3">
            <Link 
              href="/admin/testimonials"
              className="px-6 py-2.5 rounded-xl font-medium text-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
              Cancel
            </Link>
            <button 
              type="submit" 
              disabled={loading}
              className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-8 py-2.5 rounded-xl font-bold transition-colors shadow-sm disabled:opacity-70"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
              Save Testimonial
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
