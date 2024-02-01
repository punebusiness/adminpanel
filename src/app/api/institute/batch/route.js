import {NextResponse} from "next/server";
import {addBatch,getAllBatches,deleteBatch,updateBatch} from "../../models/institute/batch"
import {verify} from "jsonwebtoken"
export async function POST(req){
    try{
        let cookie = await req.cookies.get("jwt");
        let vfy = verify(cookie.value,process.env.SECRET);
        let data = await req.json();
        data.addedBy = JSON.stringify(vfy)
        await addBatch(data)
        return NextResponse.json({success:true,message:"Data saved succesfully!"},{status:200})
    }catch(err){
        return NextResponse.json({error:true,message:err.message},{status:501})
    }
}

export async function GET(req){
    try{
        let batches = await getAllBatches();
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
        await deleteBatch(jsn.id)
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
        await updateBatch(jsn)
        return NextResponse.json({success:true,message:"Data Updated Succesfully!"},{status:200})
    }catch(err){
        console.log(err);
        return NextResponse.json({error:true,message:err.message},{status:501})
    }
}

