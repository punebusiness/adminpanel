"use client"
import {useState,useContext,useRef} from "react"
import {InContext} from "../../contexts/InstituteContext"
import {toast,ToastContainer} from "react-toastify"
import * as yup from "yup"
export default function UpdateIn(){
    const schema = yup.object().shape({
        name: yup.string().required('Name is required'),
        email: yup.string().email('Invalid email').required('Email is required'),
        phone: yup.string().required('Phone is required'),
        address: yup.string().required('Address is required'),
        tcnumber: yup.number().required('TC Number is required')
        })

    const logoSchema = yup.object().shape({
        logo: yup
        .mixed()
        .test('fileSize', 'Logo image should be less than 20MB', (value) => {
          return value && value.size <= 20000000;
        })
        .test('fileType', 'Invalid image file', (value) => {
          return value && value.type.startsWith('image/');
        })
    })

    const {institutes,setInstitutes} = useContext(InContext)
    const [institute,setInstitute] = useState(institutes[0])
    const [validlogo,setvalidlogo] = useState(true)
    const sbtn = useRef()
    function handleInChange(e){
        let ft = institutes.filter(x=>x.id==e.target.value)
        setInstitute(ft[0])
    }
    async function handleLogoChange(e){
        try{
            let file = e.target.files[0]
            await logoSchema.validate({logo:file},{abortEarly:false})
            let fr = new FileReader()
            fr.onload=()=>{
                institute.logo = fr.result;
                setvalidlogo(true)
            }
            fr.readAsDataURL(file)
        }catch(err){
            setvalidlogo(false)
            toast.error(err.message)
        }
    }
    function handleInputChange(e,name){
        let toput = {...institute}
        toput[name]=e.target.value;
        setInstitute(toput)
    }

    function handleSubmit(e){
        e.preventDefault();
        sbtn.current.disabled=true;
       (async()=>{
        try{
            await schema.validate(institute)
            if(validlogo){
               let f = await fetch("/api/admin/institute",{
                   method:"POST",
                   body:JSON.stringify(institute),
                   headers:{
                       "Content-Type":"application/json"
                   }
               })
               let res = await f.json()
               if(res.error){
                   toast.error(res.message)
               }else{
                let setin = institutes.map(x=>{
                    if(x.id==institute.id){
                        return institute;
                    }else{
                        return x;
                    }
                })
                setInstitutes(setin)
                   toast.success(res.message)
               }
            }
           }catch(err){
               toast.error(err.message)
           }
        sbtn.current.disabled=false;
       })()

    }
    return(
        <>
        <div className="rounded shadow-4 p-3 m-3 bg-slate-700">
            <label htmlFor="">Select Institute</label>
            <select className="form-control mb-3" onChange={handleInChange}>
                {
                    institutes.map(ins=>(
                        <option key={ins.id} value={ins.id}>
                            id : {ins.id} / Name : {ins.name}
                        </option>
                    ))
                }
            </select>
            <form onSubmit={handleSubmit}>
                <div className="mb-2">
                <label htmlFor="">Name</label>
                <input type="text" value={institute.name} className="form-control" onChange={(e)=>{handleInputChange(e,"name")}} />
                </div>
                <div className="mb-2">
                <label htmlFor="">Email</label>
                <input type="email" value={institute.email} className="form-control" onChange={(e)=>{handleInputChange(e,"email")}} />
                </div>
                <div className="mb-2">
                <label htmlFor="">Phone</label>
                <input type="tel" value={institute.phone} className="form-control" onChange={(e)=>{handleInputChange(e,"phone")}}/>
                </div>
                <div className="mb-2">
                <label htmlFor="">Address</label>
                <input type="text" value={institute.address} className="form-control" onChange={(e)=>{handleInputChange(e,"address")}} />
                </div>
                <div className="mb-2">
                <label htmlFor="">TC Number</label>
                <input type="number" value={institute.tcnumber} className="form-control" onChange={(e)=>{handleInputChange(e,"tcnumber")}}/>
                </div>
                <div className="mb-2">
                <label htmlFor="">Logo</label>
                <input type="file" className="form-control" onChange={handleLogoChange}/>
                </div>
                <button className="btn btn-primary rounded-pill" type="submit" ref={sbtn}>Update</button>
            </form>
        </div>
        <ToastContainer/>
        </>
    )
}