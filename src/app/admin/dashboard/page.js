"use client"
import {useEffect} from "react"
import SideNavigation from "../components/sidenav"
export default function Admindash(){

    useEffect(() => {
        history.pushState(null, null, location.href);
        history.go(1);
      },[]);
    return(
        <>
        <SideNavigation/>
        </>
    )
}