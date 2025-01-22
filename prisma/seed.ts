import { prisma } from '../app/lib/prisma';
import bcrypt from 'bcryptjs';
import { TaskState, TaskPriority } from '../app/types';



async function main() {
  // await prisma.task.deleteMany();
  // await prisma.user.deleteMany();

  // first users in db
  const admin = await prisma.user.findFirst({
    where: { userType: 'ADMIN' }
  });
  
  const member = await prisma.user.findFirst({
    where: { userType: 'TEAM_MEMBER' }
  });
  
  if (!admin || !member) {
    throw new Error('Required users not found. Please ensure admin and team member exist.');
  }

  // console.log('Seeding database...');

  // Initialize task positions
  // const states: TaskState[] = ['ToDo', 'InProgress', 'Completed'];

  // for (const state of states) {
  //   const tasks = await prisma.task.findMany({
  //     where: { state },
  //     orderBy: { createdAt: 'asc' },
  //   });

  //   for (let i = 0; i < tasks.length; i++) {
  //     await prisma.task.update({
  //       where: { id: tasks[i].id },
  //       data: { postion: i },
  //     });
  //   }
  // }

  // console.log('Positions initialized successfully.');


  // Create an admin user
  // const adminPassword = await bcrypt.hash('bosh', 10);
  // const admin = await prisma.user.create({
  //   data: {
  //     username: 'admin',
  //     email: 'admin@gmail.com',
  //     password: adminPassword,
  //     userType: 'ADMIN',
  //   },
  // });

  // // Create a team member
  // const memberPassword = await bcrypt.hash('member', 10);
  // const member = await prisma.user.create({
  //   data: {
  //     username: 'member',
  //     email: 'member@gmail.com',
  //     password: memberPassword,
  //     userType: 'TEAM_MEMBER',
  //   },
  // });

  // // Create a team manager
  // const managerPassword = await bcrypt.hash('manager', 10);
  // const manager = await prisma.user.create({
  //   data: {
  //     username: 'manager',
  //     email: 'manager@gmail.com',
  //     password: managerPassword,
  //     userType: 'TEAM_MANAGER',
  //   },
  // });

  const today = new Date();
  today.setHours(23, 59, 59, 999);
  
  // Create tasks
  await prisma.task.createMany({
    data: [
      { text: 'High Priority Task', state: TaskState.ToDo, priority: TaskPriority.high, createdById: admin.id, assignedToId: member.id,deadline: new Date() },
      { text: 'Medium Priority Task', state: TaskState.ToDo, priority: TaskPriority.medium, createdById: admin.id, assignedToId: member.id, deadline: new Date() },
      { text: 'Low Priority Task', state: TaskState.ToDo, priority: TaskPriority.low, createdById: admin.id, assignedToId: member.id, deadline: new Date() },
    ],
  });
// console.log({ admin, member, manager });
}



main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });