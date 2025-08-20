import React from 'react'
import Career1 from '../images/Career/menwithheadphone.png'
import Career2 from '../images/Career/Rectangle 6084.png'
import MainIcon from '../images/Home/mainicon.svg'
import Point from '../images/Career/Point.svg'

function Career() {
  return (
    <div className='containerpaddin container mx-auto mt-[50px] z-1000'>
        
        <div className='grid grid-cols-1 md:grid-cols-2 items-center  gap-10'>
            <div className='order-2 md:order-1 flex items-center justify-center'>
                <div className='flex items-end justify-between gap-4'>
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


            <h1 className='text-white font-Title text-[20px] md:text-[25px] lg:text-[30px] xl:text-[40px] 2xl:text-[50px]'>
            Create Song With 
            The Power of AI
            </h1>
            <div className='flex items-center  gap-4'>
            <div>
            <img src={Point.src} alt="" className='w-10 h-10 sm:w-8 sm:h-8 md:w-14 md:h-14 lg:w-14 lg:h-14 xl:w-10 xl:h-10' />
            </div>
            <p className='font-light-500 text-white text-[10px] md:text-[12px] lg:text-[14px]  xl:text-[14px] 2xl:text-[18px] text-white  mt-4'>
            The largest marketplace for high quality beatsAccess over 8 million beats from our growing community of producers around the world.
            </p>
            </div>

            <div className='flex items-center  gap-4'>
            <div>
            <img src={Point.src} alt="" className='w-10 h-10 sm:w-8 sm:h-8 md:w-14 md:h-14 lg:w-14 lg:h-14 xl:w-10 xl:h-10' />
            </div>
            <p className='font-light-500 text-white text-[10px] md:text-[12px] lg:text-[14px]   xl:text-[14px] 2xl:text-[18px] text-white  mt-4'>
            Seamless purchasing experienceWe keep it effortless. Browse your favorite genres and purchase with ease - all within one platform
            </p>
            </div>

            <div className='flex items-center  gap-4'>
            <div>
            <img src={Point.src} alt="" className='w-10 h-10 sm:w-8 sm:h-8 md:w-14 md:h-14 lg:w-14 lg:h-14 xl:w-10 xl:h-10' />
            </div>
            <p className='ffont-light-500 text-white text-[10px] md:text-[12px] lg:text-[14px]   xl:text-[14px] 2xl:text-[18px] text-white  mt-4'>
            Simple licensing optionsContracts don’t have to be confusing. Spend less time scratching your head and more time recording your next hit.
            </p>
            </div>

            <div className='flex items-center  gap-4'>
            <div>
            <img src={Point.src} alt="" className='w-10 h-10 sm:w-8 sm:h-8 md:w-14 md:h-14 lg:w-14 lg:h-14 xl:w-10 xl:h-10' />
            </div>
            <p className='font-light-500 text-white text-[10px] md:text-[12px] lg:text-[14px]   xl:text-[14px] 2xl:text-[18px] text-white  mt-4'>
            The largest marketplace for high quality beatsAccess over 8 million beats from our growing community of producers around the world.
            </p>
            </div>

            <div className='flex items-center  gap-4'>
            <div>
                <img src={Point.src} alt="" className='w-10 h-10 sm:w-8 sm:h-8 md:w-14 md:h-14 lg:w-14 lg:h-14 xl:w-10 xl:h-10' />
            </div>
            <p className='ffont-light-500 text-white text-[10px] md:text-[12px] lg:text-[14px]   xl:text-[14px] 2xl:text-[18px] text-white  mt-4'>
            Simple licensing optionsContracts don’t have to be confusing. Spend less time scratching your head and more time recording your next hit.
            </p>
            </div>
            </div>
            </div>


        </div>
   
  )
}

export default Career