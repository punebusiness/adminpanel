"use client"
import {useEffect, useState} from 'react'
import styles from './cardoutput.module.css'

export default function Back(props) {
    const scale = props.scale ? styles.scale : "";
        // fullName={fullName}
        // fatherName={fatherName}
        // branch={branch}
        // course={course}
        // rollNumber={rollNumber}
        // duration={duration}
        // period={period}
        // dob={dob}
        // sapId={sapId}
        // bpNo={bpNo}
    return (
        <div className={"card "+scale} id="printCard" style={{height: "5.2cm", width: "8.4cm",padding:"0"}}>
            <div className="card-body p-0" style={{ border: "1px black solid", margin: "1px",position:"relative"}}>
             <div style={{fontSize:"0.3cm",padding:"0.3cm",color:"gray"}}><u>Instructions:</u></div>
             <div style={{fontSize:"0.22cm",paddingLeft:"0.5cm"}}>
                 <div>1. Loss of this card should be reported to the collge immediately</div>
                 <div>2. if found, return to the Sreenidhi Institute of Science and Technology</div>
                 <div>3. Duplicate card will be issued on payment of Rs. 100/-</div>
                 <div>4. This card is issued for identitification purpose only and does not confer any other rights</div>
             </div> 
            </div>
        </div>
    )
}