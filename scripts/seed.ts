import { PrismaClient, UserType } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.task.deleteMany();
  await prisma.user.deleteMany();

  // Create an admin user
  const adminPassword = await bcrypt.hash('bosh', 10);
  const admin = await prisma.user.create({
    data: {
      username: 'boss',
      email: 'boss@boss.com',
      password: adminPassword,
      userType: UserType.ADMIN,
    },
  });

//   // Create a manager
//   const managerPassword = await bcrypt.hash('manager123', 10);
//   const manager = await prisma.user.create({
//     data: {
//       username: 'manager',
//       email: 'manager@example.com',
//       password: managerPassword,
//       userType: UserType.TEAM_MANAGER,
//     },
//   });

//   // Create a team member
//   const memberPassword = await bcrypt.hash('member123', 10);
//   const member = await prisma.user.create({
//     data: {
//       username: 'member',
//       email: 'member@example.com',
//       password: memberPassword,
//       userType: UserType.TEAM_MEMBER,
//       managerId: manager.id, // Assign the manager to this team member
//     },
//   });

  console.log('Created users:', {
    admin: {
      username: admin.username,
      id: admin.id,
      type: admin.userType
    },
    // manager: {
    //   username: manager.username,
    //   id: manager.id,
    //   type: manager.userType
    // },
    // member: {
    //   username: member.username,
    //   id: member.id,
    //   type: member.userType
    // }
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 