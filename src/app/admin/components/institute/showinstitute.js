"use client"
import React, { useState, useEffect,useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import {toast,ToastContainer} from "react-toastify"
import {InContext} from "../../contexts/InstituteContext"
const InstituteList = () => {
const {institutes,setInstitutes}  = useContext(InContext)
  const handleDelete = async (id) => {
    let apilink = "/api/admin/institute";
    fetch(apilink,{
        method:"DELETE",
        body:JSON.stringify({id:id}),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(resp=>resp.json())
    .then(dt=>{
        if(dt.error){
            toast.error(dt.message)
        }else{
            toast.success(dt.message)
            let ft = institutes.filter(ins=>ins.id!=id);
            setInstitutes(ft)
        }
    }).catch(err=>{
        toast.error(err.message??"Something Went Wrong!")
    })
  };

  return (
    <div className="flex flex-wrap">
      {institutes.map((institute) => (
        <div key={institute.id} className="max-w-sm mx-auto bg-white shadow-lg rounded-md overflow-hidden m-4">
          <img src={institute.logo} alt="Institute Logo" className="w-full h-32 object-cover" />
          <div className="p-4">
            <h3 className="text-xl font-semibold text-black">{institute.name}</h3>
            <p className="text-gray-600">Email : {institute.email}</p>
            <p className="text-gray-600">Phone : {institute.phone}</p>
            <p className="text-gray-600">Address : {institute.address}</p>
            <p className="text-gray-600">TC Number : {institute.tcnumber}</p>
            <p className="text-gray-600">Member Since : {institute.created_at}</p>
            <div className="flex mt-4">
              {/* FontAwesome delete icon */}
              <button onClick={() => handleDelete(institute.id)} className="text-red-500">
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          </div>
        </div>
      ))}
      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
};

export default InstituteList;
