import {NextResponse} from "next/server"
import {showAdmins} from "../../models/admin/showadmins"
import {deleteAdmin} from "../../models/admin/showadmins"
import {changePassword} from "../../models/admin/showadmins"
import {verify} from "jsonwebtoken"
export async function GET(req){
    try{
        let tkn = await req.cookies.get("jwt")
        let vfy = verify(tkn.value,process.env.SECRET)
        let data = await showAdmins(vfy.id);
        console.log(data);
        return NextResponse.json({data},{status:200});
    }catch(err){
        return NextResponse.json({error:true,message:err.message},{status:501})
    }
}
    
    export async function DELETE(req){
        try{
            let jsn = await req.json()
            let id = jsn.id;
            let dlt = await deleteAdmin(id)
            return NextResponse.json({success:true,message:"Admin Deleted Succesfully!"},{status:200})
        }catch(err){
            return NextResponse.json({error:true,message:err.message},{status:501})
        }
    }

export async function PUT(req){
    try{
        let tkn = await req.cookies.get("jwt")
        let vfy = verify(tkn.value,process.env.SECRET);
        let id = vfy.id;
        let jsn = await req.json()
        let cp = await changePassword(jsn.prevPass,jsn.newPass,id)
        return NextResponse.json({success:true,message:"Password changed succesfully"},{status:200})
    }catch(err){
        return NextResponse.json({error:true,message:err.message},{status:501})
    }
}