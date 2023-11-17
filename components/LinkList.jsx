'use client'

import React, { useEffect, useState } from 'react'
import {copyToClipboard} from '@utils/copy';
import { useSession } from "next-auth/react";
import Modal from '@/components/Modal';
const LinkList = (rerun) => {
    const [open, setOpen] = React.useState(false);
    const { data: session, status } = useSession();
    const [loading, setLoading] = useState(true);
    const [newData, setNewData] = useState(undefined)
    const [activeModalId, setActiveModalId] = useState(null);

    const handleOpen = (id) => {
        if (activeModalId === id) {
            setActiveModalId(null); // Close the modal if it's already open
        } else {
            setActiveModalId(id); // Open the new modal
            setOpen(!open)
        }
    };
    const fetchLinks = async () => {
        try {
            const response = await fetch(`/api/${session?.user?.id}`, { cache: 'no-store' });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setNewData(data);
            setLoading(false);
        } catch (error) {
            console.error('Fetch Error: ', error);
        }
    };
    useEffect(() => {
     if(session?.user){fetchLinks()}
    }, [status === 'authenticated', rerun, open])
    return (
        <div>
            {loading ? <div>Loading...</div> :
                <ul className="space-y-2">
                    {[...newData].reverse().map((link, index) => (
                        <div key={index}><h4 >Name: {link.name}</h4>
                        <li className="flex justify-between items-center bg-white p-2 rounded-lg shadow">

                            <p className='break-all cursor-pointer text-gray-700 hover:text-black' onClick={() => copyToClipboard(`https://linkafy.vercel.app/${link._id}`)}> https://linkafy.vercel.app/{link._id}</p>
                            <button
                                className="bg-blue-300 hover:bg-blue-500 text-white font-bold py-1 px-3 rounded inline-flex items-center"
                                onClick={() => handleOpen(link._id)}>
                                <span>View</span>
                            </button>
                            {activeModalId === link._id && <Modal handleOpen={() => handleOpen(null)} data={link} open={open} />}
                        </li></div>
                    ))}
                </ul>
            }
        </div>

    )
}

export default LinkList