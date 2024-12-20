import mongoose from "mongoose";
// import { model } from './../node_modules/mongoose/types/index.d';
 const tranctionSchema= new mongoose.Schema({
   userId:{
    type:String,
    required:true
   },
   plan:{
    type:String,
    required:true
   },
   amount:{
    type:Number,
    required:true
   },
   credits:{
    type:Number,
    required:true
   },
   payment:{
    type:Boolean,
    default:false
   },
   date:{type:Number}

    
 })
  const transactionModel =mongoose.models.transcation|| mongoose.model("transcation", tranctionSchema)
   export default transactionModel;