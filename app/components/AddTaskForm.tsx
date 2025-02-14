'use client';
import React, { useState, useEffect } from 'react';

interface Manager {
  id: string;
  username: string;
}

export default function AddTaskForm() {
    const [managers, setManagers] = useState<Manager[]>([]);
    const [selectedManager, setSelectedManager] = useState<string>('');

    useEffect(() => {
        // Fetch managers when component mounts
        const fetchManagers = async () => {
            try {
                const response = await fetch('/api/users/managers');
                if (!response.ok) throw new Error('Failed to fetch managers');
                const data = await response.json();
                setManagers(data);
            } catch (error) {
                console.error('Error fetching managers:', error);
            }
        };

        fetchManagers();
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        try {
            const response = await fetch('/api/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    text: formData.get('text'),
                    assignedToId: selectedManager,
                    state: 'ToDo',  // Default state for new tasks
                    priority: 'medium'  // Default priority
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to create task');
            }

            // Close modal and reset form
            const modal = document.getElementById('my_modal_3') as HTMLDialogElement;
            if (modal) {
                modal.close();
            }
            e.currentTarget.reset();
            setSelectedManager('');
        } catch (error) {
            console.error('Error creating task:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-control w-full">
                <label className="label">
                    <code><span className="label-text text-white font-bold text-lg">Text:</span></code>
                </label>
                <input
                    type="text"
                    id="task-text"
                    name="text"
                    placeholder="Task text here"
                    className="input input-bordered w-full bg-gray-800 text-white border-gray-600"
                    required
                />
            </div>

            <div className="form-control w-full">
                <label className="label">
                    <code><span className="label-text text-white font-bold text-lg">Assigned To:</span></code>
                </label>
                <select 
                    className="select select-bordered w-full bg-gray-800 text-white"
                    value={selectedManager}
                    onChange={(e) => setSelectedManager(e.target.value)}
                    required
                >
                    <option value="">Select a manager</option>
                    {managers.map((manager) => (
                        <option key={manager.id} value={manager.id}>
                            {manager.username}
                        </option>
                    ))}
                </select>
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
