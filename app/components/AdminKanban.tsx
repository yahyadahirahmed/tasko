import { DndContext, DragEndEvent, DragOverlay, DragStartEvent } from '@dnd-kit/core';
import React, { useState, useEffect } from 'react';
import { Column } from './Column';
import { Task as TaskType, TaskState } from '../types';
import { Task } from './Task';
import  AddTaskButton  from './AddTaskButton';
import { pusherClient } from '@/app/lib/pusher';

interface Props {
  teamId: string;
}

export function KanbanBoard({ teamId }: Props) {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [activeTask, setActiveTask] = useState<TaskType | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch(`/api/teams/${teamId}/tasks`);
      if (!response.ok) {
        console.error('Failed to fetch tasks:', response.statusText);
        return;
      }
      const data = await response.json();
      setTasks(data);
    };

    // Initial fetch
    fetchTasks();

    // Subscribe to Pusher channel
    const channel = pusherClient.subscribe('tasks');

    // Listen for task updates
    channel.bind('task-updated', (updatedTask: TaskType) => {
      setTasks(currentTasks =>
        currentTasks.map(task =>
          task.id === updatedTask.id ? updatedTask : task
        )
      );
    });

    // Cleanup on unmount
    return () => {
      channel.unbind_all();
      pusherClient.unsubscribe('tasks');
    };
  }, [teamId]);

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

    // Optimistic update
    setTasks(tasks =>
      tasks.map(task =>
        task.id === taskId ? { ...task, state: newState } : task
      )
    );

    try {
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          state: newState, 
          priority: activeTask?.priority,
          existingTask: tasks.find(task => task.id === taskId)
        }),
      });

      if (!response.ok) {
        console.error('Failed to update task state');
        // Revert the optimistic update if the server request fails
        const originalTask = tasks.find(task => task.id === taskId);
        if (originalTask) {
          setTasks(currentTasks =>
            currentTasks.map(task =>
              task.id === taskId ? originalTask : task
            )
          );
        }
      }
    } catch (error) {
      console.error('Error updating task state:', error);
    }
  };

  // Filter tasks by state
  const todoTasks = tasks.filter(task => task.state === TaskState.ToDo);
  const inProgressTasks = tasks.filter(task => task.state === TaskState.InProgress);
  const completedTasks = tasks.filter(task => task.state === TaskState.Completed);
  const ApprovedTasks = tasks.filter(task => task.state === TaskState.Approved);

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>

        <AddTaskButton teamId={teamId} />
      <div className="p-4 gap-4 mt-12 outer flex justify-center items-center">
        <Column title="To Do" tasks={todoTasks} state={TaskState.ToDo} />
        <Column title="In Progress" tasks={inProgressTasks} state={TaskState.InProgress} />
        <Column title="Completed" tasks={completedTasks} state={TaskState.Completed} />
        <Column title="Approved" tasks={ApprovedTasks} state={TaskState.Approved} />
      </div>
      <DragOverlay>
        {activeTask ? <Task task={activeTask} /> : null}
      </DragOverlay>
    </DndContext>
  );
}

export default KanbanBoard;