import { prisma } from '@/app/lib/prisma';
import { NextResponse, NextRequest } from 'next/server';
import { TaskState, TaskPriority } from '@/app/types';

export async function PATCH(request: NextRequest, {params}: { params: Promise<{ taskId: string; }> }) {
  try {
    // Await params
    const { taskId } = await params;
    

    // Parse the request body
    const body = await request.json();
    if (!body) {
      console.error('Request body is missing');
      return NextResponse.json({ error: 'Request body is required' }, { status: 400 });
    }

    const { state, priority } = body;

    console.log('Received PATCH request:', { taskId, state, priority });

    // Validate state
    if (!state || !Object.values(TaskState).includes(state)) {
      console.error('Invalid or missing state:', state);
      return NextResponse.json({ error: 'Invalid or missing state' }, { status: 400 });
    }

    // Validate priority if provided
    if (priority && !Object.values(TaskPriority).includes(priority)) {
      console.error('Invalid priority:', priority);
      return NextResponse.json({ error: 'Invalid priority value' }, { status: 400 });
    }

    // Ensure task exists
    const existingTask = await prisma.task.findUnique({ where: { id: taskId } });
    if (!existingTask) {
      console.error('Task not found:', taskId);
      return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    }

    console.log('Task found, proceeding with update');

    // Update the task in the database
    const updatedTask = await prisma.task.update({
      where: { id: taskId },
      data: {
        state,
        ...(priority ? { priority } : {}), // Update priority only if provided
      },
    });

    console.log('Task updated successfully:', updatedTask);

    return NextResponse.json(updatedTask);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error updating task:', error.message);
    } else {
      console.error('Unknown error occurred:', error);
    }
    return NextResponse.json({ error: 'Failed to update task' }, { status: 500 });
  }
}