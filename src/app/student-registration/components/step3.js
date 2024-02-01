"use client"
import Image from "next/image"
const fileTypes = ["JPG","JPEG", "PNG"];
import {useContext,useRef} from "react"
import {dataContext,loadContext,apiContext} from "../context/indicatecontext"
import {toast} from "react-toastify"
import {FileUploader} from "react-drag-drop-files"
import UploadLoad from "./uploadloading"
export default function Step3(){
const payId = useRef()
const pwd = useRef()
const cpwd = useRef()
const sbtn = useRef()
const {data,setData} = useContext(dataContext)
const {load,setLoad} = useContext(loadContext)
const {batches,setBatches} = useContext(apiContext)
function handleSubmit(e){
    e.preventDefault()
    sbtn.current.disabled=true
    if(pwd.current.value!=cpwd.current.value){
        toast.error("Password Not Matched")
        sbtn.current.disabled=false
        return;
    };
    if(pwd.current.value.length<6){
        toast.error("Password must be atleast 6 character")
        sbtn.current.disabled=false
        return;
    }
    let newObj = {
        created_on:new Date(),
        payId:payId.current.value,
        approved:false,
        password:pwd.current.value,
        verified:false
    }
    setData({...data,...newObj})
    console.log({...data,...newObj});
    fetch("/student-registration/api",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({...data,...newObj})

    }).then(res=>res.json())
    .then(dt=>{
        if(dt.error){
            toast.error(dt.message)
        }else{
            toast.success(dt.message)
        }
        sbtn.current.disabled=false
    }).catch(err=>{
        toast.error(err.message)
        sbtn.current.disabled=false
    })
}
const feetopay = batches.data.filter(batch=>{
   return batch.courseName===data.courseName&&batch.instituteName===data.selectInstitute&&batch.courseDuration===data.courseDuration&&batch.batchNumber===data.selectBatch;
})[0].batchFees;
    function handleChange(e){
        let file = e.target.files[0]
        if(!file.type.match(/image\/*/)){
            toast.error("Invalid File")
            return;
        }
        setLoad(<UploadLoad/>)
        let fr = new FileReader()
        fr.onload=()=>{
            let result = fr.result.split('base64,')[1];
            let obj = {
                b64:result,
                name:file.name,
                type:file.type,
                folder:process.env.NEXT_PUBLIC_DRIVE_FEE
            }
            fetch(process.env.NEXT_PUBLIC_API_DOC,{
                method:"POST",
                body:JSON.stringify({data:[obj]})
            }).then(res=>res.json())
            .then(dt=>{
                if(dt.error){
                    toast.error(dt.message)
                }else{
                    setData({...data,paymentProff:JSON.stringify({data:dt.data})})
                    toast.success(dt.message)
                }
                setLoad("")
            }).catch(err=>{
                toast.error(err.message)
                setLoad("")
            })
        }
        fr.readAsDataURL(file)
    }
    return (
        <>
        <form className="bg-slate-800 d-flex items-center justify-center" onSubmit={handleSubmit}>
            <div className="qrcode w-50 sm:w-100">
                <h2 className="mb-2 text-white">Scan Qr Code and Submit Refrence Id</h2>
                <h3 className="mb-3 text-white">Total Amount Rs.{feetopay} only</h3>
                <Image src="/qr.png" width="200"height="300" alt="QRCODE" className="mb-2" />
                <label>Payment Id :</label>
                <input type="text" ref={payId} className="form-control mb-2" required />
                <label>Password :</label>
                <input type="password" ref={pwd} className="form-control mb-2" autocomplete="new-password" required />
                <label>Confirm Password :</label>
                <input type="password" ref={cpwd} className="form-control mb-2" required />
                <label>Payment Proff ScreenShot (optional)</label>
                <div className="mb-2" onChange={handleChange}>
                    <FileUploader types={fileTypes}/>
                </div>
                <button className="btn btn-primary rounded" type="submit" ref={sbtn}>
                    Complete Registration
                </button>
            </div>
        </form>
        </>
    )
}