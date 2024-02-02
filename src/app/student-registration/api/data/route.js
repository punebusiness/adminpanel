import {verify} from "jsonwebtoken"
import {NextResponse} from "next/server"
import {getStudentsAfterId} from "../../model/students"
export async function GET(req){
    try{
        let tkn = await req.cookies.get("jwt")
        let vfy = verify(tkn.value,process.env.SECRET)
        let data = vfy.admin?await getStudentsAfterId(req.nextUrl.searchParams.get('id')):await getStudentsAfterId(req.nextUrl.searchParams.get('id'),vfy.name);
        return NextResponse.json(data,{status:200});
    }catch(err){
        return NextResponse.json({error:true,message:err.message},{status:501})
    }
}