import {NextResponse} from "next/server"
import {hashPassword} from "../secure" 
import {addInstitute} from "../models/admin/addinstitute"
export async function PUT(req){
    try{
        let data = await req.json()
        let hash = await hashPassword(data.password)
        data.password = hash;
        data.logo = data.b64;
        delete data.b64;
        let add = await addInstitute(data)
        return NextResponse.json({success:true,message:add},{status:200})
    }catch(err){
        return NextResponse.json({error:true,message:err.message},{status:501})
    }
}