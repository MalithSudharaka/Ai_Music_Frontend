import React from 'react'
import MainIcon from '../images/Home/mainicon.svg'
import HeroButton from '../images/Home/herobutton.svg'

function Madeon() {
  return (
    <div className='containerpaddin container mx-auto mt-[100px]  items-center justify-center'>

          <p className='font-Galldis font-light-500 text-white text-[10px] text-white  mt-4 text-center'>
            #MADEONBEATSTARS
          </p>
          
          <h1 className='text-white text-[50px] leading-16 text-center mt-4'>
            Create Song With <br></br>
            The Power of AI
          </h1>

          <p className='font-Galldis font-light-500 text-white text-[10px] text-white  mt-4 text-center'>
            The largest marketplace for high quality beatsAccess over 8 <br/>million beats from our growing community of producers<br/> around the world.
          </p>

          <div className='flex items-center justify-center gap-4 mt-10'>
            <img src={MainIcon.src} alt="" className='h-[60px]' />
            <img src={HeroButton.src} alt="" className='h-[60px]' />
          </div>
    </div>
  )
}

export default Madeon

