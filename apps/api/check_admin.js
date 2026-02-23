const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function check() {
  const admin = await prisma.user.findUnique({ where: { email: 'admin@grubhub.com' } });
  console.log('Admin user found:', admin !== null);
  if (admin) {
    console.log('Admin Email:', admin.email);
    console.log('Admin Role:', admin.role);
    const isMatch = await bcrypt.compare('password', admin.password);
    console.log('Password match:', isMatch);
  }
}

check().catch(console.error).finally(() => prisma.$disconnect());
