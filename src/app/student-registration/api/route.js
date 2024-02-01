import {NextResponse} from "next/server"
import {saveStudentData,checkEmail} from "../model/students"
export async function GET(req){ 
try{
let email = req.nextUrl.searchParams.get('email')
let check = await checkEmail(email)
console.log(check);
return NextResponse.json({data:check},{status:200})
}catch(err){
    return NextResponse.json({error:"404 not found"},{status:404})
}
}
export async function POST(req){
    try{
        let data = await req.json()
        await saveStudentData(data)
        return NextResponse.json({success:true,message:"Data saved Succesfully"},{status:200})
    }catch(err){
        return NextResponse.json({error:true,message:err.message},{status:501})
    }
}