"use client"
import {Puff} from "react-loader-spinner"
export default function Load({status}){
    return(
            <div style={{
                height:"100vh",
                width:"100%",
                zIndex:"100",
                opacity:"0.5",
                backgroundColor:"blue",
                position:"fixed",
                top:"0",
                left:"0",
                display:"flex",
                alignItems:"center",
                justifyContent:"center"

            }}>
                <Puff/>
            </div>
    )
}