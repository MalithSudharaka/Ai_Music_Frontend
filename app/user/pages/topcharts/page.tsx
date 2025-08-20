'use client'
import { IoMdArrowDropdown } from "react-icons/io";
import Navbar from '../../components/Navbar'
import Musicdata from '../musicdata.json'
import Dropdown from '../../dropdown.json'
import Filters from '../../filters.json'
import React, { useEffect, useState } from 'react'
import Downloadicon from '../../images/icon/Download.svg'
import Image from '../../images/songimage/song.png'
import First_carousel from '../../components/First_carousel'
import Footer from '../../components/Footer'
import data from '../../data.json'

export default function TopChartsPage() {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [screenSize, setScreenSize] = useState('mobile');

  // Dropdown state
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  
  // Tag filtering state
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  // Search state for track_tags
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Dropdown filter states
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [selectedTrackType, setSelectedTrackType] = useState<string | null>(null);
  const [selectedPrice, setSelectedPrice] = useState<string | null>(null);
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [selectedBPM, setSelectedBPM] = useState<string | null>(null);
  const [selectedInstrument, setSelectedInstrument] = useState<string | null>(null);
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [selectedDuration, setSelectedDuration] = useState<string | null>(null);
  
  // Carousel filter state
  const [carouselFilter, setCarouselFilter] = useState<string | null>(null);
  const [carouselFilteredData, setCarouselFilteredData] = useState<any[]>([]);

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

  // Filter data based on selected tag, dropdown filters, and carousel filter
  const filteredData = data.filter(track => {
    // Carousel filter (highest priority)
    if (carouselFilter && carouselFilteredData.length > 0) {
      const isInCarouselFilter = carouselFilteredData.some(filteredTrack => filteredTrack.id === track.id);
      if (!isInCarouselFilter) return false;
    }
    
    // Tag filtering (if selectedTag is set)
    if (selectedTag) {
      const tags = Array.isArray(track.track_tags) 
        ? track.track_tags 
        : typeof track.track_tags === 'string' 
          ? track.track_tags.split(',').map(tag => tag.trim())
          : [];
      
      const hasSelectedTag = tags.some(tag => tag.toLowerCase() === selectedTag.toLowerCase());
      if (!hasSelectedTag) return false;
    }
    
    // Dropdown filters
    if (selectedGenre && track.genres_category !== selectedGenre) return false;
    if (selectedTrackType && track.track_type !== selectedTrackType) return false;
    if (selectedPrice && track.track_price !== selectedPrice) return false;
    if (selectedMood && track.mood_type !== selectedMood) return false;
    if (selectedBPM && track.BPM !== selectedBPM) return false;
    if (selectedInstrument && track.instrument_type !== selectedInstrument) return false;
    if (selectedKey && track.track_key !== selectedKey) return false;
    if (selectedDuration && track.duration !== selectedDuration) return false;
    
    return true;
  });

  // Pagination logic
  const totalCards = filteredData.length;
  const totalPages = Math.ceil(totalCards / cardsPerPage);
  const startIndex = (currentPage - 1) * cardsPerPage;
  const endIndex = startIndex + cardsPerPage;
  const currentCards = filteredData.slice(startIndex, endIndex);

  // Log filtering summary
  if (selectedTag) {
    console.log(`=== FILTERING SUMMARY ===`);
    console.log(`Selected Tag: "${selectedTag}"`);
    console.log(`Total tracks in data: ${data.length}`);
    console.log(`Tracks with "${selectedTag}" in track_tags: ${filteredData.length}`);
    console.log(`Tracks being displayed: ${currentCards.length}`);
    console.log(`Current page: ${currentPage} of ${totalPages}`);
    console.log(`=======================`);
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Handle tag selection
  const handleTagClick = (tag: string) => {
    console.log('Tag clicked:', tag, 'Previous selected:', selectedTag);
    
    // Add refresh effect
    setIsRefreshing(true);
    
    setTimeout(() => {
      if (selectedTag === tag) {
        // If clicking the same tag, deselect it
        setSelectedTag(null);
        console.log('Deselecting tag, showing all data');
      } else {
        // Always select the new tag (deselect previous one)
        setSelectedTag(tag);
        console.log('Selecting new tag:', tag, 'Previous tag deselected');
      }
      // Reset to first page when filtering
      setCurrentPage(1);
      setIsRefreshing(false);
    }, 300); // 300ms refresh delay
  };

  // Handle search input for track_tags
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    setCurrentPage(1); // Reset to first page when searching
    console.log('Searching for tags containing:', query);
  };

  // Handle dropdown option selection
  const handleDropdownOption = (category: string, value: string) => {
    console.log('Dropdown option selected:', category, value);
    
    // Update the appropriate state based on category
    switch (category) {
      case 'Genre':
        setSelectedGenre(selectedGenre === value ? null : value);
        break;
      case 'Track Type':
        setSelectedTrackType(selectedTrackType === value ? null : value);
        break;
      case 'Price':
        setSelectedPrice(selectedPrice === value ? null : value);
        break;
      case 'Mood':
        setSelectedMood(selectedMood === value ? null : value);
        break;
      case 'BPM':
        setSelectedBPM(selectedBPM === value ? null : value);
        break;
      case 'Instruments':
        setSelectedInstrument(selectedInstrument === value ? null : value);
        break;
      case 'Key':
        setSelectedKey(selectedKey === value ? null : value);
        break;
      case 'Duration':
        setSelectedDuration(selectedDuration === value ? null : value);
        break;
    }
    
    setCurrentPage(1); // Reset to first page when filtering
    setOpenDropdown(null); // Close dropdown
  };

  // Clear carousel filter
  const clearCarouselFilter = () => {
    setCarouselFilter(null);
    setCarouselFilteredData([]);
    sessionStorage.removeItem('selectedFilter');
    sessionStorage.removeItem('filteredMusicData');
    console.log('Carousel filter cleared');
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

  // Listen for carousel filter changes from session storage
  useEffect(() => {
    const checkCarouselFilter = () => {
      const storedFilter = sessionStorage.getItem('selectedFilter');
      const storedData = sessionStorage.getItem('filteredMusicData');
      
      if (storedFilter && storedData) {
        try {
          const parsedData = JSON.parse(storedData);
          setCarouselFilter(storedFilter);
          setCarouselFilteredData(parsedData);
          console.log(`Carousel filter applied: ${storedFilter} with ${parsedData.length} tracks`);
        } catch (error) {
          console.error('Error parsing carousel filter data:', error);
        }
      } else {
        // Clear carousel filter if no data in session storage
        setCarouselFilter(null);
        setCarouselFilteredData([]);
      }
    };

    // Check immediately
    checkCarouselFilter();

    // Listen for storage events (when First_carousel updates session storage)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'selectedFilter' || e.key === 'filteredMusicData') {
        checkCarouselFilter();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    // Also check periodically (for same-tab updates)
    const interval = setInterval(checkCarouselFilter, 1000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  // Handle dropdown toggle
  const toggleDropdown = (dropdownId: number, event: React.MouseEvent) => {
    if (openDropdown === dropdownId) {
      setOpenDropdown(null);
    } else {
      const button = event.currentTarget;
      const rect = button.getBoundingClientRect();
      const isMobile = window.innerWidth < 768;
      
      let leftPosition = rect.left;
      
      // On mobile, adjust position for last dropdowns to prevent overflow
      if (isMobile) {
        const dropdownWidth = 224; // min-w-56 = 224px
        const screenWidth = window.innerWidth;
        const margin = 16; // 16px margin
        
        // If dropdown would overflow right edge, adjust left position
        if (rect.left + dropdownWidth + margin > screenWidth) {
          leftPosition = screenWidth - dropdownWidth - margin;
        }
        
        // Ensure it doesn't go too far left
        leftPosition = Math.max(margin, leftPosition);
      }
      
      setDropdownPosition({
        top: rect.bottom + 8,
        left: leftPosition
      });
      setOpenDropdown(dropdownId);
    }
  };



  // Close dropdown when clicking outside and update position on scroll
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (openDropdown !== null) {
        setOpenDropdown(null);
      }
    };

    const handleScroll = () => {
      if (openDropdown !== null) {
        // Find the button element and recalculate position
        const button = document.querySelector(`[data-dropdown-id="${openDropdown}"]`);
        if (button) {
          const rect = button.getBoundingClientRect();
          const isMobile = window.innerWidth < 768;
          
          let leftPosition = rect.left;
          
          // On mobile, adjust position for last dropdowns to prevent overflow
          if (isMobile) {
            const dropdownWidth = 224; // min-w-56 = 224px
            const screenWidth = window.innerWidth;
            const margin = 16; // 16px margin
            
            // If dropdown would overflow right edge, adjust left position
            if (rect.left + dropdownWidth + margin > screenWidth) {
              leftPosition = screenWidth - dropdownWidth - margin;
            }
            
            // Ensure it doesn't go too far left
            leftPosition = Math.max(margin, leftPosition);
          }
          
          setDropdownPosition({
            top: rect.bottom + 8,
            left: leftPosition
          });
        }
      }
    };

    document.addEventListener('click', handleClickOutside);
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    
    return () => {
      document.removeEventListener('click', handleClickOutside);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [openDropdown]);

  return (
    <div>
      <div className="">
      <Navbar />
      </div>
      <div className="containerpaddin   container mx-auto  pt-34 sm:pt-28 md:pt-32 lg:pt-36 ">
        <h1 className="text-white text-4xl font-roboto font-bold mb-4">Top Charts</h1>
        <First_carousel />
        <div className='md:flex items-center  overflow-hidden'>
          <div className='bg-black/40 backdrop-blur-sm rounded-full border border-white/50 '>
            <div className="flex items-center justify-between py-1 px-2">
              <div className="flex items-center flex-1 min-w-0">
                <svg className="w-5 h-5 text-gray-400 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search for tags..."
                  value={searchQuery}
                  onChange={handleSearchChange}
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
              // Collect all unique tags from all tracks and filter by search query
              (() => {
                const allTags = new Set<string>();
                
                data.forEach(track => {
                  const tags = Array.isArray(track.track_tags) 
                    ? track.track_tags 
                    : typeof track.track_tags === 'string' 
                      ? track.track_tags.split(',').map(tag => tag.trim())
                      : [];
                  
                  tags.forEach(tag => allTags.add(tag));
                });
                
                // Filter tags based on search query
                const filteredTags = searchQuery.trim() 
                  ? Array.from(allTags).filter(tag => 
                      tag.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                  : Array.from(allTags);
                
                return filteredTags.map((tag: string, index: number) => (
                  <div key={`tag-${index}`} className='flex-shrink-0'>
                    <div 
                      className={`backdrop-blur-sm rounded-full border flex items-center justify-center cursor-pointer transition-all duration-200 ${
                        selectedTag === tag 
                          ? 'bg-white/60 border-white/80 text-black' 
                          : 'bg-black/40 border-white/50 text-white hover:bg-black/60'
                      }`}
                      onClick={() => handleTagClick(tag)}
                    >
                      <div className="py-1 px-1 flex items-center justify-center w-full">
                        <p className={`font-roboto font-light-300 px-4 ${
                          selectedTag === tag ? 'text-black' : 'text-white'
                        }`}>
                          {tag}
                          {selectedTag === tag && <span className="ml-1">✓</span>}
                        </p>
                      </div>
                    </div>
                  </div>
                ));
              })()
            }
          </div>
        </div>


        <div
          className='flex items-center justify-between gap-2 overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing py-2 mt-4'

          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        >

          <div className="flex items-center justify-center gap-4">
            {/* Dynamic dropdown buttons mapped from data.json */}
            {(() => {
              // Extract unique values from data.json for each category
              const genres = [...new Set(data.map(track => track.genres_category).filter(Boolean))];
              const trackTypes = [...new Set(data.map(track => track.track_type).filter(Boolean))];
              const prices = [...new Set(data.map(track => track.track_price).filter(Boolean))];
              const moods = [...new Set(data.map(track => track.mood_type).filter(Boolean))];
              const bpms = [...new Set(data.map(track => track.BPM).filter(Boolean))];
              const instruments = [...new Set(data.map(track => track.instrument_type).filter(Boolean))];
              const keys = [...new Set(data.map(track => track.track_key).filter(Boolean))];
              const durations = [...new Set(data.map(track => track.duration).filter(Boolean))];

              const dropdowns = [
                { id: 1, category: "Genre", options: genres },
                { id: 2, category: "Track Type", options: trackTypes },
                { id: 3, category: "Price", options: prices },
                { id: 4, category: "Mood", options: moods },
                { id: 5, category: "BPM", options: bpms },
                { id: 6, category: "Instruments", options: instruments },
                { id: 7, category: "Key", options: keys },
                { id: 8, category: "Duration", options: durations }
              ];

              return dropdowns.map((dropdown) => (
              <div key={dropdown.id} className="relative">
                {/* Dropdown Button */}
                <button
                  className="flex items-center gap-2 text-white hover:text-primary transition-colors duration-200"
                  data-dropdown-id={dropdown.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log('Clicking dropdown:', dropdown.id, 'Current open:', openDropdown);
                    toggleDropdown(dropdown.id, e);
                  }}
                >
                  <span className="font-roboto font-light-300">{dropdown.category}</span>
                  <IoMdArrowDropdown
                    className={`transition-transform duration-200 ${openDropdown === dropdown.id ? "rotate-180" : ""
                      }`}
                  />
                </button>

                {/* Dropdown Menu */}
                {openDropdown === dropdown.id && (
                  <div className="fixed bg-black/80 scrollbar-hide backdrop-blur-sm border-2 border-white/30 rounded-lg shadow-xl min-w-56 max-h-96 overflow-y-auto mx-4 md:mx-0" style={{ 
                    zIndex: 10, 
                    top: `${dropdownPosition.top}px`, 
                    left: `${dropdownPosition.left}px`,
                    right: window.innerWidth < 768 ? '16px' : 'auto',
                    maxWidth: window.innerWidth < 768 ? 'calc(100vw - 32px)' : 'none',
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none'
                  }}>
                    <div className="p-3 border-b border-white/20 bg-black/60 sticky top-0 z-10">
                      <h3 className="text-white font-bold text-sm">{dropdown.category} Options</h3>
                    </div>
                    <div className="py-2 overflow-y-auto scrollbar-hide max-h-80">
                      {/* Dynamic options mapped from data.json */}
                      {dropdown.options.map((item: string, index: number) => (
                        <div
                          key={index}
                          className="px-4 py-3 text-white hover:bg-white/20 cursor-pointer transition-colors duration-150 border-l-2 border-transparent hover:border-white/30"
                          onClick={() => handleDropdownOption(dropdown.category, item)}
                        >
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                             </div>
             ));
            })()}

            </div>
          <div className="text-white items-end justify-end">

          </div>
        </div>



        {/* Debug info */}
        {(carouselFilter || selectedTag || searchQuery || selectedGenre || selectedTrackType || selectedPrice || selectedMood || selectedBPM || selectedInstrument || selectedKey || selectedDuration) && (
          <div className="mt-4 mb-4 p-3 bg-black/20 rounded-lg">
            <p className="text-white text-sm">
              {carouselFilter && (
                <span>
                  <strong>Carousel Filter:</strong> <span className="text-blue-400 font-bold">{carouselFilter}</span>
                  <button 
                    onClick={clearCarouselFilter}
                    className="ml-2 text-blue-300 hover:text-white text-xs underline"
                  >
                    Clear
                  </button> | 
                </span>
              )}
              {selectedTag && (
                <span><strong>Tag:</strong> <span className="text-primary font-bold">{selectedTag}</span> | </span>
              )}
              {searchQuery && (
                <span><strong>Search:</strong> <span className="text-primary font-bold">"{searchQuery}"</span> | </span>
              )}
              {selectedGenre && (
                <span><strong>Genre:</strong> <span className="text-primary font-bold">{selectedGenre}</span> | </span>
              )}
              {selectedTrackType && (
                <span><strong>Type:</strong> <span className="text-primary font-bold">{selectedTrackType}</span> | </span>
              )}
              {selectedPrice && (
                <span><strong>Price:</strong> <span className="text-primary font-bold">{selectedPrice}</span> | </span>
              )}
              {selectedMood && (
                <span><strong>Mood:</strong> <span className="text-primary font-bold">{selectedMood}</span> | </span>
              )}
              {selectedBPM && (
                <span><strong>BPM:</strong> <span className="text-primary font-bold">{selectedBPM}</span> | </span>
              )}
              {selectedInstrument && (
                <span><strong>Instrument:</strong> <span className="text-primary font-bold">{selectedInstrument}</span> | </span>
              )}
              {selectedKey && (
                <span><strong>Key:</strong> <span className="text-primary font-bold">{selectedKey}</span> | </span>
              )}
              {selectedDuration && (
                <span><strong>Duration:</strong> <span className="text-primary font-bold">{selectedDuration}</span> | </span>
              )}
              <strong>Showing:</strong> {filteredData.length} tracks | 
              <strong>Total:</strong> {data.length} tracks
            </p>
            <p className="text-white text-xs mt-1">
              <strong>Active Filters:</strong> {[
                carouselFilter && 'Carousel',
                selectedTag && 'Tag',
                searchQuery && 'Search',
                selectedGenre && 'Genre',
                selectedTrackType && 'Track Type',
                selectedPrice && 'Price',
                selectedMood && 'Mood',
                selectedBPM && 'BPM',
                selectedInstrument && 'Instrument',
                selectedKey && 'Key',
                selectedDuration && 'Duration'
              ].filter(Boolean).join(', ')}
            </p>
          </div>
        )}

        {/* Refresh indicator */}
        {isRefreshing && (
          <div className="mt-4 mb-4 p-3 bg-primary/20 rounded-lg flex items-center justify-center">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
            <span className="ml-2 text-white">Refreshing...</span>
          </div>
        )}

        <div className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 scrollbar-hide mt-9 transition-opacity duration-300 ${isRefreshing ? 'opacity-50' : 'opacity-100'}`}>

          {
            currentCards.map(musicdata => (
              <div key={musicdata.id} className='flex-shrink-0'>
                <div className="">
                  <img src={musicdata.track_image} className="rounded-sm w-full h-full hover:brightness-125 hover:shadow-lg hover:shadow-white/20 transition-all duration-200 cursor-pointer" alt="Description" />
                  <h1 className="text-white text-md font-roboto font-bold   mt-2">{musicdata.track_name}</h1>
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
                  className={`px-6 py-2 rounded-lg font-roboto font-medium transition-colors ${currentPage === page
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