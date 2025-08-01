import React from 'react'
import Career1 from '../images/Career/Rectangle 6083.png'
import Career2 from '../images/Career/Rectangle 6084.png'
import MainIcon from '../images/Home/mainicon.svg'
import Point from '../images/Career/Point.svg'

function Career() {
  return (
    <div className='containerpaddin container mx-auto mt-[100px] '>
        
        <div className='flex items-center  gap-30'>
            <div>
                <div className='flex items-end justify-between gap-4 '>
                    <div>
                        <img src={Career1.src} alt="" className='w-full h-full' />
                    </div>
                    <div className='flex flex-col items-center justify-between gap-4'>
                        <img src={MainIcon.src} alt="" className='w-[200px]' />
                        <img src={Career2.src} alt="" className='w-full h-full' />
                    </div>
                </div>
            </div>



            <div>


            <h1 className='text-white text-[50px] font-roboto font-bold leading-16'>
            Create Song With <br></br>
            The Power of AI
            </h1>
            <div className='flex items-center  gap-4'>
            <div>
                <img src={Point.src} alt="" className='w-10 h-10' />
            </div>
            <p className='font-Galldis font-light-500 text-white text-[10px] text-white  mt-4'>
            The largest marketplace for high quality beatsAccess over 8 <br/>million beats from our growing community of producers<br/> around the world.
            </p>
            </div>

            <div className='flex items-center  gap-4'>
            <div>
                <img src={Point.src} alt="" className='w-10 h-10' />
            </div>
            <p className='font-Galldis font-light-500 text-white text-[10px] text-white  mt-4'>
            Seamless purchasing experienceWe keep it effortless. Browse <br/>your favorite genres and purchase with ease - all within one<br/>platform
            </p>
            </div>

            <div className='flex items-center  gap-4'>
            <div>
                <img src={Point.src} alt="" className='w-10 h-10' />
            </div>
            <p className='font-Galldis font-light-500 text-white text-[10px] text-white  mt-4'>
            Simple licensing optionsContracts don’t have to be confusing. <br/>Spend less time scratching your head and more time recording<br/> your next hit.
            </p>
            </div>

            <div className='flex items-center  gap-4'>
            <div>
                <img src={Point.src} alt="" className='w-10 h-10' />
            </div>
            <p className='font-Galldis font-light-500 text-white text-[10px] text-white  mt-4'>
            The largest marketplace for high quality beatsAccess over 8 <br/>million beats from our growing community of producers<br/> around the world.
            </p>
            </div>

            <div className='flex items-center  gap-4'>
            <div>
                <img src={Point.src} alt="" className='w-10 h-10' />
            </div>
            <p className='font-Galldis font-light-500 text-white text-[10px] text-white  mt-4'>
            A community that understands youWe’re creators just like you.<br/>Whether you need our support team or want to collaborate with<br/> like-minded creatives, there’s a home for you.
            </p>
            </div>
            </div>
            </div>


        </div>
   
  )
}

export default Career