'use client';
import React, { useEffect, useState } from 'react';
import { Task as TaskType, TaskPriority, TaskState } from '../types';

interface Props {
  taskId: string;
  modalId: string;
}

interface Member {
  id: string;
  username: string;
}

export default function EditTaskForm({ taskId, modalId }: Props) {
  const [task, setTask] = useState<TaskType | null>(null);
  const [text, setText] = useState('');
  const [priority, setPriority] = useState<TaskPriority>();
  const [assignedToId, setAssignedToId] = useState<string>('');
  const [members, setMembers] = useState<Member[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        setIsLoading(true);
        // Fetch the task details
        const taskResponse = await fetch(`/api/tasks/${taskId}`);
        if (!taskResponse.ok) {
          throw new Error('Failed to fetch task');
        }
        const taskData = await taskResponse.json();
        setTask(taskData);
        
        // Pre-populate the form fields
        setText(taskData.text);
        setPriority(taskData.priority || null);
        setAssignedToId(taskData.assignedToId || '');
        
        // Fetch team members for the dropdown
        const teamResponse = await fetch(`/api/teams/${taskData.teamId}/members`);
        if (!teamResponse.ok) {
          throw new Error('Failed to fetch team members');
        }
        const membersData = await teamResponse.json();
        setMembers(membersData);
        
        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setIsLoading(false);
      }
    };
    
    fetchTask();
  }, [taskId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text,
          priority,
          assignedToId: assignedToId || null,
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update task');
      }
      
      // close modal and reset form
      const modal = document.getElementById(modalId) as HTMLDialogElement | null;
      if (modal) {
        modal.close();
      }
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update task');
    }
  };

  if (isLoading) return <div className="text-center py-4">Loading...</div>;
  if (error) return <div className="text-center py-4 text-error">{error}</div>;
  if (!task) return <div className="text-center py-4">Task not found</div>;

  return (
    <form onSubmit={handleSubmit} className="space-y-6 ">
      <h3 className="text-lg font-bold">Edit Task</h3>
      
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text text-white font-bold">Task Description</span>
        </label>
        <textarea 
          className="textarea textarea-bordered h-24 bg-gray-800 text-white border-gray-600 w-full" 
          value={text} 
          onChange={(e) => setText(e.target.value)}
          required
        />
      </div>
      
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text text-white font-bold">Priority</span>
        </label>
        <select 
          className="select select-bordered w-full bg-gray-800 text-white border-gray-600" 
          value={priority}
          onChange={(e) => {
            const value = e.target.value;
            if (value === 'high' || value === 'medium' || value === 'low') {
              setPriority(value as TaskPriority);
            }
          }}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
      
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text text-white font-bold">Assign To</span>
        </label>
        <select 
          className="select select-bordered w-full bg-gray-800 text-white border-gray-600" 
          value={assignedToId}
          onChange={(e) => setAssignedToId(e.target.value)}
        >
          <option value="">Unassigned</option>
          {members.map(member => (
            <option key={member.id} value={member.id}>{member.username}</option>
          ))}
        </select>
      </div>
      
      <div className="modal-action">
        <button type="submit" className="btn btn-primary">Update Task</button>
      </div>
    </form>
  );
}