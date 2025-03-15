"use client";
import React from "react";
import LoginForm from "@/app/components/LoginForm";
import gif from "@/public/tasko-image.gif";

export default function Login() {
  const openModal = () => {
    const modal = document.getElementById('my_modal_2') as HTMLDialogElement;
    if (modal) {
      modal.showModal();
    }
  };

  return (
    <div className="drawer drawer-end">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content relative min-h-screen bg-white">
        <main className="flex flex-col items-center justify-center min-h-screen gap-8">
          {/* Hero Section */}
          <section className="flex gap-20 items-center">
            {/* Branding */}
            <div className="flex flex-col px-12 mt-8">
              <h1 className="text-9xl text-gray-700 font-black">
                TASKO
              </h1>
              <div className="w-full flex justify-center">
                <code className="font-thin text-gray-400 mt-2">A Task Management Tool</code>
              </div>
               {/* CTA Button */}
          <button
            className="inline-block mx-auto p-4 bg-base-300 mt-12 border-2 border-transparent  hover:border-gray-400 rounded-xl hover:scale-110 font-bold hover:bg-gray-800 transition-transform"
            onClick={openModal}
          >
            Login Here!
          </button>
            </div>
            
            {/* Hero Image */}
            <img
              src={gif.src}
              alt="Tasko demonstration"
              className="rounded-lg object-contain"
              width={700}
              height={600}
            />
          </section>
          
          {/* Login Modal */}
          <dialog id="my_modal_2" className="modal">
            <div className="modal-box bg-base-300 border-2 border-gray-700 w-11/12 max-w-2xl">
              <LoginForm/>
            </div>
            <form method="dialog" className="modal-backdrop">
              <button>close</button>
            </form>
          </dialog>
        </main>
      </div>
    </div>
  );
}