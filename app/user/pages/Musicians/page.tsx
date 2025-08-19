'use client'
import React, { useState } from 'react'
import Navbar from '@/app/user/components/Navbar'
import Footer from '@/app/user/components/Footer'
import Music from '../../images/icon/cd.png'
import Downloadicon from '../../images/icon/Download.svg'
import musicData from '../musicdata.json'
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri"
import musiciansdata from '../../components/Musician/musicians.json'
import data from '../../data.json'

function page() {
    const currentCards = musicData;
    const [currentPage, setCurrentPage] = useState(0);
    const [cardsPerPage, setCardsPerPage] = useState(4);
    const [musicianPages, setMusicianPages] = useState<{ [key: string]: number }>({});
    
    // Search state for musicians
    const [searchQuery, setSearchQuery] = useState<string>('');

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

    // Filter unique musicians by name and search query
    const uniqueMusicians = data.filter((musician, index, self) => {
        // First, get unique musicians
        const isUnique = index === self.findIndex(m => m.musician === musician.musician);
        
        if (!isUnique) return false;
        
        // Then filter by search query if provided
        if (searchQuery.trim()) {
            const musicianName = musician.musician.toLowerCase();
            const musicianCountry = musician.musician_country.toLowerCase();
            const searchLower = searchQuery.toLowerCase();
            
            return musicianName.includes(searchLower) || musicianCountry.includes(searchLower);
        }
        
        return true;
    });
    
    // Get tracks for the current musician (for pagination)
    const getCurrentMusicianTracks = (musicianName: string) => {
        return data.filter(track => track.musician === musicianName);
    };

    const totalPages = Math.ceil(currentCards.length / cardsPerPage);
    const startIndex = currentPage * cardsPerPage;
    const endIndex = startIndex + cardsPerPage;
    const displayedCards = currentCards.slice(startIndex, endIndex);

    const nextPage = (musicianName: string) => {
        const musicianTracks = getCurrentMusicianTracks(musicianName);
        const totalMusicianPages = Math.ceil(musicianTracks.length / cardsPerPage);
        const currentMusicianPage = musicianPages[musicianName] || 0;
        
        if (currentMusicianPage < totalMusicianPages - 1) {
            setMusicianPages(prev => ({
                ...prev,
                [musicianName]: currentMusicianPage + 1
            }));
        }
    };

    const prevPage = (musicianName: string) => {
        const currentMusicianPage = musicianPages[musicianName] || 0;
        
        if (currentMusicianPage > 0) {
            setMusicianPages(prev => ({
                ...prev,
                [musicianName]: currentMusicianPage - 1
            }));
        }
    };

    const getMusicianPage = (musicianName: string) => {
        return musicianPages[musicianName] || 0;
    };

    const getTotalMusicianPages = (musicianName: string) => {
        const musicianTracks = getCurrentMusicianTracks(musicianName);
        return Math.ceil(musicianTracks.length / cardsPerPage);
    };

    return (
        <div className="relative overflow-hidden">
            {/* Primary color blur circle - top right corner */}
            <div className=''>


            </div>

            <Navbar />
            <div className='containerpaddin container mx-auto pt-34 sm:pt-28 md:pt-32 lg:pt-50 xl:pt-50'>
                <div className='flex flex-col w-full'>
                    {/* Header with title and search bar */}
                    <div className='flex flex-col md:flex-row items-center md:items-start justify-between w-full mb-2'>
                        <div className='text-title text-white font-bold text-[26px] md:text-[40px] lg:text-[30px] xl:text-[40px] 2xl:text-[40px] font-bold mb-6 md:mb-0'>
                            Musicians
                        </div>

                        {/* Search Bar for Musicians */}
                        <div className='w-full max-w-md md:max-w-sm lg:max-w-md'>
                            <div className='bg-black/40 backdrop-blur-sm rounded-full border border-white/50'>
                                <div className="flex items-center justify-between py-1 px-2">
                                    <div className="flex items-center flex-1 min-w-0">
                                        <svg className="w-5 h-5 text-gray-400 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                        <input
                                            type="text"
                                            placeholder="Search for musicians..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="bg-transparent text-white placeholder-gray-400 outline-none flex-1 font-roboto font-light-300 min-w-0"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='bg-white/50 w-full h-0.5'>

                    </div>

                    {/* Search Results Info */}
                    {searchQuery && (
                        <div className="mt-4 mb-6 text-center">
                            <p className="text-white text-sm">
                                Found <span className="text-primary font-bold">{uniqueMusicians.length}</span> musician{uniqueMusicians.length !== 1 ? 's' : ''} matching "<span className="text-primary font-bold">{searchQuery}</span>"
                            </p>
                        </div>
                    )}


                    {
                        uniqueMusicians.map((musician, index) => (
                            <div key={musician.id} className={`${index > 0 ? 'mt-16' : 'mt-8'}`}>
                                <div className='grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-10 justify-center items-center'>

                                    <div className='col-span-1 flex justify-center md:justify-start mt-10 md:mt-0'>
                                        <div className='text-center md:text-left'>
                                            <div className='bg-white/50 w-30 h-30 rounded-full mx-auto md:mx-0'>
                                                <img src={musician.musician_image} alt="" className='w-full h-full rounded-full object-cover' />
                                            </div>

                                            <div className='items-center justify-center mt-4'>
                                                <div className='text-white font-bold text-[20px] md:text-[16px] lg:text-[20px] xl:text-[20px] 2xl:text-[30px] font-bold'>
                                                    {musician.musician}
                                                </div>

                                                <div className='text-white/60  text-[16px] md:text-[12px] lg:text-[16px] xl:text-[16px] leading-5 2xl:text-[20px] font-bold'>
                                                    {musician.musician_country}
                                                </div>

                                                <div className='text-white/60  text-[16px] md:text-[10px] lg:text-[12px] xl:text-[14px] 2xl:text-[14px] mt-4'>
                                                    {musician.musiciaan_about}
                                                </div>
                                                <button
                                                    onClick={() => window.location.href = `/user/pages/Profile?id=${musician.id}`}
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
                                                    data.filter(track => track.musician === musician.musician)
                                                        .slice(getMusicianPage(musician.musician) * cardsPerPage, (getMusicianPage(musician.musician) + 1) * cardsPerPage)
                                                        .map((musicdata: any) => (
                                                        <div key={musicdata.id} className='flex-shrink-0'>
                                                            <div className="">
                                                                <img src={musicdata.track_image} className="rounded-sm w-full h-full hover:brightness-125 hover:shadow-lg hover:shadow-white/20 transition-all duration-200 cursor-pointer" alt="Description" />
                                                                <h1 className="text-white text-md font-roboto font-bold md:text-sm lg:text-sm xl:text-sm 2xl:text-sm  mt-2">{musicdata.track_name}</h1>
                                                                <h1 className="text-white text-sm font-roboto  ">{musicdata.musician}</h1>
                                                                <div className="grid grid-cols-8 gap-2 mt-2">

                                                                    <button className="grid col-span-6 bg-white/20 backdrop-blur-sm rounded-full font-bold text-white justify-center items-center rounded-sm hover:bg-white/30 transition-colors duration-200">$ {musicdata.track_price}</button>
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
                                                    onClick={() => prevPage(musician.musician)}
                                                    disabled={getMusicianPage(musician.musician) === 0}
                                                    className="pointer-events-auto bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed ml-4"
                                                >
                                                    <RiArrowLeftSLine className="w-6 h-6" />
                                                </button>
                                                <button
                                                    onClick={() => nextPage(musician.musician)}
                                                    disabled={getMusicianPage(musician.musician) === getTotalMusicianPages(musician.musician) - 1}
                                                    className="pointer-events-auto bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed mr-4"
                                                >
                                                    <RiArrowRightSLine className="w-6 h-6" />
                                                </button>
                                            </div>

                                            {/* Page Indicator */}
                                            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                                                <div className="flex space-x-2">
                                                    {Array.from({ length: getTotalMusicianPages(musician.musician) }, (_, index) => (
                                                        <button
                                                            key={index}
                                                            onClick={() => setMusicianPages(prev => ({ ...prev, [musician.musician]: index }))}
                                                            className={`w-2 h-2 rounded-full transition-colors ${getMusicianPage(musician.musician) === index ? 'bg-white' : 'bg-white/50'}`}
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