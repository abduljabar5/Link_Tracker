
'use client';
import React, {useEffect} from 'react';
import { signIn, signOut, useSession } from "next-auth/react";
import { redirect } from 'next/navigation'
import Modal from '@/components/Modal';
import {IoIosAddCircleOutline} from 'react-icons/io'

const Page = () => {
  const { data: session, status } = useSession();
  const savedLinks = ['Link 1', 'Link 2', 'Link 3', 'link 5', 'link 6',];

  const [open, setOpen] = React.useState(false);
 
  const handleOpen = () => setOpen(!open);

  useEffect(() => {
    if (status === 'unauthenticated'){
        redirect('/');
    }
  }, [status])
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
    <p className="text-xl font-semibold mb-4">Welcome to your profile</p>
    <div className="flex w-4/5 h-80 shadow-lg rounded-lg overflow-hidden">
      <div className="w-3/4 bg-blue-gray-100 overflow-y-auto p-4">
        <h2 className="text-lg font-semibold mb-4">Saved Links</h2>
        <ul className="space-y-2">
          {savedLinks.map((link, index) => (
            <li key={index} className="flex justify-between items-center bg-white p-2 rounded-lg shadow">
              {link}
              <button className="bg-blue-300 hover:bg-blue-500 text-white font-bold py-1 px-3 rounded inline-flex items-center">
                <span>View</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="w-1/4 flex justify-center items-center bg-blue-gray-50">
        <button
          className="bg-gray-500 hover:bg-gray-600 text-white p-4 rounded-full shadow-lg focus:outline-none focus:ring"
          onClick={handleOpen}
        >
          <IoIosAddCircleOutline className="text-6xl" />
        </button>
      </div>
    </div> 
    <Modal handleOpen = {handleOpen} open = {open} />
  </div>
  
  );
};

export default Page;
