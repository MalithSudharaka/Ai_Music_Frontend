'use client'
import React, { useState } from 'react'
import Navbar from '@/app/user/components/Navbar'
import Footer from '@/app/user/components/Footer'
import Music from '../../images/icon/cd.png'
import Downloadicon from '../../images/icon/Download.svg'
import musicData from '../musicdata.json'
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri"
import musiciansdata from '../../components/Musician/musicians.json'

function page() {
    const currentCards = musicData;
    const [currentPage, setCurrentPage] = useState(0);
    const [cardsPerPage, setCardsPerPage] = useState(4);

    // Update cards per page based on screen size
    React.useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768 && window.innerWidth < 1024) { // md screens
                setCardsPerPage(3);
            } else {
                setCardsPerPage(4);
            }
        };

        handleResize(); // Set initial value
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const totalPages = Math.ceil(currentCards.length / cardsPerPage);
    const startIndex = currentPage * cardsPerPage;
    const endIndex = startIndex + cardsPerPage;
    const displayedCards = currentCards.slice(startIndex, endIndex);

    const nextPage = () => {
        setCurrentPage(prev => Math.min(prev + 1, totalPages - 1));
    };

    const prevPage = () => {
        setCurrentPage(prev => Math.max(prev - 1, 0));
    };

    return (
        <div className="relative overflow-hidden">
            {/* Primary color blur circle - top right corner */}
            <div className=''>


            </div>

            <Navbar />
            <div className='containerpaddin container mx-auto pt-34 sm:pt-28 md:pt-32 lg:pt-50 xl:pt-50'>
                <div className=''>
                    <div className='text-title text-white font-bold text-[26px] md:text-[40px] lg:text-[30px] xl:text-[40px] 2xl:text-[40px] font-bold '>
                        Musicians
                    </div>
                    <div className='bg-white/50 w-full h-0.5'>

                    </div>


                    {
                        musiciansdata.map(musician => (
                            <div key={musician.id}>


                                <div className='grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-10 justify-center items-center  md:mt-8  '>

                                    <div className='col-span-1 flex justify-center md:justify-start mt-10 md:mt-0'>
                                        <div className='text-center md:text-left'>
                                            <div className='bg-white/50 w-30 h-30 rounded-full mx-auto md:mx-0'>
                                                <img src={musician.image} alt="" className='w-full h-full rounded-full object-cover' />
                                            </div>

                                            <div className='items-center justify-center mt-4'>
                                                <div className='text-white font-bold text-[20px] md:text-[16px] lg:text-[20px] xl:text-[20px] 2xl:text-[30px] font-bold'>
                                                    {musician.name}
                                                </div>

                                                <div className='text-white/60  text-[16px] md:text-[12px] lg:text-[16px] xl:text-[16px] leading-5 2xl:text-[20px] font-bold'>
                                                    {musician.category}
                                                </div>

                                                <div className='text-white/60  text-[16px] md:text-[10px] lg:text-[12px] xl:text-[14px] 2xl:text-[14px] mt-4'>
                                                    {musician.description}
                                                </div>
                                                <button
                                                    onClick={() => window.location.href = '/user/pages/Profile'}
                                                    className='bg-blue-500 w-full mt-4 text-white px-2 py-2 md:px-4 md:py-2 xl:px-6 xl:py-1 rounded-full hover:bg-blue-600 transition-colors duration-200 font-bold text-sm'
                                                >
                                                    Show Profile
                                                </button>
                                                <div className='bg-white/50 w-full h-0.5 mt-4 mb-4 md:hidden'>
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                    <div className='col-span-2 hidden md:block'>
                                        <div className='w-full h-[300px]   lg:h-[320px] xl:h-[380px] relative'>
                                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6 overflow-x-auto scrollbar-hide mt-9">

                                                {
                                                    displayedCards.map(musicdata => (
                                                        <div key={musicdata.id} className='flex-shrink-0'>
                                                            <div className="">
                                                                <img src={musicdata.image} className="rounded-sm w-full h-full hover:brightness-125 hover:shadow-lg hover:shadow-white/20 transition-all duration-200 cursor-pointer" alt="Description" />
                                                                <h1 className="text-white text-md font-roboto font-bold md:text-sm lg:text-sm xl:text-sm 2xl:text-sm  mt-2">{musicdata.title}</h1>
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

                                            {/* Navigation Buttons */}
                                            <div className="absolute inset-0 flex items-center justify-between pointer-events-none">
                                                <button
                                                    onClick={prevPage}
                                                    disabled={currentPage === 0}
                                                    className="pointer-events-auto bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed ml-4"
                                                >
                                                    <RiArrowLeftSLine className="w-6 h-6" />
                                                </button>
                                                <button
                                                    onClick={nextPage}
                                                    disabled={currentPage === totalPages - 1}
                                                    className="pointer-events-auto bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed mr-4"
                                                >
                                                    <RiArrowRightSLine className="w-6 h-6" />
                                                </button>
                                            </div>

                                            {/* Page Indicator */}
                                            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                                                <div className="flex space-x-2">
                                                    {Array.from({ length: totalPages }, (_, index) => (
                                                        <button
                                                            key={index}
                                                            onClick={() => setCurrentPage(index)}
                                                            className={`w-2 h-2 rounded-full transition-colors ${currentPage === index ? 'bg-white' : 'bg-white/50'
                                                                }`}
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                            </div>
                        ))
                    }

                </div>

            </div>


            <Footer />
        </div>
    )
}

export default page