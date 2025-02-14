'use client';
import React from 'react'
import AddTaskForm from './AddTaskForm';


export default function AddTaskButton() {
  return (
    <>
        <button className="btn" onClick={()=> {
            const modal = document.getElementById('my_modal_3') as HTMLDialogElement;
            if (modal) {
                modal.showModal();
                }
        }}>Add Task</button>
        
        <dialog id="my_modal_3" className="modal">
          <div className="modal-box">
            <AddTaskForm />
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
    </>
  )
}