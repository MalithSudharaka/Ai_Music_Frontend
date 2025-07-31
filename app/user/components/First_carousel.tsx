import React from 'react'
import Cd from '../images/icon/cd.png'
import first_carousel from './first_carousel.json'
import Forword from '../images/icon/Forward.svg'
import { useState } from 'react'

function First_carousel() {
    const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

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

  const handleScrollLeft = () => {
    const container = document.querySelector('.carousel-container') as HTMLElement;
    if (container) {
      container.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const handleScrollRight = () => {
    const container = document.querySelector('.carousel-container') as HTMLElement;
    if (container) {
      container.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <div className='container mx-auto relative '>
        <div className='px-2'>
            
          </div>            
          
          {/* Left Arrow */}
          <button 
            onClick={handleScrollLeft}
            className='absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 backdrop-blur-sm rounded-full p-2 hover:bg-black/70 transition-colors'
          >
            <img src={Forword.src} alt="Previous" className='w-6 h-6 rotate-180' />
          </button>

          {/* Right Arrow */}
          <button 
            onClick={handleScrollRight}
            className='absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 backdrop-blur-sm rounded-full p-2 hover:bg-black/70 transition-colors'
          >
            <img src={Forword.src} alt="Next" className='w-6 h-6' />
          </button>
          
            <div 
              className='flex items-center gap-2 overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing my-10 carousel-container rounded-sm'
              onMouseDown={handleMouseDown}
              onMouseLeave={handleMouseLeave}
              onMouseUp={handleMouseUp}
              onMouseMove={handleMouseMove}
            >
        {
            first_carousel.map( carouseldata =>(
                <div key={carouseldata.id} className='flex-shrink-0'>
                    
                    <div className='h-50 w-50 bg-white/20 backdrop-blur-sm rounded-sm relative items-center justify-center'>
                    
                     <div className='flex flex-col items-center justify-center'>                      
                        <img src={Cd.src} alt="Cd" className='w-40 h-40' />
                        <div className='flex flex-col items-center justify-center '>
                        <h1 className='text-white text-lg font-roboto font-semibold'>{carouseldata.title}</h1>
                        </div>
                        </div>
                     </div>
                </div> 
                
            ))
        }
        </div>
        </div>
   
  )
}

export default First_carousel