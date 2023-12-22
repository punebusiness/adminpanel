"use client"
import React, { useState,useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus,
  faEye,
  faEdit,
  faKey
} from '@fortawesome/free-solid-svg-icons';

import Add from "./add"
import InstituteList from "./showinstitute"
import {InContext} from "../../contexts/InstituteContext"
import UpdateIn from "./update"
import UpdatePass from "./updatepass"
const InstituteTabs = () => {
  const [activeTab, setActiveTab] = useState('addInstitute');
  const [institutes, setInstitutes] = useState([]);
  const apiUrl = '/api/admin/institute';
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        setInstitutes(data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  const tabs = [
    { id: 'addInstitute', label: 'Add Institute', icon: faPlus, content: <Add/> },
    { id: 'View Institutes', label: 'View Institutes', icon: faEye, content: <InstituteList/> },
    { id: 'Update', label: 'Update Institute', icon: faEdit, content: <UpdateIn/> },
    { id: 'Change Password', label: 'Change Password', icon: faKey, content:<UpdatePass/> },
  ];

  return (
    <InContext.Provider value={{institutes,setInstitutes}}>
    <div className="w-100 mx-auto p-4">
      <div className="flex items-center mb-4">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`cursor-pointer p-4 ${
              activeTab === tab.id ? 'bg-gray-700 text-white' : 'bg-gray-500'
            }`}
          >
            <FontAwesomeIcon icon={tab.icon} size="lg" />
            <span className="ml-2">{tab.label}</span>
          </div>
        ))}
      </div>

      <div className="bg-slate-500 p-6 shadow-md rounded-md">
        {tabs.find((tab) => tab.id === activeTab)?.content}
      </div>
    </div>
    </InContext.Provider>
  );
};

export default InstituteTabs;
