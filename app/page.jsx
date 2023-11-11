'use client';
import {useEffect} from 'react';
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from 'next/navigation'
export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter()
  const handleSignIn = (e) => {
    e.preventDefault();
    signIn('google'); 
  };

  const handleSignOut = (e) => {
    e.preventDefault();
    signOut(); 
  };

  useEffect(() => {
    if ( status === 'authenticated'){
      router.push('/profile')
    }
  }, [status])
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {!session ? (
        <button 
          className="px-6 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring"
          onClick={handleSignIn}>
          Sign in with Google
        </button>
      ) : (
        <div>
          <p className="mb-4 text-xl">Hello, {session.user.name}</p>
          <button 
            className="px-6 py-2 text-white bg-red-500 rounded hover:bg-red-600 focus:outline-none focus:ring"
            onClick={handleSignOut}>
            Sign out
          </button>
        </div>
      )}
    </main>
  );
}

