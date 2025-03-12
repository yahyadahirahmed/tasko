'use client';
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent } from '@dnd-kit/core';
import React, { useState, useEffect } from 'react';
import { Column } from './Column';
import { Task as TaskType, TaskState } from '../types';
import { Task } from './Task';
import { pusherClient } from '@/app/lib/pusher';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface Props {
  teamId: string;
}

export function KanbanBoard({ teamId }: Props) {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [activeTask, setActiveTask] = useState<TaskType | null>(null);
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    // If not authenticated, redirect to login
    if (status === 'unauthenticated') {
      router.push('/login');
      return;
    }

    // Only fetch tasks if authenticated
    if (status === 'authenticated') {
      const fetchTasks = async () => {
        try {
          const response = await fetch(`/api/teams/${teamId}/tasks`);
          if (!response.ok) {
            if (response.status === 401) {
              router.push('/login');
              return;
            }
            throw new Error(response.statusText);
          }
          const data = await response.json();
          setTasks(data);
        } catch (error) {
          console.error('Failed to fetch tasks:', error);
        }
      };

      fetchTasks();

      // Subscribe to Pusher channel
      const channel = pusherClient.subscribe('tasks');
      
      // Listen for task updates
      channel.bind('task-updated', (updatedTask: TaskType) => {
        // Only update if the task belongs to the current user (for team members)
        if (session?.user?.userType === 'TEAM_MEMBER') {
          if (updatedTask.assignedToId === session.user.id) {
            setTasks(currentTasks =>
              currentTasks.map(task =>
                task.id === updatedTask.id ? updatedTask : task
              )
            );
          }
        } else {
          // For admins/managers, update all tasks
          setTasks(currentTasks =>
            currentTasks.map(task =>
              task.id === updatedTask.id ? updatedTask : task
            )
          );
        }
      });

      // Similar logic for task creation and deletion...
      channel.bind('task-created', (newTask: TaskType) => {
        if (session?.user?.userType === 'TEAM_MEMBER') {
          if (newTask.assignedToId === session.user.id) {
            setTasks(currentTasks => [...currentTasks, newTask]);
          }
        } else {
          setTasks(currentTasks => [...currentTasks, newTask]);
        }
      });

      channel.bind('task-deleted', (taskId: string) => {
        setTasks(currentTasks => 
          currentTasks.filter(task => task.id !== taskId)
        );
      });

      return () => {
        channel.unbind_all();
        pusherClient.unsubscribe('tasks');
      };
    }
  }, [teamId, session, status, router]);

  const handleDragStart = (event: DragStartEvent) => {
    const task = tasks.find(task => task.id === event.active.id);
    setActiveTask(task || null);
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    setActiveTask(null);
    const { active, over } = event;
    if (!over) return;

    const taskId = active.id;
    const newState = over.id as TaskState;

    // Update the task state
    setTasks(tasks => tasks.map(task =>
      task.id === taskId ? { ...task, state: newState } : task
    ));

    try {
      console.log('PATCH Request:', { taskId, newState });

      const response = await fetch(`/api/tasks/${taskId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ state: newState, priority: activeTask?.priority }),
      });

      if (!response.ok) {
        console.error('Failed to update task state');
      }
    } catch (error) {
      console.error('Error updating task state:', error);
    }
  };

  // Filter tasks by state
  const todoTasks = tasks.filter(task => task.state === TaskState.ToDo);
  const inProgressTasks = tasks.filter(task => task.state === TaskState.InProgress);
  const completedTasks = tasks.filter(task => task.state === TaskState.Completed);

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className=" p-4 gap-4 mt-12 outer flex justify-center items-center ">
        <Column title="To Do" tasks={todoTasks} state={TaskState.ToDo} />
        <Column title="In Progress" tasks={inProgressTasks} state={TaskState.InProgress} />
        <Column title="Completed" tasks={completedTasks} state={TaskState.Completed} />
      </div>
      <DragOverlay>
        {activeTask ? <Task task={activeTask} /> : null}
      </DragOverlay>
    </DndContext>
  );
}

export default KanbanBoard;