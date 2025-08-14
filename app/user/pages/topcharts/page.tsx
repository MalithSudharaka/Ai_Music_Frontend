'use client'
import { IoMdArrowDropdown } from "react-icons/io";
import Navbar from '../../components/Navbar'
import Musicdata from '../musicdata.json'
import Dropdown from '../../dropdown.json'
import React, {useEffect, useState} from 'react'
import Downloadicon from '../../images/icon/Download.svg'
import Image from '../../images/songimage/song.png'
import First_carousel from '../../components/First_carousel'
import Footer from '../../components/Footer'

export default function TopChartsPage() {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [screenSize, setScreenSize] = useState('mobile');

  // Determine cards per page based on screen size
  const getCardsPerPage = () => {
    if (typeof window !== 'undefined') {
      const width = window.innerWidth;
      if (width < 640) return 10; // mobile
      if (width < 768) return 12; // sm
      if (width < 1024) return 8;  // md
      return 10; // lg and above
    }
    return 10; // default
  };

  const cardsPerPage = getCardsPerPage();

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setStartX(e.pageX - e.currentTarget.offsetLeft);
    setScrollLeft(e.currentTarget.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - e.currentTarget.offsetLeft;
    const walk = (x - startX) * 2;
    e.currentTarget.scrollLeft = scrollLeft - walk;
  };

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
    <div>
      <Navbar />
      <div className="containerpaddin   container mx-auto  pt-34 sm:pt-28 md:pt-32 lg:pt-36 ">
          <h1 className="text-white text-4xl font-roboto font-bold mb-4">Top Charts</h1>
          <First_carousel />
          <div className='md:flex items-center justify-between overflow-hidden'>
            <div className='bg-black/40 backdrop-blur-sm rounded-full border border-white/50 '>
                <div className="flex items-center justify-between py-1 px-2">
                    <div className="flex items-center flex-1 min-w-0">
                        <svg className="w-5 h-5 text-gray-400 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input 
                            type="text" 
                            placeholder="Search for tag" 
                            className="bg-transparent text-white placeholder-gray-400 outline-none flex-1 font-roboto font-light-300 min-w-0"
                        />
                    </div>
                </div>
            </div>

          <div className='px-2 '>
            <div className='h-4  md:h-4 lg:h-6 w-px bg-white/50 hidden md:block' />
          </div>            
          
            <div 
              className='flex items-center gap-2 overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing py-2'
              onMouseDown={handleMouseDown}
              onMouseLeave={handleMouseLeave}
              onMouseUp={handleMouseUp}
              onMouseMove={handleMouseMove}
            >
            {
            Musicdata.map( musicdata => (
            <div key={musicdata.id} className='flex-shrink-0'>
            <div className='bg-black/40 backdrop-blur-sm rounded-full border border-white/50 flex items-center justify-center'>
              <div className="py-1 px-1 flex items-center justify-center w-full">
              <p className='font-roboto font-light-300 text-white px-4'>{musicdata.tag}</p>
              </div>
            </div>
            </div>
            ))}
            </div> 
        </div>


        <div 
              className='flex items-center justify-between gap-2 overflow-x-auto  mt-4'
              
            >
              <div className="flex items-center justify-center">
        
        {
            Dropdown.map( dropdown => (
            <div key={dropdown.id} className='flex-shrink-0'>
            <div className='flex items-center justify-center'>
              <div className="py-1 px-1 flex items-center justify-center w-full">
              <p className='font-roboto font-light-300 text-white px-4'>{dropdown.name} </p>
              <div className="text-white">
              <IoMdArrowDropdown />
              </div>
              </div>
            </div>
            </div>
            ))}
            </div>
            <div className="text-white items-end justify-end">
            
            </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5   gap-6 overflow-x-auto scrollbar-hide  mt-9">

            {
            currentCards.map( musicdata => (
            <div key={musicdata.id} className='flex-shrink-0'>
            <div className="">
                          <img src={musicdata.image} className="rounded-sm w-full h-full hover:brightness-125 hover:shadow-lg hover:shadow-white/20 transition-all duration-200 cursor-pointer" alt="Description" />
                          <h1 className="text-white text-md font-roboto font-bold   mt-2">{musicdata.title}</h1>
                          <h1 className="text-white text-sm font-roboto  ">Skeyes_A</h1>
                          <div className="grid grid-cols-8 gap-2 mt-2">

                         <button className="grid col-span-6 bg-white/20 backdrop-blur-sm rounded-full font-bold text-white justify-center items-center rounded-sm hover:bg-white/30 transition-colors duration-200">$ {musicdata.plays}</button>
                 <button className="grid col-span-2 bg-primary text-black px-2 py-2 md:px-2 md:py-2 xl:px-4 xl:py-1 rounded-sm hover:bg-primary/70 transition-colors duration-200">
                <img src={Downloadicon.src} alt="Download" className="" />
              </button>

            </div>
            </div>
            </div>
            ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center space-x-2 mt-8 mb-8">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg border border-white/20 text-white hover:bg-white/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-roboto font-medium"
                >
                  Previous
                </button>
                
                <div className="flex space-x-1">
                  {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`px-6 py-2 rounded-lg font-roboto font-medium transition-colors ${
                        currentPage === page
                          ? 'bg-white/50 text-white'
                          : 'bg-white/20 backdrop-blur-sm border border-white/20 text-white hover:bg-white/30'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
                
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg border border-white/20 text-white hover:bg-white/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-roboto font-medium"
                >
                  Next
                </button>
              </div>
            )}

      </div>
      <Footer />
</div>
  )
} 