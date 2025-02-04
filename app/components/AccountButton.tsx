import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';


export default function AccountButton() {
    const { status } = useSession();
    const [userData, setUserData] = useState({ rewardPoints: 0, username: '' });

    useEffect(() => {
        const fetchUserData = async () => {
          try {
            const response = await fetch('/api/users', {
              credentials: 'include' // This sends cookies with the request
            });
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setUserData(data);
          } catch (error) {
            console.error('Error fetching user data:', error);
          }
        };
    
        if (status === 'authenticated') {
          fetchUserData();
        }
      }, [status]);
    
  return (
    <button className="join-item btn mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m0 4c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6m0 14c-2.03 0-4.43-.82-6.14-2.88a9.95 9.95 0 0 1 12.28 0C16.43 19.18 14.03 20 12 20"></path>
              </svg>
              {userData.username || 'Account'}{"'s account"}
            </button>
  )
}
