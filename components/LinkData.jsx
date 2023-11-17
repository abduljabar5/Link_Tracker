'use client';
import React, { useState } from 'react';
import {
  Dialog,
  DialogHeader,
  DialogBody,
} from "@material-tailwind/react";

const LinkData = ({ data }) => {
  const [openDialogIndex, setOpenDialogIndex] = useState(null);

  const handleOpen = (index) => {
    setOpenDialogIndex(index);
  };
  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl my-10">
      <div className="p-8">
        <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Link Details</div>

        <div className="block mt-3">
          <span className="text-gray-700">Generated Link:</span>
          <a href={`https://linkafy.vercel.app/${data._id}`} target='blank' className="text-blue-600 hover:text-blue-800 visited:text-purple-600">{`https://linkafy.vercel.app/${data._id}`}</a>
        </div>

        <div className="block mt-3">
          <span className="text-gray-700">Original URL:</span>
          <a href={data.originalUrl} target='blank' className="text-blue-600 hover:text-blue-800 visited:text-purple-600">{data.originalUrl}</a>
        </div>

        <div className="block mt-3">
          <span className="text-gray-700">Clicks:</span>
          <span className="text-gray-600"> {data.clicks}</span>
        </div>
{/* 
        <div className="block mt-3">
          <span className="text-gray-700">Creator ID:</span>
          <span className="text-gray-600"> {data.creator}</span>
        </div> */}

        <div className="block mt-3">
          <span className="text-gray-700">IP Address:</span>
          <span className="text-gray-600"> {data.ipAddress}</span>
        </div>
        <div className=" flex mx-auto gap-4 w-11/12 overflow-x-scroll" >
        {data.location.map((location, index) => (
          <div className='flex flex-row'>
        <React.Fragment key={index}>
          
          <p className=' cursor-pointer p-2 bg-blue-gray-500 my-1 w-20 text-white text-center rounded-md' onClick={() => handleOpen(index)}>
            Entry {index}
          </p>
          {openDialogIndex === index && (
            <Dialog open={true} handler={() => handleOpen(null)}>
              <DialogHeader>Entry {index}</DialogHeader>
              <DialogBody>
                <div className="block mt-3">
                  <span className="text-gray-700">Last Viewed:</span>
                  <span className="text-gray-600"> {new Date(location.timestamp).toLocaleString()}</span>
                </div>
                <div className="block mt-3">
                  <span className="text-gray-700">Location:</span>
                  <span className="text-gray-600"> {location.city}, {location.region} ({location.country})</span>
                </div>
              </DialogBody>
            </Dialog>
          )}
        </React.Fragment>
        </div>
      ))}
</div>

        <div className="block mt-3">
          <span className="text-gray-700">Created At:</span>
          <span className="text-gray-600"> {new Date(data.createdAt).toLocaleString()}</span>
        </div>
        {/* <div className="block mt-3">
          <span className="text-gray-700">Last Viewed:</span>
          <span className="text-gray-600"> {new Date(data.timestamp).toLocaleString()}</span>
        </div> */}
      </div>
    </div>

  )
}

export default LinkData