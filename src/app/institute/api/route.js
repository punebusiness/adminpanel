import {sign,verify} from "jsonwebtoken"
import bcrypt from "bcrypt"
import {NextResponse} from "next/server"
import cdb from "../../api/conn"
function getInsQ(data){
return new Promise((resolve,reject)=>{
    let db = cdb()
    let query = "SELECT * FROM institute WHERE LOWER(email) = LOWER(?);";
    db.query(query,[data.email],(err,row)=>{
        // console.log(err,row);
        if(err){
            reject(err)
        }else{
            resolve(row.map(r=>({...r}))[0])
            
        }
    })
})
}
export async function POST(req){
    try{
        let data = await req.json()
        let dbData = await getInsQ(data)
        let compare =await  bcrypt.compare(data.password,dbData.password)
        if(!compare)throw new Error("Credential not matched!");
        delete dbData.password;
        let tkn =sign(dbData,process.env.SECRET)
        let res = NextResponse.json({success:true,message:"success",data:{...dbData}},{status:200})
        res.cookies.set("tkn",tkn,{
            httpOnly:true,
            expiresIn:'24h',
            path:"*"
        })
        return res;
    }catch(err){
        return NextResponse.json({error:true,message:err.message})
    }
}

export async function GET(req){
try{
    let tkn = await req.cookies.get("tkn")
    console.log(tkn);
    console.log(tkn);
    let vfy  = verify(tkn.value,process.env.SECRET)
    return NextResponse.json({success:true},{status:200})
}catch(err){
    console.log(err.message);
    return NextResponse.json({error:true},{status:500})
}
}