import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
    // we can use createMany to create more than one user
    // data store list of obj
    const user = await prisma.user.findMany();
    console.log(user);
}
main()
  .catch((e) => {
    console.error(e.massage);
  }).finally(async () => {
    await prisma.$disconnect();
  });
export default prisma
