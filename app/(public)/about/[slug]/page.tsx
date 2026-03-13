import { notFound } from "next/navigation";
import { 
  Target, 
  RefreshCcw, 
  BookOpen, 
  ShieldCheck, 
  Database, 
  FileText, 
  Mail 
} from "lucide-react";

export default async function AboutChildPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const contentMap: Record<string, { title: string; icon: any; content: React.ReactNode }> = {
    "focus-and-scope": {
      title: "Focus and Scope",
      icon: Target,
      content: (
        <div className="space-y-6">
          <p>
            Asian Journal of Education and Social Studies (AJESS) aims to publish high-quality papers in all areas of Education and Social Sciences. 
            The journal facilitates research by not excluding papers based on novelty. It aims to publish any paper that is technically correct 
            and scientifically motivated, including reports of negative results.
          </p>
          <p>
            Areas of interest include, but are not limited to:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Modern Education and Arts</li>
            <li>Instructional Design and Technology</li>
            <li>Vocational Education</li>
            <li>Distance Education</li>
            <li>Sociology and Psychology</li>
            <li>International Relations and Social Policy</li>
            <li>Cultural Studies and Anthropology</li>
          </ul>
        </div>
      ),
    },
    "peer-review": {
      title: "Peer Review Process",
      icon: RefreshCcw,
      content: (
        <div className="space-y-6">
          <p>
            AJESS utilizes an <strong>Advanced OPEN peer review</strong> model. This quality-controlled process ensures transparency and rigorous academic standards.
          </p>
          <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-2xl border border-blue-100 dark:border-blue-800">
            <h4 className="text-blue-900 dark:text-blue-100 font-bold mb-2">Transparency and Integrity</h4>
            <p className="text-sm text-blue-800 dark:text-blue-300">
              In this model, the names of the reviewers are available along with the reviewer reports after the final acceptance of the manuscript. 
              This promotes accountability and high quality among reviewers.
            </p>
          </div>
        </div>
      ),
    },
    "publication-frequency": {
      title: "Publication Frequency",
      icon: BookOpen,
      content: (
        <div className="space-y-6">
          <p>
            AJESS operates on a <strong>continuous publication basis</strong>. 
            This means that as soon as a paper is ready for publication, it is immediately published online and assigned to an issue.
          </p>
          <p>
            The journal aims to publish at least two volumes per year, with multiple issues per volume, depending on the volume of accepted submissions.
          </p>
        </div>
      ),
    },
    "open-access": {
      title: "Open Access Policy",
      icon: ShieldCheck,
      content: (
        <div className="space-y-6">
          <p>
            Asian Journal of Education and Social Studies (AJESS) is an open-access journal which means that all content is freely 
            available without charge to the user or his/her institution. 
          </p>
          <p>
            Users are allowed to read, download, copy, distribute, print, search, or link to the full texts of the articles, or use 
            them for any other lawful purpose, without asking prior permission from the publisher or the author. This is in accordance 
            with the BOAI definition of open access.
          </p>
        </div>
      ),
    },
    "archiving": {
      title: "Archiving",
      icon: Database,
      content: (
        <div className="space-y-6">
          <p>
            All papers published by AJESS are digitally preserved to ensure long-term accessibility.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-zinc-50 dark:bg-zinc-800 p-4 rounded-xl text-center border border-zinc-100 dark:border-zinc-800">
              <span className="font-bold">LOCKSS</span>
            </div>
            <div className="bg-zinc-50 dark:bg-zinc-800 p-4 rounded-xl text-center border border-zinc-100 dark:border-zinc-800">
              <span className="font-bold">CLOCKSS</span>
            </div>
            <div className="bg-zinc-50 dark:bg-zinc-800 p-4 rounded-xl text-center border border-zinc-100 dark:border-zinc-800">
              <span className="font-bold">JR (Repository)</span>
            </div>
          </div>
        </div>
      ),
    },
    "publication-ethics": {
      title: "Publication Ethics",
      icon: FileText,
      content: (
        <div className="space-y-6">
          <p>
            AJESS follows the highest standards of publication ethics. We adhere to the guidelines provided by the 
            Committee on Publication Ethics (COPE).
          </p>
          <h4 className="font-bold">Author Responsibilities</h4>
          <ul className="list-disc pl-6 space-y-2 text-sm">
            <li>Ensuring the originality of the work.</li>
            <li>Providing accurate data and results.</li>
            <li>Declaring any conflicts of interest.</li>
            <li>Properly citing all sources and contributions.</li>
          </ul>
        </div>
      ),
    },
    "author-guidelines": {
      title: "Author Guidelines",
      icon: BookOpen,
      content: (
        <div className="space-y-6">
          <p>
            Asian Journal of Education and Social Studies (AJESS) welcomes original research articles, review articles, and short communications. 
          </p>
          <h4 className="font-bold">Manuscript Preparation</h4>
          <ul className="list-disc pl-6 space-y-2 text-sm">
            <li><strong>Language:</strong> All manuscripts must be in English.</li>
            <li><strong>Format:</strong> MS Word is the preferred format.</li>
            <li><strong>Title Page:</strong> Should include the title, author names, affiliations, and contact info.</li>
            <li><strong>Abstract:</strong> A concise summary of 200-250 words.</li>
            <li><strong>Keywords:</strong> 4-6 keywords for indexing.</li>
          </ul>
          <div className="bg-zinc-50 dark:bg-zinc-800 p-6 rounded-2xl border border-zinc-100 dark:border-zinc-800 italic text-sm">
            "We aim to provide a rapid but rigorous peer-review process to ensure timely publication of high-quality research."
          </div>
        </div>
      ),
    },
    "contact": {
      title: "Contact",
      icon: Mail,
      content: (
        <div className="space-y-6">
          <p>
            For any inquiries related to the journal, please contact our editorial office:
          </p>
          <div className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-8">
            <h4 className="font-bold text-zinc-900 dark:text-white mb-4">Editorial Office</h4>
            <div className="space-y-4 text-zinc-600 dark:text-zinc-400">
              <div>
                <span className="block font-semibold text-zinc-900 dark:text-white">Email</span>
                <a href="mailto:editor@journalajess.com" className="hover:text-blue-600 transition-colors">editor@journalajess.com</a>
              </div>
              <div>
                <span className="block font-semibold text-zinc-900 dark:text-white">Website</span>
                <a href="https://journalajess.com" target="_blank" className="hover:text-blue-600 transition-colors underline">journalajess.com</a>
              </div>
              <div>
                <span className="block font-semibold text-zinc-900 dark:text-white">Publisher</span>
                <span>Sciencedomain International</span>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  };

  const pageItem = contentMap[slug];

  if (!pageItem) {
    notFound();
  }

  const Icon = pageItem.icon;

  return (
    <div className="prose prose-zinc dark:prose-invert max-w-none">
      <header className="mb-12 not-prose">
        <div className="inline-flex items-center justify-center p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-2xl mb-6">
          <Icon className="w-8 h-8" />
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-zinc-900 dark:text-white tracking-tight mb-4">
          {pageItem.title}
        </h1>
      </header>
      <div className="text-zinc-600 dark:text-zinc-400 text-lg leading-relaxed">
        {pageItem.content}
      </div>
    </div>
  );
}
