
'use client';
import React, { useState } from 'react';
import { useSession } from "next-auth/react";
import { toast } from 'sonner';
import {copyToClipboard} from '@utils/copy';
import { eslint } from '@next.config';
const NewLink = () => {
  const [userInput, setUserInput] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [activeInput, setActiveInput] = useState(true);
  const [generatedLink, setGeneratedLink] = useState('');
  const { data: session, status } = useSession();

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };
  const handleNameChange = (e) => {
    setNameInput(e.target.value);
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
          userInput,
          nameInput
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
    if (!activeInput){
       const linkResponse = await createLink();
    
    if (linkResponse) {
      const newLink = `https://linkafy.vercel.app/${linkResponse._id}`;
      setGeneratedLink(newLink);
    } else {
      console.log('Link creation failed');
    }
  } else {
    setActiveInput(false)
  }
  };
  return (
    <div className="flex flex-col items-center justify-center p-5">
      <h2 className="text-lg font-bold mb-3">Enter Your Link</h2>
      <div className='flex gap-4'>
        {activeInput ?  <input
        type="text"
        value={userInput}
        onChange={handleInputChange}
        placeholder="Enter link here"
        className="px-10 py-2 border border-gray-300 rounded-md mb-3"
      />  :  <input
      type="text"
      value={nameInput}
      onChange={handleNameChange}
      placeholder="Enter link name"
      className="px-10 py-2 border border-gray-300 rounded-md mb-3"
    />}
      
      <button
        onClick={handleGenerateLink}
        className="bg-blue-500 text-white px-4 py-2 h-10 rounded hover:bg-blue-600 transition duration-300"
        disabled = {status !== 'authenticated'}
      >
       {activeInput ? <p> Next</p> : <p>Generate</p>}
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
