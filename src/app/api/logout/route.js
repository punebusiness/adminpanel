import {NextResponse} from "next/server"
export async function GET(req){
    let rurl = new URL("/admin/login",process.env.PROD?new URL(req.url).href.replace(/:\d+/,''):new URL(req.url).href);
    let resp = NextResponse.redirect(rurl,{status:301})
    resp.cookies.delete("jwt")
    return resp;
}