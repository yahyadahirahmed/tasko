import { prisma } from '@/app/lib/prisma';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '@/app/lib/auth';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ memberId: string }> }
) {
    const {memberId} = await params;

    const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const userData = await prisma.user.findUnique ({
    where : {id: memberId}
  });
  return NextResponse.json(userData);
}