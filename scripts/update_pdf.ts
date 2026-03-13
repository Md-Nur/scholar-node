import prisma from '../lib/db';

async function main() {
  const articles = await prisma.article.findMany();
  
  for (const article of articles) {
    if (!article.pdfUrl || article.pdfUrl === "/dummy.pdf") {
      await prisma.article.update({
        where: { id: article.id },
        data: { pdfUrl: "/pdfs/sample-article.pdf" }
      });
      console.log(`Updated article: ${article.title}`);
    }
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
