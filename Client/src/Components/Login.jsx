import React, { useContext, useEffect, useState,setUser } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../Context/AppContext'
import { motion } from 'motion/react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
     const [state, setState,] = useState('Login')
     const {setShowLogin ,backendUrl, setToken,setUser}=useContext(AppContext)
      const [name, setName] = useState('')
      const [email, setEmail] = useState('')
      const [ password, setPassword] = useState('')

      const onSubmitHandler =async(e)=>{
        e.preventDefault()
        try{
          if(state==='Login'){
          const {data}=   await axios.post('https://ai-image-generater-aoxo.onrender.com/api/user/login',{email,password})
          if(data.success){
            setToken(data.token);
            setUser(data.user)
            localStorage.setItem('token',data.token)
            setShowLogin(false)


          }
           else{
            toast.error(data.message);


           }

          }
          else{
            const {data}=   await axios.post( 'https://ai-image-generater-aoxo.onrender.com/api/user/register',{ name,email,password})
            if(data.success){
              setToken(data.token);
              setUser(data.user)
              localStorage.setItem('token',data.token)
              setShowLogin(false)
  
  
            }
             else{
              toast.error(data.message);
  
  
             }

          }

        }catch(e){
          toast.error(e.message)

        }

      }


    
      useEffect(()=>{
        document.body.style.overflow='hidden'
         return ()=>{
            document.body.style.overflow='unset'

         }

      },[])
  return (
    <div className='fixed top-0 left-0  right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center'>

         <motion.form  onSubmit={(e)=>onSubmitHandler(e)}
          initial={{opacity:0.2,y:50}}
          transition={{duration:.3}}
          whileInView={{opacity:1,y:0}}
          viewport={{once:true}}
          className='relative bg-white p-10 rounded-xl text-slate-500' >
            <h1 className='text-center text-2xl text-neutral-700 font-medium'>{state}</h1>
            <p className='text-sm'>Welcome back! please sign in to continue</p>

          {  state!=='Login'&& <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-5'>
                <img src={assets.profile_icon}  className="h-5 w-5 object-contain"  alt="" />
                <input onChange={(e)=>setName(e.target.value)}  value={name} type="text" placeholder='Full Name' required  className='outline-none text-sm'/>
            </div>}
            <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-5'>
                <img src={assets.email_icon}  alt="" />
                <input onChange={(e)=>setEmail(e.target.value)}  value={email}  type="email" placeholder='Email id' required  className='outline-none text-sm'/>
            </div>
            <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-5'>
                <img src={assets.lock_icon}  alt="" />
                <input onChange={(e)=>setPassword(e.target.value)}  value={password}  type="password" placeholder='Password' required  className='outline-none text-sm'/>
            </div>
            <p className='text-sm  text-blue-600 my-4 cursor-pointer'>Forgot password</p>
            <button className='bg-blue-600 w-full text-white py-2 rounded-full'>{state==='Login'?"Login":"Create account"}</button>
           {state==='Login'? <p className='text-sm text-neutral-500 mt-4'>Don't have an account?<span className='text-blue-600 cursor-pointer' onClick={()=>setState('Signup')}>Sign Up</span> </p>:
            <p className='text-sm text-neutral-500 mt-4'>Already have an account?<span className='text-blue-600 cursor-pointer' onClick={()=>setState('Login')}>Log in</span> </p>}
             <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} className=' absolute top-5 right-5 cursor-pointer' alt="" />
         </motion.form>


    </div>
  )
}

export default Login