"use client"
import {useRef} from "react"
import {toast,ToastContainer} from "react-toastify"
export function UpdatePassword(){
    const uform = useRef()
    const sbtn = useRef();
    function handleSubmit(e){
        e.preventDefault()
        sbtn.current.disabled = true;
        let obj = {
            prevPass:uform.current[0].value,
            newPass:uform.current[1].value,
            cnewPass:uform.current[2].value
        }
        if(obj.newPass===obj.cnewPass){
            // process
            fetch("/api/admin/crud",{
                method:"PUT",
                body:JSON.stringify({
                    prevPass:obj.prevPass,
                    newPass:obj.newPass
                }),
                headers:{
                    "Content-Type":"application/json"
                }
            }).then(resp=>resp.json())
            .then(data=>{
               if(data.error){
                toast.error(data.message)
               }else{
                toast.success("Password changed succesfully!")
                sbtn.current.disabled = false;
                uform.current.reset();
               }
                sbtn.current.disabled = false;

            })
            .catch(err=>{
                toast.error(err.message??"Oops! something went wrong.")
                 sbtn.current.disabled = false;
            })
        }else{
            toast.error("Password must match!")
        sbtn.current.disabled = false;

        }

    }
    return (
        <>
        <div className="shadow rounded bg-slate-700 flex flex-column p-5">
            <form ref={uform} onSubmit={handleSubmit}>
                <div>
                    <label>Current Password</label><br/>
                    <input type="password" className="form-control mb-2" />
                </div>
                <div>
                    <label>New Password</label><br/>
                    <input type="password" className="form-control mb-2" />
                </div>
                <div>
                    <label>Confirm New Password</label><br/>
                    <input type="password" className="form-control mb-2" />
                </div>
                <button className="btn btn-primary rounded-pill" type="submit" ref={sbtn}>Update Password</button>
            </form>
        </div>
        <ToastContainer/>
        </>
    )
}