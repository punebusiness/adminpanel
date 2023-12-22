"use client"
import {useState,useContext,useRef} from "react"
import {InContext} from "../../contexts/InstituteContext"
import {toast,ToastContainer} from "react-toastify"
export default function UpdatePass(){
    const sbtn = useRef()
    const id = useRef()
    const {institutes} = useContext(InContext)
    function handleSubmit(e){
        e.preventDefault()
        sbtn.disabled=true;
        let form = e.target;
        if(form[0].value==form[1].value){
            let obj = {
                id:id.current.value,
                password:form[0].value
            }
            fetch("/api/admin/institute",{
                method:"PUT",
                body:JSON.stringify(obj),
                headers:{
                    "Content-Type":"application/json"
                }
            }).then(x=>x.json())
            .then(dt=>{
                if(dt.error){
                    toast.error(dt.message)
                }else{
                    toast.success("Password changed succesfully!")
                }
            }).catch(err=>{
                toast.error(err.message)
            })
        }else{
            toast.error("Password must match!")
        }
        sbtn.disabled=false;
    }
    return(
        <div className="shadow-4 rounded bg-slate-700 m-3 p-3">
            <label htmlFor="">Select Institute</label>
            <select className="form-control mb-2" ref={id}>
                {
                    institutes.map(e=>(
                        <option value={e.id}>Id : {e.id} / name : {e.name}</option>
                    ))
                }
            </select>
            <form onSubmit={handleSubmit} autoComplete="new-password">
                <label htmlFor="">New Password</label>
                <input type="password" class="form-control mb-2" />
                <label htmlFor="">Confirm Password</label>
                <input type="password" class="form-control mb-2" />
                <button className="btn btn-primary rounded" type="submit" ref={sbtn}>
                    Update
                </button>

            </form>
            <ToastContainer/>
        </div>
    )
}