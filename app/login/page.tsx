"use client";
import React from "react";
import LoginForm from "@/app/components/LoginForm";

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
      <div className="drawer-content relative min-h-screen bg-base-200">
        <main className="flex flex-col items-center justify-center min-h-screen gap-8">
          {/* Hero Section with overlapping text and video */}
          <section className="flex flex-col items-center justify-center relative w-full h-screen">
            {/* Video container */}
            <div className="w-[950px] mx-auto z-10 relative flex items-center justify-center">
              <video 
                src="/final.mp4" 
                className="w-full rounded-lg shadow-xl aspect-video object-cover border-2 border-gray-700" 
                autoPlay 
                loop 
                muted 
                playsInline
                ref={(el) => {
                  // Set playback speed when video element loads
                  if (el) {
                    el.playbackRate = 0.5; // Adjust this value to control speed (< 1 slower, > 1 faster)
                  }
                }}
              ></video>
              
              {/* TASKO text overlapping the video */}
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <h1 className="text-[25vw] font-black flex whitespace-nowrap text-white/40 mix-blend-overlay">
                  {/* Each letter with hover effect */}
                  <span className="hover:scale-105 text-white/80 transition-transform duration-300 hover:text-white/40">T</span>
                  <span className="hover:scale-105 text-white/80 transition-transform duration-300 hover:text-white/60">A</span>
                  <span className="hover:scale-105 text-white/80 transition-transform duration-300 hover:text-white/60">S</span>
                  <span className="hover:scale-105 text-white/80 transition-transform duration-300 hover:text-white/60">K</span>
                  <span className="hover:scale-105 text-white/80 transition-transform duration-300 hover:text-white/40">O</span>
                </h1>
              </div>
            </div>
            
            {/* Login button below video */}
            <button
              className="p-4 bg-base-300 mt-8 border-2 border-transparent hover:border-gray-400 rounded-xl hover:scale-110 font-bold hover:bg-gray-800 transition-transform z-10 relative"
              onClick={openModal}
            >
              Login Here
            </button>
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