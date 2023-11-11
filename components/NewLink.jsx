
'use client';
import React, { useState } from 'react';
import { useSession } from "next-auth/react";
import { toast } from 'sonner';
const NewLink = () => {
  const [userInput, setUserInput] = useState('');
  const [generatedLink, setGeneratedLink] = useState('');
  const { data: session, status } = useSession();

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };
  const createLink = async () => {
    try {
      const response = await fetch(`/api/links/new`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: session?.user?.id,
          userInput
        })
      });
  
      if (response.ok) {
        const responseData = await response.json();
        
        return responseData; 
      } else {
        console.log('Response not OK:', response.status);
      }
    } catch (error) {
      console.error('Error creating link:', error);
    }
  }
  
  const handleGenerateLink = async () => {
    const linkResponse = await createLink();
    if (linkResponse) {
      const newLink = `https://linkafy.vercel.app/${linkResponse._id}`;
      setGeneratedLink(newLink);
    } else {
      console.log('Link creation failed');
    }
  };
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        toast('Link copied to clipboard!');
      })
      .catch(err => {
        console.error('Failed to copy text: ', err);
      });
  }
  return (
    <div className="flex flex-col items-center justify-center p-5">
      <h2 className="text-lg font-bold mb-3">Enter Your Link</h2>
      <div className='flex gap-4'>
        <input
        type="text"
        value={userInput}
        onChange={handleInputChange}
        placeholder="Enter link here"
        className="px-10 py-2 border border-gray-300 rounded-md mb-3"
      />
      <button
        onClick={handleGenerateLink}
        className="bg-blue-500 text-white px-4 py-2 h-10 rounded hover:bg-blue-600 transition duration-300"
        disabled = {status !== 'authenticated'}
      >
        Generate
      </button>
      </div>
      {generatedLink && (
        <div className="mt-5 p-3 border border-gray-300 rounded w-full">
          <h3 className="text-md font-semibold">Generated Link:</h3>
          <p className="break-all cursor-pointer hover:text-black" onClick={() => copyToClipboard(generatedLink)}>{generatedLink}</p>
        </div>
      )}
    </div>
  );
};

export default NewLink;
