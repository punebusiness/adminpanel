"use client"
import React, { useEffect, useState } from 'react';

const ProfilePage = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/institute/api');
        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.statusText}`);
        }

        const data = await response.json();
        setProfileData(data.data);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-600">
      {loading ? (
        <p className="text-slate-800">Loading profile data...</p>
      ) : profileData ? (
        <div className="bg-white p-8 rounded shadow-md w-96">
          <img
            className="w-24 h-24 rounded-full mx-auto mb-4"
            src={profileData.logo}
            alt="Institute Logo"
          />
          <h2 className="text-xl font-bold text-gray-800 mb-2">{profileData.name}</h2>
          <p className="text-gray-600 mb-4">{profileData.address}</p>
          <p className="text-gray-600 mb-4">Email: {profileData.email}</p>
          <p className="text-gray-600 mb-4">Phone: {profileData.phone}</p>
          <p className="text-gray-600 mb-4">TC Number: {profileData.tcnumber}</p>
        </div>
      ) : (
        <p className="text-gray-800">Failed to load profile data.</p>
      )}
    </div>
  );
};

export default ProfilePage;
