'use client';
import React from 'react';
import EditTaskButton from './EditTaskButton';

interface Props {
  taskId: string;
}

export default function Dropdown({ taskId }: Props) {
  
  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ taskId }),
      });
      if (!response.ok) {
        throw new Error(`Delete failed: ${response.statusText}`);
      }
      console.log('Task deleted:', taskId);
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };

  return (
    <div className="dropdown dropdown-left translate-y-5 pl-2 btn-neutral relative">
      <div
        tabIndex={0}
        role="button"
        className="btn pl-2 pr-2 min-h-0 h-6 text-yellow-200"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={16}
          height={16}
          viewBox="0 0 32 32"
        >
          <circle cx={8} cy={16} r={2} fill="currentColor" />
          <circle cx={16} cy={16} r={2} fill="currentColor" />
          <circle cx={24} cy={16} r={2} fill="currentColor" />
        </svg>
      </div>
      <ul
        tabIndex={0}
        className="border-2 border-gray-900 top-0 right-0 dropdown-content menu bg-base-100 rounded-box z-50 w-52 p-2 shadow-lg"
      >
        <li className="m-1">
          <EditTaskButton taskId={taskId} />
        </li>
        <li className="m-1">
          <button className="btn btn-warning min-h-0 h-8" onClick={handleDelete}>
            DELETE
          </button>
        </li>
      </ul>
    </div>
  );
}

