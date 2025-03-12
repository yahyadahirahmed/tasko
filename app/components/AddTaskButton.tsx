'use client';
import React from 'react'
import AddTaskForm from './AddTaskForm';

interface Props {
  teamId: string;
}

export default function AddTaskButton({ teamId }: Props) {
  return (
    <>
        <button className=" mr-4 px-3 py-2 text-md font-bold bg-blue-700 hover:bg-bluye rounded" onClick={()=> {
            const modal = document.getElementById('my_modal_3') as HTMLDialogElement;
            if (modal) {
                modal.showModal();
                }
        }}>Add Task</button>
        
        <dialog id="my_modal_3" className="modal">
          <div className="modal-box">
            <AddTaskForm teamId={teamId} />
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
    </>
  )
}