'use server'
const prisma = require("./db");
// const { syst } =  require("@prisma/client/sql");


export async function syncUser(clerkUser) {
  const { id, firstName, lastName, emailAddresses } = JSON.parse(clerkUser);

  // Extract primary email
  console.log(id);
  console.log(JSON.stringify(emailAddresses))
  const email = emailAddresses[0].emailAddress;
  // Upsert user data into the database
  await prisma.user.upsert({
    where: { id },
    update: {
      name: `${firstName} ${lastName}`,
      email,
    },
    create: {
      id,
      name: `${firstName} ${lastName}`,
      email,
    },
  });
}