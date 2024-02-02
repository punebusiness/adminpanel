import {NextResponse} from 'next/server'
export async function middleware(req){
    let rurl = new URL("/admin/login",process.env.PROD?new URL(req.url).href.replace(/:\d+/,''):new URL(req.url).href);
    let rurl1 = new URL("/institute/login",process.env.PROD?new URL(req.url).href.replace(/:\d+/,''):new URL(req.url).href);
    if(req.nextUrl.pathname=="/admin/dashboard"){
        try{
            let tkn = req.cookies.get("jwt")
            // console.log(tkn);
            if(!tkn){
                return NextResponse.redirect(rurl,{status:301})
            }
            let furl = process.env.PROD?`${req.nextUrl.origin.replace(/:\d+/,'')}/api/verify`:`${req.nextUrl.origin}/api/verify`;
            let f =await fetch(furl,{
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
                console.log(dt);
                return NextResponse.redirect(rurl,{status:301})
            }
        }catch(err){
            console.log(err);
            return NextResponse.redirect(rurl,{status:301})
        }
    }
    else if(req.nextUrl.pathname=="/institute/dashboard"){
        try{
            let tkn = req.cookies.get("jwt")
            if(!tkn){
                return NextResponse.redirect(rurl,{status:301})
            }
            let furl = process.env.PROD?`${req.nextUrl.origin.replace(/:\d+/,'')}/api/verify`:`${req.nextUrl.origin}/api/verify`;
            let f =await fetch(furl,{
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
                return NextResponse.redirect(rurl1,{status:301})
            }
        }catch(err){
            return NextResponse.redirect(rurl1,{status:301})
        }
    }
}