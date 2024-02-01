import {updateUser} from "../model"
import {NextResponse} from "next/server"
import {verify} from "jsonwebtoken"
export async function POST(req){
    try{
        let toup = await req.json()
        let dt = await req.cookies.get("jwt")
        let val = verify(dt.value,process.env.SECRET)
        let updt = await updateUser(toup.name,toup.email,toup.phone,val.id)
        return NextResponse.json({success:true,message:updt},{status:200})
    }catch(err){
        return NextResponse.json({error:true,message:err.message},{status:501})
    }
}