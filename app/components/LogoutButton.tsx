'use client';

import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push('/login');
  };

  return (
    <button
      onClick={handleLogout}
      className="mr-4 px-4 py-2 border-2 border-red-900 text-md font-bold bg-red-600 hover:bg-red-900 hover:border-red-500 rounded-xl"
    >
      Logout
    </button>
  );
} 