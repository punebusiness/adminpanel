import {NextResponse} from "next/server";
import {addbatch,getallbatches,deletebatch,updatebatch} from "../../models/institute/batch"
import {verify} from "jsonwebtoken"
export async function POST(req){
    try{
        let cookie = await req.cookies.get("jwt");
        let vfy = verify(cookie.value,process.env.SECRET);
        let data = await req.json();
        data.addedBy = JSON.stringify(vfy)
        await addbatch(data)
        return NextResponse.json({success:true,message:"Data saved succesfully!"},{status:200})
    }catch(err){
        return NextResponse.json({error:true,message:err.message},{status:501})
    }
}

export async function GET(req){
    try{
        let cookie = await req.cookies.get("jwt");
        verify(cookie.value,process.env.SECRET)
        let batches = await getallbatches();
        return NextResponse.json({data:batches},{status:200})
    }catch(err){
        return NextResponse.json({error:true,message:err.message},{status:501})
    }
}

export async function DELETE(req){
    try{
        let cookie = await req.cookies.get("jwt");
        verify(cookie.value,process.env.SECRET)
        let jsn = await req.json()
        await deletebatch(jsn.id)
        return NextResponse.json({success:true,message:"Data Deleted Succesfully!"},{status:200})
    }catch(err){
        return NextResponse.json({error:true,message:err.message},{status:501})
    }
}
export async function PUT(req){
    try{
        let cookie = await req.cookies.get("jwt");
        verify(cookie.value,process.env.SECRET)
        let jsn = await req.json()
        console.log(jsn);
        await updatebatch(jsn)
        return NextResponse.json({success:true,message:"Data Updated Succesfully!"},{status:200})
    }catch(err){
        console.log(err);
        return NextResponse.json({error:true,message:err.message},{status:501})
    }
}

