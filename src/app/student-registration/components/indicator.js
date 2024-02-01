"use client"
import {useContext} from "react"
import {indicateContext} from "../context/indicatecontext"
export default function Indicate(){
    const prevColor = "rgb(155, 152, 155)";
    const nextColor = "lightGreen";
    const {status,setStatus} = useContext(indicateContext);
    return(
        <>
        <div className="indicator bg-dark">
            <div className="step1 text-white text-center"
            style={{
                backgroundColor:status.step1?nextColor:prevColor
            }}>
                Student Details
            </div>
            <div className="tick">
                <div className="rounded-circle bg-primary text-white">
                <i className="fa-solid fa-check m-1"></i>
                </div>
            </div>
            <div className="step2 text-white text-center"
            style={{
                backgroundColor:status.step2?nextColor:prevColor
            }}
            >
                Submit Documents
            </div>
            <div className="tick">
            <div className="rounded-circle bg-primary text-white">
                <i className="fa-solid fa-check m-1"></i>
                </div>
            </div>
            <div className="step3 text-white text-center"
            style={{
                backgroundColor:status.step3?nextColor:prevColor
            }}
            >Pay Fees</div>
        </div>
        </>
    )
}