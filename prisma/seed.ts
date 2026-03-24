import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash("123456", 10);

  await prisma.user.createMany({
    data: [
      {
        
        email: "admin@test.com",
        password,
        role: Role.ADMIN
      },
      {
      
        email: "pm1@test.com",
        password,
        role: Role.PM
      },
      {
      
        email: "dev1@test.com",
        password,
        role: Role.DEV
      }
    ]
  });

  console.log("Seed data inserted ");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());