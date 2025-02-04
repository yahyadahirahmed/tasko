'use client';
import React, { useEffect, useState } from 'react';
import KanbanBoard from '../components/KanbanBoard';
import LogoutButton from '../components/LogoutButton';
import AccountButton from '../components/AccountButton';
import RewardButton from '../components/RewardButton';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function MemberPage() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);



  return (
    <div className="min-h-screen bg-base-200">
      <div className='navbar bg-base-300 shadow-lg'>
        <div className="flex-1">
          <h1 className="text-2xl font-bold px-4">My Tasks</h1>
        </div>
        <div className="flex-none px-4">
          <div className="join">
            <AccountButton />
            <RewardButton />
            <LogoutButton />
          </div>
        </div>
      </div>
      <KanbanBoard />
    </div>
  );
}

