'use client';
import React from 'react';
import KanbanBoard from '../components/KanbanBoard';
import LogoutButton from '../components/LogoutButton';

export default function MemberPage() {
  const Logout = async () => {
    const response = await fetch('/api/logout');
    if (!response.ok) {
      console.error('Failed to log out:', response.statusText);
      return;
    }
    window.location.href = '/login';
  };
  return (
    <div className="p-4">
      <div className='flex justify-between items-center mb-4'>
        <h1 className="text-2xl font-bold mb-4">My Tasks</h1>
         <LogoutButton />
      </div>
      <KanbanBoard />
    </div>
  );
}

