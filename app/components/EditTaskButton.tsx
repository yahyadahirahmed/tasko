'use client';
import React from 'react'
import EditTaskForm from './EditTaskForm';

interface Props {
  taskId: string;
}

export default function EditTaskButton({ taskId }: Props) {
  return (
    <>
        <button className="btn" onClick={()=> {
            const modal = document.getElementById('my_modal_4') as HTMLDialogElement;
            if (modal) {
                modal.showModal();
                }
        }}>edit task</button>
        
        <dialog id="my_modal_4" className="modal">
          <div className="modal-box">
            <EditTaskForm taskId={taskId} />
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
    </>
  )
}