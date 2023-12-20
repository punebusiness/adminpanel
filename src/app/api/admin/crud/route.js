import {NextResponse} from "next/server"
import showAdmins from "../../models/admin/showadmins"
export async function GET(req){
    try{
        let data = await showAdmins();
        return NextResponse.json({data},{status:200});
    }catch(err){
        return NextResponse.json({error:true,message:err.message},{status:501})
    }
}