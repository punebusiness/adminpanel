"use client"
import {useEffect,useState} from "react"
import SideNavigation from "../components/sidenav"
import {studentContext,idContext,signalContext,modalContext,updateContext,pathy,inList} from "../../context"
export const dynamic="force-dynamic";
import {toast} from "react-toastify"
import { usePathname } from 'next/navigation'
export default function Admindash(){
    const pathname = usePathname()
const [childs,setChilds] = useState({data:[]})
const [its,setits]=useState([])
const [id,setId] = useState(0)
const[updateId,setUpdateId] = useState(0)
const [modal,setModal] = useState(false)
const [signal,setSignal] = useState(Math.random()+Math.random())
const [path,setPath] = useState(pathname)

    useEffect(() => {
        history.pushState(null, null, location.href);
        history.go(1);
      },[]);
      useEffect(()=>{
        fetch(`/student-registration/api/data?id=${id}`)
        .then(res=>res.json())
        .then(data=>{
            if(data.error){
                toast.error(data.message)
            }else{
                setChilds({...data})
            }
        }).catch(err=>{
            toast.error(data.message)
        })
      },[id,signal])
      useEffect(()=>{
        console.log("fet");
        fetch(`/institute/api/getname`)
        .then(res=>res.json())
        .then(data=>{
            if(data.error){
                toast.error(data.message)
            }else{
                setits(data.data)
            }
        }).catch(err=>{
            toast.error(data.message)
        })
      },[])
     
    return(
        <pathy.Provider value={{path,setPath}}>
        <inList.Provider value={{its,setits}}>
        <updateContext.Provider value={{updateId,setUpdateId}}>
        <modalContext.Provider value={{modal,setModal}}>
        <signalContext.Provider value={{signal,setSignal}}>
        <idContext.Provider value={{id,setId}}>
            <studentContext.Provider value={{childs,setChilds}}>
            <SideNavigation/>
            </studentContext.Provider>
        </idContext.Provider>
        </signalContext.Provider>
        </modalContext.Provider>
        </updateContext.Provider>
        </inList.Provider>
        </pathy.Provider>

    )
}