const {prisma} = require("../lib/prisma");
require("dotenv").config({path: "../.env"});
const bcryptjs = require('bcryptjs');

async function main() {
    const hashedPassword = await bcryptjs.hash(process.env.MY_PASSWORD, 11)
    const user = await prisma.user.create({
        data: {
        username: "Jared",
        password: hashedPassword,
        },
    });

    console.log('User Created', user);
}


main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
});