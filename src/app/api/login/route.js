import {NextResponse} from "next/server"
import {adminLogin} from "../model"
export function GET(req,res){
    return NextResponse.json({hello:"world"},{status:200})
}

export async function POST(req,res){
    let data = await req.formData();
    let type = data.get("type")
    if(type=="Admin"){
        try{
            let mail = data.get(type+"email")
        let pwd = data.get(type+"password")
        let tkn = await adminLogin(mail,pwd)
        let rurl = new URL("/admin/dashboard",new URL(req.url).href.replace(/:\d+/,''))
        // console.log(rurl);
        let resp = NextResponse.redirect(rurl,{status:301});
        resp.cookies.set("jwt",tkn,{
            httpOnly:true,
            maxAge:'1h'
        })
        return resp;
        }catch(err){
        return NextResponse.json({error:true,message:err},{status:501})
        }
    }else{
        return NextResponse.json({"ok":"ok"})
    }
    
}