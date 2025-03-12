import { prisma } from '@/app/lib/prisma';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '@/app/lib/auth';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ teamId: string }> }
) {
  const { teamId } = await params;
  
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  // Check if user is admin/manager or member
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { userType: true }
  });

  // If user is a team member, only show their assigned tasks
  const tasks = await prisma.task.findMany({
    where: { 
      teamId,
      ...(user?.userType === 'TEAM_MEMBER' ? { assignedToId: session.user.id } : {})
    },
    include: {
      assignedTo: { select: { id: true, username: true } },
      createdBy: { select: { id: true, username: true } },
    },
  });
  
  return NextResponse.json(tasks);
}