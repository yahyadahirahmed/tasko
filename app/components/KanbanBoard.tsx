import React from 'react';
import { Task, TaskState } from '../types';
import { Column } from './Column';
import { DndContext, DragEndEvent } from '@dnd-kit/core';

export function KanbanBoard() {
  const [tasks, setTasks] = React.useState<Task[]>([]);

  React.useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch('/api');
      if (!response.ok) {
        console.error('Failed to fetch tasks:', response.statusText);
        return;
      }
      const data = await response.json();
      setTasks(data);
    };
    fetchTasks();
  }, []);

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over) return;

    const taskId = active.id;
    const newState = over.id as TaskState;

    // Update task state locally
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, state: newState } : task
    ));

    // Update task state in the database
    try {
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ state: newState }),
      });

      if (!response.ok) {
        console.error('Failed to update task state');
        // Optionally revert the local state change
      }
    } catch (error) {
      console.error('Error updating task state:', error);
    }
  };

  const todoTasks = tasks.filter(task => task.state === TaskState.ToDo);
  const inProgressTasks = tasks.filter(task => task.state === TaskState.InProgress);
  const completedTasks = tasks.filter(task => task.state === TaskState.Completed);

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="p-4">
        <div className="flex gap-4">
          <Column title="To Do" tasks={todoTasks} state={TaskState.ToDo} />
          <Column title="In Progress" tasks={inProgressTasks} state={TaskState.InProgress} />
          <Column title="Completed" tasks={completedTasks} state={TaskState.Completed} />
        </div>
      </div>
    </DndContext>
  );
}

export default KanbanBoard;

