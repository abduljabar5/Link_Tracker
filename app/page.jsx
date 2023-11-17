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
    <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to Link Tracker!</h1>
        <p className="text-lg text-gray-600 mb-8 px-4">
            Easily manage and track your links. Sign in to get started and gain insights into your link activity.
        </p>
        {/* <img src="https://media.licdn.com/dms/image/D562DAQF-XnK5ey8bew/profile-treasury-image-shrink_800_800/0/1699816379289?e=1700676000&v=beta&t=jwm6g_klzJgtXDN8_3x9TGM_i3mXRX1XXR_wMF26Ar4" alt="Link Tracker Visualization" className=" mx-auto mb-8 w-1/3 rounded-lg shadow-lg"/> */}
        <video autoPlay loop muted className=" mx-auto mb-8 sm:w-2/3 md:w-2/3 lg:w-1/3 xl:w-autorounded-lg shadow-lg" src='/video.webm'></video>
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
    </div>
</main>

  );
}

