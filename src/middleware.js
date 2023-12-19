import {NextResponse} from 'next/server'
export async function middleware(req){
    if(process.env.PROD){
        req.nextUrl.href=req.nextUrl.href.replace(/:\d+/,'')
        req.nextUrl.origin=req.nextUrl.origin.replace(/:\d+/,'')
    }
    let rurl = new URL("/admin/login",new URL(req.url).href)
    if(req.nextUrl.pathname=="/admin/dashboard"){
        try{
            let tkn = req.cookies.get("jwt")
            // console.log(tkn);
            if(!tkn){
                return NextResponse.redirect(rurl,{status:301})
            }
            let f =await fetch(req.nextUrl.origin+"/api/verify",{
                method:"POST",
                body:JSON.stringify({
                    token:tkn.value
                }),
                headers:{
                    "Content-Type":"application/json"
                }
            })
            let dt = await f.json()
            if(dt.error){
                return NextResponse.redirect(rurl,{status:301})
            }
        }catch(err){
            // ghff
        }
    }
    else if(req.nextUrl.pathname=="/logout"){
        console.log("logout page");
        let resp = NextResponse.redirect(rurl,{status:301});
        resp.cookies.set("jwt",'',{httpOnly:true})
        // console.log(req.cookies.get('jwt'));
        return resp;
    }
}