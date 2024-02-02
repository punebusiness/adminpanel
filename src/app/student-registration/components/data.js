"use client"
import {useContext,useState} from "react"
import {idContext,updateContext,studentContext,signalContext,modalContext,pathy} from "../../context"
import {toast,ToastContainer} from "react-toastify"
import UpdateStudent from "./update"
import Modal from "./modal"
export default function ShowStudents(){
const [open, setOpen] = useState(false);
const {path} = useContext(pathy)
let there = path.split("/")[1]
    const {childs,setChilds} = useContext(studentContext)
    const {id,setId} = useContext(idContext)
    const {updateId,setUpdateId} = useContext(updateContext)
    const {signal,setSignal} = useContext(signalContext)
    const {modal,setModal} = useContext(modalContext)
    function handleApprove(mid,evt){
        evt.target.disabled=true;
        fetch('/student-registration/api/approve?id='+mid)
        .then(res=>res.json())
        .then(dt=>{
            if(dt.error){
                toast.error(dt.message)
            }else{
                toast.success(dt.message)
                setSignal(Math.random()*Math.random())
            }
        })
    }

    function handleDelete(id,ev){
        ev.target.disabled=true
        let iscorrect = confirm("Are you sure you want to delete this student \n id:"+id)
        if(!iscorrect){
        ev.target.disabled=false
        }else{
            fetch("/student-registration/api/del?id="+id)
            .then(res=>res.json())
            .then(dt=>{
                if(dt.error){
                    toast.error(dt.message)
                    ev.target.disabled=false
                }else{
                    toast.success(dt.message)
                    setSignal(Math.random()+Math.random())
                }
            })
        }
    }
    return(
        <>
        <table className="table">
            <thead>
                <tr>
                    <th>#Id</th>
                    <th>Payment Id</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Course Name</th>
                    <th>Batch</th>
                    <th>Father</th>
                    <th>Mother</th>
                    <th>State</th>
                    <th>District</th>
                    <th>Taluka</th>
                    <th>Course Duration</th>
                    <th>Institute</th>
                   {
                    there=="institute"?(<>
                    <th>Action</th></>):(<>
                    <th>Status</th>
                    <th>Action</th>
                    <th>Action</th></>)
                   }
                </tr>
            </thead>
            <tbody>
                {
                    childs.data.map((e,i)=>(
                        <tr key={i}>
                            <td>{e.id}</td>
                            <td>{e.payId}</td>
                            <td>{e.name}</td>
                            <td>{e.email}</td>
                            <td>{e.contactNumber}</td>
                            <td>{e.courseName}</td>
                            <td>{e.selectBatch}</td>
                            <td>{e.fatherName}</td>
                            <td>{e.motherName}</td>
                            <td>{e.state}</td>
                            <td>{e.district}</td>
                            <td>{e.taluka}</td>
                            <td>{e.courseDuration}</td>
                            <td>{e.selectInstitute}</td>
                            {there=="admin"?(<>
                            <td>
                                {e.approved==1?'Approved':<button className="btn btn-warning" onClick={(ev)=>{
                                    handleApprove(e.id,ev)
                                }}>Approve</button>}
                            </td>
                            <td>
                                <button className="btn btn-warning" onClick={()=>{
                                    setUpdateId(e.id)
                                    setModal(true)
                                }}>Edit</button>
                            </td>
                            <td>
                                <button className="btn btn-danger" onClick={(ev)=>{
                                    handleDelete(e.id,ev)
                                }}>Delete</button>
                            </td>
                            </>):(
                                <>
                                <td>
                                <button className="btn btn-warning" onClick={()=>{
                                    setUpdateId(e.id)
                                    setModal(true)
                                }}>Edit</button>
                            </td>
                                </>
                            )}
                        </tr>
                    ))
                }
            </tbody>
        </table>
<Modal element={<UpdateStudent/>}/>
        <ToastContainer/>
        </>
    )
}