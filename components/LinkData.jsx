'use client';
import React, { useState, useEffect } from 'react';
import { getGeolocation } from '@utils/geolocation';

const LinkData = ({ data }) => {
  const [geoData, setGeoData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (data.ipAddress) {
      setLoading(true);
      getGeolocation(data.ipAddress)
        .then(response => {
          setGeoData(response);
          setLoading(false);
        })
        .catch(error => {
          console.error("Error fetching geolocation:", error);
          setLoading(false);
        });
    }
  }, [data.ipAddress]);

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

        <div className="block mt-3">
            <span className="text-gray-700">Creator ID:</span>
            <span className="text-gray-600"> {data.creator}</span>
        </div>

        <div className="block mt-3">
            <span className="text-gray-700">IP Address:</span>
            <span className="text-gray-600"> {data.ipAddress}</span>
        </div>
        {loading ? (
          <p>Loading geolocation data...</p>
        ) : (
          geoData && (
            <div className="block mt-3">
              <span className="text-gray-700">Location:</span>
              <span className="text-gray-600"> {geoData.city}, {geoData.region} ({geoData.country})</span>
            </div>
          )
        )}
        <div className="block mt-3">
            <span className="text-gray-700">Created At:</span>
            <span className="text-gray-600"> {new Date(data.createdAt).toLocaleString()}</span>
        </div>

        <div className="block mt-3">
            <span className="text-gray-700">Last Viewed:</span>
            <span className="text-gray-600"> {new Date(data.timestamp).toLocaleString()}</span>
        </div>
    </div>
</div>

  )
}

export default LinkData