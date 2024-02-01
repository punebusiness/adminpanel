import {NextResponse} from "next/server"
import {verify} from "jsonwebtoken"
import {updateStudent,getStudentByAadhar} from "../../model/students"
export async function GET(req){
    try{
        let res = await getStudentByAadhar(req.nextUrl.searchParams.get('aadhar'))
        if(res==undefined){
            return NextResponse.json({error:true,message:"Student Not Found!"},{status:501})
        }else{
            return NextResponse.json({success:true,data:res},{status:200}) 
        }
    }catch(err){
    return NextResponse.json({error:true,message:err.message},{status:501})
    }
}
export async function POST(req){
    try{
        let cookie =await req.cookies.get('jwt')
    await verify(cookie.value,process.env.SECRET)
    let dt = await req.json()
    let stat = await updateStudent(dt)
    return NextResponse.json({success:true,message:stat},{status:200})
    }catch(err){
    return NextResponse.json({error:true,message:err.message},{status:501})
    }
}