import prisma from "@/lib/db";
import Link from "next/link";
import { Send, FileText, CheckCircle2, ArrowRight, Download } from "lucide-react";
import { getJournalSettings } from "@/lib/settings";

export const revalidate = 3600;

export default async function SubmissionsPage() {
  const settings = await getJournalSettings();
  const submissionEmail = settings.contact_email || "editor@journal.com";

  return (
    <div className="bg-white dark:bg-zinc-950 py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <header className="mb-16 text-center">
          <div className="inline-flex items-center justify-center p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-2xl mb-6">
            <Send className="w-8 h-8" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-6">
            Submit Your Manuscript
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            Ready to publish your research? Our streamlined submission process ensures that your manuscript is handled efficiently and securely.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Submission Instructions */}
          <div className="space-y-8">
            <section className="bg-zinc-50 dark:bg-zinc-900/50 rounded-3xl p-8 border border-zinc-200 dark:border-zinc-800">
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6 flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white text-sm">1</span>
                Prepare Your Manuscript
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 mb-6 leading-relaxed">
                Before submitting, please ensure your manuscript adheres to our author guidelines, formatting rules, and ethical standards.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  <span className="text-sm text-zinc-700 dark:text-zinc-300">Format text according to journal style</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  <span className="text-sm text-zinc-700 dark:text-zinc-300">Include all author affiliations and ORCID iDs</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  <span className="text-sm text-zinc-700 dark:text-zinc-300">Prepare high-resolution figures</span>
                </li>
              </ul>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/page/guidelines" className="inline-flex items-center justify-center gap-2 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-700 px-6 py-2.5 rounded-lg font-medium transition-colors text-sm">
                  <FileText className="w-4 h-4" /> Author Guidelines
                </Link>
                <Link href="/page/ethics" className="inline-flex items-center justify-center gap-2 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-700 px-6 py-2.5 rounded-lg font-medium transition-colors text-sm">
                  <FileText className="w-4 h-4" /> Publication Ethics
                </Link>
              </div>
            </section>

            <section className="bg-zinc-50 dark:bg-zinc-900/50 rounded-3xl p-8 border border-zinc-200 dark:border-zinc-800">
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6 flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white text-sm">2</span>
                Submit via Email
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 mb-6 leading-relaxed">
                Currently, we are accepting manuscripts via email. Please attach your manuscript (Word or PDF format) along with a cover letter.
              </p>
              
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-100 dark:border-blue-800 mb-6">
                <div className="text-sm text-blue-600 dark:text-blue-400 font-semibold uppercase tracking-wider mb-1">Editor-in-Chief</div>
                <div className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-white mb-4 select-all">
                  {submissionEmail}
                </div>
                <a 
                  href={`mailto:${submissionEmail}?subject=New Manuscript Submission - [Your Name]`}
                  className="inline-flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors shadow-sm"
                >
                  <Send className="w-4 h-4" /> Send Email Now
                </a>
              </div>
            </section>
          </div>

          {/* Right Column - Info Cards */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-zinc-950 rounded-2xl p-6 border border-zinc-200 dark:border-zinc-800 shadow-sm">
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-4">Article Processing Charges (APC)</h3>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed mb-4">
                As an open-access journal, publishing costs are covered through APCs upon acceptance. There are no submission fees.
              </p>
              <Link href="/page/price" className="text-blue-600 dark:text-blue-400 font-medium text-sm flex items-center gap-1 hover:underline">
                View detailed pricing <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="bg-white dark:bg-zinc-950 rounded-2xl p-6 border border-zinc-200 dark:border-zinc-800 shadow-sm">
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-4">Review Process</h3>
              <ul className="space-y-4 relative before:absolute before:inset-y-2 before:left-[11px] before:w-0.5 before:bg-zinc-200 dark:before:bg-zinc-800">
                <li className="relative flex gap-4">
                  <div className="w-6 h-6 rounded-full bg-white dark:bg-zinc-950 border-4 border-blue-500 shrink-0 relative z-10" />
                  <div>
                    <strong className="block text-zinc-900 dark:text-white text-sm">Initial Desk Review</strong>
                    <span className="text-xs text-zinc-500 dark:text-zinc-400">1-3 Days</span>
                  </div>
                </li>
                <li className="relative flex gap-4">
                   <div className="w-6 h-6 rounded-full bg-white dark:bg-zinc-950 border-4 border-zinc-300 dark:border-zinc-700 shrink-0 relative z-10" />
                  <div>
                    <strong className="block text-zinc-900 dark:text-white text-sm">Double-Blind Peer Review</strong>
                    <span className="text-xs text-zinc-500 dark:text-zinc-400">3-5 Weeks</span>
                  </div>
                </li>
                <li className="relative flex gap-4">
                   <div className="w-6 h-6 rounded-full bg-white dark:bg-zinc-950 border-4 border-zinc-300 dark:border-zinc-700 shrink-0 relative z-10" />
                  <div>
                    <strong className="block text-zinc-900 dark:text-white text-sm">Editorial Decision</strong>
                    <span className="text-xs text-zinc-500 dark:text-zinc-400">1 Week</span>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="bg-zinc-900 dark:bg-blue-900/20 rounded-2xl p-6 border border-zinc-800 dark:border-blue-800/50 text-white dark:text-zinc-100 shadow-lg">
              <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-400" /> Paper Templates
              </h3>
              <p className="text-zinc-300 dark:text-zinc-400 text-sm mb-4 leading-relaxed">
                Download our official formatting templates to ensure your manuscript meets all layout requirements.
              </p>
              <div className="flex flex-col gap-3">
                <a 
                  href="/templates/manuscript-template.zip" 
                  className="flex items-center justify-between w-full bg-white/10 hover:bg-white/20 px-4 py-2.5 rounded-lg border border-white/10 transition-colors text-sm font-medium"
                >
                  MS Word Template <Download className="w-4 h-4 ml-2 opacity-70" />
                </a>
                <a 
                  href="/templates/manuscript-template.zip" 
                  className="flex items-center justify-between w-full bg-white/10 hover:bg-white/20 px-4 py-2.5 rounded-lg border border-white/10 transition-colors text-sm font-medium"
                >
                  LaTeX Template <Download className="w-4 h-4 ml-2 opacity-70" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
