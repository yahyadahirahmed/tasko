'use client';
import React from 'react';
import KanbanBoard from '../components/KanbanBoard';

export default function MemberPage() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">My Tasks</h1>
      <KanbanBoard />
    </div>
  );
}

