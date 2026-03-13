import { prisma } from '../lib/db';

async function main() {
  const indexings = await prisma.indexing.findMany({
    orderBy: { order: "asc" },
  });
  console.log(JSON.stringify(indexings, null, 2));
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
