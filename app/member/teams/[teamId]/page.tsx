'use client';
import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import KanbanBoard from '@/app/components/KanbanBoard';
import RewardButton from '@/app/components/RewardButton';
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
  const router = useRouter();
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

  const handleBack = () => {
    router.push('/Dashboard');
  };

  return (
    <div className="min-h-screen bg-base-200">
      <div className="navbar bg-base-300 shadow-lg">
        <div className="flex-1">
          <h1 className="text-2xl font-bold px-4">{team?.name} Board</h1>
        </div>
        <div className="flex-none px-2 gap-2">
          <LogoutButton />
        </div>
      </div>
      <div>
      <button 
          onClick={handleBack}
          className="m-4 px-4 py-2 rounded-lg flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Dashboard
        </button>
      <KanbanBoard teamId={teamId} />
      </div>
    </div>
  );
} 