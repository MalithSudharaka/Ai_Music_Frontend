import React from 'react'
import Navbar from '../../components/Navbar'

export default function TopChartsPage() {
  return (
    <div className="min-h-screen bg-[#081028]">
      <Navbar />
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-white text-4xl font-bold mb-4">Top Charts</h1>
        <p className="text-gray-300 text-lg">Welcome to the Top Charts page!</p>
      </div>
    </div>
  )
} 