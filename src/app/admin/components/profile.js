"use client"
import ProfileSection from "./profilecard"
import AddAdminForm from "./addadmin"
import UpdateUserForm from "./update"
import AdminList from "./adminlist"
import React, { useState } from 'react';
import {UpdatePassword} from "./updatepass"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faUserPlus,
  faKey,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';

const UserProfilePage = () => {
  const [activeTab, setActiveTab] = useState('myProfile');

  const tabs = [
    { id: 'myProfile', label: 'My Profile', icon: faUser },
    { id: 'editProfile', label: 'Edit Profile', icon: faUser },
    { id: 'addNewAdmin', label: 'Add New Admin', icon: faUserPlus },
    { id: 'changePassword', label: 'Change Password', icon: faKey },
    { id: 'allAdmins', label: 'All Admins', icon: faUsers },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'addNewAdmin':
        return <div><AddAdminForm/></div>;
      case 'changePassword':
        return <div><UpdatePassword/></div>;
      case 'allAdmins':
        return <div><AdminList/></div>;
      case 'editProfile':
        return <div><UpdateUserForm/></div>;
      default:
        return <div><ProfileSection/></div>
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

export default UserProfilePage;
