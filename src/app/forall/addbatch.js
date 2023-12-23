import {useState,useRef} from "react"
export default function AddBatch(){
    const sbtn = useRef()
    function handleSubmit(e){
        e.preventDefault()
        let form = e.target;
        let obj = {
            instituteName:form[0].value,
            batchSize:form[1].value,
            batchType:form[2].value,
            courseDuration:form[3].value,
            batchStart:form[4].value,
            batchEnd:form[5].value,
            batchNumber:form[6].value,
            batchFees:form[7].value
        }
    }
    return(
        <>
        <div className="rounded bg-slate-700 m-2 p-3 shadow-4">
            <form>
                <label htmlFor="">Institute Name :</label>
                <input type="text" className="form-control mb-2" required/>
                <label htmlFor="">Batch Size :</label>
                <input type="text" className="form-control mb-2" required />
                <label htmlFor="">Batch Type :</label>
                <input type="text" className="form-control mb-2" required />
                <label htmlFor="">Course Duration :</label>
                <input type="text" className="form-control mb-2" required />
                <label htmlFor="">Batch Start Date :</label>
                <input type="date" className="form-control mb-2" required />
                <label htmlFor="">Batch End Date :</label>
                <input type="date" className="form-control mb-2" required/>
                <label htmlFor="">Batch Number :</label>
                <input type="text" className="form-control mb-2" required/>
                <label htmlFor="">Batch Fees in Rupees :</label>
                <input type="number" className="form-control mb-2" required/>
                <button className="btn btn-primary rounded" type="submit" ref={sbtn}>Save Batch</button>
            </form>
        </div>
        </>
    )
}