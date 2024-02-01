"use client"
import Previewcard from "./front"
import Back from "./back"
import {useContext,useRef} from "react"
import {openContext} from "./context"
export default function Card(){
    const {open,setOpn} = useContext(openContext)
    return(
        <div>
        <div className="w-100 position-fixed top-0 left-0 d-flex flex-column h-screen bg-white justify-center items-center mb-5 pb-5">
        <div className="btns d-flex justify-evenly mb-3 mt-3">
            <button className="btn btn-danger rounded" onClick={()=>setOpn('')}>Close</button>&nbsp;&nbsp;
            <button className="btn btn-success rounded">Print</button>
        </div>
        <Previewcard/>
        <Back/>
        </div>
        </div>
    )
}