import React from 'react'
import Hero1 from '../images/Home/hero1.png'
import Hero2 from '../images/Home/hero2.png'
import Hero3 from '../images/Home/hero3.png'
import Hero4 from '../images/Home/hero4.png'
import MainIcon from '../images/Home/mainicon.svg'
import Whiteline from '../images/Home/whitebgline.svg'
import Banner from '../components/Banner'

function Hero4image() {
  return (
    <div className="relative">
      <div  className=''>
        <img src={Whiteline.src} alt="" className="w-full items-center justify-center" />
        </div>
        <div className='absolute top-0 left-0 w-full h-full'>
    <div className='containerpaddin container mx-auto'>
       <div className="containerpaddin container mx-auto">

   


    <div className=" top-0 left-0 w-full h-full">
    <div className="flex items-center justify-between gap-4 px-4">
      
      <div>
        <img src={Hero1.src} alt="" className="hover:scale-105 transition-all duration-700 ease-out cursor-pointer" />
      </div>

     
      <div className="mt-[300px]">
        <img src={Hero2.src} alt="" className="hover:scale-105 transition-all duration-700 ease-out cursor-pointer" />
      </div>

     
      <div>
        <img src={Hero3.src} alt="" className="hover:scale-105 transition-all duration-700 ease-out cursor-pointer" />
      </div>

      {/* MainIcon + text + Hero4 */}
      <div className="mt-[250px]">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col items-end gap-0">
            <img src={MainIcon.src} alt="" className="h-15 w-auto hover:scale-110 hover:rotate-6 transition-all duration-700 ease-out cursor-pointer" />
            <p className="font-Galldis font-light-500 text-white text-[13px] text-white  mt-4 leading-5 text-right">
              <span className="font-bold">After the trial,</span><br />
              you can still use Cursor with limited <br />
              features (GPT-4 mini or Cursor small)<br />
              which are only good for simple tasks.
            </p>
          </div>
          <img src={Hero4.src} alt="" className="hover:scale-110 hover:rotate-2 transition-all duration-700 ease-out cursor-pointer" />
        </div>
        
      </div>
    </div>
  </div>
</div>
<h1 className='text-white text-[50px] font-roboto font-bold leading-16'>
            Create Song With <br></br>
            The Power of AI
          </h1>
        <p className='font-Galldis font-light-500 text-white text-sm text-white  mt-4'>
            After the trial, you can still use Cursor with limited features (GPT-4 mini or Cursor small models),<br />
            which are only good for simple tasks.After the trial
          </p>
</div>

    </div>
    
    </div>
  )
}

export default Hero4image