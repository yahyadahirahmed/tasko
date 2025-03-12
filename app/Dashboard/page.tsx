'use client';
import React, { useEffect, useState } from 'react';
import LogoutButton from '../components/LogoutButton';
import RewardButton from '../components/RewardButton';
import { useSession } from 'next-auth/react';
import AccountDetailButton from '../components/AccountDetailButton';
import { useRouter } from 'next/navigation';

interface Team {
  id: string;
  name: string;
  createdAt: Date;
  members: { user: { username: string } }[];
}

export default function TeamsPage() {
  const [teams, setTeams] = useState<Team[]>([]);
  const { data: session, status } = useSession();
  const router = useRouter();
  
  useEffect(() => {
    // Redirect if not authenticated
    if (status === 'unauthenticated') {
      router.push('/login');
      return;
    }

    // Only fetch if authenticated
    if (status === 'authenticated') {
      const fetchTeams = async () => {
        try {
          const response = await fetch('/api/teams/memberTeamFind');
          if (response.ok) {
            const data = await response.json();
            setTeams(data);
          }
        } catch (error) {
          console.error('Error fetching teams:', error);
        }
      };

      fetchTeams();
    }
  }, [status, router]);

  // Show loading state while checking authentication
  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-base-200 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Teams</h1>
        <div className="flex-1 flex justify-center">
        <RewardButton />
        </div>
        <div className="flex gap-4 items-center">
        <AccountDetailButton userId={session?.user?.id}/> 
        <LogoutButton />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {teams.map((team) => (
          <div key={team.id} className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">{team.name}</h2>
              <p>Members: {team.members.length}</p>
              <div className="card-actions justify-end">
                <button 
                  className="btn btn-primary"
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
