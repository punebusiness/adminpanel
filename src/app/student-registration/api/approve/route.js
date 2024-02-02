import {NextResponse} from "next/server"
import {verify} from "jsonwebtoken"
import {approveStudent} from "../../model/students"
export async function GET(req){
try{
    let cookie = await req.cookies.get("jwt")
    await verify(cookie.value,process.env.SECRET)
    let stats = await approveStudent(req.nextUrl.searchParams.get('id'))
    console.log(stats);
    return NextResponse.json({success:true,message:stats},{status:200})

}catch(err){
    return NextResponse.json({error:true,message:err.message},{status:501})
}

}