import userModel from "../models/userModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import razorpay from 'razorpay'
import transactionModel from "../models/transactionModel.js";
export const  registerUser=async(req, res)=>{
    try{
        const{name, email, password}=req.body;
        if(!name||!email||!password){
            return res.status(400).json({success:false, message: "Please fill in all fields"})
        }
        const salt=await bcrypt.genSalt(10)
        const hashedPassword=await bcrypt.hash(password, salt)
         const userdata={
            name,
            email,
            password:hashedPassword
         }
         const newUser=new userModel(userdata);
         const user=await newUser.save()
         const token= jwt.sign({id:user._id},process.env.JWT_SECRET)
         res.status(201).json({success:true, message: "User created successfully", token, user:{name:user.name}})

    }
     catch(e){
         console.log(e)
         res.json({success:false, msg:e.message})

     }
}

export const logInUser=async(req, res)=>{
    try{
         const {email, password}=req.body;
         const user=await userModel.findOne({email})
         if(!user){
            return res.status(400).json({success:false, message: "Invalid email or password"})
         }
         const isMatch=await bcrypt.compare(password, user.password)
         if(!isMatch){
            return res.status(400).json({success:false, message: "Invalid email or password"})
            }else{
                const token= jwt.sign({id:user._id},process.env.JWT_SECRET)
                res.status(201).json({success:true, message: "User Log in successfully", token, user:{name:user.name}})
                


                
            }


    }catch(e){
        console.log(e)
        res.json({success:false, msg:e.message})
    }
}

 export const userCredit=async( req, res)=>{
    try{
        const {userId}=req.body;
        const user=await userModel.findById(userId)
        if(!user){
            return res.status(400).json({success:false, message: "User not found"})
            }  
            

        res.json({success:true,credits:user.creditBalance, user:{
            name:user.name,
        }})




    } catch(e){
        console.log(e)
        res.json({success:false, msg:e.message})

    }

 }
   const razorpayInstance=new razorpay({
    key_id:process.env.RAZORPAY_KEY_ID,
    key_secret:process.env.RAZORPAY_KEY_SECRET,

   });
    
   export const paymentRazorpay=async(req,res)=>{
     try{
         const {userId, planId}=req.body;
         const userData=await userModel.findById(userId)
      
         if(!userId||!planId){
            return   res.json({success:false, message:"missing details"})
         }
          let credits, plan , amount, date
          switch(planId){
            case 'Basic':
                plan='Basic'
                credits=100
                amount=10
                break;
            case 'Advanced':
                    plan='Advanced'
                    credits=500
                    amount=50
                    break;
             case 'Business':
                        plan='Business'
                        credits=5000
                        amount=250
                        break;

                 default:
                 return res.json({success:false, message:"plan not found"})



          }

          date=Date.now();
          const transationdata={
            userId,plan , amount, credits,date
          }
          const newTransaction=await transactionModel.create(transationdata);
           const options={
            amount:amount*100,
            currency:process.env.CURRENCY,
            receipt: newTransaction._id.toString(),

           

           }
        //    await razorpayInstance.orders.create(options,(error,order)=>{
        //     if(error){
        //         console.log(error);
        //         return res.json({success:false, message:"error in creating order"})
        //     }
        //     res.json({success:true, message:"order created", order})

        //   })
        console.log("Order Creation Options:", options);

    try {
      const order = await razorpayInstance.orders.create(options);
      console.log("Razorpay Order:", order);
      res.json({ success: true, message: "Order created", order });
    } catch (error) {
      console.error("Razorpay Error:", error);
      res.json({ success: false, message: "Error in creating order", error: error.message });
    }


     }catch(e){
        console.log(e)
        res.json({success:false, message:e.message})
     }
   }


 