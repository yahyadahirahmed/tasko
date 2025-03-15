'use client';
import React, { useEffect, useState } from 'react';
import LogoutButton from '../components/LogoutButton';
import RewardButton from '../components/RewardButton';
import { useSession } from 'next-auth/react';
import AccountDetailButton from '../components/AccountDetailButton';

interface Team {
  id: string;
  name: string;
  createdAt: Date;
  members: { user: { username: string } }[];
}

export default function TeamsPage() {
  const [teams, setTeams] = useState<Team[]>([]);
  const { data: session } = useSession();
  
  useEffect(() => {
    const fetchTeams = async () => {
      const response = await fetch('/api/teams/memberTeamFind');
      if (response.ok) {
        const data = await response.json();
        setTeams(data);
      }
    };

    fetchTeams();
  }, []);

  return (
    <div className="min-h-screen bg-base-200 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Teams</h1>
        <div className="flex-1 flex justify-center ml-32">
        <RewardButton />
        </div>
        <div className="flex gap-4 items-center">
        <AccountDetailButton userId={session?.user?.id}/> 
        <LogoutButton />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {teams.map((team) => (
          <div key={team.id} className="card bg-base-100 border-2 border-gray-700 hover:border-gray-500 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">{team.name}</h2>
              <p>Members: {team.members.length}</p>
              <div className="card-actions justify-end">
                <button 
                  className="btn "
                  onClick={() => window.location.href = `/member/teams/${team.id}`}
                >
                  View Board
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
