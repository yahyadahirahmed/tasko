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
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
// filler to free up for deployment
  const filler = await request.json();
    console.log(filler);

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