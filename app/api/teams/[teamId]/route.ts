import { prisma } from '@/app/lib/prisma';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '@/app/lib/auth';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ teamId: string }> }
) {
  // Await the params promise to get actual values
  const { teamId } = await params;

  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const team = await prisma.team.findUnique({
    where: {
      id: teamId, // use the awaited teamId here
    },
    include: {
      members: {
        include: {
          user: {
            select: {
              id: true,
              username: true,
            },
          },
        },
      },
    },
  });

  return NextResponse.json(team);
}