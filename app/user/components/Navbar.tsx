"use client";

"use client";
import React, { useState, useEffect, useRef } from 'react'

import { CgProfile } from "react-icons/cg";
import { RiArrowDropDownLine, RiPlayListLine, RiHeartLine, RiCheckLine, RiSettings3Line, RiLogoutBoxRLine } from "react-icons/ri";
import logo from '../images/logo/logo.png'
import Music from '../images/Navbar/Music.svg'
import Sounds from '../images/Navbar/Person.svg'
import Musicians from '../images/Navbar/Sonometer.svg'
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';


import Bell from '../images/Navbar/Bell.svg'
import User from '../images/Navbar/User.svg'
import Heart from '../images/Navbar/Heart.svg'
import Cart from '../images/Navbar/Cart.svg'


function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Track');
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const dropdownOptions = ['All','Track', 'Sound Kits', 'Musicians'];
  
  // Function to render icons
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'RiPlayListLine':
        return <RiPlayListLine size={20} />;
      case 'RiHeartLine':
        return <RiHeartLine size={20} />;
      case 'RiCheckLine':
        return <RiCheckLine size={20} />;
      case 'RiSettings3Line':
        return <RiSettings3Line size={20} />;
      case 'RiLogoutBoxRLine':
        return <RiLogoutBoxRLine size={20} />;
      default:
        return <span>{iconName}</span>;
    }
  };
  
  // Handle click outside to close dropdowns
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
        setIsDropdownOpen(false);
        setIsMobileMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const iconDropdowns = {
    user: {
      profile: {
        username: 'Skeyes_A007',
        status: 'FREE',
        wallet: '00.00 $'
      },
      sections: [
        {
          title: 'User Content',
          items: [
            { name: 'Favorites', icon: 'RiHeartLine' },
            { name: 'Purchased', icon: 'RiCheckLine' }
          ]
        },
        {
          title: 'Settings',
          items: [
            { name: 'Account Setting', icon: 'RiSettings3Line' }
          ]
        },
        {
          title: 'Logout',
          items: [
            { name: 'Log out', icon: 'RiLogoutBoxRLine' }
          ]
        }
      ]
    },
    cart: ['Cart', 'Orders', 'History']
  };

  return (
    <div className='fixed top-0 left-0 right-0 z-50 ' ref={dropdownRef}>
      <div className='containerpaddin container mx-auto  py-2 sm:py-4'>
        <nav className="bg-white/30 backdrop-blur-sm rounded-full px-4 sm:px-6 lg:px-10">
        <div className="max-w-screen-xl flex items-center justify-between mx-auto p-1">

            <a href="/user/pages/home" className="flex items-center space-x-3 rtl:space-x-reverse">
                <img src={logo.src} className="h-6 sm:h-8 md:h-7 lg:h-8" alt="Flowbite Logo" />
            </a>


            {/* Desktop Navigation */}
            <div className='hidden md:block bg-black/70 backdrop-blur-sm rounded-full border border-white/50'>
            <div className="flex items-center justify-center py-2 md:py-2 lg:py-1 px-4 md:px- lg:px-8">
            <ul className="font-roboto font-light-300 flex items-center space-x-3 md:space-x-2 lg:space-x-6">
                <li className="flex items-center">
                <img src={Music.src} className="h-3 md:h-3 lg:h-4 mr-1 md:mr-1 lg:mr-2" alt="Flowbite Logo" />
                <a href="/user/pages/topcharts" className="block px-2 md:px-2 lg:px-2 text-red-500 rounded-sm hover:bg-red-100 md:hover:bg-transparent md:border-0 md:hover:text-primary md:p-0 text-white md:hover:text-primary hover:bg-gray-700 hover:text-white md:hover:bg-transparent text-sm md:text-[10px] lg:text-[12px] xl:text-base">Track</a>
                </li>
                <div className='h-4 md:h-4 lg:h-6 w-px bg-white' />
                <li className="flex items-center">
                <img src={Musicians.src} className="h-3 md:h-3 lg:h-4 mr-1 md:mr-1 lg:mr-2" alt="Flowbite Logo" />
                <a href="/user/pages/SoundsKit" className="block py-1 md:py-1 lg:py-2 px-2 md:px-2 lg:px-2 text-white rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-primary md:p-0 text-white md:hover:text-primary hover:bg-gray-700 hover:text-white md:hover:bg-transparent text-sm md:text-[10px] lg:text-[12px] xl:text-base">Sounds Kits</a>
                </li>
                <div className='h-4 md:h-4 lg:h-6 w-px bg-white' />
                <li className="flex items-center">
                <img src={Sounds.src} className="h-3 md:h-3 lg:h-4 mr-1 md:mr-1 lg:mr-2" alt="Flowbite Logo" />
                <a href="/user/pages/Musicians" className="block py-1 md:py-1 lg:py-2 px-2 md:px-2 lg:px-2 text-white rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-primary md:p-0 text-white md:hover:text-primary hover:bg-gray-700 hover:text-white md:hover:bg-transparent text-sm md:text-[10px] lg:text-[12px] xl:text-base">Musicians</a>
                </li>
            </ul>
            </div>
            </div>

            {/* Mobile Menu Button */}
            <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden flex items-center p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>

           
            <div className="hidden md:block">
            <ul className="font-roboto font-light-300 flex items-center space-x-3 md:space-x-3 lg:space-x-3 xl:space-x-6">
                <li>
                <a href="/user/pages/SignUp" className="block px-2 md:px-2 lg:px-2 text-red-500 rounded-sm hover:bg-red-100 md:hover:bg-transparent md:border-0 md:hover:text-primary md:p-0 text-white md:hover:text-primary hover:bg-gray-700 hover:text-white md:hover:bg-transparent text-sm md:text-[10px] lg:text-[12px] xl:text-base">Sign up</a>
                </li>
                <div className='h-4 md:h-4 lg:h-6 w-px bg-white' />
                <li>
                <a href="/user/pages/SignIn" className="block py-1 md:py-1 lg:py-2 px-2 md:px-2 lg:px-2 text-white rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-primary md:p-0 text-white md:hover:text-primary hover:bg-gray-700 hover:text-white md:hover:bg-transparent text-sm md:text-[10px] lg:text-[12px] xl:text-base">Sign in</a>
                </li>
                
            </ul>
            </div>
        </div>
        </nav>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
            <div className="md:hidden mt-4 bg-black/90 backdrop-blur-sm rounded-lg border border-white/20 p-4">
                <div className="space-y-4">
                    {/* Mobile Navigation Links */}
                    <div className="space-y-2">
                        <div className="flex items-center space-x-3 text-white">
                            <img src={Music.src} className="h-4" alt="Track" />
                            <span className="font-roboto font-light-300">Track</span>
                        </div>
                        <a href="/user/pages/SoundsKit" className="flex items-center space-x-3 text-white hover:bg-white/10 rounded-lg p-2 transition-colors">
                            <img src={Musicians.src} className="h-4" alt="Sounds Kits" />
                            <span className="font-roboto font-light-300">Sounds Kits</span>
                        </a>
                        <a href="/user/pages/Musicians" className="flex items-center space-x-3 text-white hover:bg-white/10 rounded-lg p-2 transition-colors">
                            <img src={Sounds.src} className="h-4" alt="Musicians" />
                            <span className="font-roboto font-light-300">Musicians</span>
                        </a>
                    </div>
                    
                    {/* Mobile Icon Options */}
                    <div className="border-t border-white/20 pt-4">
                        <div className="space-y-3">
                            {/* Profile Dropdown */}
                            <div className="relative">
                                <button 
                                    onClick={() => setActiveDropdown(activeDropdown === 'mobile-user' ? null : 'mobile-user')}
                                    className="w-full flex items-center justify-between p-3 text-white hover:bg-white/10 rounded-lg transition-colors"
                                >
                                    <div className="flex items-center space-x-3">
                                        <img src={User.src} className="h-5" alt="Profile" />
                                        <span className="font-roboto font-light-300 text-sm">Profile</span>
                                    </div>
                                    <RiArrowDropDownLine className="text-white text-lg" />
                                </button>
                                
                                {activeDropdown === 'mobile-user' && (
                                    <div className="mt-2 ml-4 bg-black/70 rounded-lg border border-white/20 p-2 max-h-[50vh] overflow-y-auto">
                                        {iconDropdowns.user.sections.map((section, sectionIndex) => (
                                            <div key={section.title}>
                                                {sectionIndex > 0 && <div className="border-t border-white/20 my-2"></div>}
                                                {section.items.map((item) => (
                                                    <button
                                                        key={item.name}
                                                        onClick={() => {
                                                            setActiveDropdown(null);
                                                            if (item.name === 'My Playlist') {
                                                                window.location.href = '/user/pages/PlayList';
                                                            }
                                                        }}
                                                        className="w-full flex items-center space-x-3 px-3 py-2 text-sm hover:bg-white/10 transition-colors text-white rounded"
                                                    >
                                                        {renderIcon(item.icon)}
                                                        <span>{item.name}</span>
                                                    </button>
                                                ))}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>





                            {/* Cart Dropdown */}
                            <div className="relative">
                                <button 
                                    onClick={() => setActiveDropdown(activeDropdown === 'mobile-cart' ? null : 'mobile-cart')}
                                    className="w-full flex items-center justify-between p-3 text-white hover:bg-white/10 rounded-lg transition-colors"
                                >
                                    <div className="flex items-center space-x-3">
                                        <img src={Cart.src} className="h-5" alt="Cart" />
                                        <span className="font-roboto font-light-300 text-sm">Cart</span>
                                    </div>
                                    <RiArrowDropDownLine className="text-white text-lg" />
                                </button>
                                
                                {activeDropdown === 'mobile-cart' && (
                                    <div className="mt-2 ml-4 bg-black/70 rounded-lg border border-white/20 p-2 max-h-[40vh] overflow-y-auto">
                                        {iconDropdowns.cart.map((option) => (
                                            <button
                                                key={option}
                                                onClick={() => {
                                                    setActiveDropdown(null);
                                                    if (option === 'Cart') {
                                                        window.location.href = '/user/pages/Cart';
                                                    }
                                                }}
                                                className="w-full flex items-center space-x-3 px-3 py-2 text-sm hover:bg-white/10 transition-colors text-white rounded"
                                            >
                                                <span>🛒</span>
                                                <span>{option}</span>
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    
                    <div className="border-t border-white/20 pt-4">
                        <div className="flex items-center justify-between">
                            <a href="/user/pages/SignUp" className="text-red-500 font-roboto font-light-300">Sign up</a>
                            <a href="/user/pages/SignIn" className="text-white font-roboto font-light-300">Sign in</a>
                        </div>
                    </div>
                </div>
            </div>
        )}

        
        <nav className="py-2">
        <div className="justify-end flex flex-col sm:flex-row gap-4 sm:gap-10 items-center"> 
            <div className='bg-black/70 backdrop-blur-sm rounded-full border border-white/50 w-full max-w-sm md:max-w-sm lg:max-w-lg'>
                <div className="flex items-center justify-between py-1 px-6">
                    <div className="flex items-center flex-1 min-w-0">
                        <svg className="w-5 h-5 text-gray-400 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input 
                            type="text" 
                            placeholder="Search for tracks, sound kits, musicians..." 
                            className="bg-transparent text-white placeholder-gray-400 outline-none flex-1 font-roboto font-light-300 min-w-0"
                        />
                    </div>
                    
                    <div className="relative ml-4 flex-shrink-0">
                        <button 
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className='text-white flex items-center gap-2 hover:bg-white/10 rounded px-2 py-1 transition-colors'
                        >
                            {selectedOption} <RiArrowDropDownLine />
                        </button>
                        
                        {isDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-black/90 backdrop-blur-sm rounded-lg border border-white/20 shadow-lg z-50">
                                <div className="py-1">
                                    {dropdownOptions.map((option) => (
                                        <button
                                            key={option}
                                            onClick={() => {
                                                setSelectedOption(option);
                                                setIsDropdownOpen(false);
                                            }}
                                            className={`block w-full text-left px-4 py-2 text-sm hover:bg-white/10 transition-colors ${
                                                selectedOption === option ? 'text-red-500' : 'text-white'
                                            }`}
                                        >
                                            {option}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="hidden md:flex flex-wrap items-center justify-between">
            <div className="">
            <ul className="font-roboto font-light-300 flex flex-col p-4 md:p-0 md:flex-row gap-3 md:gap-3 lg:gap-3 md:mt-0">
                <li className="flex items-center relative">
                <img src={User.src} className="h-5 md:h-5 lg:h-6" alt="User Icon" />
                <button 
                    onClick={() => setActiveDropdown(activeDropdown === 'user' ? null : 'user')}
                    className="flex items-center hover:bg-white/10 rounded px-1 md:px-1 lg:px-2 py-1 transition-colors"
                >
                    <RiArrowDropDownLine className="text-white text-lg md:text-lg lg:text-xl" />
                </button>
                
                {activeDropdown === 'user' && (
                    <div className="absolute top-full left-0 mt-2 w-80 bg-black/95 backdrop-blur-sm rounded-lg border border-white/20 shadow-lg z-50 max-h-[80vh] overflow-hidden">
                        {/* Profile Section */}
                        <div className="p-4 border-b border-white/20">
                            <div 
                                className="flex items-center space-x-3 cursor-pointer hover:bg-white/10 rounded-lg p-2 transition-colors"
                                onClick={() => {
                                    setActiveDropdown(null);
                                    window.location.href = '/user/pages/UserProfile';
                                }}
                            >
                                <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center">
                                    <CgProfile className="text-white text-xl" />
                                </div>
                                <div>
                                    <div className="text-white font-medium">{iconDropdowns.user.profile.username}</div>
                                    <div className="text-gray-400 text-sm">{iconDropdowns.user.profile.status}</div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Menu Sections */}
                        <div className="py-2 overflow-y-auto max-h-[60vh]">
                            {iconDropdowns.user.sections.map((section, sectionIndex) => (
                                <div key={section.title}>
                                    {sectionIndex > 0 && <div className="border-t border-white/20 my-2"></div>}
                                    {section.items.map((item) => (
                                        <button
                                            key={item.name}
                                            onClick={() => {
                                                setActiveDropdown(null);
                                                if (item.name === 'Account Setting') {
                                                    window.location.href = '/user/pages/UserProfile?edit=true';
                                                } else if (item.name === 'Favorites') {
                                                    window.location.href = '/user/pages/PlayList';
                                                }
                                            }}
                                            className="w-full flex items-center space-x-3 px-4 py-1 text-sm hover:bg-white/10 transition-colors text-white"
                                        >
                                            {renderIcon(item.icon)}
                                            <span>{item.name}</span>
                                        </button>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                </li>



                <div className='h-4 md:h-4 lg:h-6 w-px bg-white' />
                <li className="flex items-center relative">
                <img src={Cart.src} className="h-5 md:h-5 lg:h-6" alt="Cart Icon" />
                <button 
                    onClick={() => setActiveDropdown(activeDropdown === 'cart' ? null : 'cart')}
                    className="flex items-center hover:bg-white/10 rounded px-1 md:px-1 lg:px-2 py-1 transition-colors"
                >
                    <RiArrowDropDownLine className="text-white text-lg md:text-lg lg:text-xl" />
                </button>
                
                {activeDropdown === 'cart' && (
                    <div className="absolute top-full left-0 mt-2 w-48 bg-black/90 backdrop-blur-sm rounded-lg border border-white/20 shadow-lg z-50 max-h-[60vh] overflow-hidden">
                        <div className="py-1 overflow-y-auto max-h-[60vh]">
                            {iconDropdowns.cart.map((option) => (
                                <button
                                    key={option}
                                    onClick={() => {
                                        setActiveDropdown(null);
                                        if (option === 'Cart') {
                                            window.location.href = '/user/pages/Cart';
                                        }
                                    }}
                                    className="block w-full text-left px-4 py-2 text-sm hover:bg-white/10 transition-colors text-white"
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
                </li>
            </ul>
            </div>
            </div>
        </div>
        
        </nav>
      </div>
    </div>
  )
}

export default Navbar