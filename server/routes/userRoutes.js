import express from 'express'
import { logInUser, paymentRazorpay, registerUser, userCredit } from '../controllers/userController.js'
import { userAuth } from '../middleweres/auth.js'
const userRouter=express.Router()
userRouter.post("/register",registerUser)
userRouter.post("/login",logInUser)
userRouter.get("/credits",userAuth,userCredit)
userRouter.post("/pay-razor",userAuth,paymentRazorpay)
 export default userRouter