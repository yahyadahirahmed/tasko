import { prisma } from '@/app/lib/prisma';
import { NextResponse, NextRequest } from 'next/server';
import { pusherServer } from '@/app/lib/pusher';



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

    // Trigger Pusher event with the updated task
    await pusherServer.trigger('tasks', 'task-updated', updatedTask);

    return NextResponse.json(updatedTask);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Failed to update task' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, {params}: { params: Promise<{ taskId: string; }> }) {
  try {
   // filler to free up for deployment
  const filler = await request.json();
  console.log(filler);
    const { taskId } = await params;

    // Delete the task
    await prisma.task.delete({
      where: { id: taskId }
    });

    // Trigger Pusher event with the deleted task ID
    await pusherServer.trigger('tasks', 'task-deleted', taskId);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Failed to delete task' }, { status: 500 });
  }
}


export async function POST(request: NextRequest) {
  try {
    const { text, state, priority, assignedToId, createdById, deadline, teamId } = await request.json();

    // Validate required fields
    if (!text || !state || !createdById || !teamId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Create the new task
    const newTask = await prisma.task.create({
      data: {
        text,
        state,
        priority,
        assignedToId,
        createdById,
        deadline,
        teamId
      },
    });

    // Trigger Pusher event with the new task
    await pusherServer.trigger('tasks', 'task-created', newTask);

    return NextResponse.json(newTask, { status: 201 });
  } catch (error) {
    console.error('Error creating task:', error);
    return NextResponse.json({ error: 'Failed to create task' }, { status: 500 });
  }
}


