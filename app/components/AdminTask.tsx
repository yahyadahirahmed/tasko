import React from 'react';
import { Task as TaskType } from '../types';
import { useDraggable } from '@dnd-kit/core';
import Dropdown from './dropdown';

interface TaskProps {
  task: TaskType;
}

export function Task({ task }: TaskProps) {
  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id: task.id,
    data: task
  });
  
  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  const isDragging = !!transform;

  // Determine border color based on priority
  const borderColor =
  task.priority === 'high'
  ? 'border-red-500 border-8'
  : task.priority === 'medium'
  ? 'border-orange-500 border-4'
  : 'border-green-500 border-2';

  return (
    <>
      <div className='flex justify-between '>
    <div
      ref={setNodeRef}
      style={{
        ...style,
        zIndex: isDragging ? 1000 : 'auto', // Higher z-index while dragging
      }}
      {...listeners}
      {...attributes}
      className={`text-white w-full bg-base-100 font-bold p-4 mb-2 rounded-lg shadow-md hover:shadow-lg border-2 ${borderColor} curs
or-move flex justify-between`}
    >
       <span className="px-2">{task.text}</span>
    </div>
    <div className=" h-full w-0 ml-1 flex translate-x-[-32px] justify-center items-center">
          <Dropdown taskId={task.id} />
        </div>
    </div>
    </>
  );
}