'use client';
import React, { useEffect, useState } from 'react';
import { Task as TaskType } from '../types';
import { useDraggable } from '@dnd-kit/core';
import Dropdown from './dropdown';
import { useSession } from 'next-auth/react';

interface TaskProps {
  task: TaskType;
}

export function Task({ task }: TaskProps) {
  const { data: session } = useSession();
  const [isAccessibilityEnabled, setIsAccessibilityEnabled] = useState(false);

  useEffect(() => {
    const fetchAccessibility = async () => {
      if (!session?.user?.id) return;
      const response = await fetch(`/api/users/members/${session.user.id}`);
      if (response.ok) {
        const data = await response.json();
        setIsAccessibilityEnabled(data.accessibility);
      }
    };

    fetchAccessibility();
  }, [session]);

  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id: task.id,
    data: task
  });
  

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  const isDragging = !!transform;

  // Modify border based on accessibility setting
  const borderColor = !isAccessibilityEnabled
    ? task.priority === 'high'
      ? 'border-red-500 border-2'
      : task.priority === 'medium'
      ? 'border-orange-500 border-2'
      : 'border-green-500 border-2'
    : task.priority === 'high'
      ? 'border-grey-800 border-8'
      : task.priority === 'medium'
      ? 'border-grey-800 border-4'
      : 'border-grey-800 border-2';  // Only color, no width when accessibility is on

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
      className={`text-white w-full bg-base-100 font-bold p-4 mb-2 rounded-lg shadow-md hover:shadow-lg  ${borderColor} cursor-move flex justify-between`}
    >
      {task.text}
    </div>
    <div className=" h-full w-0 ml-1 flex translate-x-[-32px] justify-center items-center">
          <Dropdown taskId={task.id} />
        </div>
    </div>
    </>
  );
}