import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const email = 'admin@grubhub.com';
  const password = 'password123';
  const name = 'Super Admin';

  const existingUser = await prisma.user.findUnique({ where: { email } });

  if (existingUser) {
    console.log(`User ${email} found. Updating to ADMIN role...`);
    await prisma.user.update({
      where: { email },
      data: { role: 'ADMIN' }
    });
  } else {
    console.log(`Creating new ADMIN user ${email}...`);
    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: 'ADMIN'
      }
    });
  }
  console.log('Admin user ready.');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
