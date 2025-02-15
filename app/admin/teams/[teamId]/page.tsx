'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import KanbanBoard from '@/app/components/AdminKanban';
import AddTaskButton from '@/app/components/AddTaskButton';
import LogoutButton from '@/app/components/LogoutButton';

interface Team {
  id: string;
  name: string;
  members: {
    user: {
      id: string;
      username: string;
    }
  }[];
}

export default function TeamBoard() {
  const params = useParams();
  const teamId = params.teamId as string;
  const [team, setTeam] = useState<Team | null>(null);

  useEffect(() => {
    const fetchTeam = async () => {
      const response = await fetch(`/api/teams/${teamId}`);
      if (response.ok) {
        const data = await response.json();
        setTeam(data);
      }
    };

    fetchTeam();
  }, [teamId]);

  return (
    <div className="min-h-screen bg-base-200">
      <div className="navbar bg-base-300 shadow-lg">
        <div className="flex-1">
          <h1 className="text-2xl font-bold px-4">{team?.name} Board</h1>
        </div>
        <div className="flex-none px-4">
          <AddTaskButton teamId={teamId} />
          <LogoutButton />
        </div>
      </div>
      <KanbanBoard teamId={teamId} />
    </div>
  );
} 