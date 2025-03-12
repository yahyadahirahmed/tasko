'use client';
import React, { useEffect, useState } from 'react';
import LogoutButton from '../components/LogoutButton';
import RewardButton from '../components/RewardButton';
import { useSession } from 'next-auth/react';
import AccountDetailButton from '../components/AccountDetailButton';
import { useRouter, usePathname } from 'next/navigation';

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
  const pathname = usePathname();
  
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
          // Add cache-busting parameter to prevent stale data
          const response = await fetch(`/api/teams/memberTeamFind?_=${new Date().getTime()}`);
          
          if (response.ok) {
            const data = await response.json();
            setTeams(data);
          } else {
            console.error('Error fetching teams:', response.statusText);
          }
        } catch (error) {
          console.error('Error fetching teams:', error);
        }
      };

      fetchTeams();
      
      // Create a function to handle focus/visibility changes
      // This will help refresh data when user returns to the page
      const handleVisibilityChange = () => {
        if (document.visibilityState === 'visible') {
          fetchTeams();
        }
      };
      
      // Add event listener for page visibility changes
      document.addEventListener('visibilitychange', handleVisibilityChange);
      
      // Add an interval to periodically refresh data
      const refreshInterval = setInterval(fetchTeams, 30000); // Every 30 seconds
      
      return () => {
        document.removeEventListener('visibilitychange', handleVisibilityChange);
        clearInterval(refreshInterval);
      };
    }
  }, [status, router, pathname]);

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
                  onClick={() => {
                    // Use router.push instead of window.location for better Next.js integration
                    router.push(`/member/teams/${team.id}`);
                  }}
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