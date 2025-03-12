import { prisma } from '@/app/lib/prisma';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '@/app/lib/auth';

export async function PATCH(
    request: Request,
    { params }: { params: { memberId: string } }
) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { memberId } = await params;
        const body = await request.json();
        console.log('Request body:', body); // Debug log
        console.log('MemberId:', memberId); // Debug log

        const updatedUser = await prisma.user.update({
            where: { 
                id: memberId 
            },
            data: { 
                accessibility: body.accessibility 
            },
            select: {
                id: true,
                username: true,
                email: true,
                userType: true,
                rewardPoints: true,
                accessibility: true
            }
        });

        console.log('Updated user:', updatedUser); // Debug log
        return NextResponse.json(updatedUser);
    } catch (error) {
        // Log the actual error
        console.error('Detailed error:', error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Failed to update accessibility' },
            { status: 500 }
        );
    }
}