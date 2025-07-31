'use client'
import React from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import First_carousel from '../../components/First_carousel'
import Music from '../../images/Home/musicgirl.png'
import SplashCursor from '../../components/SplashCursor'


export default function HomePage() {
  return (
    <div>
      <Navbar />
      <SplashCursor />
      
      <div className='containerpaddin container mx-auto'>
        <div className='pt-34 sm:pt-28 md:pt-32 lg:pt-36 leading-30 xl:leading-35'>
          <h1 className='text-white text-[130px] font-roboto font-bold'>
            Upload & Download<br />
            <span className='flex items-center'>
              AI S
              <span>
                <img src={Music.src} alt="" className='w-30 h-30' />
              </span>
              ngs
            </span>
          </h1>
          <p className='font-roboto font-light-300 text-white text-lg mt-4'>
            After the trial, you can still use Cursor with limited features (GPT-4 mini or Cursor small models),<br />
            which are only good for simple tasks.After the trial
          </p>
          <p className="font-roboto font-semibold text-white text-lg mt-4 text-right">
            After the trial, you can still use Cursor with limited <br />
            features (GPT-4 mini or Cursor small models), which <br />
            are only good for simple tasks.After the trial
          </p>
        </div>

        <div>
          <div className='flex items-center justify-between'>
            <div className='rounded-full border border-white/50 flex-1 max-w-xl'>
              <div className="flex items-center justify-between py-3 px-4">
                <div className="flex items-center flex-1 min-w-0">
                  <svg className="w-5 h-5 text-gray-400 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input 
                    type="text" 
                    placeholder="Try searching Trap or Sad or Juice Wrld..." 
                    className="bg-transparent text-white placeholder-gray-400 outline-none flex-1 font-roboto font-light-300 w-full"
                  />
                </div>
                <button className='bg-white font-roboto font-semibold text-black px-6 py-2 rounded-full'>
                  Search
                </button>
              </div>
            </div>

            <div className='font-roboto font-light-300 text-white text- mt-2'>
              <p>Popular tags</p>
            </div>
          </div>

          <div className='flex items-center gap-10'>
            <div className='font-roboto font-light-300 text-white text- mt-2'>
              <p>PWhat’s trending right nowhhhh</p>
            </div>

            <div className='font-roboto font-light-300 text-white text- mt-2 flex items-center gap-2'>
              <button className='font-roboto text-white border border-white/50 font-regular text-black px-4 py-1 rounded-full justify-center items-center'>
                POP
              </button>
              <button className='font-roboto text-white border border-white/50 font-regular text-black px-4 py-1 rounded-full justify-center items-center'>
                R&B
              </button>
              <button className='font-roboto text-white border border-white/50 font-regular text-black px-4 py-1 rounded-full justify-center items-center'>
                PCountryOP
              </button>
            </div>
          </div>
        </div>
       
      </div>
      <Footer />
    </div>
  )
}
