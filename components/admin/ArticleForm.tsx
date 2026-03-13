"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Save, ArrowLeft, Loader2, FileText, Calendar, Link as LinkIcon } from "lucide-react";

export default function ArticleForm({ article, issues }: { article?: any, issues: any[] }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const isEditing = !!article?.id;

  const [formData, setFormData] = useState({
    title: article?.title || "",
    abstract: article?.abstract || "",
    keywords: article?.keywords?.join(", ") || "",
    doi: article?.doi || "",
    articleType: article?.articleType || "Research Article",
    pdfUrl: article?.pdfUrl || "",
    issueId: article?.issueId || "",
    pageStart: article?.pageStart || "",
    pageEnd: article?.pageEnd || "",
    publishedAt: article?.publishedAt ? new Date(article.publishedAt).toISOString().split('T')[0] : "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const url = isEditing ? `/api/articles/${article.id}` : "/api/articles";
      const method = isEditing ? "PATCH" : "POST";
      
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          keywords: formData.keywords.split(",").map((k: string) => k.trim()).filter((k: string) => k),
          pageStart: formData.pageStart ? parseInt(formData.pageStart as string) : null,
          pageEnd: formData.pageEnd ? parseInt(formData.pageEnd as string) : null,
          publishedAt: formData.publishedAt ? new Date(formData.publishedAt).toISOString() : null,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save article");
      }

      alert(isEditing ? "Article updated successfully!" : "Article created successfully!");
      router.push("/admin/articles");
      router.refresh();
    } catch (error) {
      console.error("Error saving article:", error);
      alert("Error saving article. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center gap-4">
        <Link 
          href="/admin/articles" 
          className="p-2 text-zinc-500 hover:text-zinc-900 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl transition-colors shadow-sm"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">
            {isEditing ? "Edit Article" : "Create New Article"}
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            {isEditing ? "Update publication details" : "Add a new manuscript to the journal"}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden">
          
          <div className="p-6 sm:p-8 space-y-6">
            {/* Core Info */}
            <section className="space-y-6">
              <h2 className="text-lg font-bold text-zinc-900 dark:text-white flex items-center gap-2 border-b border-zinc-200 dark:border-zinc-800 pb-2">
                <FileText className="w-5 h-5 text-blue-500" />
                Metadata
              </h2>
              
              <div className="space-y-2">
                <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Article Title <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter full article title"
                  className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 rounded-xl px-4 py-3 text-zinc-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all" 
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Abstract <span className="text-red-500">*</span></label>
                <textarea 
                  name="abstract"
                  required
                  rows={6}
                  value={formData.abstract}
                  onChange={handleChange}
                  placeholder="Paste abstract here..."
                  className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 rounded-xl px-4 py-3 text-zinc-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-y" 
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Keywords</label>
                  <input 
                    type="text" 
                    name="keywords"
                    value={formData.keywords}
                    onChange={handleChange}
                    placeholder="Comma separated (e.g. Nextjs, React, Data)"
                    className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 rounded-xl px-4 py-3 text-zinc-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all" 
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Article Type</label>
                  <select
                    name="articleType"
                    value={formData.articleType}
                    onChange={handleChange}
                    className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 rounded-xl px-4 py-3 text-zinc-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all appearance-none"
                  >
                    <option value="Research Article">Research Article</option>
                    <option value="Review Article">Review Article</option>
                    <option value="Case Study">Case Study</option>
                    <option value="Editorial">Editorial</option>
                    <option value="Short Communication">Short Communication</option>
                  </select>
                </div>
              </div>
            </section>

            {/* Publication details */}
            <section className="space-y-6 pt-6 mt-6 border-t border-zinc-200 dark:border-zinc-800">
               <h2 className="text-lg font-bold text-zinc-900 dark:text-white flex items-center gap-2 border-b border-zinc-200 dark:border-zinc-800 pb-2">
                <Calendar className="w-5 h-5 text-emerald-500" />
                Publication
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Assign to Issue</label>
                  <select
                    name="issueId"
                    value={formData.issueId}
                    onChange={handleChange}
                    className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 rounded-xl px-4 py-3 text-zinc-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all appearance-none"
                  >
                    <option value="">-- Select Issue --</option>
                    {issues.map(i => (
                      <option key={i.id} value={i.id}>
                        Vol. {i.volume.number} Iss. {i.number}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Published Date</label>
                  <input 
                    type="date" 
                    name="publishedAt"
                    value={formData.publishedAt}
                    onChange={handleChange}
                    className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 rounded-xl px-4 py-3 text-zinc-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all" 
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">DOI</label>
                  <div className="relative">
                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <LinkIcon className="h-4 w-4 text-zinc-400" />
                    </div>
                    <input 
                      type="text" 
                      name="doi"
                      value={formData.doi}
                      onChange={handleChange}
                      placeholder="e.g. 10.1234/journal.abs"
                      className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 rounded-xl pl-10 pr-4 py-3 text-zinc-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm" 
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">PDF URL</label>
                  <div className="relative">
                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FileText className="h-4 w-4 text-zinc-400" />
                    </div>
                    <input 
                      type="text" 
                      name="pdfUrl"
                      value={formData.pdfUrl}
                      onChange={handleChange}
                      placeholder="e.g. /pdfs/sample-article.pdf"
                      className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 rounded-xl pl-10 pr-4 py-3 text-zinc-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm" 
                    />
                  </div>
                </div>
              </div>

               <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Start Page</label>
                  <input 
                    type="number" 
                    name="pageStart"
                    value={formData.pageStart}
                    onChange={handleChange}
                    className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 rounded-xl px-4 py-2.5 text-zinc-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">End Page</label>
                  <input 
                    type="number" 
                    name="pageEnd"
                    value={formData.pageEnd}
                    onChange={handleChange}
                    className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 rounded-xl px-4 py-2.5 text-zinc-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all" 
                  />
                </div>
              </div>
            </section>
          </div>

          <div className="p-6 bg-zinc-50 dark:bg-zinc-950/50 border-t border-zinc-200 dark:border-zinc-800 flex justify-end gap-3">
            <Link 
              href="/admin/articles"
              className="px-6 py-2.5 rounded-xl font-medium text-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
              Cancel
            </Link>
            <button 
              type="submit" 
              disabled={loading}
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-2.5 rounded-xl font-bold transition-colors shadow-sm disabled:opacity-70"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
              {isEditing ? "Update Article" : "Save Article"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
