import jwt from 'jsonwebtoken'
 export const userAuth=async(req, res, next)=>{
    const {token}=req.headers;
    if(!token){
         
        return res.json({success:false, message:"Not Authorized, Login Again"});

    }
     try{
         const tokenDecode=jwt.verify(token,process.env.JWT_SECRET)
         
         if(tokenDecode.id){
            req.body.userId=tokenDecode.id
         }
          else{
            console.log("sfkhg")
            return res.json({success:false, message:"Not Authorized, Login Again"});
          }
           next()

     }catch(e){
         res.json({success:false, message:e.message})

     }

 }