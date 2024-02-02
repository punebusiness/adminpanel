import cdb from "../../../api/conn"
import {NextResponse} from "next/server"
export function getAllInstituteNames() {
    return new Promise((resolve, reject) => {
        let db = cdb();
        let query = "SELECT name FROM institute";

        db.query(query, (error, results) => {
            if (error) {
                reject(error);
            } else {
                const instituteNames = results.map(result => result.name);
                resolve(instituteNames);
            }
        });
    });
}

export async function GET(req){
try{
let dt = await getAllInstituteNames();
return NextResponse.json({success:true,data:dt})
}catch(err){
    return NextResponse.json({error:true,message:err.message})
}
}