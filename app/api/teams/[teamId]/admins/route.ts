import { prisma } from '@/app/lib/prisma';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '@/app/lib/auth';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ teamId: string }> }
) {
  const { teamId } = await params; // await params before using its properties
  const session = await getServerSession(authOptions);
  
  // Ensure that the logged in user is authenticated and is an admin
  if (!session?.user?.id || session.user.userType !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const teamMembers = await prisma.teamMember.findMany({
    where: { teamId },
    include: {
      user: {
        select: {
          id: true,
          username: true,
        },
      },
    },
  });

  // Transform the data to match the Member interface
  const members = teamMembers.map(tm => ({
    id: tm.user.id,
    username: tm.user.username,
  }));

  return NextResponse.json(members);
}