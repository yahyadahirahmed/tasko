'use client';
import React from 'react'
import LogoutButton from '../components/LogoutButton';
import AdminKanban from '../components/AdminKanban';
import AccountButton from '../components/AccountButton';

export default function Admin() {
  return (
    <div className="min-h-screen bg-base-200">
      <div className='navbar bg-base-300 shadow-lg'>
        <div className="flex-1">
          <h1 className="text-2xl font-bold px-4 btn btn-ghost">Admin Dashboard</h1>
        </div>
        <div className="flex-none px-4">
          <div className="join">
            <AccountButton />
            <LogoutButton />
          </div>
        </div>
      </div>
      <AdminKanban teamId={''} />
    </div>
  );
}
  
