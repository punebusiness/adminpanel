"use client"
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const ProfileCard = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('/api/getuser');
        const data = await response.json();
        if (response.ok) {
          setUserData(data);
        } else {
          console.error('Failed to fetch user data:', data.error);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
   fetchUserData();
  }, []);

  if (!userData) {
    return <div>Loading...</div>;
  }

  const { name, email, phone, joining_date } = userData;

  return (
    <div className="max-w-md mx-auto bg-slate-500 p-8 shadow-md rounded-md text-white">
      <div className="flex items-center justify-center mb-4">
        <FontAwesomeIcon icon={faUser} size="4x" />
      </div>
      <h2 className="text-xl font-semibold mb-2">Name : {name}</h2>
      <p className="text-gray-200 mb-4">Email : {email}</p>
      <p className="text-gray-200 mb-4">Phone : {phone}</p>
      <p className="text-gray-200 mb-4">Admin Since : {new Date(joining_date).toLocaleString()}</p>
    </div>
  );
};

export default ProfileCard;
