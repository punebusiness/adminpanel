"use client"
import {useState,useRef} from "react"
import {toast,ToastContainer} from "react-toastify"
export default function AddBatch(){
    const sbtn = useRef()
    function handleSubmit(e){
        e.preventDefault()
        sbtn.disabled=true;
        let form = e.target;
        let obj = {
            instituteName:form[0].value,
            batchSize:form[1].value,
            batchType:form[2].value,
            courseName:form[3].value,
            courseDuration:form[4].value,
            batchStart:form[5].value,
            batchEnd:form[6].value,
            batchNumber:form[7].value,
            batchFees:form[8].value
        }
        fetch("/api/institute/batch",{
            method:"POST",
            body:JSON.stringify(obj),
            headers:{
                "Content-Type":"application/json"
            }
        }).then(res=>res.json()).then(dt=>{
            if(dt.error){
                toast.error(dt.message)
            }else{
                toast.success(dt.message)
            }
            sbtn.disabled=false;
        }).catch(err=>{
            toast.error(err.message)
            sbtn.disabled=false;
        })

    }
    return(
        <>
        <div className="rounded bg-slate-700 m-2 p-3 shadow-4">
            <form onSubmit={handleSubmit}>
                <label htmlFor="">Institute Name :</label>
                <input type="text" className="form-control mb-2" required/>
                <label htmlFor="">Batch Size :</label>
                <input type="text" className="form-control mb-2" required />
                <label htmlFor="">Batch Type :</label>
                <input type="text" className="form-control mb-2" required />
                <label htmlFor="">Course Name :</label>
                <input type="text" className="form-control mb-2" required />
                <label htmlFor="">Course Duration :</label>
                <input type="text" className="form-control mb-2" required />
                <label htmlFor="">Batch Start Date :</label>
                <input type="date" className="form-control mb-2" required />
                <label htmlFor="">Batch End Date :</label>
                <input type="date" className="form-control mb-2" required/>
                <label htmlFor="">Batch Number :</label>
                <input type="text" className="form-control mb-2" required/>
                <label htmlFor="">Batch Fees in Rupees :</label>
                <input type="number" className="form-control mb-2" required/>
                <button className="btn btn-primary rounded" type="submit" ref={sbtn}>Save Batch</button>
            </form>
        </div>
        <ToastContainer/>
        </>
    )
}