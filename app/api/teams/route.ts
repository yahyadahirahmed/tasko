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
      managerId: session.user.id
    },
    include: {
      members: {
        include: {
          user: {
            select: {
              username: true,
              id: true
            }
          }
        }
      }
    }
  });

  return NextResponse.json(teams);
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { name, memberIds } = await request.json();

  const team = await prisma.team.create({
    data: {
      name,
      managerId: session.user.id,
      members: {
        create: memberIds.map((userId: string) => ({
          userId
        }))
      }
    }
  });

  return NextResponse.json(team);
} 