import { prisma } from '@/app/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const managers = await prisma.user.findMany({
            where: {
                userType: 'TEAM_MANAGER'
            },
            select: {
                id: true,
                username: true
            }
        });

        return NextResponse.json(managers);
    } catch (error) {
        console.error('Error fetching managers:', error);
        return NextResponse.json({ error: 'Failed to fetch managers' }, { status: 500 });
    }
} 