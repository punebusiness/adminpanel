"use client"
import React, { useState,useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faUser } from '@fortawesome/free-solid-svg-icons';
import {toast,ToastContainer} from "react-toastify"
const AdminList = () => {
  const [admins, setAdmins] = useState([]);
useEffect(()=>{
    fetch("/api/admin/crud").then(res=>res.json()).then(data=>{
        setAdmins(data.data)
    })
},[admins])
  const deleteAdmin = (adminId) => {
    fetch("/api/admin/crud",{
      method:"DELETE",
      body:JSON.stringify({id:adminId}),
      headers:{
        "Content-Type":"application/json"
      }
    }).then(resp=>resp.json())
    .then(data=>{
      toast.success(`Admin with id ${adminId} deleted succesfully!`)
    }).catch(err=>{
      toast.error(err.message??"Something went wrong!")
    })
    setAdmins((prevAdmins) => prevAdmins.filter((admin) => admin.id !== adminId));
  };

  return (
    <div className="flex flex-wrap justify-center">
      {admins.map((admin) => (
        <div key={admin.id} className="max-w-xs mx-4 my-4 overflow-hidden bg-slate-700 text-white shadow-lg rounded-lg" style={{width:"50%"}}>
          <div className="px-6 py-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center" >
                <div className="mr-4">
                  <FontAwesomeIcon
                    icon={faTrash}
                    onClick={() => deleteAdmin(admin.id)}
                    className="cursor-pointer text-red-500"
                  />
                </div>
                <div>
                  <div className="font-bold text-xl">{admin.name}</div>
                  <span className="underline">Email :</span>
                  <div className="text-sm">{admin.email}</div>
                  <span className="underline">Phone :</span>
                  <div className="text-sm">{admin.phone}</div>
                  <span className="underline">Admin Since :</span>
                  <div className="text-sm">{`${new Date(admin.joining_date)}`}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
            <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
};

export default AdminList;
