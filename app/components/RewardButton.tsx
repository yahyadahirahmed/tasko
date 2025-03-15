import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';


export default function RewardButton() {
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
              <button className="px-3 py-2 border-2 border-green-900 text-md font-bold bg-green-700 hover:bg-green-900 hover:border-green-700 rounded-xl flex"> 
            <svg xmlns="http://www.w3.org/2000/svg" width={26} height={26} viewBox="0 0 24 16"><g fill="none"><path fill="url(#fluentColorReward160)" d="m10 8l3.295-2.06A1.5 1.5 0 0 0 14 4.67V3.5A1.5 1.5 0 0 0 12.5 2H10l-.5 3z"></path><path fill="url(#fluentColorReward161)" d="M6 2H3.5A1.5 1.5 0 0 0 2 3.5v1.169c0 .517.266.998.705 1.272L6 8l.5-3z"></path><path fill="url(#fluentColorReward162)" d="M10 2H6v6l1.205.753a1.5 1.5 0 0 0 1.59 0L10 8z"></path><path fill="url(#fluentColorReward163)" d="M11 11a3 3 0 1 1-6 0a3 3 0 0 1 6 0"></path><defs><linearGradient id="fluentColorReward160" x1={14} x2={9.637} y1={2.534} y2={7.312} gradientUnits="userSpaceOnUse"><stop stopColor="#52d17c"></stop><stop offset={1} stopColor="#1a7f7c"></stop></linearGradient><linearGradient id="fluentColorReward161" x1={2} x2={6.447} y1={3.616} y2={6.66} gradientUnits="userSpaceOnUse"><stop stopColor="#52d17c"></stop><stop offset={1} stopColor="#1a7f7c"></stop></linearGradient><linearGradient id="fluentColorReward162" x1={8} x2={10.568} y1={1.127} y2={8.025} gradientUnits="userSpaceOnUse"><stop stopColor="#76eb95"></stop><stop offset={1} stopColor="#1ec8b0"></stop></linearGradient><radialGradient id="fluentColorReward163" cx={0} cy={0} r={1} gradientTransform="rotate(56.615 8.086 -13.893)scale(33.4905 28.6831)" gradientUnits="userSpaceOnUse"><stop offset={0.772} stopColor="#ffcd0f"></stop><stop offset={0.991} stopColor="#e67505"></stop></radialGradient></defs></g></svg>
              Rewards: {userData.rewardPoints}
            </button>
    
  )
}


