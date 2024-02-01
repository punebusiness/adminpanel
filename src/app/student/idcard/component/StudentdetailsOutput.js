"use client"
import {useContext} from "react"
import {dataContext} from "./context"
const getDate = (date) => {
    // return date ? (date.length > 1 ? `${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}`:""):""
    if(!date){
        return ""
    }
    if(date.length < 1){
        return ""
    }
    let str = ``;
    try {
        const d = new Date(date);
        str = `${d.getDate()}.${d.getMonth()+1}.${d.getFullYear()}`;
    } catch (error) {
        str=``
    }
    return str;
}
const getDuration = (latEntry,duration)=>{
    // alert(latEntry)
    if(latEntry==="true"){
        let [startYear, endYear] = duration.split('-');
        return `${parseInt(startYear) +1}-${endYear}`
    }
    return duration;
}
const formatName = (name)=>{
    if(name){
        let str = name.replace(/\s+/g, ' ').trim();
        if(str.length > 0){
            return str;
        }
        else{
            return "FullName"
        }
    }
    return "FullName"
}
export default function Studentdetails(props) {
const {data,setData} = useContext(dataContext)
    return (
        <div style={{ display: "flex", justifyContent: "flex-start", padding: "1mm", marginLeft: "0.2cm", flexDirection: "column", fontFamily: "sans-serif", fontSize: "0.27cm" }}>
            <div>
                <div style={{ fontWeight: "bold", padding: "0.11cm 0",textTransform:"uppercase" }}>{formatName(data.name)}</div>
            </div>
            <div style={{ display: "flex" }}>
                <div style={{ width: "2cm" }}>Father's Name </div>
                <div style={{textTransform:"uppercase"}}>: {data.fatherName}</div>
            </div>
            <div style={{ display: "flex" }}>
                <div style={{ width: "2cm" }}>Course</div>
                <div>: {data.courseName}</div>
            </div>
            <div style={{ display: "flex" }}>
                <div style={{ width: "2cm" }}>Roll No</div>
                <div style={{textTransform:"uppercase"}}>: {data.id}</div>
            </div>
            <div style={{ display: "flex" }}>
                <div style={{ width: "2cm" }}>Date of Birth</div>
                <div>: {getDate(props.dob)}</div>
            </div>
            <div style={{ display: "flex" }}>
                <div style={{ width: "2cm" }}>Course Duration</div>
                <div>: {data.courseDuration}</div>
            </div>
        </div>
    )
}