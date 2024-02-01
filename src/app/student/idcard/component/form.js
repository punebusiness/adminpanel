"use client";
import React,{ useRef, useContext } from "react";
import { toast, ToastContainer } from "react-toastify";
import { dataContext, openContext } from "./context";
import Card from "./template"
export default function Form() {
  const { data, setData } = useContext(dataContext);
  const { open, setOpn } = useContext(openContext);
  const aadhar = useRef();
  const gen = useRef();

  // State for button disabled
  const [isButtonDisabled, setButtonDisabled] = React.useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    
    // Disable button
    setButtonDisabled(true);

    fetch('/student-registration/api/update?aadhar=' + aadhar.current.value)
      .then((res) => res.json())
      .then((dt) => {
        if (dt.error) {
          toast.error(dt.message);
        } else {
          console.log(dt.data);
          setData(dt.data);
          setOpn(<Card/>);
        }
        
        // Enable button
        setButtonDisabled(false);
      })
      .catch((err) => {
        toast.error(err.message);
        
        // Enable button
        setButtonDisabled(false);
      });
  }

  return (
    <>
      <ToastContainer />
      <form className="bg-slate-800 p-5 rounded" onSubmit={handleSubmit}>
        <h2 className="underline text-white mb-3">Id Card Generator</h2>
        <label htmlFor="aadhar">Enter Aadhar Number :</label>
        <input type="number" className="form-control mb-2" ref={aadhar} required />
        <button
          className="btn btn-primary rounded"
          ref={gen}
          disabled={isButtonDisabled}
        >
          Generate Id Card
        </button>
      </form>
    </>
  );
}
