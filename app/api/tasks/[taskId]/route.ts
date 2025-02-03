import { prisma } from '@/app/lib/prisma';
import { NextResponse, NextRequest } from 'next/server';


export async function PATCH(request: NextRequest, {params}: { params: Promise<{ taskId: string; }> }) {
  try {
    const { taskId } = await params;
    const { state, priority } = await request.json();

    // First fetch the existing task
    const existingTask = await prisma.task.findUnique({
      where: { id: taskId }
    });

    if (!existingTask) {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    }

    // Check state transitions
    if (existingTask.state !== 'Approved' && state === 'Approved') {
      if (existingTask.assignedToId) {
        const user = await prisma.user.findUnique({ 
          where: { id: existingTask.assignedToId } 
        });
        
        if (user && user.rewardPoints !== undefined) {
          await prisma.user.update({
            where: { id: existingTask.assignedToId },
            data: { rewardPoints: user.rewardPoints + 1 },
          });
        }
      }
    } else if (existingTask.state === 'Approved' && state !== 'Approved') {
      if (existingTask.assignedToId) {
        const user = await prisma.user.findUnique({ 
          where: { id: existingTask.assignedToId } 
        });
        
        if (user && user.rewardPoints !== undefined) {
          await prisma.user.update({
            where: { id: existingTask.assignedToId },
            data: { rewardPoints: user.rewardPoints - 1 },
          });
        }
      }
    }

    // Update the task
    const updatedTask = await prisma.task.update({
      where: { id: taskId },
      data: {
        state,
        ...(priority ? { priority } : {}),
      },
    });

    return NextResponse.json(updatedTask);
  } catch (error) {
    console.error('Error details:', error);
    return NextResponse.json({ error: 'Failed to update task', details: error }, { status: 500 });
  }
}
