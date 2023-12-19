import {NextResponse} from "next/server"
import {verify} from "jsonwebtoken"
import {getuser} from "../model"
export async function GET(req){
    if(process.env.PROD){
        req.url.href=req.url.href.replace(/:\d+/,'')
        req.url.origin=req.url.origin.replace(/:\d+/,'')
    }
    try{
        let cookie = await req.cookies.get("jwt")
        let vfy = verify(cookie.value,process.env.SECRET)
        let usr = await getuser(vfy.email)
        return NextResponse.json({success:true,name:usr.name,email:usr.email,phone:usr.phone,joining_date:usr.joining_date},{status:200})
    }catch(err){
        return NextResponse.json({error:true,message:err.message},{status:501})
    }
}