import {NextResponse} from "next/server"
import {verify} from "jsonwebtoken"
import {deleteStudent} from "../../model/students"
export async function GET(req){
   try{
    let cookie = await req.cookies.get("jwt")
    await verify(cookie.value,process.env.SECRET)
    let res = await deleteStudent(req.nextUrl.searchParams.get('id'))
    return NextResponse.json({success:true,message:res},{status:200})
   }catch(err){
    return NextResponse.json({error:true,message:err.message},{status:501})
   }
}