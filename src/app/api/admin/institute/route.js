import {NextResponse} from "next/server"
import {showInstitute,deleteInstitute,updateInstitute,updatePassword} from "../../models/institute/getinstitute"
import {verify} from "jsonwebtoken"
export async function GET(req){
    try{
        let ins = await showInstitute()
        return NextResponse.json({data:ins},{status:200})
    }catch(err){
        return NextResponse.json({error:true,message:err.message??"something went wrong!"},{status:501})
    }
}

export async function DELETE(req){
    try{
        let jsn = await req.json()
        let id = jsn.id;
        let tkn = await req.cookies.get("jwt")
        let vfy = verify(tkn.value,process.env.SECRET)
        let dins = await deleteInstitute(id);
        return NextResponse.json({success:true,message:`Institute id ${id}  Deleted succesfully`})
    }catch(err){
        return NextResponse.json({error:true,message:err.message??"Oops! something went wrong!"},{status:501})
    }
}

export async function POST(req){
    try{
        let tkn = await req.cookies.get("jwt")
        let vfy = verify(tkn.value,process.env.SECRET)
        let jsn = await req.json()
        await updateInstitute(jsn)
        return NextResponse.json({success:true,message:"Institute updated succesfully!"},{status:200})
    }catch(err){
        return NextResponse.json({error:true,message:err.message},{status:501})
    }
}

export async function PUT(req){
    try{
        let tkn = await req.cookies.get("jwt")
        let vfy = verify(tkn.value,process.env.SECRET)
        let jsn = await req.json()
        let upd = await updatePassword(jsn.id,jsn.password)
        return NextResponse.json({success:true,message:"Password Changed succesfully!"},{status:200})
    }catch(err){
        return NextResponse.json({error:true,message:err.message},{status:501})
    }
}