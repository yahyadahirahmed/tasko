'use client'
import React, { useState, useEffect } from 'react';
import AccountDetail from './AccountDetailPage';

interface Props {
    userId?: string;
}

export default function AccountDetailButton({ userId }: Props) {
    return (
        <>
            <button 
                className="btn"
                onClick={() => {
                    const modal = document.getElementById('account_modal') as HTMLDialogElement;
                    if (modal) {
                        modal.showModal();
                    }
                }}
            >
                Account
            </button>

            <dialog id="account_modal" className="modal">
                <div className="modal-box bg-base-300 border-2 border-gray-900">
                    <h3 className="font-bold text-lg">Account Details</h3>
                    <AccountDetail userId={userId} />
                </div>
                <form method="dialog" className="modal-backdrop bg-base-300/90">
                    <button className="cursor-default w-full h-full">close</button>
                </form>
            </dialog>
        </>
    );
}