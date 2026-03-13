import prisma from "@/lib/db";
import { MessageSquareQuote } from "lucide-react";

export const revalidate = 3600;

export default async function TestimonialsPage() {
  const testimonials = await prisma.testimonial.findMany({
    where: { isActive: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="bg-white dark:bg-zinc-950 py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <header className="mb-16 text-center">
          <div className="inline-flex items-center justify-center p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-2xl mb-6">
            <MessageSquareQuote className="w-8 h-8" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-6">
            Author Testimonials
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            Read what authors and reviewers have to say about their experience publishing with our journal.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map(testimonial => (
            <div key={testimonial.id} className="bg-zinc-50 dark:bg-zinc-900/50 p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 relative">
              <MessageSquareQuote className="absolute top-6 right-6 w-8 h-8 text-zinc-200 dark:text-zinc-800" />
              <p className="text-zinc-700 dark:text-zinc-300 italic mb-8 relative z-10 text-lg leading-relaxed">
                "{testimonial.content}"
              </p>
              <div className="flex items-center gap-4 border-t border-zinc-200 dark:border-zinc-800 pt-6">
                <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-700 dark:text-blue-400 font-bold text-lg flex-shrink-0">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-zinc-900 dark:text-white leading-tight">
                    {testimonial.name}
                  </h3>
                  {testimonial.role && (
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                      {testimonial.role}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
