import {sign,verify} from "jsonwebtoken"
import bcrypt from "bcrypt"
import {NextResponse} from "next/server"
import cdb from "../../api/conn"
async function getInsQ(id) {
    try {
        const db = await cdb();
        const query = "SELECT * FROM institute WHERE id = ?";
        const [rows] = await db.query(query, [id]);

        if (rows.length === 0) {
            throw new Error('No institute found with the provided ID');
        }

        return {...rows[0]}; // Assuming you only expect one result
    } catch (error) {
        console.error('Error in getInsQ:', error.message);
        throw new Error('Error getting institute by ID');
    }
}

export async function GET(req){
try{
    let tkn = await req.cookies.get("jwt")
    let vfy  = verify(tkn.value,process.env.SECRET)
    let dt = await getInsQ(vfy.id)
    return NextResponse.json({success:true,data:dt},{status:200})
}catch(err){
    console.log(err.message);
    return NextResponse.json({error:true},{status:500})
}
}