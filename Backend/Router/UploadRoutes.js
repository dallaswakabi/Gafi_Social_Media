import express from "express"
import multer from "multer"

const UploadRoutes = express.Router()

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"../public/images")
    },
    filename:(req,file,cb)=>{
        cb(null,req.body.name)
    },
})

const upload = multer({storage:storage})

UploadRoutes.post('/upload-images',(req,res)=>{
     console.log(req.body)
    try {
        return res.status(200).json({message:"File Upload Successfully"})
    } catch (error) {
        console.log(error)
    }
})

export default UploadRoutes