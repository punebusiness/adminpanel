"use client"
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus,
  faEdit,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';

const InstituteTabs = () => {
  const [activeTab, setActiveTab] = useState('addInstitute');

  const tabs = [
    { id: 'addInstitute', label: 'Add Institute', icon: faPlus, content: 'Add Institute Form Goes Here' },
    { id: 'updateInstitute', label: 'Update Institute', icon: faEdit, content: 'Update Institute Form Goes Here' },
    { id: 'deleteInstitute', label: 'Delete Institute', icon: faTrash, content: 'Delete Institute Form Goes Here' },
  ];

  return (
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
  );
};

export default InstituteTabs;
