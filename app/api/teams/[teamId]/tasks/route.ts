import { prisma } from '@/app/lib/prisma';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '@/app/lib/auth';

export async function GET(
  request: Request,
  { params }: { params: { teamId: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { teamId } = params;

  const tasks = await prisma.task.findMany({
    where: {
      teamId,
    },
    include: {
      assignedTo: {
        select: {
          id: true,
          username: true,
        },
      },
      createdBy: {
        select: {
          id: true,
          username: true,
        },
      },
    },
  });

  return NextResponse.json(tasks);
} 