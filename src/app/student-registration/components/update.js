"use client"
import {useContext,useRef,useEffect} from "react"
import {studentContext,idContext,updateContext,signalContext,modalContext} from "../../context"
import {toast} from "react-toastify"
export default function UpdateStudent(){
    const {signal,setSignal} = useContext(signalContext)
    const {modal,setModal} = useContext(modalContext)
    const uform = useRef()
    const {childs,setChilds} = useContext(studentContext)
    const {id,setId} = useContext(idContext)
    const {updateId,setUpdateId} = useContext(updateContext)
    let ftr = childs.data.filter(e=>e.id==updateId)
    const sbtn = useRef()
    useEffect(()=>{
        if(ftr.length<1)return;
        Array.from(uform.current).map(el=>{
            let attr = el.getAttribute('name')
            el.value=ftr[0][attr];
        })
    },[updateId])
    function handleSubmit(e){
        e.preventDefault()
        sbtn.current.disabled=true;
        let dt = Object.fromEntries(Array.from(new FormData(e.target)))
        fetch('/student-registration/api/update',{
            "method":"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({...dt,id:updateId})
        }).then(res=>res.json())
        .then(dt=>{
            if(dt.error){
                toast.error(dt.message)
            }else{
                toast.success(dt.message)
                setSignal(Math.random()*50)
                setModal(false)
            }
        sbtn.current.disabled=false;

        }).catch(err=>{
            toast.error(err.message)
        sbtn.current.disabled=false;

        })
    }
    return(
        <>
        <form className="bg-slate-800 text-white" onSubmit={handleSubmit} ref={uform}>
        <div className="fxn">
            <div>
                <label htmlFor="name">Student Name :</label><br />
                <input type="text" name="name" className="input-field" required />
            </div>
            <div>
                <label htmlFor="email">Student Email :</label><br />
                <input type="email" name="email" className="input-field" required />
            </div>
        </div>
        <div className="fxn">
            <div>
                <label htmlFor="contactNumber">Contact Number :</label><br />
                <input type="tel" name="contactNumber" className="input-field" required />
            </div>
            <div>
                <label htmlFor="fatherName">Father Name :</label><br />
                <input type="text"  name="fatherName" className="input-field" required />
            </div>
        </div>
        <div className="fxn">
            <div>
                <label htmlFor="motherName">Mother Name :</label><br />
                <input type="text"  name="motherName" className="input-field" required />
            </div>
            <div>
                <label htmlFor="state">State :</label><br />
                <input type="text"  name="state" className="input-field" required />
            </div>
        </div>
        <div className="fxn">
            <div>
                <label htmlFor="district">District :</label><br />
                <input type="text"  name="district" className="input-field" required />
            </div>
            <div>
                <label htmlFor="taluka">Taluka :</label><br />
                <input type="text"  name="taluka" className="input-field" required />
            </div>
        </div>
        <div className="fxn">
            <div>
                <label htmlFor="contactNumber">Aadhar Number :</label><br />
                <input type="number" name="aadhar" className="input-field" required />
            </div>
            <div>
                <label htmlFor="fatherName">Pincode :</label><br />
                <input type="text" name="pincode" className="input-field" required />
            </div>
            </div>
        <div className="fxn">
            <div>
                <label htmlFor="postOffice">Post Office :</label><br />
                <input type="text" name="postOffice" className="input-field" required />
            </div>
            <div>
                <label>Home Address :</label><br />
                <input type="text" name="address" className="input-field" required />
            </div>
        </div>
        <button className="btn btn-primary rounded" type="submit" ref={sbtn}>
            Update
        </button>
    </form>
    </>
    )
}