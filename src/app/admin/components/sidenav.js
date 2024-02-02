"use client"
import React, { useState ,useContext} from 'react';
import {pathy} from "../../context"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import UserProfilePage from "./profile"
import InstituteTabs from "./institute/tabs"
import BatchSideNav from "../../forall/tabnav"
import StudentNav from "../../student/components/action"
import ProfilePage from "../../institute/component/profile"
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
  const {path} = useContext(pathy)
  // console.log(here);
  const there = path.split('/')[1]
  const [isMenuExpanded, setMenuExpanded] = useState(false);
  const [Content,setContent] = useState(there=='admin'?<UserProfilePage/>:there=='institute'?<ProfilePage/>:'')

  let menuItems = [
    { name: 'My Profile', icon: faUser ,content:there=='admin'?<UserProfilePage/>:there=='institute'?<ProfilePage/>:''},
    { name: 'Institute Section', icon: faUniversity ,content:there=='admin'?<InstituteTabs/>:'for institutes'},
    { name: 'Student Section', icon: faGraduationCap ,content:<StudentNav/>},
    { name: 'Fees Collection', icon: faMoneyBill ,content:"fees collection"},
    { name: 'Student Results', icon: faPoll ,content:"student result"},
    { name: 'Course Section', icon: faBookOpen,content:<BatchSideNav/> },
    { name: 'Notifications', icon: faBell,content:"notification" },
    { name: 'Complaints', icon: faExclamationCircle ,content:"complaints"},
    { name: 'Log Out', icon: faSignOutAlt,link:"/"},
  ];

  if(there!="admin"){
    delete menuItems[1]
  }
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
          <a href={`/api/logout?user=${there}`} key={index}>
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
