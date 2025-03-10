'use client';
import React from 'react'
import EditTaskForm from './EditTaskForm';

interface Props {
  taskId: string;
}

export default function EditTaskButton({ taskId }: Props) {
  const modalId = `edit_modal_${taskId}`;
  return (
    <>
      <button className="btn btn-info min-h-0 h-8" onClick={() => {
        const modal = document.getElementById(modalId) as HTMLDialogElement;
        if (modal) {
          modal.showModal();
        }
      }}>EDIT</button>
      
      <dialog id={modalId} className="modal w-full h-full">
        <div className="modal-box relative bg-base-300 border-2 border-gray-900">
          <EditTaskForm taskId={taskId} modalId={modalId}/>
        </div>
        <form method="dialog" className="modal-backdrop bg-base-300/90">
          <button className="cursor-default w-screen h-screen">close</button>
        </form>
      </dialog>
    </>
  )
}