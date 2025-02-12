"use client";
import React from 'react';
import { useRouter } from "next/navigation";

export default function page() {
    const router = useRouter();
    const change = () => {
        router.push("/member")

    }
  return (
    <>
    <div className='text-black'>Memberpage</div>
    <button onClick={change} className='text-black'>
        redirect
        </button>
    </>
  )
}
