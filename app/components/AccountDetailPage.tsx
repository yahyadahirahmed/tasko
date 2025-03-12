'use client'
import React, { useState, useEffect } from 'react';

interface Props {
    userId?: string;
}

interface UserData {
    username: string;
    email: string;
    rewardPoints: number;
    userType: string;
    
}

export default function AccountDetailButton({ userId }: Props) {
    const [userData, setUserData] = useState<UserData | null>(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                if (!userId) return;
                const response = await fetch(`/api/users/members/${userId}`);
                if (response.ok) {
                    const data = await response.json();
                    setUserData(data);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, [userId]);

    return (
        <div className="card bg-base-300 p-4">
            {userData ? (
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <p><span className="font-bold">Username:</span> {userData.username}</p>
                        <p><span className="font-bold">Email:</span> {userData.email}</p>
                    </div>
                    <div className="space-y-2">
                        <p><span className="font-bold">Role:</span> {userData.userType}</p>
                        <p><span className="font-bold">Reward Points:</span> {userData.rewardPoints}</p>
                    </div>
                    <div className="col-span-2">
                        <fieldset className="fieldset p-4 bg-base-100 border border-base-300 rounded-box w-full">
                            <legend className="fieldset-legend w-full text-center">Accessibility</legend>
                            <div className="flex justify-center items-center">
                                <label className="fieldset-label">
                                    <input type="checkbox" className="toggle toggle-neutral" />
                                </label>
                            </div>
                        </fieldset>
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}