import 'dotenv/config';
import prisma from "../lib/db.js";

async function main() {
  const page = await prisma.page.findUnique({
    where: { slug: 'reviewers' }
  });
  console.log('Reviewers Page from DB:', page);
}

main().catch(console.error).finally(() => prisma.$disconnect());
