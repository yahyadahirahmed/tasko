'use client';
import React from 'react';
import KanbanBoard from '../components/KanbanBoard';
import LogoutButton from '../components/LogoutButton';

export default function MemberPage() {
  return (
    <div className="p-4">
      <div className='flex justify-between items-center mb-4'>
        <h1 className="text-2xl font-bold mb-4 text-black">My Tasks</h1>
         <LogoutButton />
      </div>
      <KanbanBoard />
    </div>
  );
}

