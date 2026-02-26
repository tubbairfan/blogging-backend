import { prisma } from "../src/lib/prisma.js";
import bcrypt from "bcrypt";

async function main() {
  const password = await bcrypt.hash("admin123", 10); 
  const existingAdmin = await prisma.user.findUnique({ where: { email: "admin@site.com" } });
  if (!existingAdmin) {
    await prisma.user.create({
      data: {
        name: "Admin",
        email: "admin@site.com",
        password: password,
        role: "ADMIN",
        isVerified: true, 
      },
    });
    console.log("Admin seeded successfully");
  } else {
    if (existingAdmin.role !== "ADMIN") {
      await prisma.user.update({
        where: { id: existingAdmin.id },
        data: { role: "ADMIN" },
      });
    }
    console.log("Admin already exists");
  }
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
