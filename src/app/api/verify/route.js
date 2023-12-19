import {verify} from "jsonwebtoken"
import {NextResponse} from "next/server"
export async function POST(req){
    if(process.env.PROD){
        req.url.href=req.url.href.replace(/:\d+/,'')
        req.url.origin=req.url.origin.replace(/:\d+/,'')
    }
try{
    let tkn = await req.json();
    let vfy = verify(tkn.token,process.env.SECRET);
    return NextResponse.json({ok:true})
}catch(err){
    return NextResponse.json({error:true})
}
}