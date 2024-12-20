import userModel from "../models/userModel.js";
import formData from 'form-data'
import axios from 'axios';

 export const generateImage= async(req,res)=>{
     try{
        const {userId ,prompt}=req.body;
        const user=await userModel.findById(userId)
     if(!user ||!prompt){
        return res.status(400).json({ success:false, message:"Invalid user or prompt"})
     }
     if(user.creditBalance===0||userModel.creditBalance<0){
         return res.json({succes:false,message:"No Credit Balance",creditBalance:user.creditBalance})


     }
      const  formData=new FormData()
      formData.append('prompt',prompt)
       const {data}= await axios.post('https://clipdrop-api.co/text-to-image/v1',formData,{
        headers: {
            'x-api-key': process.env.ClIPDROP_API,
          },
          responseType:'arraybuffer'
       })
        const base64Image =Buffer.from(data,'binary').toString('base64')
        const resultImage=`data:image/png;base64,${base64Image}`
        await userModel.findByIdAndUpdate(user._id,{creditBalance:user.creditBalance-1})
        return  res.json({succes:true,message:"Image hjh Generated",creditBalance:user.creditBalance-1 , resultImage})



     }
     catch(e){
        res.json({success:false,message:e.message})

     }

}