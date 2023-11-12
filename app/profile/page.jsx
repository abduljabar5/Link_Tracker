'use client';
import React, { useEffect } from 'react';
import { signIn, signOut, useSession } from "next-auth/react";
import { redirect } from 'next/navigation'
import { toast } from 'sonner';
import Modal from '@/components/Modal';
import { IoIosAddCircleOutline } from 'react-icons/io';
import LinkList from '@components/LinkList';

const Page = () => {
  const { data: session, status } = useSession();
  // const router = useRouter();

  const [open, setOpen] = React.useState(false);
  const [rerun, setRerun] = React.useState(false);

  const handleOpen = () => {
    setOpen(!open);
    setRerun(!rerun);
  };

  useEffect(() => {
    if (status === 'unauthenticated') {
      toast("you're signed out!")
      redirect('/');
    }
  }, [status]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      {session && (
        <div className="flex items-center mb-4">
          <img src={session.user.image} alt={session.user.name} className="rounded-full w-10 h-10 mr-2" />
          <p className="text-xl font-semibold">Welcome, {session.user.name}</p>
        </div>
      )}
    <p className="text-xl font-semibold mb-4">Welcome to your profile</p>
    <div className="flex w-4/5 h-80 shadow-lg rounded-lg overflow-hidden">
      <div className="w-3/4 bg-blue-gray-100 overflow-y-auto p-4">
        <h2 className="text-lg font-semibold mb-4">Saved Links</h2>
       <LinkList rerun = {rerun}/>
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
