import prisma from "../lib/db";

async function main() {
  const page = await prisma.page.findUnique({
    where: { slug: 'reviewers' }
  });
  console.log('Reviewers Page:', page);
}

main().catch(console.error).finally(() => prisma.$disconnect());
