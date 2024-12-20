import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { motion } from 'motion/react';
import { AppContext } from '../Context/AppContext';
import { useNavigate } from 'react-router-dom';

const GenerateBtn = () => {
  const {user, setShowLogin} =useContext(AppContext)
     const navogate=useNavigate()
     const OnClickHandler= ()=>{
         if(user){
            navogate('/result')
         }
         else{
            setShowLogin(true)
         }
     

     }
  return (
    <motion.div
    initial={{opacity:.2, y:100}}
    transition={{duration:1}}
    whileInView={{opacity:1, y:0}}
    viewport={{once:true}}
     className='pb-16 text-center'>
        <h1 className='text-2xl md:text-3xl lg:text-4xl mt-4 font-semibold text-neutral-800 py-6'>See the magic. Try now</h1>
        <button onClick={OnClickHandler} className='inline-flex items-center gap-2 rounded-full px-12 py-3 bg-black text-white m-auto hover:scale-105 transition-all duration-0'>Generate Images
                <img className='h-6' src={assets.star_group} alt="" />
            </button>

    </motion.div>
  )
}

export default GenerateBtn