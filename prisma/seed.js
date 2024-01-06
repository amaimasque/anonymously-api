const prisma = require('../utils/databaseClient');
const {hashPassword} = require('../utils/encryption');

async function main() {
  const DeviantShady = await prisma.user.create({
    data: {
      id: 1,
      username: 'DeviantShady',
      dateOfBirth: '12/13/1978',
      password: await hashPassword("Password123"),
    },
  });
  const MadMoose = await prisma.user.create({
    data: {
      id: 2,
      username: 'MadMoose',
      dateOfBirth: '05/12/1989',
      password: await hashPassword("Password123"),
    },
  });
  console.log({ DeviantShady, MadMoose })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })