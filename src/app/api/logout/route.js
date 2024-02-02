import {NextResponse} from "next/server"
export async function GET(req){
let rt = req.nextUrl.searchParams.get('user');
    let rurl = new URL(`/${rt}/login`,process.env.PROD?new URL(req.url).href.replace(/:\d+/,''):new URL(req.url).href);
    let resp = NextResponse.redirect(rurl,{status:307})
    resp.cookies.set("jwt","")
    return resp;
}