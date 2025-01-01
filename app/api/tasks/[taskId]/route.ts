import { prisma } from '@/app/lib/prisma';
import { NextResponse } from 'next/server';
import { TaskState } from '@prisma/client';

export async function PATCH(
  request: Request,
  { params }: { params: { taskId: string } }
) {
  try {
    const { taskId } = params;
    const { state } = await request.json();

    const updatedTask = await prisma.task.update({
      where: { id: taskId },
      data: { state: state as TaskState },
    });

    return NextResponse.json(updatedTask);
  } catch (error) {
    console.error('Error updating task:', error);
    return NextResponse.json(
      { error: 'Failed to update task' },
      { status: 500 }
    );
  }
} 