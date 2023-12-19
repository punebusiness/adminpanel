import {createAdmin} from "../model"
import {NextResponse} from "next/server"
export async function POST(req){
    if(process.env.PROD){
        req.url.href=req.url.href.replace(/:\d+/,'')
        req.url.origin=req.url.origin.replace(/:\d+/,'')
    }
try{
let fm = await req.json()
let ca = await createAdmin(fm.name,fm.email,fm.phone,fm.password,fm.joining_date)
return NextResponse.json({success:true,message:"admin added succesfully"})
}catch(err){
    return NextResponse.json({error:true,message:err.message})
} 
}