"use client";
import React from "react";
import LoginForm from "@/app/components/LoginForm";

export default function Login() {
  return (
    <div className="drawer drawer-end">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content relative min-h-screen bg-base-200">
        <div className="flex flex-col items-center justify-center min-h-screen gap-8">
          <div className="text-9xl text-gray-400 font-black text-center">
            TASKO
          </div>
          <code><p className="font-thin text-gray-400">A Task Management Tool</p></code>
          {/* Open the modal using document.getElementById('ID').showModal() method */}
<button className=" p-4 rounded-xl  hover:scale-105 font-bold bg-green-600 hover:bg-green-600" onClick={() => {
  const modal = document.getElementById('my_modal_2') as HTMLDialogElement;
  if (modal) {
    modal.showModal();
  }
}}>Login Here!</button>
<dialog id="my_modal_2" className="modal">
  <div className="modal-box bg-base-300 border-2 border-gray-900 w-11/12 max-w-2xl">
   <LoginForm/>
  </div>
  <form method="dialog" className="modal-backdrop">
    <button>close</button>
  </form>
</dialog>
        </div>
      </div>
    </div>
  );
}

