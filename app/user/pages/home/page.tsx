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
import MadeonCarousel from '../../components/MadeonCarousel'
import ImageTrail from '../../components/ImageTrail'
import CircularGallery from '../../components/CircularGallery'
import FlowingMenu from '../../components/FlowingMenu'

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

  const demoItems = [
    { link: '#', text: 'Mojave', image: 'https://picsum.photos/600/400?random=1' },
    { link: '#', text: 'Sonoma', image: 'https://picsum.photos/600/400?random=2' },
    { link: '#', text: 'Monterey', image: 'https://picsum.photos/600/400?random=3' },
    { link: '#', text: 'Sequoia', image: 'https://picsum.photos/600/400?random=4' }
  ];

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

      <div className='relative z-1000'>
        <Navbar />
      </div>
      <SplashCursor /> 
      
      <div className='relative z-50'>
      <div className='absolute bottom-[40%] md:bottom-[20%] xl:bottom-[12%] right-0 left-0 w-full '>
        
        <img src={Whiteline.src} alt="" className="w-full items-center justify-center" />
      </div>
      <div className='relative containerpaddin container mx-auto'>
        <div className='pt-34 sm:pt-28 md:pt-32 lg:pt-50  lg:leading-15 xl:leading-25 2xl:leading-35'>
          <h1 className='text-white font-Title font-bold text-[40px] md:text-[50px] lg:text-[60px] xl:text-[80px] 2xl:text-[100px] font-bold'>
          Discover, Upload, and Download<br />
            <span className='flex items-center'>
              AI S
              <span>
                <img src={Music.src} alt="" className='w-18 h-18 sm:w-20 sm:h-20 md:w-25 md:h-25 lg:w-30 lg:h-30' />
              </span>
              ngs
            </span>
          </h1>
          <p className='max-w-[100%] font-bold  md:max-w-[60%] text-white lg:text-lg mt-4'>
          Discover a new way to create and enjoy music. Museedle is an AI-driven music marketplace where you can preview, stream, and download tracks for free. Future versions will empower musicians to upload and monetize their music with ease.
          </p>


          
          <div>
          <p className=" text-white text-sm mt-4 mb-4 text-right  ">
          A next-generation platform for artists to create, share,<br />
           and monetize AI-powered music. For fans, it's your portal to<br />
            download exclusive tracks and be the first to hear the future.

          </p>
          </div>
        </div>

        <div>
          <div className='flex flex-col lg:flex-row items-center justify-between gap-4 md:gap-0'>
            <div className='rounded-full border border-white/50 flex-1 w-full  lg:max-w-lg xl:max-w-xl'>
              <div className="flex items-center justify-between py-2 px-3 xl:py-3 xl:px-4">
                <div className="flex items-center flex-1 min-w-0">
                  <svg className="w-5 h-5 lg:w-10 lg:h-10 text-white/50 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input 
                    type="text" 
                    placeholder="Search Track" 
                    className="bg-transparent text-white text-white/70 text-sm md:text-lg outline-none flex-1  w-full"
                  />
                </div>
                <button className='bg-white font-roboto font-semibold text-black px-4 py-1 md:px-6 md:py-3 rounded-full'>
                  Search
                </button>
              </div>
            </div>
            
            <div className='font-roboto font-light-300 text-white  mt-2 md:mt-8 lg:mt-0 items-center justify-center'>
            <div className="flex items-center  gap-2 md:gap-4">
            <img src={MainIcon.src} alt="" className="h-10 md:h-15 lg:h-13 xl:h-15  w-auto " />
            <img src={HeroButton.src} alt="" className="h-10 md:h-15 lg:h-13 xl:h-15 w-auto" />
            </div>
            
            </div>
          </div>

          <div className='flex flex-col lg:flex-row mt-4 md:mt-2 lg:mt-2 items-center gap-1 lg:gap-10'>
            <div className='font-Galldis font-light-500 text-white text-sm text-white  mt-2'>
              <p>Discover What’s Hot Today</p>
            </div>

            <div className='font-Galldis font-light-500 text-white text-sm text-white  mt-2 flex items-center gap-2'>
              <button className='ffont-Galldis font-light-500 text-white text-sm text-white border border-white/50 font-regular text-black px-4 py-1 rounded-full justify-center items-center'>
                POP
              </button>
              <button className='font-Galldis font-light-500 text-white text-sm border border-white/50 font-regular text-black px-4 py-1 rounded-full justify-center items-center'>
                R&B
              </button>
              <button className='font-Galldis font-light-500 text-white text-sm text-white border border-white/50 font-regular text-black px-4 py-1 rounded-full justify-center items-center'>
                Hip-Hop
              </button>
            </div>
          </div>
        </div>
        
      </div>
      


      <Hero4image />


      </div>
      <div className=' mx-auto mt-[50px]'>
        <div className='bg-black/30 backdrop-blur-sm  px-4 py-8 overflow-hidden'>
        <div className='containerpaddin container mx-auto'>
          <div className='flex items-center opacity-50 animate-scroll'>
             <img src={Logo1.src} alt="" className='mx-2 md:mx-8 flex-shrink-0 h-4 md:h-8 lg:h-5 xl:h-8 w-auto' />
             <img src={Logo2.src} alt="" className='mx-2 md:mx-8 flex-shrink-0 h-4 md:h-8 lg:h-5 xl:h-8 w-auto' />
             <img src={Logo3.src} alt="" className='mx-2 md:mx-8 flex-shrink-0 h-4 md:h-8 lg:h-5 xl:h-8 w-auto' />
             <img src={Logo4.src} alt="" className='mx-2 md:mx-8 flex-shrink-0 h-4 md:h-8 lg:h-5 xl:h-8 w-auto' />
             <img src={Logo5.src} alt="" className='mx-2 md:mx-8 flex-shrink-0 h-4 md:h-8 lg:h-5 xl:h-8 w-auto' />
             <img src={Logo6.src} alt="" className='mx-2 md:mx-8 flex-shrink-0 h-4 md:h-8 lg:h-5 xl:h-8 w-auto' />
             <img src={Logo7.src} alt="" className='mx-2 md:mx-8 flex-shrink-0 h-4 md:h-8 lg:h-5 xl:h-8 w-auto' />
             {/* Duplicate logos for seamless loop */}
             <img src={Logo1.src} alt="" className='mx-2 md:mx-8 flex-shrink-0 h-4 md:h-8 lg:h-5 xl:h-8 w-auto' />
             <img src={Logo2.src} alt="" className='mx-2 md:mx-8 flex-shrink-0 h-4 md:h-8 lg:h-5 xl:h-8 w-auto' />
             <img src={Logo3.src} alt="" className='mx-2 md:mx-8 flex-shrink-0 h-4 md:h-8 lg:h-5 xl:h-8 w-auto' />
             <img src={Logo4.src} alt="" className='mx-2 md:mx-8 flex-shrink-0 h-4 md:h-8 lg:h-5 xl:h-8 w-auto' />
             <img src={Logo5.src} alt="" className='mx-2 md:mx-8 flex-shrink-0 h-4 md:h-8 lg:h-5 xl:h-8 w-auto' />
             <img src={Logo6.src} alt="" className='mx-2 md:mx-8 flex-shrink-0 h-4 md:h-8 lg:h-5 xl:h-8 w-auto' />
             <img src={Logo7.src} alt="" className='mx-2 md:mx-8 flex-shrink-0 h-4 md:h-8 lg:h-5 xl:h-8 w-auto' />
          </div>
          </div>
        </div>
      </div>

{/* Music Cards */}
        <div className='containerpaddin container mx-auto mt-[50px] '>
        <h1 className='text-white font-Title text-[10px] md:text-[10px] lg:text-[10px] xl:text-[20px] 2xl:text-[20px]'>
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

       <div className='mt-[50px] md:mt-[50px] lg:mt-[100px] xl:mt-[150px] 2xl:mt-[200px] mb-[50px] md:mb-[100px] lg:mb-[150px] xl:mb-[200px] 2xl:mb-[250px]'>
        <Banner playAnimation={true} />
        </div>


       

       <MadeonCarousel />
        
       <div style={{ height: '500px', position: 'relative', overflow: 'hidden'}}>
         <div className="absolute inset-0 flex items-center justify-center z-10">
         <div className='containerpaddin container mx-auto mt-[50px] xl:mt-[100px]  items-center justify-center'>

<p className='font-Galldis font-light-500 text-white text-[10px] text-white  mt-4 text-center'>
  #MADEONBEATSTARS
</p>

<h1 className='text-white font-Title text-[20px] md:text-[25px] lg:text-[30px] xl:text-[40px] 2xl:text-[50px] text-center mt-4'>
Create, Remix & <br/>
Shine with AI Music.
</h1>

<p className='font-Galldis font-light-500 text-white text-[10px] md:text-[15px] text-white  mt-4 text-center'>
Discover a smarter way to make music online. Whether you’re a beginner or a pro, <br/>
 our AI platform makes it easy to create, remix, and download high-quality tracks.<br/>
  Join the next wave of artists shaping the future of music with technology.
</p>

<div className='flex items-center justify-center gap-4 mt-10'>
<div className="flex items-center  gap-2 md:gap-4">
  <img src={MainIcon.src} alt="" className="h-10 md:h-15 lg:h-13 xl:h-15  w-auto " />
  <img src={HeroButton.src} alt="" className="h-10 md:h-15 lg:h-13 xl:h-15 w-auto" />
  </div>
</div>
</div>
         </div>
  <ImageTrail
    items={[
      'https://picsum.photos/id/287/300/300',
      'https://picsum.photos/id/1001/300/300',
      'https://picsum.photos/id/1025/300/300',
      'https://picsum.photos/id/1026/300/300',
      'https://picsum.photos/id/1027/300/300',
      'https://picsum.photos/id/1028/300/300',
      'https://picsum.photos/id/1029/300/300',
      'https://picsum.photos/id/1030/300/300',
      // ...
    ]}
    variant={1}
  />
</div>

<div style={{ height: '600px', position: 'relative' }}>
  <FlowingMenu items={demoItems} />
</div>

<div style={{ height: '600px', position: 'relative' }}>
  <CircularGallery bend={10} textColor="#ffffff" borderRadius={0.05} scrollEase={0.2}/>
</div>

      <Footer />
      </div>
    
  )
}
