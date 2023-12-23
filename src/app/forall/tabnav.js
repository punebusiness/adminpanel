import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus,
  faEye,
  faEdit,
} from '@fortawesome/free-solid-svg-icons';

import AddBatch from "./addbatch"

const BatchSideNav = () => {
  const [activeTab, setActiveTab] = useState('newBatch');

  const tabs = [
    { id: 'newBatch', label: 'New Batch', icon: faPlus },
    { id: 'viewBatch', label: 'View Batch', icon: faEye },
    { id: 'updateBatch', label: 'Update Batch', icon: faEdit },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'viewBatch':
        return <div>View Batch Content</div>;
      case 'updateBatch':
        return <div>Update Batch Content</div>;
      case 'newBatch':
      default:
        return <div><AddBatch/></div>;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex items-center mb-4 flex-wrap">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`cursor-pointer p-2 sm:p-4 ${
              activeTab === tab.id ? 'bg-gray-700 text-white' : 'bg-gray-500'
            } flex items-center mb-2 sm:mb-0`}
          >
            <FontAwesomeIcon icon={tab.icon} size="lg" />
            <span className="ml-2 hidden sm:inline-block">
              {tab.label}
            </span>
          </div>
        ))}
      </div>

      <div className="bg-slate-700 p-6 shadow-md rounded-md">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default BatchSideNav;
