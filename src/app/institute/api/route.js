import {sign,verify} from "jsonwebtoken"
import bcrypt from "bcrypt"
import {NextResponse} from "next/server"
import cdb from "../../api/conn"
function getInsQ(id){
return new Promise((resolve,reject)=>{
    let db = cdb()
    let query = "SELECT * FROM institute WHERE id=?;";
    db.query(query,[id],(err,row)=>{
        // console.log(err,row);
        if(err){
            reject(err)
        }else{
            resolve(row.map(r=>({...r}))[0])     
        }
    })
})
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