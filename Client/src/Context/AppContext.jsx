import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from 'axios'
import { useNavigate } from "react-router-dom";


 export const AppContext=createContext()
 export const AppContextProvider = (props) => {
    const [user, setUser] = useState(null);
    const [showLogin, setShowLogin] = useState(false)
     const [token, setToken] = useState(localStorage.getItem('token'))
     const [credit, setCredit] = useState(false)
    const backendUrl=import.meta.env.VITE_BACKEND_URL
     const navigate=useNavigate()
     const loadCreditData=async()=>{
        try{
             const {data}= await axios.get('https://ai-image-generater-aoxo.onrender.com/api/user/credits',
                {headers:{token }}
            )
             if(data.success){
                setCredit(data.credits)
                setUser(data.user)
             }

        }catch(e){
            console.log(e)
            toast.error(e.massage)
        }
     }

      const  generareImage=async(prompt)=>{
         try
         {
            const {data}= await axios.post("https://ai-image-generater-aoxo.onrender.com/api/image/generate-image",{prompt},{
                headers:{
                    token
                }
                // headers: {
                //     Authorization: `Bearer ${token}`,
                //     'Content-Type': 'application/json',
                //   },
            })
            //  console.log(data)
            //  console.log("jgsvfwd")
            // console.log(data.resultImage)
            if(data.succes){
               
               loadCreditData();
               return data.resultImage;
             }
             else{
                 
                toast.error(data.message)
                loadCreditData()
                if(data.creditBalance===0){
                    navigate('/buy')
                }

             }


         } catch(e){
             console.log(e)
              toast.error(e.message)

         }

      }




 


     useEffect(()=>{
        if(token){
            loadCreditData()
        }

     },[token])
     const logOut=async()=>{
    localStorage.removeItem('token')
    setUser(null)
    setToken('')
  }
 

     const value={
        user,
        setUser,
        showLogin,
        setShowLogin,
        backendUrl,
        token,
        setToken,
        credit,
        setCredit,
        loadCreditData,
        logOut,
        generareImage
     }
    return <AppContext.Provider  value={value}>
        {
            props.children
        }

    </AppContext.Provider>
    
 }
  export default AppContextProvider