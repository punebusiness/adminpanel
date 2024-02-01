import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Register from "../../student-registration/main"
import ShowStudents from "../../student-registration/components/data"
import {
  faPlus,
  faEye,
  faSearch,
  faEdit
} from '@fortawesome/free-solid-svg-icons';

const StudentNav = () => {
  const [activeTab, setActiveTab] = useState('Register');

  const tabs = [
    { id: 'Register', label: 'Registration', icon: faPlus },
    { id: 'Action', label: 'Action', icon: faEdit },
    { id: 'Search', label: 'Search', icon: faSearch },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Register':
        return <div><Register/></div>;
      case 'Action':
        return <div style={{overflow:'scroll'}}><ShowStudents/></div>;
      case 'Search':
      default:
        return <div>search</div>;
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

export default StudentNav;
