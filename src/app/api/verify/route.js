import {verify} from "jsonwebtoken"
import {NextResponse} from "next/server"
export async function POST(req){
try{
    let tkn = await req.json();
    let vfy = verify(tkn.token,process.env.SECRET);
    return NextResponse.json({ok:true})
}catch(err){
    return NextResponse.json({error:true})
}
}