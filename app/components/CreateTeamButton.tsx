'use client';
import React, { useState, useEffect } from 'react';

interface Member {
  id: string;
  username: string;
}

export default function CreateTeamButton() {
  const [members, setMembers] = useState<Member[]>([]);
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);

  useEffect(() => {
    // Fetch all team members
    const fetchMembers = async () => {
      try {
        const response = await fetch('/api/users/members');
        if (!response.ok) throw new Error('Failed to fetch members');
        const data = await response.json();
        setMembers(data);
      } catch (error) {
        console.error('Error fetching members:', error);
      }
    };

    fetchMembers();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      const response = await fetch('/api/teams', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.get('name'),
          memberIds: selectedMembers,
        }),
      });

      if (response.ok) {
        window.location.reload();
      }
    } catch (error) {
      console.error('Error creating team:', error);
    }
  };

  const handleMemberSelect = (memberId: string) => {
    setSelectedMembers(prev => 
      prev.includes(memberId) 
        ? prev.filter(id => id !== memberId)
        : [...prev, memberId]
    );
  };

  return (
    <>
      <button 
        className="ml-32 px-3 py-2 border-2 border-blue-900 text-md font-bold bg-lbluye hover:bg-bluye hover:border-blue-500 rounded-xl"
        onClick={() => {
          const modal = document.getElementById('create_team_modal') as HTMLDialogElement;
          modal?.showModal();
        }}
      >
        Create Team
      </button>

      <dialog id="create_team_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Create New Team</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-control">
              <label className="label">Team Name</label>
              <input 
                type="text" 
                name="name" 
                className="input input-bordered" 
                required 
              />
            </div>

            <div className="form-control">
              <label className="label">Select Team Members</label>
              <div className="h-48 overflow-auto p-2 border rounded-lg">
                {members.map((member) => (
                  <label key={member.id} className="flex items-center space-x-2 p-2 hover:bg-base-200 rounded">
                    <input
                      type="checkbox"
                      className="checkbox"
                      checked={selectedMembers.includes(member.id)}
                      onChange={() => handleMemberSelect(member.id)}
                    />
                    <span>{member.username}</span>
                  </label>
                ))}
              </div>
            </div>

            <button 
              type="submit" 
              className="mr-4 px-3 py-2 text-md font-bold bg-lbluye hover:bg-bluye rounded w-full"
              disabled={selectedMembers.length === 0}
            >
              Create Team
            </button>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
} 