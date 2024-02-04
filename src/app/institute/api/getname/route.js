import cdb from "../../../api/conn"
import {NextResponse} from "next/server"
async function getAllInstituteNames() {
    try {
        const db = await cdb();
        const query = "SELECT name FROM institute";
        const [rows] = await db.query(query);

        const instituteNames = rows.map(result => result.name);
        return instituteNames;
    } catch (error) {
        console.error('Error in getAllInstituteNames:', error.message);
        throw new Error('Error getting all institute names');
    }
}
export async function GET(req){
try{
let dt = await getAllInstituteNames();
return NextResponse.json({success:true,data:dt})
}catch(err){
    return NextResponse.json({error:true,message:err.message})
}
}