"use client"
import {useRef,useContext} from "react"
import { pageContext, indicateContext, dataContext,apiContext } from "../context/indicatecontext";
import {toast} from "react-toastify"
import Step2 from "../components/step2";
import * as yup from "yup"
export default function Step1() {
    const schema = yup.object().shape({
        contactNumber: yup.string().required('Contact Number is required').matches(/^[0-9]+$/, 'Invalid Contact Number'),
        courseDuration: yup.string().required('Course Duration is required'),
        courseName: yup.string().required('Course Name is required'),
        district: yup.string().required('District is required'),
        email: yup.string().email('Invalid email').required('Email is required'),
        fatherName: yup.string().required('Father Name is required'),
        motherName: yup.string().required('Mother Name is required'),
        name: yup.string().required('Name is required').matches(/^[a-zA-Z\s]+$/, 'Invalid Name'),
        selectBatch: yup.string().required('Select Batch is required'),
        selectInstitute: yup.string().required('Select Institute is required'),
        state: yup.string().required('State is required'),
        taluka: yup.string().required('Taluka is required'),
      });
    const { page, setPage } = useContext(pageContext);
    const { status, setStatus } = useContext(indicateContext);
    const {data,setData} = useContext(dataContext);
    const {batches,setBatches} = useContext(apiContext);
    const institute = useRef()
    const batch = useRef()
    const courseName = useRef()
    const courseDuration = useRef()
    function handleSubmit(e) {
        e.preventDefault();
        let validate = [institute,batch,courseName,courseDuration].map(e=>e.current.value=="value_null"?'false':'true')
        if(validate.includes('false')){
            toast.error("Some Select fields are not selected!")
            return;
        }
        setStatus({ ...status, step2: true });
        let nowData = Object.fromEntries(Array.from(new FormData(e.target)))
        schema.validate(nowData).then(()=>{
        setData({...data,...nowData,paymentProff:''})
        fetch("/student-registration/api?email="+nowData.email)
        .then(rs=>rs.json())
        .then(dt=>{
            if(dt.data===true){
                toast.error("User with this Email already exist")
            }else{
                setPage(<Step2 />);
            }
        })
        }).catch(err=>{
            toast.error(err.message)
        })
    }

    return (
        <div className="d-flex items-center justify-center bg-slate-700">
            <form id="reg_form" onSubmit={handleSubmit}>
                <div className="fxn">
                    <div>
                        <label htmlFor="name">Student Name :</label><br />
                        <input type="text" id="name" name="name" className="input-field" required />
                    </div>
                    <div>
                        <label htmlFor="email">Student Email :</label><br />
                        <input type="email" id="email" name="email" className="input-field" required />
                    </div>
                </div>
                <div className="fxn">
                    <div>
                        <label htmlFor="contactNumber">Contact Number :</label><br />
                        <input type="tel" id="contactNumber" name="contactNumber" className="input-field" required />
                    </div>
                    <div>
                        <label htmlFor="fatherName">Father Name :</label><br />
                        <input type="text" id="fatherName" name="fatherName" className="input-field" required />
                    </div>
                </div>
                <div className="fxn">
                    <div>
                        <label htmlFor="motherName">Mother Name :</label><br />
                        <input type="text" id="motherName" name="motherName" className="input-field" required />
                    </div>
                    <div>
                        <label htmlFor="state">State :</label><br />
                        <input type="text" id="state" name="state" className="input-field" required />
                    </div>
                </div>
                <div className="fxn">
                    <div>
                        <label htmlFor="district">District :</label><br />
                        <input type="text" id="district" name="district" className="input-field" required />
                    </div>
                    <div>
                        <label htmlFor="taluka">Taluka :</label><br />
                        <input type="text" id="taluka" name="taluka" className="input-field" required />
                    </div>
                </div>
                <div className="fxn">
                    <div>
                        <label htmlFor="contactNumber">Aadhar Number :</label><br />
                        <input type="number" id="aadharNumber" name="aadhar" className="input-field" required />
                    </div>
                    <div>
                        <label htmlFor="fatherName">Pincode :</label><br />
                        <input type="text" id="pincode" name="pincode" className="input-field" required />
                    </div>
                    </div>
                <div className="fxn">
                    <div>
                        <label htmlFor="contactNumber">Post Office :</label><br />
                        <input type="text" id="postOffice" name="postOffice" className="input-field" required />
                    </div>
                    <div>
                        <label htmlFor="fatherName">Home Address :</label><br />
                        <input type="text" id="address" name="address" className="input-field" required />
                    </div>
                </div>
                
                <div className="fxn">
                    <div>
                        <label htmlFor="selectInstitute">Select Institute:</label><br />
                        <select id="selectInstitute" name="selectInstitute" className="input-field"
                        ref={institute}
                        >
                            <option value="value_null">SELECT INSTITUTE</option>
                            {
                                batches.data.map((dt,i)=>(
                                    <option value={dt.instituteName} key={i}>{dt.instituteName}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div>
                        <label htmlFor="selectBatch">Select Batch:</label><br />
                        <select id="selectBatch" name="selectBatch" className="input-field"
                        ref={batch}
                        >
                            <option value="value_null">SELECT BATCH</option>
                            {
                                batches.data.map((dt,i)=>(
                                    <option value={dt.batchNumber} key={i}>{dt.batchNumber}</option>
                                ))
                            }
                        </select>
                    </div>
                </div>
                <div className="fxn">
                    <div>
                        <label htmlFor="courseName">Course Name:</label><br />
                        <select id="courseName" name="courseName" className="input-field"
                        ref={courseName}
                        >
                            <option value="value_null">SELECT COURSE NAME</option>
                            {
                                batches.data.map((dt,i)=>(
                                    <option value={dt.courseName}key={i}>{dt.courseName}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div>
                        <label htmlFor="courseDuration">COURSE DURATION:</label><br />
                        <select id="courseDuration" name="courseDuration" className="input-field"
                        ref={courseDuration}
                        >
                            <option value="value_null">SELECT COURSE DURATION</option>
                            {
                                batches.data.map((dt,i)=>(
                                    <option value={dt.courseDuration}
                                    key={i}>{dt.courseDuration}</option>
                                ))
                            }
                        </select>
                    </div>
                </div>
                <button className="btn btn-primary rounded" type="submit">
                    Next Step
                </button>
            </form>
        </div>
    );
}
