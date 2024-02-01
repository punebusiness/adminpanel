"use client"
import Card from "./component/template"
import Form from "./component/form"
import {openContext,dataContext} from "./component/context"
import {useState} from "react"
export default function IdCard() {
const [open,setOpn] = useState("")
const [data,setData] = useState({name:'',fatherName:''})
  return (
    <div className="d-flex justify-center flex-column items-center bg-gray-100">
    <dataContext.Provider value={{data,setData}}>
    <openContext.Provider value={{open,setOpn}}>
        {open}
      <Form/>
    </openContext.Provider>
    </dataContext.Provider>
    </div>
  );
};

