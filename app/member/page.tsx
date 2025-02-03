'use client';
import React from 'react';
import KanbanBoard from '../components/KanbanBoard';
import LogoutButton from '../components/LogoutButton';

export default function MemberPage() {
  return (
    <div className="min-h-screen bg-base-200">
      <div className='navbar bg-base-300 shadow-lg'>
        <div className="flex-1">
          <h1 className="text-2xl font-bold px-4">My Tasks</h1>
        </div>
        <div className="flex-none px-4">
        <div className="join">
            <button className="join-item btn mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m0 4c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6m0 14c-2.03 0-4.43-.82-6.14-2.88a9.95 9.95 0 0 1 12.28 0C16.43 19.18 14.03 20 12 20"></path></svg>
              Account
            </button>
            <LogoutButton />
          </div>
        </div>
      </div>
      <KanbanBoard />
    </div>
  );
}

