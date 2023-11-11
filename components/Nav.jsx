'use client';
import {useEffect} from 'react';
import { signIn, signOut, useSession } from "next-auth/react";
import { redirect } from 'next/navigation'

import {AiOutlineHome} from 'react-icons/ai'
import {BiLogOut} from 'react-icons/bi'
import {IoIosContact} from 'react-icons/io'

const Nav = () => {
    const handleSignIn = (e) => {
        e.preventDefault();
        signIn('google');
      };
  const handleSignOut = (e) => {
    e.preventDefault();
    signOut(); 
    redirect('/')
  };

  
  return (
    <nav className="fixed bottom-10 left-0 right-0 bg-gray-800 text-white p-3 mx-80 rounded-lg">
      <div className="flex justify-evenly">
        <a href="/profile" className="block text-center p-2 rounded hover:bg-gray-700"><AiOutlineHome/></a>
        <button className="block text-center p-2 rounded hover:bg-gray-700"><IoIosContact /></button>
        <button className="block text-center p-2 rounded hover:bg-gray-700" onClick={handleSignOut}><BiLogOut /></button>
      </div>
    </nav>
  )
}

export default Nav;
