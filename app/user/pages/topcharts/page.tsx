'use client'
import { IoMdArrowDropdown } from "react-icons/io";
import { ImMenu } from "react-icons/im";
import Navbar from '../../components/Navbar'
import Musicdata from '../musicdata.json'
import Dropdown from '../../dropdown.json'
import React, {useEffect, useState} from 'react'
import Downloadicon from '../../images/icon/download.svg'
import Image from '../../images/songimage/song.png'

export default function TopChartsPage() {
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

  return (
    <div>
      <Navbar />
      <div className="containerpaddin   container mx-auto  pt-24 sm:pt-28 md:pt-32 lg:pt-36 ">
          <h1 className="text-white text-4xl font-roboto font-bold mb-4">Top Charts</h1>

          <div className='flex items-center justify-between overflow-hidden'>
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

          <div className='px-2'>
            <div className='h-4  md:h-4 lg:h-6 w-px bg-white/50' />
          </div>            
          
            <div 
              className='flex items-center gap-2 overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing'
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
              className='flex items-center justify-between gap-2 overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing mt-4'
              onMouseDown={handleMouseDown}
              onMouseLeave={handleMouseLeave}
              onMouseUp={handleMouseUp}
              onMouseMove={handleMouseMove}
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
            <ImMenu />
            </div>
            </div>

            <div className="grid grid-cols-5  gap-6 overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing mt-9">

            {
            Musicdata.map( musicdata => (
            <div key={musicdata.id} className='flex-shrink-0'>
            <div className="">
            <img src={musicdata.image} className="rounded-sm" alt="Description" />
            <h1 className="text-white text-md font-roboto font-bold   mt-2">{musicdata.title}</h1>
            <h1 className="text-white text-sm font-roboto  ">Skeyes_A</h1>
            <div className="grid grid-cols-8 gap-2 mt-2">
            <button className="grid col-span-6 bg-white/40 backdrop-blur-sm rounded-full border border-white font-bold text-white px-4 py-1 rounded-sm">$ {musicdata.plays}</button>
            <button className="grid col-span-2 bg-white text-black px-4 py-1 rounded-sm">Play</button>
            </div>
            </div>
            </div>
            ))}
            </div>

      </div>
</div>
  )
} 