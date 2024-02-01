"use client"
import {FileUploader} from "react-drag-drop-files"
import {useContext} from "react"
import {pageContext,indicateContext,dataContext,loadContext} from "../context/indicatecontext"
import {toast} from "react-toastify"
import Step3 from "../components/step3"
import UploadLoad from "./uploadloading"
import Multiselect from "multiselect-react-dropdown"
import {useRef,useState} from "react"
const doc = process.env.NEXT_PUBLIC_DOCUMENTS;
export default function Step2(){
    const [docImg,setDocImg] = useState(false)
    const [photoImg,setPhotoImg] = useState(false)
    const nextBtn = useRef()
    const selItem = useRef()
    const canvaref = useRef()
    let opts = doc.split(',');
    const {page,setPage} = useContext(pageContext)
    const {status,setStatus} = useContext(indicateContext)
    const {data,setData} = useContext(dataContext)
    const {load,setLoad} = useContext(loadContext)
    const fileTypes = ["JPG","JPEG", "PNG"];
function handleChange(e){
        let allVals = selItem.current.getSelectedItems()
        if(allVals.length<1){
            toast.error("Please Select A Document")
            return;
        }
        setLoad(<UploadLoad/>)
        let pms = Array.from(e).map((file)=>{
            return new Promise((resolve,reject)=>{               
                let fr = new FileReader()
                fr.onload=()=>{
                    let result = fr.result.split('base64,')[1]
                    let objs =  {
                        b64:result,
                        name:file.name,
                        type:file.type,
                        folder:process.env.NEXT_PUBLIC_DRIVE_DOC,
                    }
                        resolve(objs)
                }
                fr.readAsDataURL(file)
            })
        })

        Promise.all(pms).then(arr=>{
            fetch(process.env.NEXT_PUBLIC_API_DOC,{
                method:"POST",
                body:JSON.stringify({data:arr})
            }).then(res=>res.json())
            .then(dt=>{
                if(dt.error){
                    toast.error(dt.message)
                }else{
                    setData({...data,documents:JSON.stringify({data:dt.data})})
                    setDocImg(true)
                    toast.success(dt.message)
                }
                setLoad("")
            }).catch(err=>{
                toast.error(err.message)
                setLoad("")
            })
        }).catch(err=>{
            toast.error(err.message)
            setLoad("")
        })
    }

    function validate(e){
        let mp = Array.from(e).map(f=>f.type.match(/image\/*/gi)?'true':'false')
        mp.includes('false')?toast.error('invalid file'):handleChange(e);   
    }
    function handleSubmit(e){
        e.preventDefault()
        if(docImg&&photoImg){
            setStatus({...status,step3:true})
            setPage(<Step3/>)
        }else{
            toast.error("Some Documents Not Uploaded!")
        }
    }
    function generatePassportSizeImage(base64Image) {
        const canvas = canvaref.current;
        const ctx = canvas.getContext('2d');
        const image = new Image();
        image.onload = function() {
          // Clear the canvas
          ctx.clearRect(0, 0, canvas.width, canvas.height);
  
          // Draw a white background
          ctx.fillStyle = '#fff';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
  
          // Calculate the scaled dimensions for a 2x2 inch photo
          const photoWidth = 2 * 300;  // 2 inches at 300 DPI
          const photoHeight = 2 * 300; // 2 inches at 300 DPI
  
          // Calculate the scaling factors
          const scaleX = photoWidth / image.width;
          const scaleY = photoHeight / image.height;
  
          // Calculate the new dimensions maintaining the aspect ratio
          const newWidth = image.width * Math.min(scaleX, scaleY);
          const newHeight = image.height * Math.min(scaleX, scaleY);
  
          // Calculate the position to center the image on the canvas
          const x = (canvas.width - newWidth) / 2;
          const y = (canvas.height - newHeight) / 2;
  
          // Draw the scaled image on the canvas
          ctx.drawImage(image, x, y, newWidth, newHeight);
  
          // Optionally, you can export the canvas as an image
          const passportSizeImage = canvas.toDataURL('image/png');
          setPhotoImg(true)
          setData({...data,passphoto:passportSizeImage})
        };
        image.src = base64Image;
      }
  
    function passport(e){
        let fr = new FileReader()
        fr.onload=()=>{
            generatePassportSizeImage(fr.result)
        }
        fr.readAsDataURL(e)
    }
    return(
        <>
        <form className="p-2 d-flex items-center justify-center flex-column bg-slate-800 text-white" onSubmit={handleSubmit}>
           <div className="w-50 mb-3 sm:w-100">
           <label>Select Document</label>
           <Multiselect
  isObject={false}
  options={[...opts]}
  style={{
    optionContainer: { 
        border: '2px solid',
        background:'black'
      }
  }}
  showCheckbox={true}
  closeOnSelect={true}
  ref={selItem}
/>

           </div>
            <div className="w-50 mb-3 sm:w-100">
            <FileUploader handleChange={validate} name="documentFile" multiple={true} types={fileTypes} />
            </div>
            <label>Upload a Passport Size Photo</label>
            <div className="w-50 mb-3 sm:w-100">
            <FileUploader handleChange={passport} name="photoFile" types={fileTypes} />
            </div>
            <canvas id="passportPhotoCanvas" width="300" height="300" ref={canvaref}></canvas><br/>
            <button className="btn btn-primary rounded" type="submit" ref={nextBtn}>
               Next Step
            </button>
        </form>
        
        </>
    )
}