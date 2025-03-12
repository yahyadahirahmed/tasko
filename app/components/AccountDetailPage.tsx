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
    accessibility: boolean;
}

export default function AccountDetailButton({ userId }: Props) {
    const [userData, setUserData] = useState<UserData | null>(null);

    const handleAccessibilityChange = async (value: boolean) => {
        try {
            const response = await fetch(`/api/users/members/${userId}/accessibility`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ accessibility: value }),
            });
            console.log(response)
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setUserData(prev => prev ? { ...prev, accessibility: value } : null);
        } catch (error) {
            console.error('Error updating accessibility:', error);
        }
    };

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
                            <div className="flex justify-center items-center gap-4">
                                <label className="flex items-center gap-2">
                                    <input 
                                        type="radio" 
                                        name="accessibility" 
                                        checked={!userData.accessibility}
                                        onChange={() => handleAccessibilityChange(false)}
                                        className="radio bg-blue-100 border-blue-300 checked:bg-blue-200 checked:text-blue-600 checked:border-blue-600" 
                                    />
                                    <span>Off</span>
                                </label>
                                <label className="flex items-center gap-2">
                                    <input 
                                        type="radio" 
                                        name="accessibility" 
                                        checked={userData.accessibility}
                                        onChange={() => handleAccessibilityChange(true)}
                                        className="radio bg-red-100 border-red-300 checked:bg-red-200 checked:text-red-600 checked:border-red-600" 
                                    />
                                    <span>On</span>
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