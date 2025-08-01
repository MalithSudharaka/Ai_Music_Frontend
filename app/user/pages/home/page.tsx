'use client'
import React, { useState, useEffect } from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import First_carousel from '../../components/First_carousel'
import Music from '../../images/Home/musicgirl.png'
import SplashCursor from '../../components/SplashCursor'
import Hero4image from '../../components/Hero4image'
import Whiteline from '../../images/Home/whitebgline.svg'
import MainIcon from '../../images/Home/mainicon.svg'
import HeroButton from '../../images/Home/herobutton.svg'
import Banner from '../../components/Banner'
import Musicdata from '../musicdata.json'
import Downloadicon from '../../images/icon/Download.svg'
import Career from '../../components/Career'
import Logo1 from '../../images/LogoCarousel/logo1.png'
import Logo2 from '../../images/LogoCarousel/logo2.png'
import Logo3 from '../../images/LogoCarousel/logo3.png'
import Logo4 from '../../images/LogoCarousel/logo4.png'
import Logo5 from '../../images/LogoCarousel/logo5.png'
import Logo6 from '../../images/LogoCarousel/logo6.png'
import Logo7 from '../../images/LogoCarousel/logo7.png'
import Madeon from '../../components/Madeon'

export default function HomePage() {
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [screenSize, setScreenSize] = useState('mobile');

  // Determine cards per page based on screen size
  const getCardsPerPage = () => {
    if (typeof window !== 'undefined') {
      const width = window.innerWidth;
      if (width < 640) return 5; // mobile
      if (width < 768) return 6; // sm
      if (width < 1024) return 4;  // md
      return 5; // lg and above
    }
    return 5; // default
  };

  const cardsPerPage = getCardsPerPage();

  // Pagination logic
  const totalCards = Musicdata.length;
  const totalPages = Math.ceil(totalCards / cardsPerPage);
  const startIndex = (currentPage - 1) * cardsPerPage;
  const endIndex = startIndex + cardsPerPage;
  const currentCards = Musicdata.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Handle window resize to update pagination
  useEffect(() => {
    const handleResize = () => {
      const newCardsPerPage = getCardsPerPage();
      const newTotalPages = Math.ceil(totalCards / newCardsPerPage);
      if (currentPage > newTotalPages) {
        setCurrentPage(newTotalPages || 1);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [totalCards, currentPage]);

  return (
    <div className="relative overflow-hidden">
      {/* Primary color blur circle - top right corner */}
      <div className=''>
        
      <div className="absolute top-50 right-60 w-170 h-170 bg-gradient-to-bl from-[#FF1FB3]/20 to-[#FF1FB3]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none z-0"></div>
      <div className="absolute top-120 right-120 w-130 h-130 bg-gradient-to-bl from-primary/40 to-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none z-0"></div>

      <div className="absolute top-50 left-60 w-170 h-170 bg-gradient-to-bl from-[#FF1FB3]/20 to-[#FF1FB3]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none z-0"></div>
      
      <div className="absolute top-200 left-[-500px] w-170 h-170 bg-gradient-to-bl from-[#FF1FB3]/10 to-[#FF1FB3]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none z-0"></div>
      <div className="absolute top-300 left-10 w-130 h-130 bg-gradient-to-bl from-primary/40 to-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none z-0"></div>


      <div className="absolute top-450 right-60 w-170 h-170 bg-gradient-to-bl from-[#FF1FB3]/1 to-[#FF1FB3]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none z-0"></div>
      <div className="absolute top-500 right-120 w-130 h-130 bg-gradient-to-bl from-primary/20 to-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none z-0"></div>

      <div className="absolute top-450 left-60 w-170 h-170 bg-gradient-to-bl from-[#FF1FB3]/1 to-[#FF1FB3]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none z-0"></div>



      <div className="absolute top-700 left-[-400px] w-170 h-170 bg-gradient-to-bl from-[#FF1FB3]/10 to-[#FF1FB3]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none z-0"></div>
      <div className="absolute top-730 left-[100px] w-130 h-130 bg-gradient-to-bl from-primary/40 to-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none z-0"></div>


      </div>

      <Navbar />
      <SplashCursor />
      
      <div className='containerpaddin container mx-auto'>
        <div className='pt-34 sm:pt-28 md:pt-32 lg:pt-36 leading-30 xl:leading-35'>
          <h1 className='text-white text-[100px] font-Galldis font-bold'>
            Upload & Download<br />
            <span className='flex items-center'>
              AI S
              <span>
                <img src={Music.src} alt="" className='w-30 h-30' />
              </span>
              ngs
            </span>
          </h1>
          <p className='font-Galldis font-light-500 text-white text-sm mt-4'>
            After the trial, you can still use Cursor with limited features (GPT-4 mini or Cursor small models),<br />
            which are only good for simple tasks.After the trial
          </p>


          
          <div>
          <p className="font-Galldis font-light-500 text-white text-sm mt-4 text-right">
          <div className='h-px w-[50%] bg-white' />
            After the trial, you can still use Cursor with limited <br />
            features (GPT-4 mini or Cursor small models), which <br />
            are only good for simple tasks.After the trial
          </p>
          </div>
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
            <div className="flex items-center  gap-0">
            <img src={MainIcon.src} alt="" className="h-15 w-auto mr-2" />
            <img src={HeroButton.src} alt="" className="h-15 w-auto" />
            </div>
            
            </div>
          </div>

          <div className='flex items-center gap-10'>
            <div className='font-Galldis font-light-500 text-white text-sm text-white text- mt-2'>
              <p>PWhat’s trending right nowhhhh</p>
            </div>

            <div className='font-Galldis font-light-500 text-white text-sm text-white text- mt-2 flex items-center gap-2'>
              <button className='ffont-Galldis font-light-500 text-white text-sm text-white border border-white/50 font-regular text-black px-4 py-1 rounded-full justify-center items-center'>
                POP
              </button>
              <button className='font-Galldis font-light-500 text-white text-sm border border-white/50 font-regular text-black px-4 py-1 rounded-full justify-center items-center'>
                R&B
              </button>
              <button className='font-Galldis font-light-500 text-white text-sm text-white border border-white/50 font-regular text-black px-4 py-1 rounded-full justify-center items-center'>
                PCountryOP
              </button>
            </div>
          </div>
        </div>
        
      </div>



      <Hero4image />

      <div className=' mx-auto mt-[350px]'>
        <div className='bg-black/10 backdrop-blur-sm  px-4 py-8 shadow-xl shadow-black/20'>
        <div className='containerpaddin container mx-auto'>
          <div className='flex items-center justify-between opacity-50'>
             <img src={Logo1.src} alt="" className='' />
             <img src={Logo2.src} alt="" className='' />
             <img src={Logo3.src} alt="" className='' />
             <img src={Logo4.src} alt="" className='' />
             <img src={Logo5.src} alt="" className='' />
             <img src={Logo6.src} alt="" className='' />
             <img src={Logo7.src} alt="" className='' />
          </div>
          </div>
        </div>
      </div>

{/* Music Cards */}
        <div className='containerpaddin container mx-auto mt-[50px] '>
        <h1 className='text-white text-[30px] font-roboto font-bold leading-16'>
            Trending Songs
          </h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5   gap-6 overflow-x-auto scrollbar-hide  mt-9">

            {
            currentCards.map( musicdata => (
            <div key={musicdata.id} className='flex-shrink-0'>
            <div className="">
                          <img src={musicdata.image} className="rounded-sm w-full h-full hover:brightness-125 hover:shadow-lg hover:shadow-white/20 transition-all duration-200 cursor-pointer" alt="Description" />
                          <h1 className="text-white font-Galldis font-light-500 text-white text-[12px]  mt-2">{musicdata.title}</h1>
                          <h1 className="text-white font-Galldis font-light-500 text-white text-[10px]  ">Skeyes_A</h1>
                          <div className="grid grid-cols-8 gap-2 mt-2">

                         <button className="grid col-span-6 bg-white/20 backdrop-blur-sm rounded-full font-Galldis font-light-500 text-white text-sm justify-center items-center rounded-sm hover:bg-white/30 transition-colors duration-200">$ {musicdata.plays}</button>
                 <button className="grid col-span-2 bg-primary text-black px-2 py-2 md:px-2 md:py-2 xl:px-4 xl:py-1 rounded-sm hover:bg-primary/70 transition-colors duration-200">
                <img src={Downloadicon.src} alt="Download" className="" />
              </button>

            </div>
            </div>
            </div>
            ))}
            </div>
        </div>



       <Career />
       <Madeon />


        <div className='mt-[200px] mb-[500px]'>
        <Banner playAnimation={true} />
        </div>



      <Footer />
    </div>
  )
}
