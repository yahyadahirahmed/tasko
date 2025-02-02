"use client";
import React from "react";
import LoginForm from "@/app/components/LoginForm";

export default function Login() {
  return (
    <div className="drawer drawer-end">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content relative min-h-screen bg-base-200">
        <div className="flex flex-col items-center justify-center min-h-screen gap-8">
          <div className="text-9xl font-black text-center">
            TASKO
          </div>
          <label 
            htmlFor="my-drawer-4" 
            className="drawer-button btn btn-primary"
          >
            Login Here!
          </label>
        </div>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
        <div className="menu bg-base-100 text-base-content min-h-full w-full md:w-1/2 p-8">
          <LoginForm/>
        </div>
      </div>
    </div>
  );
}

