import { DndContext, DragEndEvent, DragOverlay } from '@dnd-kit/core';
import React, { useState } from 'react';
import { Column } from './Column';
import { Task as TaskType, TaskState } from '../types';
import { Task } from './Task';

export function KanbanBoard() {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [activeTask, setActiveTask] = useState<TaskType | null>(null);

  React.useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch('/api');
      if (!response.ok) {
        console.error('Failed to fetch tasks:', response.statusText);
        return;
      }
      const data = await response.json();
      setTasks(data);
      console.log(data)
    };
    fetchTasks();
  }, []);

  const handleDragStart = ({ active }: any) => {
    const task = tasks.find(task => task.id === active.id);
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
      <div className="p-4 flex gap-4">
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