"use client"
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import UserProfilePage from "./profile"
import InstituteTabs from "./institute/tabs"
import {
  faUser,
  faGraduationCap,
  faUniversity,
  faBars,
  faTimes,
  faTachometerAlt,
  faMoneyBill,
  faBell,
  faExclamationCircle,
  faPoll,
  faBookOpen,
  faSignOutAlt
} from '@fortawesome/free-solid-svg-icons';

const SideNavigation = () => {
  const [isMenuExpanded, setMenuExpanded] = useState(false);
  const [Content,setContent] = useState(<UserProfilePage/>)

  const menuItems = [
    { name: 'My Profile', icon: faUser ,content:<UserProfilePage/>},
    { name: 'Institute Section', icon: faUniversity ,content:<InstituteTabs/>},
    { name: 'Student Section', icon: faGraduationCap ,content:"student page"},
    { name: 'Fees Collection', icon: faMoneyBill ,content:"fees collection"},
    { name: 'Student Results', icon: faPoll ,content:"student result"},
    { name: 'Course Section', icon: faBookOpen,content:"course section" },
    { name: 'Notifications', icon: faBell,content:"notification" },
    { name: 'Complaints', icon: faExclamationCircle ,content:"complaints"},
    { name: 'Log Out', icon: faSignOutAlt,link:"/"},
  ];
  const [active,setActive] = useState(0);
  return (
    <div className="flex bg-gray-800 text-white">
      <div
        className={`w-16 ${
          isMenuExpanded ? 'md:w-52' : 'md:w-22'
        } bg-gray-900 transition-all`}
      >
        <div
          className="p-4 cursor-pointer flex items-center"
          onClick={() => setMenuExpanded(!isMenuExpanded)}
        >
          <FontAwesomeIcon icon={isMenuExpanded ? faTimes : faBars} />
          {isMenuExpanded && <span className="ml-2">Dashboard</span>}
        </div>

        {/* Icons with Names */}
        {menuItems.map((item, index) => (
          item.link?
          <a href="/logout" key={index}>
          <div
          className={`p-4 hover:bg-gray-700 transition-all cursor-pointer ${active===index?'bg-gray-500':''}`}
          onClick = {()=>{
            setActive(index);
            setContent(item.content);
          }}
        >
          <FontAwesomeIcon icon={item.icon} size="lg" />
          {isMenuExpanded && <span className="ml-2">{item.name}</span>}
        </div></a>:
                  <div
                  key={index}
                  className={`p-4 hover:bg-gray-700 transition-all cursor-pointer ${active===index?'bg-gray-500':''}`}
                  onClick = {()=>{
                    setActive(index);
                    setContent(item.content);
                  }}
                >
                  <FontAwesomeIcon icon={item.icon} size="lg" />
                  {isMenuExpanded && <span className="ml-2">{item.name}</span>}
                </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4">
        {Content}
      </div>
    </div>
  );
};

export default SideNavigation;