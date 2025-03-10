'use client';
import React, { useState, useEffect } from 'react';
import { TaskPriority } from '@prisma/client';
import { TaskState } from '@/app/types';

interface Member {
  id: string;
  username: string;
}

export default function AddTaskForm({ teamId }: { teamId: string }) {
    const [members, setMembers] = useState<Member[]>([]);
    const [selectedMember, setSelectedMember] = useState<string>('');
    const [priority, setPriority] = useState<TaskPriority>(TaskPriority.medium);
    const [deadline, setDeadline] = useState<string>('');

    useEffect(() => {
        const fetchTeamMembers = async () => {
            try {
                const response = await fetch(`/api/teams/${teamId}/members`);
                if (!response.ok) throw new Error('Failed to fetch team members');
                const data = await response.json();
                setMembers(data);
            } catch (error) {
                console.error('Error fetching team members:', error);
            }
        };

        if (teamId) {
            fetchTeamMembers();
        }
    }, [teamId]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        try {
            const response = await fetch('/api/tasks', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    text: formData.get('text'),
                    assignedToId: selectedMember,
                    state: TaskState.ToDo,
                    priority: priority,
                    teamId: teamId,
                    deadline: new Date(deadline).toISOString(),
                }),
            });

            if (!response.ok) throw new Error('Failed to create task');

            // Reset form state first
            setSelectedMember('');
            setPriority(TaskPriority.medium);
            setDeadline('');
            
            // Then close modal and reset form
            const modal = document.getElementById('my_modal_3') as HTMLDialogElement | null;
            if (modal) {
              modal.close();
              const form = e.currentTarget as HTMLFormElement | null;
              if (form) {
                form.reset();
              }
              window.location.reload();
            }
        } catch (error) {
            console.error('Error creating task:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-control w-full">
                <label className="label">
                    <code><span className="label-text text-white font-bold text-lg">Task Description:</span></code>
                </label>
                <input
                    type="text"
                    id="task-text"
                    name="text"
                    placeholder="Task description here"
                    className="input input-bordered w-full bg-gray-800 text-white border-gray-600"
                    required
                />
            </div>

            <div className="form-control w-full">
                <label className="label">
                    <code><span className="label-text text-white font-bold text-lg">Assign To:</span></code>
                </label>
                <select 
                    className="select select-bordered w-full bg-gray-800 text-white"
                    value={selectedMember}
                    onChange={(e) => setSelectedMember(e.target.value)}
                    required
                >
                    <option value="">Select a member</option>
                    {members.map((member) => (
                        <option key={member.id} value={member.id}>
                            {member.username}
                        </option>
                    ))}
                </select>
            </div>

            <div className="form-control w-full">
                <label className="label">
                    <code><span className="label-text text-white font-bold text-lg">Priority:</span></code>
                </label>
                <select
                    className="select select-bordered w-full bg-gray-800 text-white"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as TaskPriority)}
                    required
                >
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                </select>
            </div>

            <div className="form-control w-full">
                <label className="label">
                    <code><span className="label-text text-white font-bold text-lg">Deadline:</span></code>
                </label>
                <input
                    type="datetime-local"
                    className="input input-bordered w-full bg-gray-800 text-white border-gray-600"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    required
                />
            </div>

            <div className="form-control mt-6">
                <button
                    type="submit"
                    className="btn mt-2 w-full bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4"
                >
                    Add Task
                </button>
            </div>
        </form>
    );
}
