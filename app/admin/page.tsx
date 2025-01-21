import React from 'react'
import { prisma } from '../lib/prisma';
import LogoutButton from '../components/LogoutButton';


export default async function Admin() {
  
    return (
      <div className='flex'>
        <div>
          <h1 className="text-2xl font-bold mb-4">Admin</h1>
        </div>
        <LogoutButton />
      </div>
    );
  }
  
