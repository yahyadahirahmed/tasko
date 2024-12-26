import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  await prisma.task.deleteMany();
  await prisma.user.deleteMany();

  // Create an admin user
  const adminPassword = await bcrypt.hash('bosh2', 10);
  const admin = await prisma.user.create({
    data: {
      username: 'boss2',
      email: 'boss2@boss.com',
      password: adminPassword,
      userType: 'ADMIN',
    },
  });

  // Create a team member
  const memberPassword = await bcrypt.hash('member123', 10);
  const member = await prisma.user.create({
    data: {
      username: 'member2',
      email: 'member2@example.com',
      password: memberPassword,
      userType: 'TEAM_MEMBER',
    },
  });

  // Create a task
  const task = await prisma.task.create({
    data: {
      text: 'Task 1',
      state: 'ToDo',
      assignedToId: member.id,
      createdById: admin.id,
      deadline: new Date('2023-12-31'),
    },
  });

  console.log({ admin, member, task });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });