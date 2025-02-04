import { prisma } from '@/app/lib/prisma';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '@/app/lib/auth';

export async function GET() {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.username) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { username: session.user.username },
    select: {
      id: true,
      rewardPoints: true,
      username: true
    }
  });

  return NextResponse.json(user);
}