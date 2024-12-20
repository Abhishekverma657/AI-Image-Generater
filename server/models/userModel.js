import mongoose from "mongoose";
// import { model } from './../node_modules/mongoose/types/index.d';
 const useSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,

    },
     email:{
        type:String,
        required:true,
        unique:true
     },
      password:{
        type:String,
        required:true,

      },
      creditBalance:{
       type:Number,
       default:5
      }
 })
  const userModel =mongoose.models.user|| mongoose.model("user", useSchema)
   export default userModel;