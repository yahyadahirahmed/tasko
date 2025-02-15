import { prisma } from '@/app/lib/prisma';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '@/app/lib/auth';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const teams = await prisma.team.findMany({
    where: {
      members: {
        some: {
          userId: session.user.id, // Only teams where the logged-in user is a member
        },
      },
    },
    include: {
      manager: {
        select: { id: true, username: true },
      },
      members: {
        include: {
          user: {
            select: { id: true, username: true },
          },
        },
      },
    },
  });

  return NextResponse.json(teams);
}





