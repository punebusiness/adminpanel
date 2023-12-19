"use client"
import {useEffect} from "react"
import LoginPage from "./../../components/login"
export default function Login(){
    useEffect(() => {
        history.pushState(null, null, location.href);
        history.go(1);
      },[]);
    return(
        <>
        <LoginPage page="Admin"/>
        </>
    )
}