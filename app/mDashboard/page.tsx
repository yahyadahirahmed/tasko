'use client';
import React, { useEffect, useState } from 'react';
import CreateTeamButton from '../components/CreateTeamButton';
import LogoutButton from '../components/LogoutButton';
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
  const pathname = usePathname(); // Use the pathname hook
  
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
          // Determine which API endpoint to use based on the current path
          const isManagerDashboard = pathname?.includes('mDashboard');
          const apiUrl = isManagerDashboard 
            ? '/api/teams' 
            : '/api/teams/memberTeamFind';
          
          // Add cache-busting parameter
          const response = await fetch(`${apiUrl}?_=${new Date().getTime()}`);
          
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
      
      // For App Router, we can use the following approach for navigation events
      // Note: App Router doesn't have the same event system as Pages Router
      // This is a simpler approach that refreshes on component mount/remount
      
      // Optionally, you can set up an interval to periodically refresh the teams list
      // This is one way to handle navigation in App Router since it lacks direct route events
      const refreshInterval = setInterval(fetchTeams, 30000); // Every 30 seconds
      
      return () => {
        clearInterval(refreshInterval);
      };
    }
  }, [status, router, pathname]); // Add pathname to dependencies

  return (
    <div className="min-h-screen bg-base-200 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Teams</h1>
        <div className="flex-1 flex justify-center">
          <CreateTeamButton />
        </div>
        <div className="flex gap-4 items-center">
          <AccountDetailButton userId={session?.user?.id} />
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
                  className="btn btn-info-content"
                  onClick={() => window.location.href = `/admin/teams/${team.id}`}
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