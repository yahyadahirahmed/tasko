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

  const teamMembers = await prisma.teamMember.findMany({
    where: {
      teamId: params.teamId
    },
    include: {
      user: {
        select: {
          id: true,
          username: true
        }
      }
    }
  });

  // Transform the data to match the Member interface
  const members = teamMembers.map(tm => ({
    id: tm.user.id,
    username: tm.user.username
  }));

  return NextResponse.json(members);
} 